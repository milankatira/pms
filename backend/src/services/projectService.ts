import log from "../models/log";
import Project, { IProject } from "../models/project";
import Log from "../models/log";
import { IUser } from "../models/user";

export const projectService = {
  async createProject(
    name: string,
    status: string,
    description: string,
    user: IUser
  ): Promise<IProject> {
    const project: IProject = new Project({
      name,
      user: user,
      status,
      description,
    });

    await project.save();

    return project;
  },

  async getProjectsByUser(
    userId: string
  ): Promise<{ project: IProject; logCount: number }[]> {
    const projects = await Project.find({ user: userId });

    const projectIds = projects.map((project) => project._id);

    const logCountPerProject = await log.aggregate([
      {
        $match: {
          projectId: { $in: projectIds },
        },
      },
      {
        $group: {
          _id: "$projectId",
          count: { $sum: 1 },
        },
      },
    ]);

    const projectData: { project: IProject; logCount: number }[] = projects.map(
      (project) => {
        const logCount = logCountPerProject.find(
          (item) => item._id.toString() === project._id.toString()
        );
        return {
          ...project.toObject(),
          logCount: logCount ? logCount.count : 0,
        };
      }
    );

    return projectData;
  },

  async getProjects(): Promise<IProject[] | null> {
    const projects = await Project.find({}, { _id: 1, name: 1 });
    return projects;
  },

  async getProjectById(projectId: string): Promise<IProject | null> {
    const project = await Project.findById(projectId);
    return project;
  },

  async editProjectById(
    projectId: string,
    name: string,
    status: string,
    description: string
  ): Promise<IProject | null> {
    const project = await Project.findByIdAndUpdate(
      projectId,
      { name, status, description },
      { new: true }
    );
    return project;
  },

  async getProjectsAnalytics() {
    const projects = await Project.find();

    const projectIds = projects.map((project) => project._id);

    const today = new Date();

    const fifteenDaysAgo = new Date();
    fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 14);
    fifteenDaysAgo.setHours(0, 0, 0, 0);

    const logCountPerProject = await Log.aggregate([
      {
        $match: {
          projectId: { $in: projectIds },
          date: { $gte: fifteenDaysAgo, $lte: today },
        },
      },
      {
        $group: {
          _id: {
            projectId: "$projectId",
            date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.projectId",
          logCounts: { $push: { date: "$_id.date", count: "$count" } },
        },
      },
    ]);

    const statusCountPerProject = await Log.aggregate([
      {
        $match: {
          projectId: { $in: projectIds },
          date: { $gte: fifteenDaysAgo, $lte: today },
        },
      },
      {
        $group: {
          _id: {
            projectId: "$projectId",
            status: "$status",
            date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.projectId",
          statusCounts: {
            $push: {
              status: "$_id.status",
              date: "$_id.date",
              count: "$count",
            },
          },
        },
      },
    ]);

    const projectData = projects.map((project) => {
      const logCounts = logCountPerProject.find(
        (item) => item._id.toString() === project._id.toString()
      );
      const statusCounts = statusCountPerProject.find(
        (item) => item._id.toString() === project._id.toString()
      );

      const logCountByDate = {};
      if (logCounts) {
        logCounts.logCounts.forEach((log) => {
          logCountByDate[log.date] = log.count;
        });
      }

      const statusCount = [];
      if (statusCounts) {
        statusCounts.statusCounts.forEach((log) => {
          const existingLog = statusCount.find(
            (item) => item.date === log.date
          );

          if (existingLog) {
            if (existingLog.status.hasOwnProperty(log.status)) {
              existingLog.status[log.status] += log.count;
            } else {
              existingLog.status[log.status] = log.count;
            }
            existingLog.count += log.count;
          } else {
            const newLog = {
              date: log.date,
              count: log.count,
              status: { [log.status]: log.count },
            };
            statusCount.push(newLog);
          }
        });
      }
      return {
        ...project.toObject(),
        logCount: logCountByDate,
        statusCount: statusCount,
      };
    });

    return projectData;
  },

  async getProjectsAnalyticsAll() {
    const projects = await Project.find();

    const projectIds = projects.map((project) => project._id);

    const logCountPerProject = await Log.aggregate([
      {
        $match: {
          projectId: { $in: projectIds },
        },
      },
      {
        $group: {
          _id: {
            projectId: "$projectId",
            date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.projectId",
          logCounts: { $push: { date: "$_id.date", count: "$count" } },
        },
      },
    ]);

    const statusCountPerProject = await Log.aggregate([
      {
        $match: {
          projectId: { $in: projectIds },
        },
      },
      {
        $group: {
          _id: {
            projectId: "$projectId",
            status: "$status",
            date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.projectId",
          statusCounts: { $push: { status: "$_id.status", count: "$count" } },
        },
      },
    ]);

    const projectData = projects.map((project) => {
      const logCounts = logCountPerProject.find(
        (item) => item._id.toString() === project._id.toString()
      );
      const statusCounts = statusCountPerProject.find(
        (item) => item._id.toString() === project._id.toString()
      );

      const logCountByDate = {};
      if (logCounts) {
        logCounts.logCounts.forEach((log) => {
          logCountByDate[log.date] = log.count;
        });
      }

      const statusCount = [];
      if (statusCounts) {
        statusCounts.statusCounts.forEach((log) => {
          const existingLog = statusCount.find(
            (item) => item.date === log.date
          );

          if (existingLog) {
            if (existingLog.status.hasOwnProperty(log.status)) {
              existingLog.status[log.status] += log.count;
            } else {
              existingLog.status[log.status] = log.count;
            }
            existingLog.count += log.count;
          } else {
            const newLog = {
              date: log.date,
              count: log.count,
              status: { [log.status]: log.count },
            };
            statusCount.push(newLog);
          }
        });
      }

      return {
        ...project.toObject(),
        logCount: logCountByDate,
        statusCount: statusCount,
      };
    });

    return projectData;
  },
};
