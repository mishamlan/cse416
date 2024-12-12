package com.example.cse416.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.example.cse416.constants.StateID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnsembleData {
    @Id
    private String id;
    private StateID state;
    private List<Integer> smdOpportunityRanges;
    private List<Integer> mmdOpportunityRanges;
    private List<Integer> smdPartySplits;
    private List<Integer> mmdPartySplits;
    private double voteShare;
    private double smdAverageSeatShare;
    private double mmdAverageSeatShare;

}
