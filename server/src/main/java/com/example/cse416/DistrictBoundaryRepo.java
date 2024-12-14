package com.example.cse416;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.cse416.constants.StateID;
import com.example.cse416.model.DistrictBoundary;

@Repository
public interface DistrictBoundaryRepo extends MongoRepository<DistrictBoundary, String>{
    @Query("{ 'state' : ?0 }")
    public DistrictBoundary getDistrictBoundaries(StateID state);
    
}
