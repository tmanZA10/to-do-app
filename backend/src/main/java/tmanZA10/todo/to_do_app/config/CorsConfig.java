package tmanZA10.todo.to_do_app.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import tmanZA10.todo.to_do_app.ConfigProperties.SecurityConfigProperties;

import static tmanZA10.todo.to_do_app.ConfigProperties.SecurityConfigProperties.Cors;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    private final Cors corsProperties;

    public CorsConfig(SecurityConfigProperties properties) {
        this.corsProperties = properties.getCors();
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping(corsProperties.getMappingPattern())
                .allowedOrigins(
                        corsProperties.getAllowedOrigins().toArray(new String[0])
                )
                .allowCredentials(corsProperties.isAllowCredentials())
                .allowedMethods(
                        corsProperties.getAllowedMethods().toArray(new String[0])
                )
                .allowedHeaders(
                        corsProperties.getAllowedHeaders().toArray(new String[0])
                );
    }
}
