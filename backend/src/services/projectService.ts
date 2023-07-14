import log from "../models/log";
import Project, { IProject } from "../models/project";
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
};
