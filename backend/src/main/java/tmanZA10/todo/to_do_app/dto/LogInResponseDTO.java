package tmanZA10.todo.to_do_app.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSetter;

import java.util.UUID;

public class LogInResponseDTO {

    @JsonSetter("user_id")
    private UUID userId;
    private String accessToken;
    @JsonIgnore
    private String refreshToken;

    public LogInResponseDTO() {
    }

    public LogInResponseDTO(UUID userId, String token, String refreshToken) {
        this.userId = userId;
        this.accessToken = token;
        this.refreshToken = refreshToken;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
