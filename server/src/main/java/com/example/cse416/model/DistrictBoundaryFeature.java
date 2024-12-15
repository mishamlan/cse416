package com.example.cse416.model;

import java.util.List;
import java.util.Properties;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mongodb.client.model.geojson.Polygon;

import lombok.Data;

@Data
public class DistrictBoundaryFeature {

    @JsonProperty("geometry")
    private Geometry geometry;  
    private String type;
    @JsonProperty("properties")
    private DBProperties properties;
}
