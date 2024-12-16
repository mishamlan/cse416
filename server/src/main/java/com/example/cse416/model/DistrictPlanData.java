package com.example.cse416.model;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import com.example.cse416.constants.StateID;
import com.example.cse416.constants.Type;
import lombok.Data;

@Data
@Document("district-plan-data")
public class DistrictPlanData {
    private int plan;
    private int number_of_districts;
    private int minority_representation;
    private int opportunity_districts;
    private String opportunity_threshold;
    private int R_wins;
    private int D_wins;
    private double R_seat_share;
    private double D_seat_share;
    private double R_vote_share;
    private double D_vote_share;
    private StateID state;
    private Type type;
}
