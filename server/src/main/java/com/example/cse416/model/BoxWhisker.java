package com.example.cse416.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

import java.util.List;

@Data
@Document("box-whisker")
public class BoxWhisker {
    @JsonProperty("democratic")
    private Object democratic;

    @JsonProperty("smd")
    private List<SMDObject> smd;

    @JsonProperty("mmd")
    private List<MMDObject> mmd;

    @JsonProperty("republican")
    private Object republican;

    @JsonProperty("black")
    private Object black;

    @JsonProperty("white")
    private Object white;

    @JsonProperty("hispanic")
    private Object hispanic;

    @JsonProperty("asian")
    private Object asian;

    @Data
    public static class SMDObject {
        @JsonProperty("box")
        private Box box;
    }

    @Data
    public static class Box {
        @JsonProperty("enacted")
        private double enacted;
    }

    @Data
    public static class MMDObject {
        // Define any necessary fields for the MMD objects if applicable.
    }
}
