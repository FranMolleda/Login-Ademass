import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ setUsers, users }) => {
  const [newUser, setNewUser] = useState({
    id: "",
    name: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [idNewUser, setIdNewUser] = useState(0);
  const [equalPassword, setEqualPassword] = useState("")
  const [errorEqualPassword, setErroEqualPassword] = useState("")
  const [errorAlert, setErrorAlert] = useState("");
  const [confirmRegister, setConfirmRegister] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
   const getIdUser = () => {
    const numberId = users?.length + 1;
    setIdNewUser(numberId)
   }
   getIdUser()
  }, [users]);
  

  const {  name, lastname, email, password } = newUser;

  const handleChange = (e) => {
    if(e.target.name === "password_repeat"){
        setEqualPassword(e.target.value)
    }else{
        setNewUser({ ...newUser, [e.target.name]: e.target.value, id:idNewUser });
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault()

    if(name === "" || lastname === "" || email === "" || password === ""){
        return setErrorAlert("Los campos no pueden estar vacíos");
    }

    if(password !== equalPassword){
        return setErroEqualPassword("Las contraseñas deben ser iguales");
    }

    const user = users.find(user => user.email === email);

    if(user){
       return setErrorAlert("Usuario ya registrado")
    }
     /* validateEmail(userEmail,setErrorAlert ) */
     const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
     if (!emailPattern.test(email)) {
      return setErrorAlert("El formato del email no es correcto");
     }
   
    setUsers([...users, newUser])
    setErrorAlert("")
    setEqualPassword("")
    setNewUser({
        id: "",
        name: "",
        lastname: "",
        email: "",
        password: "",
      })


      setConfirmRegister("Registro realizado con éxito")
      setTimeout(() => {
        setConfirmRegister("")
        navigate("/login")
      }, 2000);
  };

  return (
    <div className="container">
      <img src="user_white.svg" alt="User icon" />
      {errorAlert &&  <div className="alert">{errorAlert}</div>}
      {confirmRegister &&  <div className="confirm">{confirmRegister}</div>}
      <h1>Register</h1>
      <form onSubmit={handleSubmit} noValidate>
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
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            id="password"
            onChange={(e) => handleChange(e)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            >
            <img src={showPassword ? "/eye-off.svg" : "/eye-show.svg"} alt="show password button" />
            </button>
        </div>
        <div className="form-group">
          <label htmlFor="password_repeat">Repetir contraseña</label>
          <input
            type={showPasswordRepeat ? "text" : "password"}
            name="password_repeat"
            value={equalPassword}
            id="password_repeat"
            onChange={(e) => handleChange(e)}
            />
            <button
            type="button"
            onClick={() => setShowPasswordRepeat(!showPasswordRepeat)}
            >
            <img src={showPasswordRepeat ? "/eye-off.svg" : "/eye-show.svg"} alt="show password button" />
            </button>
        </div>
        {errorEqualPassword && <div className="confirm">{errorEqualPassword}</div>}
        <input type="submit" value="Registrarme" />
      </form>
    </div>
  );
};

export default Register;
