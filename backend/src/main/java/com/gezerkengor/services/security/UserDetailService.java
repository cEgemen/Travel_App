package com.gezerkengor.services.security;

import java.util.Optional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.gezerkengor.models.user.entity.User;
import com.gezerkengor.models.user.entity.UserPrincipal;
import com.gezerkengor.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserDetailService implements UserDetailsService {
 
    private final UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
               Optional<User> optionalResult = userRepo.findByEmail(username);
               if(!optionalResult.isPresent())
               {
                  throw new UsernameNotFoundException("User Not Found");
               }
               return new UserPrincipal(optionalResult.get());

               
    }
    
}
