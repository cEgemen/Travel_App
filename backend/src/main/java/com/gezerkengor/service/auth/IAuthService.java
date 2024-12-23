package com.gezerkengor.service.auth;

import java.util.Map;

import com.gezerkengor.model.dtoModel.dtoUser.DtoLoginModel;
import com.gezerkengor.model.dtoModel.dtoUser.DtoRegisterModel;

public interface IAuthService {
    
         public String register(DtoRegisterModel registerModel) throws Exception;

         public Map<String , ?> login(DtoLoginModel loginModel) throws Exception;

}
