package com.marcinmajkowski.membership;

import com.marcinmajkowski.membership.scanner.ScannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.task.SimpleAsyncTaskExecutor;
import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class MembershipManagementApplication implements CommandLineRunner {

    @Autowired
    ScannerService scannerService;

    public static void main(String[] args) {
        SpringApplication.run(MembershipManagementApplication.class, args);
    }

    @Override
    public void run(String... strings) throws Exception {
        scannerService.scanning();
    }

    @Bean
    public TaskExecutor taskExecutor() {
        return new SimpleAsyncTaskExecutor();
    }
}
