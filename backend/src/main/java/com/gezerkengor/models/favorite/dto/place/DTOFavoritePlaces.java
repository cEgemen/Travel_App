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
@Accessors(chain = true)
public class DTOFavoritePlaces {
    
    private String id;

    private String favOwner;

    private String location;

    private String name;

    private String summary;

    private String imgUrl;

    private String filterType;

    private double lat;

    private double lon;

    private Instant createdDate;

    private Instant updatedDate;

}
