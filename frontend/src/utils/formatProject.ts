export const statusCounts = (project: any[]) =>
  project &&
  project.length >= 1 &&
  project.map((item: { statusCount: any[]; name: any }) => {
    const countArray = [0, 0, 0, 0];
    item.statusCount.forEach(
      (statusItem: {
        status: { paid: any; unpaid: any; overdue: any; draft: any };
        count: number;
      }) => {
        if (statusItem.status.paid) countArray[0] += statusItem.count;
        if (statusItem.status.unpaid) countArray[1] += statusItem.count;
        if (statusItem.status.overdue) countArray[2] += statusItem.count;
        if (statusItem.status.draft) countArray[3] += statusItem.count;
      }
    );
    return { statusCount: countArray, projectName: item.name };
  });


export const statusLogCounts = (project: { statuses: any[]; _id: any }[]) =>
  project.map((item: { statuses: any[]; _id: any }) => {
    const countArray = [0, 0, 0, 0];
    item.statuses.forEach((statusItem) => {
      if (statusItem.status === 'paid') countArray[0] += statusItem.count;
      if (statusItem.status === 'unpaid') countArray[1] += statusItem.count;
      if (statusItem.status === 'overdue') countArray[2] += statusItem.count;
      if (statusItem.status === 'draft') countArray[3] += statusItem.count;
    });
    return { date: item._id, statusCount: countArray };
  });
