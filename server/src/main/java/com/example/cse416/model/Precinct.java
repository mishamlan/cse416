package com.example.cse416.model;
import java.util.HashMap;
import org.springframework.data.annotation.Id;
import com.example.cse416.constants.Group;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Precinct extends Election{
    @Id
    private String id;
    private Integer population;
    private String boundary;
    private Candidate winner;
    private HashMap<Group, Integer> demographics;


}
