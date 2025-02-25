package com.gezerkengor.services.auth;

import java.util.Map;

import com.gezerkengor.models.user.entity.LoginUser;
import com.gezerkengor.models.user.entity.RegisterUser;

public interface IAuthService {
    
         public Map<String,?> register(RegisterUser registerUser);

         public Map<String,?> login(LoginUser loginUser);

}
