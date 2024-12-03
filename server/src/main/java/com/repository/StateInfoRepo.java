package com.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.cse416.constants.StateID;
import com.example.cse416.model.State;
@Repository
public interface StateInfoRepo extends MongoRepository<State, String> {
    public State findByState(StateID state);
}
