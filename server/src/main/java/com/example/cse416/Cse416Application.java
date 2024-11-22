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
import org.springframework.web.bind.annotation.RequestParam;
import com.example.cse416.model.*;
import com.example.cse416.constants.*;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.stream.Collectors;

@SpringBootApplication
@RestController

public class Cse416Application {
    // Class-level fields
    private static final Map<String, Ensemble> ensembleCache = new HashMap<>();
    private static final Map<String, DistrictPlan> districtPlanCache = new HashMap<>();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public static void main(String[] args) {
        SpringApplication.run(Cse416Application.class, args);
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
        
        System.out.println("Looking for file at: " + filePath);
        
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
        
        System.out.println("Looking for file at: " + filePath);
        
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
            Ensemble ensemble = loadEnsembleData(state, type, number);
            
            summary.put("numPlans", ensemble.getPlans().size());
            summary.put("averageMinorityReps", calculateAverageMinorityReps(ensemble));
            summary.put("partySplit", calculatePartySplit(ensemble));
            
            if (type.equals("mmd")) {
                summary.put("mmdLayout", getMmdLayout(ensemble));
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
            DistrictPlan plan = getDistrictPlanData(state, type, number);
            Map<String, Object> planSummary = new HashMap<>();
            
            planSummary.put("numDistricts", plan.getDistricts().size());
            planSummary.put("demographics", summarizeDemographics(plan));
            planSummary.put("electionResults", summarizeElectionResults(plan));
            
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
            Ensemble ensemble = loadEnsembleData(state, type, number);
            Map<String, Object> data = new HashMap<>();
            
            data.put("opportunityDistrictRange", calculateOpportunityRange(ensemble));
            data.put("partySplitRange", calculatePartySplitRange(ensemble));
            
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
            Ensemble ensemble = loadEnsembleData(state, type, number);
            Map<String, Object> data = new HashMap<>();
            
            data.put("boxAndWhisker", calculateBoxAndWhisker(ensemble));
            
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }   

    // Data access methods
    private Ensemble loadEnsembleData(String state, String type, Integer number) throws IOException {
        String ensembleKey = String.format("%s-%s-%d", state, type, number);
        
        if (ensembleCache.containsKey(ensembleKey)) {
            return ensembleCache.get(ensembleKey);
        }

        try {
            String filePath = String.format("/ensemble/%s/%s/%d.json", 
                state.toLowerCase(), 
                type.toLowerCase(), 
                number);
            
            Resource resource = new ClassPathResource(filePath);
            
            if (resource.exists()) {
                Ensemble ensemble = objectMapper.readValue(resource.getInputStream(), Ensemble.class);
                ensembleCache.put(ensembleKey, ensemble);
                return ensemble;
            } else {
                throw new FileNotFoundException("Ensemble data not found");
            }
        } catch (Exception e) {
            System.err.println("Error loading ensemble data: " + e.getMessage());
            throw new IOException("Failed to load ensemble data", e);
        }
    }

    private DistrictPlan getDistrictPlanData(String state, String type, Integer number) throws IOException {
        String planKey = String.format("%s-%s-%d", state, type, number);
        
        if (districtPlanCache.containsKey(planKey)) {
            return districtPlanCache.get(planKey);
        }

        try {
            String filePath = String.format("/districtplan/%s/%s/%d.json", 
                state.toLowerCase(), 
                type.toLowerCase(), 
                number);
            
            Resource resource = new ClassPathResource(filePath);
            
            if (resource.exists()) {
                DistrictPlan plan = objectMapper.readValue(resource.getInputStream(), DistrictPlan.class);
                districtPlanCache.put(planKey, plan);
                return plan;
            } else {
                throw new FileNotFoundException("District plan data not found");
            }
        } catch (Exception e) {
            System.err.println("Error loading district plan data: " + e.getMessage());
            throw new IOException("Failed to load district plan data", e);
        }
    }

    // Calculation helper methods
    private double calculateAverageMinorityReps(Ensemble ensemble) {
        return ensemble.getPlans().stream()
            .mapToDouble(plan -> countMinorityReps(plan))
            .average()
            .orElse(0.0);
    }

    private double countMinorityReps(DistrictPlan plan) {
        return plan.getDistricts().stream()
            .filter(district -> isMinorityOpportunityDistrict(district))
            .count();
    }

    private boolean isMinorityOpportunityDistrict(District district) {
        double threshold = 0.5;
        int totalMinority = district.getDemographics().entrySet().stream()
            .filter(entry -> entry.getKey() != Group.white)
            .mapToInt(Map.Entry::getValue)
            .sum();
        return (double) totalMinority / district.getPopulation() > threshold;
    }

    private Map<String, Double> calculatePartySplit(Ensemble ensemble) {
        Map<String, Double> split = new HashMap<>();
        double demCount = 0;
        double repCount = 0;

        for (DistrictPlan plan : ensemble.getPlans()) {
            for (District district : plan.getDistricts()) {
                if (district.getMajorityParty() == Party.democrat) {
                    demCount++;
                } else {
                    repCount++;
                }
            }
        }

        split.put("democratic", demCount / ensemble.getPlans().size());
        split.put("republican", repCount / ensemble.getPlans().size());
        return split;
    }

    private List<Integer> getMmdLayout(Ensemble ensemble) {
        return ensemble.getPlans().get(0).getDistricts().stream()
            .map(district -> district.getPopulation())
            .collect(Collectors.toList());
    }

    private Map<String, Object> summarizeDemographics(DistrictPlan plan) {
        Map<String, Object> demographics = new HashMap<>();
        Map<Group, Integer> totals = new HashMap<>();
        
        for (District district : plan.getDistricts()) {
            district.getDemographics().forEach((group, count) -> 
                totals.merge(group, count, Integer::sum));
        }
        demographics.put("totals", totals);
        
        return demographics;
    }

    private Map<String, Object> summarizeElectionResults(DistrictPlan plan) {
        Map<String, Object> results = new HashMap<>();
        
        int democraticWins = 0;
        int republicanWins = 0;
        
        for (District district : plan.getDistricts()) {
            if (district.getMajorityParty() == Party.democrat) {
                democraticWins++;
            } else {
                republicanWins++;
            }
        }
        
        results.put("democraticWins", democraticWins);
        results.put("republicanWins", republicanWins);
        
        return results;
    }

    private Map<String, Object> calculateOpportunityRange(Ensemble ensemble) {
        Map<String, Object> range = new HashMap<>();
        
        List<Integer> opportunityCounts = ensemble.getPlans().stream()
            .map(plan -> (int) plan.getDistricts().stream()
                .filter(district -> isMinorityOpportunityDistrict(district))
                .count())
            .collect(Collectors.toList());
        
        range.put("min", opportunityCounts.stream().mapToInt(i -> i).min().orElse(0));
        range.put("max", opportunityCounts.stream().mapToInt(i -> i).max().orElse(0));
        range.put("average", opportunityCounts.stream().mapToInt(i -> i).average().orElse(0.0));
        
        return range;
    }

    private Map<String, Object> calculatePartySplitRange(Ensemble ensemble) {
        Map<String, Object> range = new HashMap<>();
        
        List<Double> democraticSplits = ensemble.getPlans().stream()
            .map(plan -> calculateDemocraticSplit(plan))
            .collect(Collectors.toList());
        
        range.put("democratic", Map.of(
            "min", democraticSplits.stream().mapToDouble(d -> d).min().orElse(0.0),
            "max", democraticSplits.stream().mapToDouble(d -> d).max().orElse(0.0),
            "average", democraticSplits.stream().mapToDouble(d -> d).average().orElse(0.0)
        ));
        
        return range;
    }

    private double calculateDemocraticSplit(DistrictPlan plan) {
        long democraticDistricts = plan.getDistricts().stream()
            .filter(district -> district.getMajorityParty() == Party.democrat)
            .count();
        return (double) democraticDistricts / plan.getDistricts().size();
    }

    private Map<String, Object> calculateBoxAndWhisker(Ensemble ensemble) {
        Map<String, Object> boxData = new HashMap<>();
        
        for (int i = 0; i < ensemble.getPlans().get(0).getDistricts().size(); i++) {
            int districtIndex = i;
            List<Double> values = ensemble.getPlans().stream()
                .map(plan -> calculateMetric(plan.getDistricts().get(districtIndex)))
                .sorted()
                .collect(Collectors.toList());
            
            boxData.put("district" + (i+1), calculateBoxStats(values));
        }
        
        return boxData;
    }

    private Map<String, Double> calculateBoxStats(List<Double> values) {
        Map<String, Double> stats = new HashMap<>();
        stats.put("min", values.get(0));
        stats.put("q1", calculateQuartile(values, 0.25));
        stats.put("median", calculateQuartile(values, 0.5));
        stats.put("q3", calculateQuartile(values, 0.75));
        stats.put("max", values.get(values.size() - 1));
        return stats;
    }

    private double calculateQuartile(List<Double> values, double quartile) {
        int index = (int) Math.ceil(quartile * values.size()) - 1;
        return values.get(Math.max(0, index));
    }

    private double calculateMetric(District district) {
        // Example metric
        return (double) district.getDemographics().get(Group.black) / district.getPopulation();
    }
}