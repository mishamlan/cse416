package com.example.cse416.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.cse416.model.BoxWhisker;

@Repository
public interface BoxWhiskerRepo extends MongoRepository<BoxWhisker, String>{
    @Query("{}")
    BoxWhisker findSingleBoxWhisker();
}
