package com.example.cse416.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
@Document("box-whisker")
public class BoxWhisker {
@JsonProperty("basis_of_comparison")
    private String basis_of_comparison;

    @JsonProperty("plan_type")
    private String plan_type;

    @JsonProperty("plan_index")
    private String plan_index;

    private int district;

    @JsonProperty("population_percent")
    private double population_percent;

    @JsonProperty("min_population_percent")
    private double minPopulation_percent;

    @JsonProperty("q1_population_percent")
    private double q1_population_percent;

    @JsonProperty("median_population_percent")
    private double median_population_percent;

    @JsonProperty("q3_population_percent")
    private double q3_population_percent;

    @JsonProperty("max_population_percent")
    private double max_population_percent;
}
