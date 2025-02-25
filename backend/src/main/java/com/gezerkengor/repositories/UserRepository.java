package com.gezerkengor.repositories;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.gezerkengor.models.user.entity.User;

@Repository
public interface UserRepository extends MongoRepository<User,String> {
     
    Optional<User> findByEmail(String email);

}
