import express from "express";
import BaseController from "../utils/BaseController";
import { taskService } from "../services/TaskService";
import auth0provider from "@bcwdev/auth0provider";


export class TaskController extends BaseController {
  constructor() {
    super("api/tasks");
    this.router
    .use(auth0provider.getAuthorizedUserInfo)
      .get("", this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .post("", this.create);
  }
  async getAll(req, res, next) {
    try {
      return res.send(["value1", "value2"]);
    } catch (error) {
      next(error);
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