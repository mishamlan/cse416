package com.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.cse416.constants.StateID;
import com.example.cse416.model.DistrictBoundary;

public interface DistrictBoundaries extends MongoRepository<DistrictBoundary, String>{
    public DistrictBoundaries getDistrictBoundaries(StateID state);
    
}
