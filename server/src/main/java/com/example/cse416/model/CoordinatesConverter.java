package com.example.cse416.model;
import org.springframework.core.convert.converter.Converter;
import java.util.List;

public class CoordinatesConverter implements Converter<List<List<Double>>, Geometry> {
    @Override
    public Geometry convert(List<List<Double>> source) {
        Geometry geometry = new Geometry();
        geometry.setCoordinates(source); // Setting the coordinates in the Geometry object.
        return geometry;
    }
}

