package com.example.cse416.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document("district-boundaries")
public class DistrictBoundary {
    @Id
    private String id;
    private String state;
    private String type;
    private String name;
    private List<GeojsonFeature> features;
}
