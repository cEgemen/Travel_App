package com.gezerkengor.service.auth;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.gezerkengor.model.dtoModel.dtoUser.DtoLoginModel;
import com.gezerkengor.model.dtoModel.dtoUser.DtoRegisterModel;
import com.gezerkengor.model.entityModel.User;
import com.gezerkengor.repositor.UserRepository;
import com.gezerkengor.service.security.JWTService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService {
    
    private JWTService jwtService;
    private final UserRepository userRepo;
    private AuthenticationManager authManager;

    @Override
    public String register(DtoRegisterModel registerModel) throws Exception {
          User user = new User();
          Optional<User> optionalRes = userRepo.findByEmail(registerModel.getEmail());
          if(!optionalRes.isPresent())
          {
             BeanUtils.copyProperties(optionalRes.get(),user);
             userRepo.save(user);
             return "Register is succes";
          }
          throw new Exception();
    }

    @Override
    public Map<String, ?> login(DtoLoginModel loginModel) throws Exception {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(loginModel.getEmail(),loginModel.getPassword());
        Authentication authentication = authManager.authenticate(authToken);
        if(authToken.isAuthenticated())
         {
             String token = jwtService.generateToke(loginModel.getEmail());
             User authUser =  (User) authentication.getPrincipal();
             return Map.of("token",token , "id",authUser.getId(),"email",authUser.getUsername(),"userName",authUser.getUserName(),"message","Login is succes");
         }
         throw new Exception();
    }
    
    

}
