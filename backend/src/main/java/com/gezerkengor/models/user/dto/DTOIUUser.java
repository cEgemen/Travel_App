package com.gezerkengor.models.user.dto;

import com.gezerkengor.customs.anotations.Validation.Password.PasswordValidation;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DTOIUUser {
      
    @NotEmpty(message = "Usename dont be empty...")
    @Size(min = 3 , max = 20,message = "Username should be 3-20 characters.")
    private String username;
    
    @Email(message =  "Email should be currect form...")
    private String email;

    @PasswordValidation(message = "Password should be digit and 6 character.")
    private String password;
     
}
