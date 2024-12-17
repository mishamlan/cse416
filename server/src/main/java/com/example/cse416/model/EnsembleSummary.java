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
    private Map<String, Integer> opportunity_districts;
    private Map<String, Integer> rep_seat_split;
    private Map<String, Integer> dem_seat_split;
    private double avg_rep_seat_share;
    private double avg_dem_seat_share;
}
