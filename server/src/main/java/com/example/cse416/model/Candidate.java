package com.example.cse416.model;

import org.springframework.data.annotation.Id;

import com.example.cse416.constants.Party;

public class Candidate {
    @Id
    private String id;
	private String name;
	private Party party;
	private boolean opportunity;
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Party getParty() {
        return party;
    }
    public void setParty(Party party) {
        this.party = party;
    }
    public boolean isOpportunity() {
        return opportunity;
    }
    public void setOpportunity(boolean opportunity) {
        this.opportunity = opportunity;
    }

}
