package com.example.cse416.model;

import java.util.ArrayList;
import java.util.HashMap;

import com.example.cse416.constants.Groups;
import com.example.cse416.constants.StateID;

public class District extends Election{
   private StateID state;
   private Integer population;
   private String boundary;
   private HashMap<Groups, Integer> demographics;
   private Integer threshold;
public StateID getState() {
    return state;
}
public void setState(StateID state) {
    this.state = state;
}
public Integer getPopulation() {
    return population;
}
public void setPopulation(Integer population) {
    this.population = population;
}
public String getBoundary() {
    return boundary;
}
public void setBoundary(String boundary) {
    this.boundary = boundary;
}
public HashMap<Groups, Integer> getDemographics() {
    return demographics;
}
public void setDemographics(HashMap<Groups, Integer> demographics) {
    this.demographics = demographics;
}
public Integer getThreshold() {
    return threshold;
}
public void setThreshold(Integer threshold) {
    this.threshold = threshold;
}

}
