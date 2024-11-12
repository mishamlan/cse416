package com.example.cse416.model;

import org.springframework.data.annotation.Id;

import com.example.cse416.constants.Party;

public class Candidate {
    @Id
    private String id;
	private String name;
	private Party party;
	private boolean opportunity;

}
