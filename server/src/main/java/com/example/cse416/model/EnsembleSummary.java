package com.example.cse416.model;
import java.util.List;
import com.example.cse416.constants.StateID;
import com.example.cse416.constants.Type;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EnsembleSummary {
    private int numOfPlans;
    private StateID state;
    private List<DistrictPlan> plans;
    private double avgMinorityReps;
    private double avgEqualPop;
    private double avgRepDemSplit;
    private Type type;
}
