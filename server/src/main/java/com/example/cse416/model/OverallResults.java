package com.example.cse416.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OverallResults {
    private Integer democraticWins;
    private Integer republicanWins;
    private Integer opportunityDistrictsAchieved;
    private PartyVoteShare partyVoteShare; // A new class for "partyVoteShare"
}
