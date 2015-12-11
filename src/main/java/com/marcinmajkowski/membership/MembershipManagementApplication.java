package com.marcinmajkowski.membership;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class MembershipManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(MembershipManagementApplication.class, args);
    }
}
