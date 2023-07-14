import Log, { ILog } from "../models/log";
import { IProject } from "../models/project";
import { IUser } from "../models/user";

export const logService = {
  async createLog(
    userId: IUser["_id"],
    projectId: IProject["_id"],
    status: string,
    duration: number,
    date: Date,
    note: string
  ): Promise<ILog> {
    const log: ILog = new Log({
      userId,
      projectId,
      status,
      duration,
      date,
      note,
    });

    await log.save();

    return log;
  },

  async getLogsByUserId(userId: IUser["_id"]): Promise<ILog[]> {
    const logs = await Log.find({ userId }).exec();
    return logs;
  },

  async editLog(
    logId: ILog["_id"],
    updatedLog: Partial<ILog>
  ): Promise<ILog | null> {
    const log = await Log.findByIdAndUpdate(logId, updatedLog, {
      new: true,
    }).exec();
    return log;
  },

  async getLogById(logId: ILog["_id"]): Promise<ILog | null> {
    const log = await Log.findById(logId).exec();
    return log;
  },
};
