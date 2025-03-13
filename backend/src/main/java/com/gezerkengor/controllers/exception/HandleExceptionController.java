package com.gezerkengor.controllers.exception;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.gezerkengor.base.baseController.BaseController;
import com.gezerkengor.base.baseErrors.CustomException;

@ControllerAdvice
public class HandleExceptionController extends BaseController<Map<String,?>>  {

     @ExceptionHandler(exception = Exception.class)
     public ResponseEntity<?> handlePublicException(Exception exception){
           String message = exception.getMessage();
           int statusCode = 500;
           if(message == null || (message == "" || message == " "))
           {
             message = "An Error Occurrent!!!";
           }
           Map<String,?> response = Map.of("message",message,"statusCode",statusCode,"errors",List.of());
           return badResponse(response);
     }    
     
     @ExceptionHandler(exception = CustomException.class )
     public ResponseEntity<?> handleCustomException(CustomException exception){
          Map<String , ? > response = Map.of("message",exception.getMessage(),"statusCode",exception.getStatusCode(),"errors",List.of());
          return badResponse(response);
     }

     @ExceptionHandler(exception=MethodArgumentNotValidException.class)
     public ResponseEntity<?> handleValidationException(MethodArgumentNotValidException exception)
     {
          
         return badResponse(Map.of("message","Validation errors !!!","statusCode",400,"errors",List.of()));
     }

}
