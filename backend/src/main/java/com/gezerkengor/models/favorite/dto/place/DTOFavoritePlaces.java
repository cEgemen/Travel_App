package com.gezerkengor.models.favorite.dto.place;

import java.time.Instant;
import java.util.List;

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

    private List<String> activities;

    private String estimatedCost;

    private String location;

    private String name;

    private String summary;

    private String imgUrl;

    private double lat;

    private double lon;

    private List<String> bestTimeToVisit;

    private List<String> localTips;

    private Instant createdDate;

    private Instant updatedDate;

}
