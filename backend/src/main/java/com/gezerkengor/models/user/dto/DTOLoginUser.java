package com.gezerkengor.models.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DTOLoginUser {
    
    private String username;

    private String password;

    private String email;

    private String id;

    private String token;

    private String role;

}
