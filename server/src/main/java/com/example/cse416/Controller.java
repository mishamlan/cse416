package com.example.cse416;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import com.example.cse416.constants.StateID;
import com.example.cse416.constants.Type;
import com.example.cse416.constants.Group;
import com.example.cse416.model.BoxWhisker;
import com.example.cse416.model.Demographics;
import com.example.cse416.model.DistrictBoundary;
import com.example.cse416.model.DistrictPlan;
import com.example.cse416.model.DistrictPlanData;
import com.example.cse416.model.DistrictPlanSummary;

import java.io.IOException;
import java.util.List;

@SpringBootApplication
@RestController
public class Controller {
    @Autowired
    private ServiceRepo service;
    public static void main(String[] args) {
        SpringApplication.run(Controller.class, args);
    }

    @GetMapping("/demographic/{state}/")
    public ResponseEntity<List<Demographics>> getDemographic(@PathVariable StateID state) throws IOException {
        var res = service.getDemographicsData(state);
        System.out.println(res);
        return ResponseEntity.ok(res);
    }
    @GetMapping("/boundary/{state}/")
    public ResponseEntity<DistrictBoundary> getDistrictBoundary(@PathVariable StateID state) throws IOException {
        var res = service.getDistrictBoundary(state);
        return ResponseEntity.ok(res);
    }

    // @GetMapping("/geojson/{state}/{type}")
    // public ResponseEntity<Resource> getGeoJson(@PathVariable String state, @PathVariable String type) throws IOException {
    //     String filePath = "/geojson/" + state.toLowerCase() + "/" + type.toLowerCase() + ".geojson";
    //     Resource resource = new ClassPathResource(filePath);
    //     if (resource.exists()) {
    //         return ResponseEntity.ok()
    //                 .contentType(MediaType.APPLICATION_JSON)
    //                 .body(resource);
    //     } else {
    //         return ResponseEntity.notFound().build();
    //     }
    // }
    @GetMapping("/dplan/data/{state}/{type}/{plan}/")
    public ResponseEntity<DistrictPlanData> getDPlanData(
            @PathVariable StateID state,
            @PathVariable Type type, @PathVariable int plan) {
        try {
            System.out.println("Entered dplan data");
            DistrictPlanData ensemble = service.getDPlanData(state, type, plan);
            return ResponseEntity.ok(ensemble);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/dplan/{state}/{type}/{number}/")
    public ResponseEntity<DistrictPlan> getDistrictPlan(
            @PathVariable StateID state,
            @PathVariable Type type,
            @PathVariable Integer number) {
        try {
            DistrictPlan plan = service.getDistrictPlanData(state, type, number);
            
            return ResponseEntity.ok(plan);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
            //`/ensemble/data/${state}/${type}/${number}/`
    @GetMapping("/dplan/summary/{state}/{type}/{number}/")
    public ResponseEntity<DistrictPlanSummary> getEnsembleData(
            @PathVariable StateID state,
            @PathVariable String type, @PathVariable int number) {
        
        try {
            DistrictPlanSummary ensemble = service.getDPlanSummary(state, type, number);
            return ResponseEntity.ok(ensemble);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/boxwhisker/{group}/{type}/{district}/{index}/")
    public ResponseEntity<BoxWhisker> getBoxWhiskerData(
            @PathVariable String group,
            @PathVariable String type,
            @PathVariable int district,
            @PathVariable int index) {
        try {
            String groupName = mapEnumToGroup(group);
            String indexVal= String.valueOf(index);
            // System.out.println(groupName);
            BoxWhisker bw = service.getBoxWhisker(groupName, type, indexVal, district);
            
            return ResponseEntity.ok(bw);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    private String mapEnumToGroup(String group) {
        switch (group) {
            case "asian":
                return "Asian Population";
            case "black":
                return "Black Population";
            case "white":
                return "White Population";
            case "hispanic":
                return "Hispanic Population";
            case "democrat":
                return "Democratic Population";
            case "republican":
                return "Republican Population";
            case "american_indian":
                return "American Indian Population";
            case "other":
                return "Other Population";  // You can handle this case if needed
            default:
                throw new IllegalArgumentException("Unknown group: " + group);
        }
    }
     
}


