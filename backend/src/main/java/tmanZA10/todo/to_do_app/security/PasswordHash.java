package tmanZA10.todo.to_do_app.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import tmanZA10.todo.to_do_app.ConfigProperties.SecurityConfigProperties;

@Component
public class PasswordHash {

    private final PasswordEncoder passwordEncoder;

    public PasswordHash(SecurityConfigProperties config) {
        this.passwordEncoder = new BCryptPasswordEncoder(
                config.getHashStrength()
        );
    }

    public String hash(String password) {
        return passwordEncoder.encode(password);
    }

    public boolean verify(String password, String hash) {
        return passwordEncoder.matches(password, hash);
    }
}
