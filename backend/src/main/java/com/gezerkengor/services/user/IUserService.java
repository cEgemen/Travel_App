package com.gezerkengor.services.user;

import java.util.Map;

import com.gezerkengor.models.user.dto.DTOIUUser;

public interface IUserService {
      
     public Map<String,?> getUser(String id);
     public Map<String,?> updateUser(String id , DTOIUUser updateUser);
     public Map<String,?> deleteUser(String id);
     
}
