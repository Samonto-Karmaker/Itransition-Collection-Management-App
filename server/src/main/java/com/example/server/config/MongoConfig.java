package com.example.server.config;

import com.mongodb.client.MongoClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.Objects;

@Configuration
public class MongoConfig {
    private final DotenvConfig dotenvConfig;

    public MongoConfig(DotenvConfig dotenvConfig) {
        this.dotenvConfig = dotenvConfig;
    }

    @Bean
    public MongoTemplate mongoTemplate() {
        return new MongoTemplate(
                MongoClients.create(Objects.requireNonNull(dotenvConfig.dotenv().get("MONGODB_CONNECTION_STRING"))),
                Objects.requireNonNull(dotenvConfig.dotenv().get("MONGODB_DATABASE_NAME"))
        );
    }
}
