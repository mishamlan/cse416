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
    public Type getType() {
        return type;
    }
    public void setType(Type type) {
        this.type = type;
    }
    public Integer getYear() {
        return year;
    }
    public void setYear(Integer year) {
        this.year = year;
    }
    public ArrayList<Ballot> getBallots() {
        return ballots;
    }
    public void setBallots(ArrayList<Ballot> ballots) {
        this.ballots = ballots;
    }
    public ArrayList<Candidate> getWinners() {
        return winners;
    }
    public void setWinners(ArrayList<Candidate> winners) {
        this.winners = winners;
    }
    public Party getMajorityParty() {
        return majorityParty;
    }
    public void setMajorityParty(Party majorityParty) {
        this.majorityParty = majorityParty;
    }
}
