package tmanZA10.todo.to_do_app.ConfigProperties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.NestedConfigurationProperty;
import org.springframework.boot.context.properties.bind.Name;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

import java.util.ArrayList;
import java.util.List;

@Component
@ConfigurationProperties(prefix = "security")
@Validated
public class SecurityConfigProperties {

    @NestedConfigurationProperty
    private final Jwt jwt = new Jwt();
    @NestedConfigurationProperty
    private final Cors cors = new Cors();
    private int hashStrength = 10;

    public Jwt getJwt() {
        return jwt;
    }

    public int getHashStrength() {
        return hashStrength;
    }

    public void setHashStrength(int hashStrength) {
        this.hashStrength = hashStrength;
    }

    public Cors getCors() {
        return cors;
    }

    public static class Jwt{
        @Name("exp-time")
        private long expTime;
        private String issuer;

        public String getIssuer() {
            return issuer;
        }

        public void setIssuer(String issuer) {
            this.issuer = issuer;
        }

        public long getExpTime() {
            return expTime;
        }

        public void setExpTime(long expTime) {
            this.expTime = expTime;
        }
    }

    public static class Cors{
        private boolean allowCredentials = false;
        private List<String> allowedOrigins = new ArrayList<>();
        private String mappingPattern = "/**";
        private List<String> allowedMethods = List.of("GET", "POST", "PUT", "DELETE");

        public boolean isAllowCredentials() {
            return allowCredentials;
        }

        public void setAllowCredentials(boolean allowCredentials) {
            this.allowCredentials = allowCredentials;
        }

        public List<String> getAllowedOrigins() {
            return allowedOrigins;
        }

        public void setAllowedOrigins(List<String> allowedOrigins) {
            this.allowedOrigins = allowedOrigins;
        }

        public String getMappingPattern() {
            return mappingPattern;
        }

        public void setMappingPattern(String mappingPattern) {
            this.mappingPattern = mappingPattern;
        }

        public List<String> getAllowedMethods() {
            return allowedMethods;
        }

        public void setAllowedMethods(List<String> allowedMethods) {
            this.allowedMethods = allowedMethods;
        }
    }
}
