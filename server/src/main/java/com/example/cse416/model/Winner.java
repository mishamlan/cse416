package com.example.cse416.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Winner {
    private String name;
    private String party;
    private Boolean isIncumbent;
    private Boolean isMinorityCandidate;
}
