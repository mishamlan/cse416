package com.example.cse416.model;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.data.annotation.Id;

import com.example.cse416.constants.Group;
import com.example.cse416.constants.Type;
import com.example.cse416.constants.StateID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Ensemble {
    @Id
    private String id;
    private Type type;
    private StateID name;
    private ArrayList<DistrictPlan> plans;
    private ArrayList<Candidate> winners;
    private HashMap<Group, Integer> demographics;
}
