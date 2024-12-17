package com.example.cse416.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.example.cse416.constants.StateID;
import lombok.Data;
@Data
@Document("district-plan-summary")
public class DistrictPlanSummary {
    @Id
    private String id;
    private int number;
    private StateID state;
    private String type;
    private List<DPSFeature> features;
}
