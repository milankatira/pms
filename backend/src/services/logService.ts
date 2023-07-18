import Log, { ILog } from "../models/log";
import { IProject } from "../models/project";
import { IUser } from "../models/user";

// Get the date 15 days ago
const fifteenDaysAgo = new Date();
fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

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

  async getLogsByUserId(
    userId: IUser["_id"],
    page: number,
    limit: number
  ): Promise<{ logs: ILog[]; totalLogs: number }> {
    const skip = (page - 1) * limit; // Calculate the number of documents to skip
    const totalLogs = await Log.countDocuments({ userId });
    const logs = await Log.find({ userId }, { note: 0 })
    .skip(skip) // Skip the specified number of documents
    .limit(limit) // Limit the number of documents to retrieve
    .populate("projectId", "name")
    .exec()

    return { logs, totalLogs };
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
    const log = await Log.findById(logId)
    .populate("projectId", "name")
    .exec();
    return log;
  },

  async getLogsPerDay(
    startDate = fifteenDaysAgo,
    endDate = new Date()
  ): Promise<any[]> {
    const result = await Log.aggregate([
      {
        $match: {
          date: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]).exec();
    return result;
  },

  async getStatusCounts(
    startDate = fifteenDaysAgo,
    endDate = new Date()
  ): Promise<any[]> {
    const result = await Log.aggregate([
      {
        $match: {
          date: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            status: "$status",
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.date",
          statuses: {
            $push: {
              status: "$_id.status",
              count: "$count",
            },
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]).exec();
    return result;
  },

  async deleteLogById(logId: ILog["_id"]): Promise<boolean> {
    const deletedLog = await Log.findByIdAndDelete(logId);
    if (!deletedLog) {
      return false;
    }

    return true;
  },
};
