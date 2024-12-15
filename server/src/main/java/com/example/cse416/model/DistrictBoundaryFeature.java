package com.example.cse416.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class DistrictBoundaryFeature {
    @JsonProperty("geometry")
    private Geometry geometry;  
    private String type;
    @JsonProperty("properties")
    private DBProperties properties;
}
