package com.example.cse416;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
@SpringBootApplication
@RestController
public class Cse416Application {

	public static void main(String[] args) {
		SpringApplication.run(Cse416Application.class, args);
	}

	@GetMapping("/")
	public String root(){
		return "Hello, World!";
	}
}
