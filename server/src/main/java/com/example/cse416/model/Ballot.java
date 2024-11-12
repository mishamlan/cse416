package com.example.cse416.model;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;

public class Ballot {
    @Id
    private String id;
    private ArrayList<Candidate> candidates;
}
