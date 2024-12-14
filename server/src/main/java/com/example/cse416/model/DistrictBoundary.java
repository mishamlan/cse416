package com.example.cse416.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.example.cse416.constants.StateID;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mongodb.client.model.geojson.Polygon;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("district-boundaries")
public class DistrictBoundary {
    @Id
    private String id;
    @Field("state")
    private StateID state;
    @JsonProperty("type")
    private String type;
    private String name;
    @Field("features")
    private List<DistrictBoundaryFeature> features;
}
