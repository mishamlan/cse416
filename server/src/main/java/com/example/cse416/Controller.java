package com.example.cse416;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.IOException;
import org.springframework.web.bind.annotation.RequestParam;


@SpringBootApplication
@RestController
public class Controller {

    public static void main(String[] args) {
        SpringApplication.run(Controller.class, args);
    }

    @GetMapping("/")
    public String root() {
        return "Hello, World!";
    }

    // Updated GetMapping for state and type of data (e.g., precincts or districts)
    @GetMapping("/geojson/{state}/{type}")
    public ResponseEntity<Resource> getGeoJson(@PathVariable String state, @PathVariable String type) throws IOException {
        String filePath = "/geojson/" + state.toLowerCase() + "/" + type.toLowerCase() + ".geojson";

        Resource resource = new ClassPathResource(filePath);

        if (resource.exists()) {
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(resource);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/demographic/{state}/{type}")
    public ResponseEntity<Resource> getDemographic(@PathVariable String state, @PathVariable String type) throws IOException {
        String filePath = "/demographic/" + state.toLowerCase() + "/" + type.toLowerCase() + ".json";

        Resource resource = new ClassPathResource(filePath);

        if (resource.exists()) {
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(resource);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    
}


