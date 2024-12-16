package com.example.cse416.model;

import java.util.List;

import lombok.Data;
@Data
public class Geometry {
    private String type;
    private List<List<Double>> coordinates;
}
