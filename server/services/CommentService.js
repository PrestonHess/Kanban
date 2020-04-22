import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class CommentService {
  async deleteAll(id) {
    let data = await dbContext.Comments.deleteMany({ _id : id})
    return data
  }
  async delete(id) {
    let data = await dbContext.Comments.findOneAndRemove({ _id : id });
    return data
  }
 
  async find(id) {
    let comments = await dbContext.Comments.find({taskId : id});
    if (!comments) {
      throw new BadRequest("No Lists found")
    }
    return comments;
  }
  async findById(id) {
    let comments = await dbContext.Comments.findById(id);
    if (!comments) {
      throw new BadRequest("Invalid Id");
    }
    return comments;
  }

  async create(rawData) {
    let data = await dbContext.Comments.create(rawData)
    return data
  }
}

export const commentService = new CommentService()