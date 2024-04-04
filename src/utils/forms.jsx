export const validateEmail = async(email, setErrorAlert) => {
    try {
        
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
         await setErrorAlert("El formato del email no es correcto");
         
        }
        await setErrorAlert("");
    } catch (error) {
       console.log(error) 
    }
  };
  