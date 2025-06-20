import { getAllTasksTypeOf } from "@/lib/queries/getAllTasks";
import { eachDayOfInterval, format, parseISO } from "date-fns";




  export function dateRange (scheduleTasks: getAllTasksTypeOf[]) {
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
  