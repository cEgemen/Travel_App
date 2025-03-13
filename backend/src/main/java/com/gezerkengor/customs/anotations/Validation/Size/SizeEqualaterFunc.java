package com.gezerkengor.customs.anotations.Validation.Size;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class SizeEqualaterFunc implements ConstraintValidator<SizeEqualater,String> {
    int size;

    @Override
    public void initialize(SizeEqualater constraintAnnotation) {
        size = constraintAnnotation.size();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
          if(value.length() == size)
          {
             return true;
          }
             return false;
    }
    
}
