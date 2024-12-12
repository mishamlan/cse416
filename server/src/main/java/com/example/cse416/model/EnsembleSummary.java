package com.example.cse416.model;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import com.example.cse416.constants.StateID;
import com.example.cse416.constants.Type;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnsembleSummary {
    private int numOfPlans;
    private StateID state;
    private List<DistrictPlan> plans;
    private double avgMinorityReps;
    private double avgEqualPop;
    private double avgRepDemSplit;
    private Type type;
}
