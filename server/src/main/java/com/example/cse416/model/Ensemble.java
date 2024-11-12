package com.example.cse416.model;

import java.util.ArrayList;
import java.util.HashMap;

import com.example.cse416.constants.Groups;

public class Ensemble {
    ArrayList<DistrictPlan> plans;
    ArrayList<Candidate> winners;
    HashMap<Groups, Integer> demographics;
    public ArrayList<DistrictPlan> getPlans() {
        return plans;
    }
    public void setPlans(ArrayList<DistrictPlan> plans) {
        this.plans = plans;
    }
    public ArrayList<Candidate> getWinners() {
        return winners;
    }
    public void setWinners(ArrayList<Candidate> winners) {
        this.winners = winners;
    }
    public HashMap<Groups, Integer> getDemographics() {
        return demographics;
    }
    public void setDemographics(HashMap<Groups, Integer> demographics) {
        this.demographics = demographics;
    }

}
