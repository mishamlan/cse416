package com.example.cse416.model;

import lombok.Data;

@Data
public class DistrictFeature {
    private String type; 
    private DistrictProperties properties; 
    private Geometry geometry; 
}
