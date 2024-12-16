package com.example.cse416.model;

import java.util.List;

import lombok.Data;

@Data
public class EDProperties {
    private int MMD;
    private int DVOTES;
    private int RVOTES;
    private int TOTVAP;
    private int BVAP;
    private int HVAP;
    private List<RankedVote> RankedVotes;
    private boolean OpportunityDistrict;
    private double MinorityPopulationShare;
    private int ExpectedMinorityRepresentatives;
}
