package tmanZA10.todo.to_do_app.security.auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import tmanZA10.todo.to_do_app.ConfigProperties.SecurityConfigProperties;
import tmanZA10.todo.to_do_app.dto.UserInfoDTO;
import tmanZA10.todo.to_do_app.model.User;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.time.Instant;

@Component
public class JWTProvider {

    private final KeyPair encryptionKeys;
    public final Algorithm algorithm;
    private final SecurityConfigProperties config;

    public JWTProvider(SecurityConfigProperties config){
        try {
            encryptionKeys = KeyPairGenerator.getInstance("RSA").generateKeyPair();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
        algorithm = Algorithm.RSA512(
                (RSAPublicKey) encryptionKeys.getPublic(),
                (RSAPrivateKey) encryptionKeys.getPrivate()
        );
        this.config = config;
    }

    public String generateToken(User user){
        return JWT.create()
                .withIssuer(config.getJwt().getIssuer())
                .withExpiresAt(
                        Instant.now()
                        .plusSeconds(
                                config.getJwt().getExpTime()
                        )
                )
                .withExpiresAt(Instant.now().plusSeconds(15))
                .withClaim("user_id", String.valueOf(user.getId()))
                .withClaim("name", user.getName())
                .withClaim("email", user.getEmail())
                .sign(algorithm);
    }

    public DecodedJWT verifyToken(String token){
        return JWT.require(algorithm)
                .withIssuer(config.getJwt().getIssuer())
                .build()
                .verify(token);
    }
}
