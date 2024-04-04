import { useState} from "react"
import { useNavigate } from "react-router-dom";


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
           return setErrorAlert("El formato del email no es correcto");
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
        <div>
        <p>Ingrese su correo electrónico para restablecer su contraseña</p>
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
                <input type="submit" value="Recuperar contraseña"/>
            </form>
            {errorAlert && <div className="alert">{errorAlert}</div> }
            {confirmAlert && <div className="alert">{confirmAlert}</div> }
        </div>
     );
}
 
export default RecoveryPassword;