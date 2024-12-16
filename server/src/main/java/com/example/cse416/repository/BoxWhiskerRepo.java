package com.example.cse416.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.cse416.model.BoxWhisker;

@Repository
public interface BoxWhiskerRepo extends MongoRepository<BoxWhisker, String>{
    @Query("{'basis_of_comparison' : ?0, 'plan_type' : ?1, 'plan_index': ?2, 'district' : ?3}")
    public BoxWhisker findBoxWhisker(String basis_of_comparison, String plan_type, String plan_index, int district);
    
}
