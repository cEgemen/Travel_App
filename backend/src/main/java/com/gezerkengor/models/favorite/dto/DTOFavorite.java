package com.gezerkengor.models.favorite.dto;

import java.time.Instant;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;

import com.gezerkengor.models.favorite.entity.Itinerary;
import com.gezerkengor.models.favorite.entity.MetaData;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class DTOFavorite {
    private  String id;
    private  String favOwner;
    private  MetaData metadata;
    private  List<Itinerary> itinerary;
    private Instant createDate;
    private Instant updateDate;
}
