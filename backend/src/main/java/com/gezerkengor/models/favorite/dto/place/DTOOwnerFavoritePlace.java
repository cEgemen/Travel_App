package com.gezerkengor.models.favorite.dto.place;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Accessors(chain=true)
public class DTOOwnerFavoritePlace {
        
   private String id;
   private String imgUrl;
   private String name;
   private String location;
   private Instant updatedDate;

}
