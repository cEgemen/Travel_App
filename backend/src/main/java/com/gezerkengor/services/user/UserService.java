package com.gezerkengor.services.user;

import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import com.gezerkengor.base.baseErrors.CustomException;
import com.gezerkengor.base.baseErrors.ErrorsEnum;
import com.gezerkengor.models.user.dto.DTOIUUser;
import com.gezerkengor.models.user.dto.DTOUser;
import com.gezerkengor.models.user.entity.User;
import com.gezerkengor.repositories.UserRepository;

@Controller
public class UserService implements IUserService {

    @Autowired
    UserRepository repo;

    @Override
    public Map<String, ?> getUser(String id) {
        Optional<User> resultOption = repo.findById(id);
        if(!resultOption.isPresent())
        {
          throw new CustomException(ErrorsEnum.USER_NOT_FOUND);
        } 
          User resultUser = resultOption.get(); 
          DTOUser dtoUser = new DTOUser();
                  dtoUser.setEmail(resultUser.getEmail())
                         .setPassword(resultUser.getPassword())
                         .setUsername(resultUser.getUsername())
                         .setUpdateDate(resultUser.getCreateDate());
          return Map.of("message","user("+id+") is fetched.","data",dtoUser);               
    }

    @Override
    public Map<String, ?> updateUser(String id, DTOIUUser updateUser) {
        Optional<User> resOptional = repo.findById(id);
        if(!resOptional.isPresent())
        {
            throw new CustomException(ErrorsEnum.USER_NOT_FOUND);
        }
        User oldUserData = resOptional.get();
        User newUserData = new User()
                                    .setId(id)
                                    .setUsername(updateUser.getUsername())
                                    .setEmail(updateUser.getEmail())
                                    .setPassword(new BCryptPasswordEncoder().encode(updateUser.getPassword()))
                                    .setRole(oldUserData.getRole())
                                    .setCreateDate(oldUserData.getCreateDate());
        User updatedUser = repo.save(newUserData);
        System.out.println("password from repo : "+updatedUser.getPassword());
        DTOUser responseUser = new DTOUser()
                                           .setUsername(updateUser.getUsername())
                                           .setEmail(updateUser.getEmail())
                                           .setPassword(updateUser.getPassword())
                                           .setUpdateDate(updatedUser.getUpdateDate());
        return Map.of("message","user("+id+") is updated.","data",responseUser);
    }

    @Override
    public Map<String, ?> deleteUser(String id) {
         repo.deleteById(id);
         return Map.of("message","user("+id+") is deleted.");
    }
    
}
