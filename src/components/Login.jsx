import {useState } from "react"
import {Link} from "react-router-dom"


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
           return setErrorAlert("Los campos no pueden estar vacíos");
        }  
        if (!emailPattern.test(userEmail)) {
           return setErrorAlert("El formato del email no es correcto");
        } 
        const user = users.find(user => user.email === userEmail && user.password === userPassword);
        
        if (user) {
            setCurrentUser(user);
            setErrorAlert("")
            setUserEmail("");
            setUserPassword("")
        } else {
            setCurrentUser(null)
            setErrorAlert("No hay ningún usuario registrado con esos datos");
        }
        
    };

    return ( 
        <div className="container">
            <img src="user_white.svg" alt="User icon" />
            <img src={currentUser ? "padlock_open.svg"  :  "padlock_close.svg"} alt="padlock icon" />
            {errorAlert ? <div className="alert">{errorAlert}</div> : <div className="alert"></div> }
            <h1>login</h1>
                <p>¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
            <form onSubmit={handleSubmit} noValidate>
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
                    <input 
                    type="password"
                    name="userPassword"
                    value={userPassword}
                    id="userPassword"
                    onChange={(e) => handleChangePassword(e)}
                    />
                </div>
                <input type="submit" value="Acceder"/>
            </form>
                <Link to="/recovery_password">¿He olvidado mi contraseña?</Link>
        </div>
     );
}
 
export default Login;