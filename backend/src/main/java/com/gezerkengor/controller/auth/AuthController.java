package com.gezerkengor.controller.auth;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gezerkengor.base.baseController.BaseController;
import com.gezerkengor.base.baseResponse.BaseResponse;
import com.gezerkengor.model.dtoModel.dtoUser.DtoLoginModel;
import com.gezerkengor.model.dtoModel.dtoUser.DtoRegisterModel;
import com.gezerkengor.service.auth.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController extends BaseController implements IAuthController {

    private final AuthService authService;

    @PostMapping("/login")
    @Override
    public ResponseEntity<?> login(@RequestBody DtoLoginModel dtoLoginUser) throws Exception {
         Map<String,?> serviceData = authService.login(dtoLoginUser); 
         BaseResponse<?> okResponse = this.okResponse(serviceData);
         return ResponseEntity.ok().body(okResponse);
    }

    @PostMapping("/register")
    @Override
    public ResponseEntity<?> register(@RequestBody DtoRegisterModel dtoRegisterUser)  throws Exception{
        String serviceData = authService.register(dtoRegisterUser); 
        BaseResponse<?> okResponse = this.okResponse(serviceData);
        return ResponseEntity.ok().body(okResponse);
    }

   
    
}
