import { Avatar } from "./avatar";
import { HamburgerButton } from "./hamburger";
import { HomeButton } from "./home";
import "./light.scss";
import "./main.scss";
export const Header = (props) => {
  return (
    <div className="header">
      <div className="header__left">
        <HamburgerButton onClick={props.onClick} />
        <HomeButton />
      </div>
      <div className="header__right">
        <Avatar />
      </div>
    </div>
  );
};
