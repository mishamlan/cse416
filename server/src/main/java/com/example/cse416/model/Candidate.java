package com.example.cse416.model;

import org.springframework.data.annotation.Id;

import com.example.cse416.constants.Party;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Candidate {
    @Id
    private String id;
	private String name;
	private Party party;
	private boolean opportunity;

}
