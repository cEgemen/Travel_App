package com.gezerkengor.models.favorite.dto.guide;

import java.time.Instant;

import com.gezerkengor.models.favorite.entity.guide.MetaData;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class DTOOwnerFavoriteGuide {
    
    private  String id;

    private  MetaData metadata;

    private Instant createDate;

    private Instant updateDate;

}
