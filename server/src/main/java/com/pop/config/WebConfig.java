package com.pop.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 開発中はフロント（Live Server: 5500番）とバック（8080番）が別オリジンになるため、
 * /api/** へのアクセスをCORSで許可する（docs/api.md 実装メモ）。
 * 本番はSpring Bootがフロントも配信して同一オリジンになるので、この許可は使われない。
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://127.0.0.1:5500", "http://localhost:5500")
                .allowedMethods("GET", "POST", "OPTIONS");
    }
}
