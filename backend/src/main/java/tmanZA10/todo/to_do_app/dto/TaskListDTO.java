package tmanZA10.todo.to_do_app.dto;

import tmanZA10.todo.to_do_app.model.TaskList;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class TaskListDTO {

    private Long id;
    private UUID userID;
    private String listName;
    private List<String> tasks;

    public TaskListDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UUID getUserID() {
        return userID;
    }

    public void setUserID(UUID userID) {
        this.userID = userID;
    }

    public String getListName() {
        return listName;
    }

    public void setListName(String listName) {
        this.listName = listName;
    }

    public List<String> getTasks() {
        return tasks;
    }

    public void setTasks(List<String> tasks) {
        this.tasks = tasks;
    }

    public static TaskListDTO create(TaskList taskList) {
        TaskListDTO dto = new TaskListDTO();
        dto.setId(taskList.getId());
        dto.setListName(taskList.getListName());
        dto.setTasks(taskList.getTasks());
        dto.setUserID(taskList.getOwner().getId());
        return dto;
    }

    public static List<TaskListDTO> create(List<TaskList> list){
        List<TaskListDTO> taskListDTOS = new ArrayList<>();
        TaskListDTO dto;
        for (TaskList taskList : list) {
            dto = new TaskListDTO();
            dto.setId(taskList.getId());
            dto.setListName(taskList.getListName());
            dto.setTasks(taskList.getTasks());
            dto.setUserID(taskList.getOwner().getId());
            taskListDTOS.add(dto);
        }

        return taskListDTOS;
    }
}
