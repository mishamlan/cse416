package com.example.cse416.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.example.cse416.constants.StateID;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;



@Data
@Document("demographics")
public class Demographics {
    @Id
    private String state;
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
