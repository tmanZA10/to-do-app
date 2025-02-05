package tmanZA10.todo.to_do_app.dto;

import java.util.UUID;

public class UserInfoDTO {

    private UUID id;
    private String name;
    private String email;

    public UserInfoDTO() {
    }

    public UserInfoDTO(UUID id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
