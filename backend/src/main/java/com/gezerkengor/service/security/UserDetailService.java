package com.gezerkengor.service.security;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.gezerkengor.model.entityModel.User;
import com.gezerkengor.repositor.UserRepository;

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
               return optionalResult.get();
    }
    
}
