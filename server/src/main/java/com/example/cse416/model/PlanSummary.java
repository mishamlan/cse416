package com.example.cse416.model;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlanSummary {
    private String id;
    private String state;
    private String type;
    private Integer numDistricts;
    private Long totalPopulation;
    private Double equalPopulationMeasure;
    private Integer totalOpportunityDistricts;
    private Double opportunityThreshold;
    private Integer safeDistricts;
    private Integer competitiveDistricts;
    private Integer electionYearUsed;
}

