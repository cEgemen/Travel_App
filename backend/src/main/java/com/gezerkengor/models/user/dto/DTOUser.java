package com.gezerkengor.models.user.dto;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class DTOUser {
     
    private String username;
    private String email;
    private String password;
    private Instant updateDate;
    
}
