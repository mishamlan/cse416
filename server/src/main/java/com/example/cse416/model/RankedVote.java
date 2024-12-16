package com.example.cse416.model;

import lombok.Data;

@Data
public class RankedVote {
    private String Candidate;
    private String Party;
    private int Votes;
    private int Rank;
}
