package com.example.cse416.model;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Ballot {
    @Id
    private String id;
    private ArrayList<Candidate> candidates;
}
