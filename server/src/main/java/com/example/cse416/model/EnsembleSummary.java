package com.example.cse416.model;

import java.util.Map;

import org.springframework.data.mongodb.core.mapping.Document;

import com.example.cse416.constants.StateID;
import com.example.cse416.constants.Type;
import lombok.Data;
// {
//     "numDistrictPlans": 291,
//     "avgMinorityReps": 0.2818,
//     "avgRepSplit": 0.9519,
//     "avgDemSplit": 0.0453,
//     "avgRepSafeDistricts": 4.7113,
//     "avgDemSafeDistricts": 0.1203,
//     "avgEpm": 0.0257
// }
@Data
@Document("ensemble-summary")
public class EnsembleSummary {
    private StateID state;
    private Type type;
    private Map<String, Integer> repSeatSplit;
    private Map<String, Integer> demSeatSplit;
    private double avgRepSplit;
    private double avgDemSplit;
    private int numDistrictPlans;
    private int avgMinorityReps;
    private int avgRepSafeDistricts;
    private int avgDemSafeDistricts;
    private int avgEpm;

}
