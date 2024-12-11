package com.example.cse416.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Winner {
    private String name;
    private String party;
    private Boolean isIncumbent;
    private Boolean isMinorityCandidate;
}
