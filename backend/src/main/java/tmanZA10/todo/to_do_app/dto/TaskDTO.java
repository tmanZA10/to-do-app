package tmanZA10.todo.to_do_app.dto;

import tmanZA10.todo.to_do_app.model.Priority;
import tmanZA10.todo.to_do_app.model.Task;

import java.time.LocalDate;
import java.time.LocalTime;

public class TaskDTO {

    private long id;
    private String task;
    private Priority priority;
    private LocalDate dueDate;
    private LocalTime dueTime;
    private boolean completed;

    public TaskDTO() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
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

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }


    public static TaskDTO create(Task task){
        TaskDTO dto = new TaskDTO();
        dto.setId(task.getId());
        dto.setTask(task.getTask());
        dto.setPriority(task.getPriority());
        dto.setDueDate(task.getDueDate());
        dto.setDueTime(task.getDueTime());
        dto.setCompleted(task.isCompleted());

        return dto;
    }
}
