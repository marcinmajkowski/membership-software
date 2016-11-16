package com.marcinmajkowski.membershipsoftware;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class MembershipSoftwareApplication {

    public static void main(String[] args) {
        SpringApplication.run(MembershipSoftwareApplication.class, args);
    }
}
