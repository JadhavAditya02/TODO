import { ReactComponent as ScheduleIcon } from "assets/svg/scheduler.svg";
import moment from "moment";

export const TaskDate = ({ date }) => {
  // Define the date format explicitly
  const dateMoment = moment(date, "DD-MM-YYYY"); 

  const isToday = dateMoment.isSame(moment(), "day");
  const isYesterday = dateMoment.isSame(moment().subtract(1, "day"), "day");
  const isTomorrow = dateMoment.isSame(moment().add(1, "day"), "day");
  const isNextWeek = dateMoment.isSame(moment().add(7, "day"), "day");
  const isPast = dateMoment.isBefore(moment(), "day");
  const isWeekend = ["Saturday", "Sunday"].includes(dateMoment.format("dddd"));

  const getDateCustomClass = () => {
    if (isToday) return "date__today";
    if (isTomorrow) return "date__tomorrow";
    if (isPast || isYesterday) return "date__overdue";
    if (isNextWeek) return "date__next-week";
    if (isWeekend) return "date__weekend";
  };

  const getDayName = () => {
    if (isToday) return "Today";
    if (isTomorrow) return "Tomorrow";
    if (isYesterday) return "Yesterday";
    if (isWeekend) return dateMoment.format("dddd");
    return dateMoment.format("MMM DD");
  };

  return (
    <span className={`task__date ${getDateCustomClass()}`}>
      <ScheduleIcon width="14px" height="14px" />
      {getDayName()}
    </span>
  );
};

export default TaskDate;
