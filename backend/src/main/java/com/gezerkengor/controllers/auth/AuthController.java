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
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController extends BaseController<Map<String,?>> implements IAuthController {

    private final AuthService authService;

    @PostMapping("/login")
    @Override
    public ResponseEntity<?> login(@RequestBody LoginUser loginUser) {
        Map<String,?> serviceData = authService.login(loginUser); 
        return  this.okResponse(serviceData);
    }

    @PostMapping("/register")
    @Override
    public ResponseEntity<?> register(@RequestBody RegisterUser registerUser){
        Map<String,?> serviceData = authService.register(registerUser); 
        return  this.okResponse(serviceData);
    }

   
    
}
