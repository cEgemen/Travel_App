package com.gezerkengor.customs.anotations.Validation.Password;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
public class PasswordValidationFunc implements ConstraintValidator<PasswordValidation,String> {

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        int passwordSize = password.length();
        if(passwordSize != 6)
        {
           return false;
        }
        try {
            Integer.parseInt(password);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
        
    }
    
}
