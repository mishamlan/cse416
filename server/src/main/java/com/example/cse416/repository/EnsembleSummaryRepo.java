package com.example.cse416.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.cse416.constants.StateID;
import com.example.cse416.constants.Type;
import com.example.cse416.model.EnsembleSummary;

@Repository
public interface EnsembleSummaryRepo extends MongoRepository<EnsembleSummary, String> {
    @Query("{'state' : ?0, 'type' : ?1, 'plan': ?2}")
    public EnsembleSummary findByStateAndTypeAndPlan(StateID state, Type type, int plan);
}
