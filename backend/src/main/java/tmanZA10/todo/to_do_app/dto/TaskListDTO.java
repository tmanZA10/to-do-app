package tmanZA10.todo.to_do_app.dto;

import tmanZA10.todo.to_do_app.model.TaskList;

public class TaskListDTO {

    private long id;
    private String listName;

    public TaskListDTO() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getListName() {
        return listName;
    }

    public void setListName(String listName) {
        this.listName = listName;
    }


    public static TaskListDTO create(TaskList taskList) {
        TaskListDTO dto = new TaskListDTO();
        dto.setId(taskList.getId());
        dto.setListName(taskList.getListName());
        return dto;
    }

}
