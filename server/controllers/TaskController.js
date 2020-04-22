import express from "express";
import BaseController from "../utils/BaseController";
import { taskService } from "../services/TaskService";
import auth0provider from "@bcwdev/auth0provider";
import { commentService } from "../services/CommentService";


export class TaskController extends BaseController {
  constructor() {
    super("api/tasks");
    this.router
    .use(auth0provider.getAuthorizedUserInfo)
      .get("", this.getAll)
      .get("/:id", this.getById)
      .delete("/:id", this.deleteTask)
      .get('/:id/comments', this.getComments)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .post("", this.create);
  }

  async getComments(req, res, next) {
    try {
      let data = await commentService.find(req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
  async getAll(req, res, next) {
    try {
      return res.send(["value1", "value2"]);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      let data = await taskService.getById(req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async deleteTask(req, res, next) {
    try {
      await taskService.deleteTask(req.params.id, req.userInfo.email)
      return res.send("Deleted Task!")
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorEmail = req.userInfo.email;
      let data = await taskService.create(req.body)
      res.send(req.body);
    } catch (error) {
      next(error);
    }
  }
}
