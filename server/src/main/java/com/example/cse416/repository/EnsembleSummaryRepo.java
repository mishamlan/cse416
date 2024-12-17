package com.example.cse416.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.cse416.constants.Type;
import com.example.cse416.constants.StateID;

import com.example.cse416.model.EnsembleSummary;
@Repository
public interface EnsembleSummaryRepo extends MongoRepository<EnsembleSummary, String>{
    @Query("{'state' : ?0, 'type' : ?1}")
    public EnsembleSummary getEnsembleSummary(StateID state, Type type);
}
