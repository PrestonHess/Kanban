import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class TaskService {
    async deleteTask(id, userEmail) {
      let task = await dbContext.Tasks.findOneAndRemove({ _id: id, creatorEmail: userEmail });
      return task
    }
    async find(query = {}) {
        let task = await dbContext.Tasks.find(query);
        return task;
    }
    async findById(id) {
        let task = await dbContext.Tasks.findById(id);
        if (!task) {
            throw new BadRequest("Invalid Id");
        }
        return task;
    }
    async create(rawData) {
        let data = await dbContext.Tasks.create(rawData)
        return data
    }
}

export const taskService = new TaskService();