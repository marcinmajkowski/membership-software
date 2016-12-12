package com.marcinmajkowski.membershipsoftware;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

@SpringBootApplication
@EnableZuulProxy
public class MembershipSoftwareApplication {

    public static void main(String[] args) {
        SpringApplication.run(MembershipSoftwareApplication.class, args);
    }
}
