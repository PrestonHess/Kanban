import express from "express";
import BaseController from "../utils/BaseController";
import { listService } from "../services/ListService";
import auth0provider from "@bcwdev/auth0provider";
import { taskService } from "../services/TaskService";

export class ListController extends BaseController {
  constructor() {
    super("api/lists");
    this.router
      .use(auth0provider.getAuthorizedUserInfo)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .post("", this.create)
      .delete("/:id", this.delete)
      .get("/:id/tasks", this.getAll)
  }
  async getAll(req, res, next) {
    try {
      let data = await taskService.find({listId : req.params.id})
      return res.send(data);
    } catch (error) {
      console.error(error);
    }
  }
  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorEmail = req.userInfo.email;
      let data = await listService.create(req.body)
      res.send(req.body);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await listService.delete(req.params.id)
      return res.send("Successfully deleted")
    } catch (error) {
      console.error(error)
    }
  }
}
