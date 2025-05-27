package com.gezerkengor.models.favorite.dto.guide;

import java.util.List;

import com.gezerkengor.customs.anotations.Validation.Size.SizeEqualater;
import com.gezerkengor.models.favorite.entity.guide.Itinerary;
import com.gezerkengor.models.favorite.entity.guide.MetaData;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DTOIUFavoriteGuide {
    
    @NotEmpty(message =  "Owner ID dont be empty.")
    @SizeEqualater(size = 24,message = "Owner ID should be 24 characters.")
    private  String favOwner;

    @NotEmpty(message = "Metadata dont be empty data...")
    private  MetaData metadata;
   
    @NotEmpty(message = "Itinerary dont be empty data ...")
    private  List<Itinerary> itinerary;

}
