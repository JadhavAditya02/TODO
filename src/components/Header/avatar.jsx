import { useOverlayContextValue } from "context/overlay-context";
import { useAuth } from "hooks";
import { useState } from "react";

export const Avatar = () => {
  const { currentUser } = useAuth();
  const userDisplayName = currentUser?.displayName?.replace(" ", "+");

  const {  setShowDialog, setDialogProps } = useOverlayContextValue();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const userOptionsTrigger = (event, elementPosition) => {
    event.stopPropagation();
    const shouldShowDialog = !isDialogOpen;

    setIsDialogOpen(shouldShowDialog);
    setShowDialog(shouldShowDialog ? "USER_OPTIONS" : null);

    if (shouldShowDialog) {
      setDialogProps({ elementPosition });
    }
  };

  return (
    <div
      className="avatar"
      onClick={(event) => userOptionsTrigger(event, event.currentTarget.getBoundingClientRect())}
    >
      {currentUser && (
        <img
          className="avatar__img"
          src={`https://ui-avatars.com/api/?name=${userDisplayName}&rounded=true&size=24&background=ffffff`}
          alt="displayName"
        />
      )}
    </div>
  );
};
