package tmanZA10.todo.to_do_app.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public class NewTaskListRequestDTO {
    @NotNull
    private UUID userId;
    @NotNull
    @NotBlank
    private String listName;

    public NewTaskListRequestDTO() {
    }

    public NewTaskListRequestDTO(UUID userId, String listName) {
        this.userId = userId;
        this.listName = listName;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public String getListName() {
        return listName;
    }

    public void setListName(String listName) {
        this.listName = listName;
    }
}
