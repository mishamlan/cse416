package com.example.cse416.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.cse416.constants.StateID;
import com.example.cse416.constants.Type;
import com.example.cse416.model.DistrictPlanData;

@Repository
public interface DPlanDataRepo extends MongoRepository<DistrictPlanData, String> {
    @Query("{'state' : ?0, 'type' : ?1, 'plan': ?2}")
    public DistrictPlanData findByStateAndTypeAndPlan(StateID state, Type type, int plan);
}
