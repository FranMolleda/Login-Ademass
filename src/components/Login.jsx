import {useState } from "react"
import {Link} from "react-router-dom"
import "./Login.css"


const Login = ({users}) => {

    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [errorAlert, setErrorAlert] = useState("")
    const [currentUser, setCurrentUser] = useState(null)
    const [showPassword, setShowPassword] = useState(false);

    

    const handleChangeEmail = (e) => {
        setUserEmail(e.target.value) 
    }
    const handleChangePassword = (e) => {
        setUserPassword(e.target.value) 
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        /* una cadena que contiene una o más letras, números, puntos, guiones, guiones bajos, porcentajes, más y signos de porcentaje, seguido de un símbolo @, seguido de una o más letras, números, puntos o guiones, seguido de un punto y dos o más letras.z */
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;    
      
        if (userEmail === "" || userPassword === "") {
           setErrorAlert("Los campos no pueden estar vacíos");
           return;
        }  
        if (!emailPattern.test(userEmail)) {
            setErrorAlert("El formato del email no es correcto");
            return;
        } 
        const user = users.find(user => user.email === userEmail && user.password === userPassword);
        
        if (user) {
            setCurrentUser(user);
            setErrorAlert("")
            setUserEmail("");
            setUserPassword("")
        } else {
            setCurrentUser(null)
            setErrorAlert("Correo electrónico o contraseña incorrectos");
        }
        
    };

    return ( 
        <div className="container card">
            <img src="user_white.svg" alt="User icon" className="user-icon"/>
            <img src={currentUser ? "padlock_open.svg"  :  "padlock_close.svg"} alt="padlock icon" className="padlock-icon"/>
            {errorAlert && <div className="alert">{errorAlert}</div>  }
            <h1 className="text-color">login</h1>
                <p className="text-color">¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
            <form onSubmit={handleSubmit} noValidate className="form-login">
                <div className="form-group">
                    <label htmlFor="userEmail">Email</label>
                    <input 
                    type="email"
                    name="userEmail"
                    value={userEmail}
                    id="userEmail"
                    onChange={(e)=>handleChangeEmail(e)}
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
                    onChange={(e) => handleChangePassword(e)}
                    className="input-password"
                    />
                    <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle-button"
                    >
                    <img src={showPassword ? "/eye-off.svg" : "/eye-show.svg"} alt="show password button" />
                    </button>
                    </div>
                </div>
                <input type="submit" value="Acceder" className="boton-login"/>
            </form>
                <Link to="/recovery_password">¿He olvidado mi contraseña?</Link>
        </div>
     );
}
 
export default Login;