package com.example.csvtosql;

import com.example.csvtosql.service.FileReadService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import javax.annotation.Resource;


@SpringBootApplication
@EnableJpaRepositories

@EnableEurekaClient
@EnableFeignClients
@EnableCircuitBreaker
public class CsvtosqlApplication {

    public static void main(String[] args) {

        SpringApplication.run(CsvtosqlApplication.class, args);

    }
}
