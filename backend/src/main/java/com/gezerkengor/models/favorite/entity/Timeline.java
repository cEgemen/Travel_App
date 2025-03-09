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
public class Timeline {
 
    private String time;
    private String activity;
    private String locationName;
    private String address;
    private String details;
    private String cost;
    private String popularity;
    private String duration;
    private NextActivityTransition  nextActivityTransition;
}
