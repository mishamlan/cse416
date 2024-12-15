package com.example.cse416.repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.cse416.constants.StateID;
import com.example.cse416.constants.Type;
import com.example.cse416.model.EnsembleData;

@Repository
public interface EnsembleDataRepo extends MongoRepository<EnsembleData, String> {
    public EnsembleData findByStateAndType(StateID state, Type type);
    
}
