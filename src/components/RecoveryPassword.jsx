import { useState} from "react"
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom"
import ("../styles/main.css")
import ("./RecoveryPassword.css")


const RecoveryPassword = () => {
    const [userEmail, setUserEmail] = useState("")
    const [errorAlert, setErrorAlert] = useState("")
    const [confirmAlert, setConfirmAlert] = useState("")
    const navigate = useNavigate();
    

    const handleChangeEmail = (e) => {
        setUserEmail(e.target.value) 
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        /* una cadena que contiene una o más letras, números, puntos, guiones, guiones bajos, porcentajes, más y signos de porcentaje, seguido de un símbolo @, seguido de una o más letras, números, puntos o guiones, seguido de un punto y dos o más letras.z */
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;    
      
        /* if (userEmail === "") {
           return setErrorAlert("Los campos no pueden estar vacíos");
        }  */ 
        if (!emailPattern.test(userEmail)) {
            setErrorAlert("El formato del email no es correcto");
           setTimeout(() => {
            setErrorAlert("")
        }, 2000);
        return
        } 
        
        
        setUserEmail("");
        setErrorAlert("")
        setConfirmAlert("Email enviado correctamente")
        setTimeout(() => {
            setConfirmAlert("")
            navigate("/login")
        }, 2000);
    };
    return ( 
        <div className="container">
        <div className="card small">
        <p className="text-recovery">Recupera tu contraseña introduciendo tu dirección de correo electrónico</p>
        <form onSubmit={handleSubmit} noValidate className="form-login">
                <div className="form-group">
                    <label htmlFor="userEmail">Email</label>
                    <input 
                    type="email"
                    name="userEmail"
                    value={userEmail}
                    id="userEmail"
                    onChange={(e)=>handleChangeEmail(e)}
                    className="input-email"
                    />
                </div>
                {errorAlert && <div className="alert">{errorAlert}</div> }
                {confirmAlert && <div className="confirm">{confirmAlert}</div> }
                <input type="submit" value="Recuperar contraseña" className="button-lr"/>
            </form>
            <div className="login-link">
      <Link  to="/login">¡Ya me acuerdo!</Link>
        </div>
        </div>
        </div>
     );
}
 
export default RecoveryPassword;