package com.gezerkengor.controller.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gezerkengor.base.baseController.BaseController;
import com.gezerkengor.model.dtoModel.dtoUser.DtoLoginModel;
import com.gezerkengor.model.dtoModel.dtoUser.DtoRegisterModel;

@RestController
@RequestMapping("/auth")
public class AuthController extends BaseController implements IAuthController {

    @PostMapping("/login")
    @Override
    public ResponseEntity<?> login(@RequestBody DtoLoginModel dtoLoginUser) {
        
        throw new UnsupportedOperationException("Unimplemented method 'login'");
    }

    @PostMapping("/register")
    @Override
    public ResponseEntity<?> register(@RequestBody DtoRegisterModel DTORegisterUser) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'register'");
    }

   
    
}
