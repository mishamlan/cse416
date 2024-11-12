package com.example.cse416.model;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class State {
    private State name;
    private Ensemble ensemble;
    private Integer population;
}
