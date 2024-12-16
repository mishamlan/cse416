package com.example.cse416.model;

import java.util.List;

import lombok.Data;

@Data
public class DistrictProperties {
    private String PRECNAME; // Precinct name
    private int DISTRICT; // District number
    private String DCAND; // Democratic candidate
    private int DVOTES; // Democratic votes
    private String RCAND; // Republican candidate
    private int RVOTES; // Republican votes
    private String RCAND_RACE; // Race of Republican candidate
    private String DCAND_RACE; // Race of Democratic candidate
    private String PRECID; // Precinct ID
    private String WCAND; // Winning candidate
    private String WPARTY; // Winning party
    private String WCAND_RACE; // Winning candidate's race
    private int TOTVAP; // Total voting-age population
    private int HVAP; // Hispanic voting-age population
    private int WVAP; // White voting-age population
    private int BVAP; // Black voting-age population
    private int AIANVAP; // American Indian/Alaska Native voting-age population
    private int AVAP; // Asian voting-age population
    private int OTHERVAP; // Other voting-age population
    
    // Properties specific to MMD plans
    private Integer MMD; // Indicates if the district is a Multi-Member District
    private List<RankedVote> RankedVotes; // Ranked votes in MMD
}
