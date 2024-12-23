package com.gezerkengor.service.auth;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
    
    private final JWTService jwtService;
    private final UserRepository userRepo;
    private final AuthenticationManager authManager;

    @Override
    public String register(DtoRegisterModel registerModel) throws Exception {
          User user = new User();
          Optional<User> optionalRes = userRepo.findByEmail(registerModel.getEmail());
          if(!optionalRes.isPresent())
          {
             BeanUtils.copyProperties(registerModel,user);
             user.setPassword(new BCryptPasswordEncoder().encode(registerModel.getPassword()));;
             userRepo.save(user);
             return "Register is succes";
          }
          throw new Exception();
    }

    @Override
    public Map<String, ?> login(DtoLoginModel loginModel) throws Exception {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(loginModel.getEmail(),loginModel.getPassword());
        Authentication authentication = authManager.authenticate(authToken);
        System.out.println("service auth -> login func -> authentication.isAuthenticated() : "+authentication.isAuthenticated());
        if(authentication.isAuthenticated())
         {
             System.out.println("service auth -> login func -> loginModel.getEmail() : "+loginModel.getEmail());
             String token = jwtService.generateToke(loginModel.getEmail());
             System.out.println("service auth -> login func -> token : "+token);
             User authUser =  (User) authentication.getPrincipal();
             return Map.of("token",token , "id",authUser.getId(),"email",authUser.getUsername(),"userName",authUser.getUserName(),"message","Login is succes");
         }
         throw new Exception();
    }
    
    

}
