import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class ListService {
  async deleteAll(id) {
    let data = await dbContext.Lists.deleteMany({ _id : id})
    return data
  }
  async delete(id) {
    let data = await dbContext.Lists.findOneAndRemove({ _id : id });
    // if (!data) {
    //   throw new BadRequest("Invalid ID or you do not own this list");
    // }
    return data
  }
  async getListsByBoard(body) {
    //TODO Need to find all lists by board ID and return the data
    // let lists = await dbContext.Lists.findById(body._id)
    // return lists
  }
  async find(query={}) {
    let lists = await dbContext.Lists.find(query);
    if (!lists) {
      throw new BadRequest("No Lists found")
    }
    return lists;
  }
  async findById(id) {
    let value = await dbContext.Values.findById(id);
    if (!value) {
      throw new BadRequest("Invalid Id");
    }
    return value;
  }

  async create(rawData) {
    let data = await dbContext.Lists.create(rawData)
    return data
  }
}

export const listService = new ListService();