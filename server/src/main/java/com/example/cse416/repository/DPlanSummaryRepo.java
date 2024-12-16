package com.example.cse416.repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.cse416.constants.StateID;
import com.example.cse416.model.DistrictPlanSummary;

@Repository
public interface DPlanSummaryRepo extends MongoRepository<DistrictPlanSummary, String> {
    public DistrictPlanSummary findByStateAndTypeAndNumber(StateID state, String type, int number);
    
}
