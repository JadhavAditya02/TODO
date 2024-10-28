import { ReactComponent as EyeOpen } from "assets/svg/eye-off.svg";
import { ReactComponent as EyeClosed } from "assets/svg/eye-on.svg";
import { FeatherIcons } from "assets/svg/feather-icons";
import { Spinner } from "components/Spinner";
import { useAuth } from "hooks";
import { useState, useCallback } from "react";
import { Link } from "react-router-dom";

export const LoginForm = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: true, message: "", show: false });
  const [authenticating, setAuthenticating] = useState(false);
  const { signinWithEmail } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const onChangeHandler = useCallback((event) => {
    const { name, value } = event.target;
    setErrors((prev) => ({ ...prev, email: true, show: false }));
    setFormState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    setAuthenticating(true);

    const { email, password } = formState;
    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(email)) {
      setErrors({ email: false, message: "You entered an invalid email", show: true });
      setAuthenticating(false);
      return;
    }

    try {
      await signinWithEmail(email, password);
    } catch (error) {
      let message = "";
      if (error.code === "auth/wrong-password") {
        message = "Wrong email or password";
      } else if (error.code === "auth/user-not-found") {
        message = "Invalid user";
      }
      setErrors({ email: false, message, show: true });
    } finally {
      setAuthenticating(false);
    }
  }, [formState, signinWithEmail]);

  return (
    <>
      <div className="error-block">
        {errors.show && (
          <div className="error-message">
            <FeatherIcons id="alert-circle" width={20} fill="#db4c3f" stroke="#fff" strokeWidth={2} />
            {errors.message}
          </div>
        )}
        {!errors.email && (
          <div className="error-message">
            <FeatherIcons id="alert-circle" width={20} fill="#db4c3f" stroke="#fff" strokeWidth={2} />
            {errors.message}
          </div>
        )}
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="email" className="label">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formState.email}
            onChange={onChangeHandler}
          />
        </div>
        <div className="field">
          <label className="label" htmlFor="password">Password</label>
          <div className="toggle_password">
            <input
              className="form_field_control"
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter password"
              value={formState.password}
              onChange={onChangeHandler}
            />
            <span
              className="toggle"
              role="button"
              tabIndex={0}
              aria-checked={showPassword}
              onClick={() => setShowPassword((prev) => !prev)}
              onKeyPress={(e) => e.key === "Enter" && setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOpen /> : <EyeClosed />}
            </span>
          </div>
        </div>
        <button type="submit" className="auth-button submit-button">
          Log in
          {authenticating && <Spinner light />}
        </button>

        <hr />

        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </>
  );
};
