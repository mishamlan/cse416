package com.example.cse416.model;

import org.springframework.data.annotation.Id;

import com.example.cse416.constants.Group;
import com.example.cse416.constants.StateID;


import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class BoxWhisker {
    @Id
    private String id;

    private StateID state;
    private Group group;
    private Integer district;
    private Double min;
    private Double q1;
    private Double med;
    private Double q3;
    private Double max;
}
