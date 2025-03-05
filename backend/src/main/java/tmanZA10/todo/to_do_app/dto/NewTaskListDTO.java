package tmanZA10.todo.to_do_app.dto;

import com.fasterxml.jackson.annotation.JsonSetter;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public class NewTaskListDTO {
    @NotNull
    @JsonSetter(value = "user_id")
    private UUID userId;
    @NotNull
    @JsonSetter(value = "list_name")
    private String listName;

    public NewTaskListDTO() {
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

    @Override
    public String toString() {
        return "NewTaskListDTO{" +
                "userId=" + userId +
                ", listName='" + listName + '\'' +
                '}';
    }
}
