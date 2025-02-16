package tmanZA10.todo.to_do_app.security.auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.stereotype.Component;
import tmanZA10.todo.to_do_app.ConfigProperties.SecurityConfigProperties;
import tmanZA10.todo.to_do_app.model.User;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.time.Instant;
import java.util.Base64;

@Component
public class JWTProvider {

    private final KeyPair encryptionKeys;
    public final Algorithm algorithm;
    private final SecurityConfigProperties config;
    private final Base64.Encoder encoder = Base64.getEncoder();

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

    private String generateRandomString(int length){
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < length; i++) {

            sb.append((char) ((byte) Math.round(Math.random()*92+33)));
        }

        return sb.toString();
    }


    @Deprecated
    public String generateToken(User user){
        return JWT.create()
                .withIssuer(config.getJwt().getIssuer())
                .withExpiresAt(
                        Instant.now()
                        .plusSeconds(
                                config.getJwt().getAccessExpTime()
                        )
                )
                .withSubject(user.getId().toString())
                .withClaim("name", user.getName())
                .withClaim("email", user.getEmail())
                .sign(algorithm);
    }

    public String generateAccessToken(User user, Instant issuedAt){
        return JWT.create()
                .withIssuer(config.getJwt().getIssuer())
                .withExpiresAt(issuedAt.plusSeconds(
                        config.getJwt().getAccessExpTime()
                ))
                .withSubject(user.getId().toString())
                .withIssuedAt(issuedAt)
                .withJWTId(
                        new String(
                                encoder.encode(
                                        generateRandomString(256).getBytes()
                                )
                        )
                )
                .sign(algorithm);
    }

    public String generateRefreshToken(User user, Instant issuedAt){
        return JWT.create()
                .withIssuer(config.getJwt().getIssuer())
                .withExpiresAt(issuedAt.plusSeconds(
                        config.getJwt().getRefreshExpDays()*24*60*60
                ))
                .withSubject(user.getId().toString())
                .withIssuedAt(issuedAt)
                .withJWTId(new String(
                        encoder.encode(generateRandomString(128).getBytes())
                ))
                .sign(algorithm);
    }

    public DecodedJWT verifyToken(String token){
        return JWT.require(algorithm)
                .withIssuer(config.getJwt().getIssuer())
                .build()
                .verify(token);
    }
}
