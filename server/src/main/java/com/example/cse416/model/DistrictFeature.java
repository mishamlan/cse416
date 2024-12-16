package com.example.cse416.model;

import lombok.Data;
import lombok.Setter;

@Data
@Setter
public class DistrictFeature {
    private String type; 
    private DistrictProperties properties; 
    private Object geometry; 
}
