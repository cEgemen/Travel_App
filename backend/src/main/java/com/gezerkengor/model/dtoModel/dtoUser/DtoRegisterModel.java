package com.gezerkengor.model.dtoModel.dtoUser;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DtoRegisterModel {
    
    private String userName;

    private String email;

    private String password;

}
