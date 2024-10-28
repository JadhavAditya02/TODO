import { useTasksCount } from "hooks";
import { useParams } from "react-router-dom";

export const ProjectTasksCounts = ({ projectId, name, isDefaultGroup }) => {
  const count = useTasksCount(isDefaultGroup, projectId, name);

  return (
    <div className={`task-count ${name === "Today" ? "task-count__red" : ""}`}>
      {count > 0 && count} 
    </div>
  );
};
