package com.gezerkengor.models.favorite.dto;

import java.util.List;

import com.gezerkengor.customs.anotations.Validation.Size.SizeEqualater;
import com.gezerkengor.models.favorite.entity.Itinerary;
import com.gezerkengor.models.favorite.entity.MetaData;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DTOIUFavorite {
    
    @NotEmpty(message =  "Owner ID dont be empty.")
    @SizeEqualater(size = 24,message = "Owner ID should be 24 characters.")
    private  String favOwner;

    @NotEmpty(message = "Metadata dont be empty data...")
    private  MetaData metadata;
   
    @NotEmpty(message = "Itinerary dont be empty data ...")
    private  List<Itinerary> itinerary;

}
