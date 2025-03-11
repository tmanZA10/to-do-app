package tmanZA10.todo.to_do_app.dto.response;

import tmanZA10.todo.to_do_app.dto.TaskListDTO;
import tmanZA10.todo.to_do_app.model.TaskList;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class TaskListsResponseDTO {

    private UUID userID;
    private List<TaskListDTO> taskLists;

    public TaskListsResponseDTO() {
    }

    public UUID getUserID() {
        return userID;
    }

    public void setUserID(UUID userID) {
        this.userID = userID;
    }

    public List<TaskListDTO> getTaskLists() {
        return taskLists;
    }

    public void setTaskLists(List<TaskListDTO> taskLists) {
        this.taskLists = taskLists;
    }

    public static TaskListsResponseDTO create(List<TaskList> lists, UUID userID) {
        TaskListsResponseDTO dto = new TaskListsResponseDTO();
        dto.setUserID(userID);
        List<TaskListDTO> taskLists = new ArrayList<>();
        TaskListDTO taskListDTO = null;
        for (TaskList taskList : lists) {
            taskListDTO = new TaskListDTO();
            taskListDTO.setId(taskList.getId());
            taskListDTO.setListName(taskList.getListName());
            taskLists.add(taskListDTO);
        }
        dto.setTaskLists(taskLists);
        return dto;
    }
}
