package com.gezerkengor.models.favorite.entity.place;

import java.time.Instant;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.MongoId;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Document(collection = "FavoritePlaces")
public class FavoritePlace {
    
    @MongoId(targetType=FieldType.OBJECT_ID)
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

    @CreatedDate
    private Instant createdDate;

    @LastModifiedDate
    private Instant updatedDate;

}
