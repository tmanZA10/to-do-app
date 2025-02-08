package tmanZA10.todo.to_do_app.dto;

import com.fasterxml.jackson.annotation.JsonSetter;

import java.util.UUID;

public class LoggedInUserDTO {

    @JsonSetter("user_id")
    private UUID userId;
    private String token;

    public LoggedInUserDTO() {
    }

    public LoggedInUserDTO(UUID userId, String token) {
        this.userId = userId;
        this.token = token;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
