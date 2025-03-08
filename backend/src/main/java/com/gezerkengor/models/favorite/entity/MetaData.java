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
public class MetaData {
     
    private  String location ;
    private  String startDate ;
    private  String endDate ;
    private  int totalDays ;
    private  int totalNights ;
    private  String currency ;
    private  List<String>  emergencyContacts ;

}
