package com.example.cse416.controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/geojson")
public class GeoJsonController {

    @GetMapping("/{fileName}")
    public ResponseEntity<Resource> getGeoJson(@PathVariable String fileName) throws IOException {
        Resource resource = new ClassPathResource("geojson/" + fileName);
        
        if (resource.exists()) {
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(resource);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}