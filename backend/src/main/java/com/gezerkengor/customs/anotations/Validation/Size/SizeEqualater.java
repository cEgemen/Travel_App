package com.gezerkengor.customs.anotations.Validation.Size;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Target({ElementType.FIELD,ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy =  SizeEqualaterFunc.class)
public @interface SizeEqualater {
    String message() default "Size dont matched..";
    int size();
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
