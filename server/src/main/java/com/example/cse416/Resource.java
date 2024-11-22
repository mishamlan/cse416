package com.example.cse416;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.cse416.constants.Type;
import com.example.cse416.model.DistrictPlan;
import com.example.cse416.model.EnsembleSummary;
import com.example.cse416.model.State;

@Repository
public interface Resource  extends MongoRepository{
    DistrictPlan  getDPlanByFromDB(State state,Type type, int number);
    EnsembleSummary getEnsembleSDFromDB(State state, Type type, int number);

    
}
