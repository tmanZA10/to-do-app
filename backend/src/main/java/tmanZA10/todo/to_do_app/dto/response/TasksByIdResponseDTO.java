package tmanZA10.todo.to_do_app.dto.response;

import tmanZA10.todo.to_do_app.dto.TaskDTO;
import tmanZA10.todo.to_do_app.model.Task;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class TasksByIdResponseDTO {

    private UUID userId;
    private long listId;
    private List<TaskDTO> tasks = new ArrayList<>();

    public TasksByIdResponseDTO() {
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public long getListId() {
        return listId;
    }

    public void setListId(long listId) {
        this.listId = listId;
    }

    public List<TaskDTO> getTasks() {
        return tasks;
    }

    public void setTasks(List<TaskDTO> tasks) {
        this.tasks = tasks;
    }

    public static TasksByIdResponseDTO create(List<Task> tasks, UUID userId, long listId) {
        TasksByIdResponseDTO dto = new TasksByIdResponseDTO();
        dto.setUserId(userId);
        dto.setListId(listId);
        List<TaskDTO> tasksDTO = new ArrayList<>();
        TaskDTO taskDTO;
        for (Task task : tasks) {
            taskDTO = new TaskDTO();
            taskDTO.setId(task.getId());
            taskDTO.setTask(task.getTask());
            taskDTO.setCompleted(task.isCompleted());
            taskDTO.setPriority(task.getPriority());
            taskDTO.setDueDate(task.getDueDate());
            taskDTO.setDueTime(task.getDueTime());


            tasksDTO.add(taskDTO);
        }
        dto.setTasks(tasksDTO);
        return dto;
    }
}
