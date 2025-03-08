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
 
    private String type;
    private String time;
    private List<Activities> activities; 
    
}
