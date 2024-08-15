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
        // Fallback mechanism to use system environment variables if not found by dotenv
        String connectionString = Objects.requireNonNullElse(
                dotenvConfig.dotenv().get("MONGODB_CONNECTION_STRING"),
                System.getenv("MONGODB_CONNECTION_STRING")
        );

        String databaseName = Objects.requireNonNullElse(
                dotenvConfig.dotenv().get("MONGODB_DATABASE_NAME"),
                System.getenv("MONGODB_DATABASE_NAME")
        );

        return new MongoTemplate(
                MongoClients.create(connectionString),
                databaseName
        );
    }
}
