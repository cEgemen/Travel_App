package com.gezerkengor.controllers.auth;

import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gezerkengor.base.baseController.BaseController;
import com.gezerkengor.models.user.entity.LoginUser;
import com.gezerkengor.models.user.entity.RegisterUser;
import com.gezerkengor.services.auth.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController extends BaseController<Map<String,?>> implements IAuthController {

    private final AuthService authService;

    @PostMapping("/login")
    @Override
    public ResponseEntity<?> login(@Valid @RequestBody LoginUser loginUser) {
        log.info("loginUser : "+loginUser);
        Map<String,?> serviceData = authService.login(loginUser); 
        log.info("log service result : "+serviceData);
        return  this.okResponse(serviceData);
    }

    @PostMapping("/register")
    @Override
    public ResponseEntity<?> register(@Valid @RequestBody RegisterUser registerUser){
        log.info("registerUser : "+registerUser);
        Map<String,?> serviceData = authService.register(registerUser); 
        return  this.okResponse(serviceData);
    }

   
    
}
