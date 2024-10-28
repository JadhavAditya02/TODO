import { ReactComponent as InboxIcon } from "assets/svg/inbox.svg";
import { ReactComponent as ScheduledIcon } from "assets/svg/scheduled.svg";
import { ReactComponent as ImportantIcon } from "assets/svg/star.svg";
import { TodayIcon } from "components/today-icon";
import { useThemeContextValue } from "context";
import { NavLink } from "react-router-dom";
import { ProjectTasksCounts } from "./project-tasks-count";
import { QuickAddTask } from "../Header/quick-add-task";

const projects = [
  {
    name: "Inbox",
    path: "/app/Inbox",
    Icon: InboxIcon,
    iconFillLight: "#246fe0",
    iconFillDark: "#5297ff",
  },
  {
    name: "Today",
    path: "/app/Today",
    Icon: TodayIcon,
    iconColorLight: "#058527",
    iconColorDark: "#25b84c",
  },
  {
    name: "Scheduled",
    path: "/app/Scheduled",
    Icon: ScheduledIcon,
    iconFillLight: "#692fc2",
    iconFillDark: "#a970ff",
  },
  {
    name: "Important",
    path: "/app/Important",
    Icon: ImportantIcon,
    iconStrokeLight: "#eb8909",
    iconStrokeDark: "#ff9a14",
  },
];

const ProjectLink = ({ name, path, Icon, iconProps }) => {
  const { isLight } = useThemeContextValue();
  return (
    <NavLink to={path} className={({ isActive }) => (isActive ? "active project-group" : "project-group")}>
      <div className="project-group__group">
        <div className="project-group__icon">
          <Icon {...iconProps(isLight)} />
        </div>
        <div className="project-group__name">{name}</div>
      </div>
      <ProjectTasksCounts isDefaultGroup name={name} />
    </NavLink>
  );
};

export const DefaultProjects = () => {
  return (
    <div className="project-group__wrapper">
      <QuickAddTask />
      {projects.map(({ name, path, Icon, iconFillLight, iconFillDark, iconColorLight, iconColorDark, iconStrokeLight, iconStrokeDark }) => (
        <ProjectLink
          key={name}
          name={name}
          path={path}
          Icon={Icon}
          iconProps={isLight => ({
            fill: iconFillLight && isLight ? iconFillLight : iconFillDark,
            color: iconColorLight && isLight ? iconColorLight : iconColorDark,
            stroke: iconStrokeLight && isLight ? iconStrokeLight : iconStrokeDark,
          })}
        />
      ))}
    </div>
  );
};
