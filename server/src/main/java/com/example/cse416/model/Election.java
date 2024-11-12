package com.example.cse416.model;

import java.util.ArrayList;

import com.example.cse416.constants.Party;
import com.example.cse416.constants.Type;

public class Election {
    	/* smd or mmd */
	private Type type;
    private Integer year;
    private ArrayList<Ballot> ballots;
    private ArrayList<Candidate> winners;
    private Party majorityParty;
}
