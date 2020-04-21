import express from "express";
import BaseController from "../utils/BaseController";
import { listService } from "../services/ListService";
import auth0provider from "@bcwdev/auth0provider";

export class ListController extends BaseController {
  constructor() {
    super("api/lists");
    this.router
      .use(auth0provider.isAuthorized)
      .get(":id", this.getListByBoard)
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

  async getListByBoard(req, res, next) {
    try {
      let data = await listService.getListsByBoard(req.body)
      return data
    } catch (error) {
      console.error(error)
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
}
