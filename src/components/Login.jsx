import { useState } from "react";
import { validate } from "../utils/validationUtils";
import { Link } from "react-router-dom";
import "./Login.css";
import "../styles/main.css";

const Login = ({ users }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate.emptyFields(userEmail, userPassword)) {
      setErrorAlert("Los campos no pueden estar vacíos");
      return;
    }

    if (!validate.emailPattern(userEmail)) {
      setErrorAlert("El formato del email no es válido");
      return;
    }
    const user = users.find(
      (user) => user.email === userEmail && user.password === userPassword
    );

    if (user) {
      setCurrentUser(user);
      setErrorAlert("");
      setUserEmail("");
      setUserPassword("");
    } else {
      setCurrentUser(null);
      setErrorAlert("Correo electrónico o contraseña incorrectos");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <img src="user_white.svg" alt="User icon" className="user-icon" />
        <img
          src={currentUser ? "padlock_open.svg" : "padlock_close.svg"}
          alt="padlock icon"
          className="padlock-icon"
        />
        {errorAlert && <div className="alert">{errorAlert}</div>}
        <h1 className="text-color">Login</h1>
        <p className="text-color">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
        <form onSubmit={handleSubmit} noValidate className="form-container">
          <div className="form-group">
            <label htmlFor="userEmail">Email</label>
            <input
              type="email"
              name="userEmail"
              value={userEmail}
              id="userEmail"
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="userPassword">Contraseña</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                name="userPassword"
                value={userPassword}
                id="userPassword"
                onChange={(e) => setUserPassword(e.target.value)}
                className="input-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle-button"
              >
                <img
                  src={showPassword ? "/eye-off.svg" : "/eye-show.svg"}
                  alt="show password button"
                />
              </button>
            </div>
          </div>
          <Link to="/recovery_password">¿He olvidado mi contraseña?</Link>
          <input type="submit" value="Acceder" className="button-lr" />
        </form>
      </div>
    </div>
  );
};

export default Login;
