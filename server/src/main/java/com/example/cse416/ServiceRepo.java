package com.example.cse416;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.example.cse416.constants.Group;
import com.example.cse416.constants.StateID;
import com.example.cse416.constants.Type;
import com.example.cse416.model.*;
import com.example.cse416.repository.BoxWhiskerRepo;
import com.example.cse416.repository.DemographicRepo;
import com.example.cse416.repository.DistrictBoundaryRepo;
import com.example.cse416.repository.DistrictPlanRepo;
import com.example.cse416.repository.EnsembleDataRepo;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;


import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceRepo {
    @Autowired
    private DemographicRepo demographicRepo;
    CoordinatesConverter converter;

    @Autowired
    private DistrictBoundaryRepo districtBoundaryRepo;

    @Autowired
    private DistrictPlanRepo districtPlanRepo;
    @Autowired
    private EnsembleDataRepo ensembleDataRepo;
    @Autowired
    private BoxWhiskerRepo boxWhiskerRepo;
    // @Autowired
    // private EnsembleSummaryRepo ensembleSummaryRepo;

    @Cacheable(value = "demographics", key = "#state")
    public List<Demographics> getDemographicsData(StateID state) throws IOException {
        try {
            List<Demographics> d = demographicRepo.findByState(state);
            return d;
        } catch (Exception e) {
            System.err.println("Error loading demographic data: " + e.getMessage());
            throw new IOException("Failed to load demographic data", e);
        }

    }
    @Cacheable(value = "boundary", key = "#state")
    public DistrictBoundary getDistrictBoundary(StateID state) throws IOException{
        try{
            System.out.println("inside service");
            DistrictBoundary db = districtBoundaryRepo.getDistrictBoundaries(state);
            System.out.println(db);
            return db;
        }catch(Exception e){
            System.err.println("Error loading district line data: " + e.getMessage());
            throw new IOException("Failed to load district boundary lines data", e);
        }
    }
    @Cacheable(value = "districtplans", key = "T(java.util.Objects).hash(#state, #type, #number)")
    public DistrictPlan getDistrictPlanData(StateID state, Type type, int number) throws IOException{
        try{
        DistrictPlan dp = districtPlanRepo.findByStateAndTypeAndNumber(state, type, number);
        // dp.features.geometry.coordinates = converter(dp.features.geometry);
        System.out.println("dp: "+dp);
        System.out.println("district plan returned");
        return dp;
        }
        catch(Exception e){
            System.out.println(e.getMessage());
            throw new IOException(e);
        }
    }
    @Cacheable(value = "ensembledata", key = "T(java.util.Objects).hash(#state, #type, #number)")
    public EnsembleData loadEnsembleData(StateID state, String type, int number) throws IOException {
        try {
            EnsembleData ed = ensembleDataRepo.findByStateAndTypeAndNumber(state, type, number);
            return ed;
    } catch (Exception e) {
        System.err.println("Error loading ensemble data: " + e.getMessage());
        throw new IOException("Failed to load ensemble data", e);
        }
    }

    @Cacheable(value = "boxwhisker", key = "T(java.util.Objects).hash(#type, #number, #group, #index)")
    public BoxWhisker getBoxWhisker(String group, String type, String index, int district) throws IOException {
        try {
            System.out.println("Parameters: group=" + group + ", type=" + type + ", index=" + index + ", district=" + district);
            BoxWhisker bw = boxWhiskerRepo.findBoxWhisker(group, type, index, district);
            System.out.println("Query Result: " + bw);
            return bw;
        } catch (Exception e) {
            System.err.println("Error loading ensemble data: " + e.getMessage());
            throw new IOException("Failed to load ensemble data", e);
        }
    }
    
    // public EnsembleSummary loadEnsembleSummary(String state, String type) throws IOException {
    //     String ensembleKey = String.format("%s-%s", state, type);
    //     if (ensembleSummaryCache.containsKey(ensembleKey)) {
    //         return ensembleSummaryCache.get(ensembleKey);
    //     }
    //     try {
    //         String filePath = String.format("/ensemble/summary/%s/%s/summary.json", 
    //             state.toLowerCase(), 
    //             type.toLowerCase());
    //         Resource resource = new ClassPathResource(filePath);
    //         if (resource.exists()) {
    //             EnsembleSummary ensemble = objectMapper.readValue(resource.getInputStream(), EnsembleSummary.class);
    //         ensembleSummaryCache.put(ensembleKey, ensemble);
    //         return ensemble;
    //     } else {
    //         throw new FileNotFoundException("Ensemble data not found");
    //     }
    // } catch (Exception e) {
    //     System.err.println("Error loading ensemble data: " + e.getMessage());
    //     throw new IOException("Failed to load ensemble data", e);
    //     }
    // }
    // public static double calculateAverageMinorityReps(EnsembleSummary ensemble) {
    //     return ensemble.getPlans().stream()
    //         .mapToDouble(plan -> countMinorityReps(plan))
    //         .average()
    //         .orElse(0.0);
    // }
    // public static double countMinorityReps(DistrictPlan plan) {
    //     return plan.getDistricts().stream()
    //         .filter(district -> isMinorityOpportunityDistrict(district))
    //         .count();
    // }
    // public static boolean isMinorityOpportunityDistrict(District district) {
    //     double threshold = 0.5;
    //     int totalMinority = district.getDemographics().entrySet().stream()
    //         .filter(entry -> entry.getKey() != Group.white)
    //         .mapToInt(Map.Entry::getValue)
    //         .sum();
    //     return (double) totalMinority / district.getPopulation() > threshold;
    // }
    // public static Map<String, Double> calculatePartySplit(EnsembleSummary ensemble) {
    //     Map<String, Double> split = new HashMap<>();
    //     double demCount = 0;
    //     double repCount = 0;
    //     for (DistrictPlan plan : ensemble.getPlans()) {
    //         for (District district : plan.getDistricts()) {
    //             if (district.getMajorityParty() == Party.democrat) {
    //                 demCount++;
    //             } else {
    //                 repCount++;
    //             }
    //         }
    //     }
    //     split.put("democratic", demCount / ensemble.getPlans().size());
    //     split.put("republican", repCount / ensemble.getPlans().size());
    //     return split;
    // }



    // private static final Map<String, EnsembleSummary> ensembleSummaryCache = new HashMap<>();
    // private static final Map<String, EnsembleData> ensembleDataCache = new HashMap<>();
    // private static final Map<String, DistrictPlan> districtPlanCache = new HashMap<>();
    // private static final Map<String, List<Demographics>> demographicsCache = new HashMap<>();

    // private final static ObjectMapper objectMapper = new ObjectMapper();
    


}