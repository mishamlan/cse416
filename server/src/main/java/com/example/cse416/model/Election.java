package com.example.cse416.model;

import java.util.ArrayList;
import com.example.cse416.constants.Party;
import com.example.cse416.constants.Type;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Election {
	private Type type;
    private Integer year;
    private ArrayList<Ballot> ballots;
    private ArrayList<Candidate> winners;
    private Party majorityParty;
}
