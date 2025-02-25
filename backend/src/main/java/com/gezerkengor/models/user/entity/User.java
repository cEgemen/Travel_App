package com.gezerkengor.models.user.entity;

import java.time.Instant;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.MongoId;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Document(collection = "Users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class User {
    
      @MongoId(targetType = FieldType.OBJECT_ID)
      private String id;

      private String username;

      @Indexed(unique = true)
      private String email;

      private String password;

      private String Role;

      @CreatedDate
      private Instant createDate;

      @LastModifiedDate
      private Instant updateDate;
}
