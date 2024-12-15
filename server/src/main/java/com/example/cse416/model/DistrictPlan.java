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
    @Id
    private String id;
    private StateID state;
    private Integer districtNumber;
    private Type type;
    private Integer numDistricts;
    private Long totalPopulation;
    private Double equalPopulationMeasure;
    private Integer totalOpportunityDistricts;
    private Double opportunityThreshold;
    private Integer safeDistricts;
    private Integer competitiveDistricts;
    private Integer electionYearUsed;
    private PlanSummary summary;

    private List<District> districts;
    private OverallResults overallResults;
}
