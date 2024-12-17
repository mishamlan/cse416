package com.example.cse416.model;

import java.util.Map;

import org.springframework.data.mongodb.core.mapping.Document;

import com.example.cse416.constants.StateID;
import com.example.cse416.constants.Type;
import lombok.Data;

@Data
@Document("ensemble-summary")
public class EnsembleSummary {
    private StateID state;
    private Type type;
    private Map<String, Integer> opportunityDistricts;
    private Map<String, Integer> repSeatSplit;
    private Map<String, Integer> demSeatSplit;
    private double avgRepSplit;
    private double avgDemSplit;
}
