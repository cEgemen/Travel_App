package com.gezerkengor.base.baseErrors;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CustomException extends RuntimeException {
    
     private String message = "an error occurred.";
     private int statusCode = 500;

     public CustomException(ErrorsEnum error)
     {
         super(error.getMessage());
     }

}
