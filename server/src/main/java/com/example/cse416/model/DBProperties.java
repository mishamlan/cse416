package com.example.cse416.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class DBProperties{
    @JsonProperty("DISTRICTNO")
    private Integer DISTRICTNO;
    
    @JsonProperty("ADJPOP")
    private Integer ADJPOP;
    
    @JsonProperty("VAPERSONS")
    private Integer VAPERSONS;
    
    @JsonProperty("TOTVOTER20")
    private Integer TOTVOTER20;
    
    @JsonProperty("DEMVOTER20")
    private Integer DEMVOTER20;
    
    @JsonProperty("REPVOTER20")
    private Integer REPVOTER20;
    
    @JsonProperty("NPVOTER20")
    private Integer NPVOTER20;
    
    @JsonProperty("OTHVOTER20")
    private Integer OTHVOTER20;
    
    @JsonProperty("PRES20_TOT")
    private Integer PRES20_TOT;
    
    @JsonProperty("PRES20_DEM")
    private Integer PRES20_DEM;
    
    @JsonProperty("PRES20_REP")
    private Integer PRES20_REP;
    
    @JsonProperty("PRES20_OTH")
    private Integer PRES20_OTH;
    
    @JsonProperty("AG18_TOTAL")
    private Integer AG18_TOTAL;
    
    @JsonProperty("AG18_DEM")
    private Integer AG18_DEM;
    
    @JsonProperty("AG18_REP")
    private Integer AG18_REP;
    
    @JsonProperty("AG18_OTH")
    private Integer AG18_OTH;
    
    @JsonProperty("SOS18_TOTA")
    private Integer SOS18_TOTA;
    
    @JsonProperty("SOS18_DEM")
    private Integer SOS18_DEM;
    
    @JsonProperty("SOS18_REP")
    private Integer SOS18_REP;
    
    @JsonProperty("SOS18_OTH")
    private Integer SOS18_OTH;
    
    @JsonProperty("PRES16_TOT")
    private Integer PRES16_TOT;
    
    @JsonProperty("PRES16_DEM")
    private Integer PRES16_DEM;
    
    @JsonProperty("PRES16_REP")
    private Integer PRES16_REP;
    
    @JsonProperty("PRES16_OTH")
    private Integer PRES16_OTH;
}