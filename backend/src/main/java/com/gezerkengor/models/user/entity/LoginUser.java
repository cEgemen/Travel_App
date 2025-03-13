package com.gezerkengor.models.user.entity;

import com.gezerkengor.customs.anotations.Validation.Password.PasswordValidation;

import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginUser {
     
      @Email(message = "Email is not correct form...")
      private String email;

      @PasswordValidation(message = "Password should be digit and 6 character.")
      private String password;

}
