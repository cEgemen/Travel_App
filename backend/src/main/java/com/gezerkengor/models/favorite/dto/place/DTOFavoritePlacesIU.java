package com.gezerkengor.models.favorite.dto.place;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Accessors(chain=true)
public class DTOFavoritePlacesIU {
    
    private String id;

    private String favOwner;

    private String location;

    private String name;

    private String summary;

    private String imgUrl;

    private String filterType;

    private double lat;

    private double lon;

}
