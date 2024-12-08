package com.example.cse416.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Demographics {
    private Integer district;
    private Integer total_population;
    @JsonProperty("asian")
    private RacePopulation asian;
    @JsonProperty("black")
    private RacePopulation black;
    @JsonProperty("other")
    private RacePopulation other;
    @JsonProperty("white")
    private RacePopulation white;
    @JsonProperty("hispanic")
    private RacePopulation hispanic;
}
