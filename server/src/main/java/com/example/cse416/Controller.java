package com.example.cse416;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.cse416.constants.StateID;
import com.example.cse416.model.Demographics;
import com.example.cse416.model.DistrictPlan;
import com.example.cse416.model.EnsembleData;
import com.example.cse416.model.EnsembleSummary;

import java.io.IOException;
import java.util.List;
@SpringBootApplication(scanBasePackages = "com")
@RestController
public class Controller {
    private ServiceRepo service;

    public Controller(ServiceRepo service) {
        this.service = service;
    }
        public static void main(String[] args) {
        SpringApplication.run(Controller.class, args);
    }
    @GetMapping("/")
    public String root() {
        return "Hello, World!";
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
    @GetMapping("/demographic/{state}/")
    public ResponseEntity<List<Demographics>> getDemographic(@PathVariable StateID state) throws IOException {
        System.out.println("controller enetered");
        var res = service.getDemographicsData(state);
        System.out.println(res);
        return ResponseEntity.ok(res);
    }
    // @GetMapping("/ensemble/summary/{state}/{type}/")
    // public ResponseEntity<EnsembleSummary> getEnsembleSummary(
    //         @PathVariable String state,
    //         @PathVariable String type) {
    //     try {
    //         EnsembleSummary ensemble = service.loadEnsembleSummary(state, type);
    //         return ResponseEntity.ok(ensemble);
    //     } catch (Exception e) {
    //         return ResponseEntity.notFound().build();
    //     }
    // }
    // @GetMapping("/dplan/{state}/{type}/{number}")
    // public ResponseEntity<DistrictPlan> getDistrictPlan(
    //         @PathVariable String state,
    //         @PathVariable String type,
    //         @PathVariable Integer number) {
    //     try {
    //         DistrictPlan plan = service.getDistrictPlanData(state, type, number);
            
    //         return ResponseEntity.ok(plan);
    //     } catch (Exception e) {
    //         return ResponseEntity.notFound().build();
    //     }
    // }
    // @GetMapping("/ensemble/data/{state}/{type}/")
    // public ResponseEntity<EnsembleData> getEnsembleData(
    //         @PathVariable String state,
    //         @PathVariable String type) {
        
    //     try {
    //         EnsembleData ensemble = service.loadEnsembleData(state, type);
            
    //         return ResponseEntity.ok(ensemble);
    //     } catch (Exception e) {
    //         return ResponseEntity.notFound().build();
    //     }
    // }

    // @GetMapping("/boxwhisker/{state}/{type}/{number}")
    // public ResponseEntity<BoxWhisker> getBoxWhiskerData(
    //         @PathVariable String state,
    //         @PathVariable String type) {
        
    //     try {
    //         BoxWhisker bw = Service.loadEnsembleData(state, type);
            
            
    //         return ResponseEntity.ok(data);
    //     } catch (Exception e) {
    //         return ResponseEntity.notFound().build();
    //     }
    // }   
}


