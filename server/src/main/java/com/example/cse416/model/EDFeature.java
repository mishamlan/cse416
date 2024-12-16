package com.example.cse416.model;

import lombok.Data;

@Data
public class EDFeature {
        private String type;
        private EDProperties properties;
        private Geometry geometry;
}
