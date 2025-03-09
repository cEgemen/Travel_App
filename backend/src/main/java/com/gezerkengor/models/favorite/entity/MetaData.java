package com.gezerkengor.models.favorite.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MetaData {
     
    private  String country;
    private  String city;
    private  String startDate ;
    private  String lastDate ;
    private  int totalDays ;
    private  int totalNights ;
    private  String travelType ;
    private  String budgetClass;
}
