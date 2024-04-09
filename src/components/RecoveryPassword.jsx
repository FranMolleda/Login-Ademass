import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validate } from "../utils/validationUtils";
import { Link } from "react-router-dom";
import("../styles/main.css");
import("./RecoveryPassword.css");

const RecoveryPassword = () => {
  const [userEmail, setUserEmail] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [confirmAlert, setConfirmAlert] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate.emailPattern(userEmail)) {
      setErrorAlert("El formato del email no es correcto");
      setTimeout(() => {
        setErrorAlert("");
      }, 2000);
      return;
    }

    setUserEmail("");
    setErrorAlert("");
    setConfirmAlert("Email enviado correctamente");
    setTimeout(() => {
      setConfirmAlert("");
      navigate("/");
    }, 2000);
  };

  return (
    <div className="container">
      <div className="card small">
        <p className="text-recovery">
          Recupera tu contraseña introduciendo tu dirección de correo
          electrónico
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
              className="input-email"
            />
          </div>
          {errorAlert && <div className="alert">{errorAlert}</div>}
          {confirmAlert && <div className="confirm">{confirmAlert}</div>}
          <input
            type="submit"
            value="Recuperar contraseña"
            className="button-lr"
          />
        </form>
        <div className="login-link">
          <Link to="/">Volver</Link>
        </div>
      </div>
    </div>
  );
};

export default RecoveryPassword;
