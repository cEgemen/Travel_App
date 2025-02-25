package com.gezerkengor.services.auth;

import java.util.Map;
import java.util.Optional;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.gezerkengor.base.baseErrors.CustomException;
import com.gezerkengor.base.baseErrors.ErrorsEnum;
import com.gezerkengor.models.user.entity.LoginUser;
import com.gezerkengor.models.user.entity.RegisterUser;
import com.gezerkengor.models.user.entity.User;
import com.gezerkengor.models.user.entity.UserPrincipal;
import com.gezerkengor.repositories.UserRepository;
import com.gezerkengor.services.security.JWTService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService {
    
    private final JWTService jwtService;
    private final UserRepository userRepo;
    private final AuthenticationManager authManager;

    @Override
    public Map<String,?> register(RegisterUser registerUser){
          Optional<User> retUser = userRepo.findByEmail(registerUser.getEmail());
          if(retUser.isPresent())
          {
            throw new CustomException();
          }
           User user = retUser.get();
                user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
           userRepo.save(user);
           return Map.of("message","Register is success.");
    }

    @Override
    public Map<String, ?> login(LoginUser loginUser) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(loginUser.getEmail(),loginUser.getPassword());
        Authentication authentication = authManager.authenticate(authToken);
        if(authentication.isAuthenticated())
         {
             String token = jwtService.generateToke(loginUser.getEmail());
             User authUser = (User)((UserPrincipal) authentication.getPrincipal()).getUser();
             return Map.of("token",token , "id",authUser.getId(),"username",authUser.getUsername(),"email",authUser.getEmail(),"role",authUser.getRole(),"message","Login is succes");
         }
         throw new CustomException(ErrorsEnum.USER_NOT_FOUND);
    }
    
    

}
