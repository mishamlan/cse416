package com.example.cse416;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
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

@SpringBootApplication
@RestController
public class Cse416Application {

    public static void main(String[] args) {
        SpringApplication.run(Cse416Application.class, args);
    }

    @GetMapping("/")
    public String root() {
        return "Hello, World!";
    }

    @GetMapping("/api/geojson/{fileName}")
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

    @Configuration
    public static class WebConfig implements WebMvcConfigurer {
        @Override
        public void addResourceHandlers(ResourceHandlerRegistry registry) {
            registry.addResourceHandler("/geojson/**")
                    .addResourceLocations("classpath:/geojson/");
        }
    }
}