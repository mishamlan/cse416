package com.example.cse416.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
@Document("box-whisker")
public class BoxWhisker {
@JsonProperty("basis_of_comparison")
    private String basisOfComparison;

    @JsonProperty("plan_type")
    private String planType;

    @JsonProperty("plan_index")
    private String planIndex;

    private int district;

    @JsonProperty("population_percent")
    private double populationPercent;

    @JsonProperty("min_population_percent")
    private double minPopulationPercent;

    @JsonProperty("q1_population_percent")
    private double q1PopulationPercent;

    @JsonProperty("median_population_percent")
    private double medianPopulationPercent;

    @JsonProperty("q3_population_percent")
    private double q3PopulationPercent;

    @JsonProperty("max_population_percent")
    private double maxPopulationPercent;
}
