package com.example.cse416.model;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;

import com.example.cse416.constants.StateID;
import com.example.cse416.constants.Type;

public class DistrictPlan {
    private StateID state;
    @Id
    private String id;
    private Type type;
    ArrayList<District> districts;
    public StateID getState() {
        return state;
    }
    public void setState(StateID state) {
        this.state = state;
    }
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public Type getType() {
        return type;
    }
    public void setType(Type type) {
        this.type = type;
    }
    public ArrayList<District> getDistricts() {
        return districts;
    }
    public void setDistricts(ArrayList<District> districts) {
        this.districts = districts;
    }

}
