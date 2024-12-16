package com.example.cse416.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.example.cse416.constants.StateID;
import com.example.cse416.constants.Type;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@Document("district-plan")
public class DistrictPlan {
    private String type; // Type of district plan, e.g., "smd" or "mmd"
    private String state; // State abbreviation
    private int number; // District number
    private List<DistrictFeature> features;
}
