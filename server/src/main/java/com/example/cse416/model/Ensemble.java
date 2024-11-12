package com.example.cse416.model;

import java.util.ArrayList;
import java.util.HashMap;

import com.example.cse416.constants.Group;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Ensemble {
    ArrayList<DistrictPlan> plans;
    ArrayList<Candidate> winners;
    HashMap<Group, Integer> demographics;
}
