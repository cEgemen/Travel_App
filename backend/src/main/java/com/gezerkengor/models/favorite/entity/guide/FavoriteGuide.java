package com.gezerkengor.models.favorite.entity.guide;

import java.time.Instant;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
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
@Document(collection = "FavoriteGuides")
public class FavoriteGuide {
     
    @MongoId(targetType = FieldType.OBJECT_ID)
    private  String id;

    @Indexed()
    private  String favOwner;

    private  MetaData metadata;

    private  List<Itinerary> itinerary;

    @CreatedDate
    private Instant createDate;

    @LastModifiedDate
    private Instant updateDate;
}
