package com.gezerkengor.controllers.auth;
import org.springframework.http.ResponseEntity;

import com.gezerkengor.models.user.entity.LoginUser;
import com.gezerkengor.models.user.entity.RegisterUser;

public interface IAuthController {
     
    public ResponseEntity<?> login(LoginUser loginUser);

    public ResponseEntity<?> register(RegisterUser registerUser) ;

}
