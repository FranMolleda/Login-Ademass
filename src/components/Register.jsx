import { useState, useEffect } from "react";
import { validate } from "../utils/emailUtils";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/main.css";

const Register = ({ setUsers, users }) => {
  const [newUser, setNewUser] = useState({
    id: "",
    name: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [idNewUser, setIdNewUser] = useState(0);
  const [equalPassword, setEqualPassword] = useState("");
  const [errorEqualPassword, setErroEqualPassword] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [confirmRegister, setConfirmRegister] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getIdUser = () => {
      const numberId = users?.length + 1;
      setIdNewUser(numberId);
    };
    getIdUser();
  }, [users]);

  const { name, lastname, email, password } = newUser;

  const handleChange = (e) => {
    if (e.target.name === "password_repeat") {
      setEqualPassword(e.target.value);
    } else {
      setNewUser({
        ...newUser,
        [e.target.name]: e.target.value,
        id: idNewUser,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate.emptyFields(name, lastname, email, password, equalPassword)) {
      setErrorAlert("Los campos no pueden estar vacíos");
      return;
    }

    if (!validate.emailPattern(email)) {
      setErrorAlert("El formato del email no es válido");
      return;
    }

    if (password !== equalPassword) {
      setErroEqualPassword("Las contraseñas deben ser iguales");
      return;
    } else {
      setErroEqualPassword("");
    }

    const user = users.find((user) => user.email === email);

    if (user) {
      setErrorAlert("Usuario ya registrado");
      return;
    }

    setUsers([...users, newUser]);
    setErrorAlert("");
    setEqualPassword("");
    setNewUser({
      id: "",
      name: "",
      lastname: "",
      email: "",
      password: "",
    });

    setConfirmRegister("Registro realizado con éxito");
    setTimeout(() => {
      setConfirmRegister("");
      navigate("/");
    }, 2000);
  };

  return (
    <div className="container">
      <div className="card">
        <img src="user_white.svg" alt="User icon" className="user-icon" />
        <h1 className="text-color">Registro</h1>
        {confirmRegister && <div className="confirm">{confirmRegister}</div>}
        <form onSubmit={handleSubmit} noValidate className="form-container">
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              name="name"
              value={name}
              id="name"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Apellidos</label>
            <input
              type="text"
              name="lastname"
              value={lastname}
              id="lastname"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              id="email"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                id="password"
                onChange={(e) => handleChange(e)}
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
          <div className="form-group">
            <label htmlFor="password_repeat">Repetir contraseña</label>
            <div className="password-input-container">
              <input
                type={showPasswordRepeat ? "text" : "password"}
                name="password_repeat"
                value={equalPassword}
                id="password_repeat"
                onChange={(e) => handleChange(e)}
                className="input-password"
              />
              <button
                type="button"
                onClick={() => setShowPasswordRepeat(!showPasswordRepeat)}
                className="password-toggle-button"
              >
                <img
                  src={showPasswordRepeat ? "/eye-off.svg" : "/eye-show.svg"}
                  alt="show password button"
                />
              </button>
            </div>
          </div>
          {errorEqualPassword && (
            <div className="alert">{errorEqualPassword}</div>
          )}
          {errorAlert && <div className="alert">{errorAlert}</div>}
          <input type="submit" value="Regístrarme" className="button-lr" />
        </form>
        <div className="login-link">
          <Link to="/">¿Ya estás registrado?</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
