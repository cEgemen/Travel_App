package com.gezerkengor.controller.auth;

import org.springframework.http.ResponseEntity;

import com.gezerkengor.model.dtoModel.dtoUser.DtoLoginModel;
import com.gezerkengor.model.dtoModel.dtoUser.DtoRegisterModel;

public interface IAuthController {
     
    public ResponseEntity<?> login(DtoLoginModel dtoLoginUser)  throws Exception ;

    public ResponseEntity<?> register(DtoRegisterModel DTORegisterUser)  throws Exception ;

}
