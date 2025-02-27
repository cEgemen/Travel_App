const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const usernameRegex = /^[a-zA-Z0-9._-]{3,20}$/
const passwordRegex=/^\d{6}$/

export const userNameValid = (username) => { 
     
     const result = usernameRegex.test(username);
     if(username.length < 3 || username.length > 20)
     {
          return {message:"The user name must be between 3 and 20 characters.",isValidated:false}
     }
     else
     {
         if(result)
         {
            return {message:"UserName is correct form.",isValidated:true}
         }
         else
         {
            return {message:"The user may only include letters, numbers, '.', '_', '-'.",isValidated:false}
         }
     }
}

export const emailValid = (email) => {
       const result = emailRegex.test(email)
       if(result)
       {
        return {message : "Email is correct form.",isValidated:result}
       }
       else
       {
         return {message : "Please enter a correct e-mail address.",isValidated:result}
       }
}

export const passwordValid = (password) => {
      const result = passwordRegex.test(password)
      if(result)
      {
        return {message:"Password is correct form.",isValidated:result}
      }
      else
      {
        return {message:"The password is 6 digit and should consist of only numbers.",isValidated:result}
      }
}