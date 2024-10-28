import GoogleLogo from "assets/svg/google.svg";
import { useLocation } from "react-router-dom";
import { useAuth } from "hooks";

export const LoginSignupForm = () => {
  const { pathname } = useLocation();
  const title = pathname === "/signin" ? "Log in" : "Sign up";
  const { signinGoogle } = useAuth();

  return (
    <div className="auth-form">
      <h1>{title}</h1>

      <button 
        className="google-auth auth-button" 
        onClick={signinGoogle}
        role="button"
        aria-label={`Continue with Google for ${title}`}
      >
        <img src={GoogleLogo} alt="Google logo" />
        <span>Continue with Google</span>
      </button>
    </div>
  );
};
