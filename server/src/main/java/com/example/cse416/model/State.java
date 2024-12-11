package com.example.cse416.model;
import java.util.Map;
import org.springframework.data.mongodb.core.mapping.Document;
import com.example.cse416.constants.Group;
import com.example.cse416.constants.StateID;
import lombok.Getter;

@Document(collection = "state-info")
@Getter
public class State {
    private StateID name;
    private Ensemble ensemble;
    private Integer population;
    private Map<Group, Integer> demographics;
}
