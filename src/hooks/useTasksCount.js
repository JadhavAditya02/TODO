// useTasksCount.js
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useAuth } from "hooks";
import moment from "moment";
import { useEffect, useState } from "react";
import { db } from "_firebase";

export const useTasksCount = (isDefaultGroup, projectId, name) => {
  const { currentUser } = useAuth();
  const [taskCount, setTaskCount] = useState(0); // Set initial count to 0

  useEffect(() => {
    // Exit if no user is logged in
    if (!currentUser) return;

    // Initialize the query for the tasks collection of the current user
    let q = query(collection(db, "user", `${currentUser.id}/tasks`));

    // Apply filters based on whether it’s a default group or a specific project
    if (!isDefaultGroup) {
      q = query(
        collection(db, "user", `${currentUser.id}/tasks`),
        where("projectId", "==", projectId),
        where("completed", "==", false)
      );
    } else if (isDefaultGroup && name === "Today") {
      q = query(
        collection(db, "user", `${currentUser.id}/tasks`),
        where("date", "==", moment().format("DD-MM-YYYY")),
        where("completed", "==", false)
      );
    } else if (isDefaultGroup && name === "Inbox") {
      q = query(
        collection(db, "user", `${currentUser.id}/tasks`),
        where("projectId", "==", ""),
        where("completed", "==", false)
      );
    } else if (isDefaultGroup && name === "Important") {
      q = query(
        collection(db, "user", `${currentUser.id}/tasks`),
        where("important", "==", true),
        where("completed", "==", false)
      );
    } else if (isDefaultGroup && name === "Scheduled") {
      q = query(
        collection(db, "user", `${currentUser.id}/tasks`),
        where("date", "!=", ""),
        where("completed", "==", false)
      );
    }

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setTaskCount(querySnapshot.docs.length); // Update task count
    });

    // Clean up the subscription on component unmount
    return unsubscribe;
  }, [isDefaultGroup, projectId, name, currentUser]); // Add necessary dependencies

  return taskCount; // Return the current task count
};
