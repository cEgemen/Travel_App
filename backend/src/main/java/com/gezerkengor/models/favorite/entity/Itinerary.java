package com.gezerkengor.models.favorite.entity;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Itinerary {
    
    private String day;
    private String theme;
    private String date;
    private List<Timeline> timeline;

}
