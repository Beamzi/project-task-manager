import { eachDayOfInterval, format, parseISO } from "date-fns";


export interface ScheduleTasks {
    scheduleTasks:
      | {
          title: string;
          date: Date;
          content: string | null;
          id: string;
          published: boolean;
          authorId: string | null;
          projectId: string | null;
          priority: boolean;
          createdAt: Date;
        }[]
      | undefined;
  }

  export function dateRange ({scheduleTasks}: ScheduleTasks) {
    const getLatestTask = () => {
        const currentDate = new Date();
        const latestTask = scheduleTasks?.[scheduleTasks.length - 1];
        if (!latestTask) {
          return currentDate.setDate(currentDate.getDate() + 28);
        } else return latestTask.date;
      };
      const latestTask = getLatestTask();
    
      const getMonthFromNow = () => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 28);
        return currentDate;
      };
      const getMonth = getMonthFromNow();
    
      const getDateRange = eachDayOfInterval({
        start: new Date(),
        end: new Date(latestTask < getMonth ? getMonth : latestTask),
      });

      return getDateRange
  }
  