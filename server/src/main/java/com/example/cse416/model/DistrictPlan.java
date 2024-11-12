package com.example.cse416.model;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;

import com.example.cse416.constants.StateID;
import com.example.cse416.constants.Type;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DistrictPlan {
    private StateID state;
    @Id
    private String id;
    private Type type;
    ArrayList<District> districts;

}
