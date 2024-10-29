import illustration from "assets/svg/landing-illustration.svg";
import { ReactComponent as LogoMobile } from "assets/svg/logo-mobile.svg";
import { ReactComponent as Logo } from "assets/svg/logo.svg";
import { Link } from "react-router-dom";
import "./main.scss";

export const LandingPage = () => {
  return (
    <main className="landing-page">
      <header className="intro__header">
        <nav className="intro__nav">
          <div className="intro__nav--group">
            <div className="nav-logo">
              <Logo className="logo__desktop" />
              <LogoMobile className="logo__mobile" />
            </div>
          </div>
          <div className="intro__nav--group">
            <div className="intro__nav--group__wrapper">
              <Link className="intro__nav--item intro__nav--link" to="/signin">
                Log in
              </Link>
              <Link className="intro__nav--item intro__nav--link" to="/signup">
                Sign up
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <div className="container">
        <div className="home-view">
          <div className="column11">
            <div className="column2">
              <h1 className="title">
                Organize your <br /> work &amp; life, finally
              </h1>
              <ul className="tech-list">
                <li className="list-group-item"><span className="badge">React</span></li>
                <li className="list-group-item"><span className="badge">Node</span></li>
                <li className="list-group-item"><span className="badge">Express</span></li>
                <li className="list-group-item"><span className="badge">Firebase</span></li>
              </ul>
              <p className="feature">
                <ul className="feature-list">
                  <li><strong>Secure authentication :</strong> Uses google from firebase.</li>
                  <li><strong>Robust error handling :</strong> Handles HTTP errors effectively.</li>
                  <li><strong>Data Management :</strong> Supports Create, Read, Update, Delete.</li>
                  <li><strong>Clean interface :</strong> Provides a user-friendly experience.</li>
                  <li><strong>Protected routes :</strong> Ensures secure access control.</li>
                  <li><strong>Hosting :</strong> Hosted on Vercel.</li>
                </ul>
              </p>
              {/* <Link className="btn" to="/signin">Try Notes, it's FREE!</Link> */}
            </div>
            <div className="notes-img">
              <img src={illustration} alt="Landing Illustration" className="landing-illustration" />
            </div>
          </div>
        </div>
      </div>

      <div className="footer-section">
      <footer>
        <p className="left">© 2023 todoist</p>
        <ul className="nav">
          <li className="nav-item">
            <a href="" className="right">
              Designed &amp; Developed by Aditya Jadhav
            </a>
          </li>
        </ul>
      </footer>
    </div>
    
    </main>
  );
};
