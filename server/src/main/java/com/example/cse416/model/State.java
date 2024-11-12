package com.example.cse416.model;
public class State {
    private State name;
    private Ensemble ensemble;
    private Integer population;
    public State getName() {
        return name;
    }
    public void setName(State name) {
        this.name = name;
    }
    public Ensemble getEnsemble() {
        return ensemble;
    }
    public void setEnsemble(Ensemble ensemble) {
        this.ensemble = ensemble;
    }
    public Integer getPopulation() {
        return population;
    }
    public void setPopulation(Integer population) {
        this.population = population;
    }
}
