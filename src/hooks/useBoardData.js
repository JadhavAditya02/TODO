import { useTasks } from "hooks";
import { useEffect, useState, useMemo } from "react";

export const useBoardData = (selectedProject) => {
  const { tasks } = useTasks(selectedProject.selectedProjectId ?? selectedProject.selectedProjectName);
  const [boardData, setBoardData] = useState();

  const columns = useMemo(
    () => ({
      TODO: { id: "TODO", title: "To do", hex: "#b8255f" },
      INPROGRESS: { id: "INPROGRESS", title: "In Progress", hex: "#ff9933" },
      COMPLETE: { id: "COMPLETE", title: "Complete", hex: "#299438" },
    }),
    []
  );

  useEffect(() => {
    const data = {
      tasks,
      columns: {
        TODO: { ...columns.TODO, columnTasks: tasks.filter((task) => task.boardStatus === "TODO") },
        INPROGRESS: { ...columns.INPROGRESS, columnTasks: tasks.filter((task) => task.boardStatus === "INPROGRESS") },
        COMPLETE: { ...columns.COMPLETE, columnTasks: tasks.filter((task) => task.boardStatus === "COMPLETE") },
      },
      columnOrder: ["TODO", "INPROGRESS", "COMPLETE"],
    };

    setBoardData(data);
  }, [tasks, columns]);

  return boardData;
};
