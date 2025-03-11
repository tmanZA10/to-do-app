package tmanZA10.todo.to_do_app.dto.response;

import com.fasterxml.jackson.annotation.JsonSetter;

import java.util.UUID;

public class LogInResponseDTO {

    @JsonSetter("user_id")
    private UUID userId;
    private String accessToken;

    public LogInResponseDTO() {
    }

    public LogInResponseDTO(UUID userId, String token) {
        this.userId = userId;
        this.accessToken = token;
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
}
