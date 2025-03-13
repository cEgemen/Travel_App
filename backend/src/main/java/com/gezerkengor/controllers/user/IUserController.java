package com.gezerkengor.controllers.user;

import org.springframework.http.ResponseEntity;

import com.gezerkengor.models.user.dto.DTOIUUser;


public interface IUserController {
    
     public ResponseEntity<?> getUser(String id);
     
     public ResponseEntity<?> deleteUser(String id);

     public ResponseEntity<?> updateUser(String id,DTOIUUser updateUserData);

}
