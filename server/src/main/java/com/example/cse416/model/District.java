package com.example.cse416.model;

import java.util.ArrayList;
import java.util.HashMap;

import com.example.cse416.constants.Groups;
import com.example.cse416.constants.StateID;

public class District extends Election{
   private StateID state;
   private Integer population;
   private String boundary;
   private HashMap<Groups, Integer> demographics;
   private Integer threshold;

}
