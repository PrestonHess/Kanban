import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class ListService {
  getListsByBoard(body) {
    //TODO Need to find all lists by board ID and return the data
    // let lists = await dbContext.Lists.
  }
  async find(query={}) {
    let values = await dbContext.Values.find(query);
    return values;
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