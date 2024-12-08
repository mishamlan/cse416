package com.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.example.cse416.constants.StateID;
import com.example.cse416.constants.Type;
import com.example.cse416.model.EnsembleSummary;

@Repository
public interface EnsembleSummaryRepo extends MongoRepository<EnsembleSummary, String> {
    public List<EnsembleSummary> findByState(StateID state, Type type);
}
