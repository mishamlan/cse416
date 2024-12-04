package com.example.cse416.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OverallResults {
    private Integer democraticWins;
    private Integer republicanWins;
    private Integer opportunityDistrictsAchieved;
    private PartyVoteShare partyVoteShare; // A new class for "partyVoteShare"
}
