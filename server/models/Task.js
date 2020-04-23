import mongoose from "mongoose";
import { dbContext } from "../db/DbContext"
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId

const Task = new Schema({
        title: { type: String, required: true },
        creatorEmail: { type: String, required: true },
        listId: {type: ObjectId, ref: 'List', required: true}
    }, { timestamps: true, toJSON: { virtuals: true } });

    Task.virtual("creator",
  {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
  })

  //CASCADE ON DELETE
Task.pre('findOneAndRemove', function (next) {
  //lets find all the lists and remove them
  Promise.all([
    // @ts-ignore
    dbContext.Comments.deleteMany({ taskId: this._conditions._id })
  ])
    .then(() => next())
    .catch(err => next(err))
})

export default Task;
