package tmanZA10.todo.to_do_app.dto.request;

import tmanZA10.todo.to_do_app.model.Priority;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

public class NewTaskRequestDTO {

    private String task;
    private long taskListId;
    private UUID userId;
    private Priority priority;
    private LocalDate dueDate;
    private LocalTime dueTime;

    public NewTaskRequestDTO() {
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public long getTaskListId() {
        return taskListId;
    }

    public void setTaskListId(long taskListId) {
        this.taskListId = taskListId;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public LocalTime getDueTime() {
        return dueTime;
    }

    public void setDueTime(LocalTime dueTime) {
        this.dueTime = dueTime;
    }

    @Override
    public String toString() {
        return "NewTaskRequestDTO{" +
                "task='" + task + '\'' +
                ", taskListId=" + taskListId +
                ", userId=" + userId +
                ", priority=" + priority +
                ", dueDate=" + dueDate +
                ", dueTime=" + dueTime +
                '}';
    }
}
