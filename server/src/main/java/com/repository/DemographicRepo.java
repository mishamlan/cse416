package com.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.cse416.constants.StateID;
import com.example.cse416.model.Demographics;
@Repository
public interface DemographicRepo extends MongoRepository<Demographics, String>{
    public Demographics findByState(String state);

}
