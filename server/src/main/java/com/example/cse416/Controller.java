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


import com.example.cse416.model.DistrictPlan;
import com.example.cse416.model.Ensemble;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import com.example.cse416.Service;

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
        // GUI-4: Display summary of SMD/MMD ensembles
    @GetMapping("/ensemble/summary/{state}/{type}/{number}")
    public ResponseEntity<Map<String, Object>> getEnsembleSummary(
            @PathVariable String state,
            @PathVariable String type,
            @PathVariable Integer number) {
        
        Map<String, Object> summary = new HashMap<>();
        
        try {
            Ensemble ensemble = Service.loadEnsembleData(state, type, number);
            
            summary.put("numPlans", ensemble.getPlans().size());
            summary.put("averageMinorityReps", Service.calculateAverageMinorityReps(ensemble));
            summary.put("partySplit", Service.calculatePartySplit(ensemble));
            
            if (type.equals("mmd")) {
                summary.put("mmdLayout", Service.getMmdLayout(ensemble));
            }
            
            return ResponseEntity.ok(summary);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // GUI-11: Display district plan summary
    @GetMapping("/dplan/{state}/{type}/{number}")
    public ResponseEntity<Map<String, Object>> getDistrictPlan(
            @PathVariable String state,
            @PathVariable String type,
            @PathVariable Integer number) {
        
        try {
            DistrictPlan plan = Service.getDistrictPlanData(state, type, number);
            Map<String, Object> planSummary = new HashMap<>();
            
            planSummary.put("numDistricts", plan.getDistricts().size());
            planSummary.put("demographics", Service.summarizeDemographics(plan));
            planSummary.put("electionResults", Service.summarizeElectionResults(plan));
            
            return ResponseEntity.ok(planSummary);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // GUI-15 & GUI-16: Display ensemble data and box & whisker
    @GetMapping("/ensemble/data/{state}/{type}/{number}")
    public ResponseEntity<Map<String, Object>> getEnsembleData(
            @PathVariable String state,
            @PathVariable String type,
            @PathVariable Integer number) {
        
        try {
            Ensemble ensemble = Service.loadEnsembleData(state, type, number);
            Map<String, Object> data = new HashMap<>();
            
            data.put("opportunityDistrictRange", Service.calculateOpportunityRange(ensemble));
            data.put("partySplitRange", Service.calculatePartySplitRange(ensemble));
            
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/boxwhisker/{state}/{type}/{number}")
    public ResponseEntity<Map<String, Object>> getBoxWhiskerData(
            @PathVariable String state,
            @PathVariable String type,
            @PathVariable Integer number) {
        
        try {
            Ensemble ensemble = Service.loadEnsembleData(state, type, number);
            Map<String, Object> data = new HashMap<>();
            
            data.put("boxAndWhisker", Service.calculateBoxAndWhisker(ensemble));
            
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }   

    
}


