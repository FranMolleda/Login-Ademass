export const validate = {

    emailPattern:  function email(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    },
    
    emptyFields: function fields(...fields) {
    for(let field of fields){
        if(field.trim() === "")
        return false
    }
    return true
    },
}

