import express from "express";
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { commentService } from "../services/CommentService";

export class CommentController extends BaseController {
  constructor() {
    super("api/comments");
    this.router
      .use(auth0provider.getAuthorizedUserInfo)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .post("", this.create)
      .delete("/:id", this.delete)
      .get("/:id/comments", this.getAll)
  }
  async getAll(req, res, next) {
    try {
      let data = await commentService.find({taskId : req.params.id})
      return res.send(data);
    } catch (error) {
      console.error(error);
    }
  }
  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorEmail = req.userInfo.email;
      let data = await commentService.create(req.body)
      res.send(req.body);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await commentService.delete(req.params.id)
      return res.send("Successfully deleted")
    } catch (error) {
      console.error(error)
    }
  }
}
