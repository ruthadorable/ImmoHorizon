package com.immohorizon.propertymanagement.config;

import io.github.cdimascio.dotenv.Dotenv;

public class EnvConfig {

    public static String get(String key) {
        return System.getenv(key);
    }
}