package com.example.cse416.model;

import java.util.Properties;

import com.mongodb.client.model.geojson.Geometry;

import lombok.Data;

@Data
public class GeojsonFeature {
    private String type;
    private Geometry geometry;
    private int DISTRICTNO;
    private int ADJPOP;
    private int VAPERSONS;
    private int TOTVOTER20;
    private int DEMVOTER20;
    private int REPVOTER20;
    private int NPVOTER20;
    private int OTHVOTER20;
    private int PRES20_TOT;
    private int PRES20_DEM;
    private int PRES20_REP;
    private int PRES20_OTH;
    private int AG18_TOTAL;
    private int AG18_DEM;
    private int AG18_REP;
    private int AG18_OTH;
    private int SOS18_TOTA;
    private int SOS18_DEM;
    private int SOS18_REP;
    private int SOS18_OTH;
    private int PRES16_TOT;
    private int PRES16_DEM;
    private int PRES16_REP;
    private int PRES16_OTH;

}
