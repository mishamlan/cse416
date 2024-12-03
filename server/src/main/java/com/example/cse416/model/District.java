package com.example.cse416.model;

import java.util.HashMap;

import com.example.cse416.constants.Group;
import com.example.cse416.constants.StateID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class District extends Election{
   private StateID state;
   private Integer population;
   private Integer numOfReps;
   private Double repSplit;
   private Double demSplit;
   private String boundary;
   private HashMap<Group, Integer> demographics;
   private Integer threshold;

}
