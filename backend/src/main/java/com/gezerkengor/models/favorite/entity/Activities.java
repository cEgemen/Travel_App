package com.gezerkengor.models.favorite.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Activities {
    
    private String name;
    private String location;
    private String details;
    private String duration;
    private int cost;
    private String popularity;
    private String address;
}
