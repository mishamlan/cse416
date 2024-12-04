package com.example.cse416.model;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ElectionResults {
    private Winner winner;
    private Map<String, Integer> voteTotals;
    private Double marginOfVictory;
    private Boolean isSafe;
    private Boolean isOpportunityDistrict;
}
