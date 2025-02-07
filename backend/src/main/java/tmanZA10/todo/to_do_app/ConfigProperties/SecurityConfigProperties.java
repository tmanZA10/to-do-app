package tmanZA10.todo.to_do_app.ConfigProperties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.NestedConfigurationProperty;
import org.springframework.boot.context.properties.bind.Name;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

@Component
@ConfigurationProperties(prefix = "security")
@Validated
public class SecurityConfigProperties {

    @NestedConfigurationProperty
    private final Jwt jwt = new Jwt();

    public Jwt getJwt() {
        return jwt;
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
}
