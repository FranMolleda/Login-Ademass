export const validate = {

    emptyFields: function fields(...fields) {
    for(let field of fields){
        if(field.trim() === "")
        return false
    }
    return true
    },

    emailPattern:  function email(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    },

    passwordPattern: function password(password) {
        const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d\W]).{8,}$/;
        return passwordPattern.test(password)
    }
    
}

