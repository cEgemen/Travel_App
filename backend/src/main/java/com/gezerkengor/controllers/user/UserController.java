package com.gezerkengor.controllers.user;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.gezerkengor.base.baseController.BaseController;
import com.gezerkengor.models.user.dto.DTOIUUser;
import com.gezerkengor.services.user.UserService;

import jakarta.validation.Valid;
import lombok.extern.log4j.Log4j2;


@RestController
@RequestMapping("/api/profile/")
@Log4j2
public class UserController<T> extends BaseController<Map<String,?>> implements IUserController {

    @Autowired
    private UserService service;

    @Override
    @GetMapping("{id}")
    public ResponseEntity<?> getUser(@PathVariable String id) {
        log.info("userController -> getUser -> id : "+id);
        Map<String,?> result = service.getUser(id);
        return okResponse(result);
    }

    @Override
    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        log.info("userController -> deleteUser -> id : "+id);
        Map<String,?> result = service.deleteUser(id);
        return okResponse(result);
    }

    @Override
    @PutMapping("update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable String id,@Valid DTOIUUser updateUserData) {
        log.info("userController -> updateUser -> id : "+id+" AND updateUserData : "+updateUserData.toString());
        Map<String,?> result = service.updateUser(id, updateUserData);
        return okResponse(result);
    }
    
}
