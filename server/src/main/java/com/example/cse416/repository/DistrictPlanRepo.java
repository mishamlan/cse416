package com.example.cse416.repository;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.cse416.constants.StateID;
import com.example.cse416.constants.Type;
import com.example.cse416.model.DistrictPlan;

@Repository
public interface DistrictPlanRepo extends MongoRepository<DistrictPlan, String>{
    public DistrictPlan findByStateAndTypeAndNumber(StateID state, Type type, int number);
}
