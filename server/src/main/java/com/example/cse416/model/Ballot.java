package com.example.cse416.model;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;

public class Ballot {
    @Id
    private String id;
    private ArrayList<Candidate> candidates;
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public ArrayList<Candidate> getCandidates() {
        return candidates;
    }
    public void setCandidates(ArrayList<Candidate> candidates) {
        this.candidates = candidates;
    }
}
