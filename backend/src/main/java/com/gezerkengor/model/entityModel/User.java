package com.gezerkengor.model.entityModel;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String userName;

    private String password;
 
    private String email;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
         return List.of(new SimpleGrantedAuthority("USER"));
    }

    @Override
    public String getUsername() {
          return this.email;
    } 

    public long getId()
    {
         return this.id;
    }

    public void setPassword(String password)
    {
         this.password = password;
    }

    public String getPassword()
    {
         return this.password;
    }

    public void setUserName(String userName)
    {
         this.userName = userName;
    }

    public String getUserName() {
       return this.userName;
                                }

    public void setEmail(String email)
    {
         this.email = email;
    }                            

}
