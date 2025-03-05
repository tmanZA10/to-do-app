package tmanZA10.todo.to_do_app.controller;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import tmanZA10.todo.to_do_app.dto.NewTaskListDTO;
import tmanZA10.todo.to_do_app.dto.TaskListDTO;
import tmanZA10.todo.to_do_app.model.TaskList;
import tmanZA10.todo.to_do_app.model.User;
import tmanZA10.todo.to_do_app.service.AuthService;
import tmanZA10.todo.to_do_app.service.TaskListService;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/tasklist")
public class TaskListController {

    private final TaskListService taskListService;
    private final AuthService authService;

    public TaskListController(TaskListService taskListService,
                              AuthService authService) {
        this.taskListService = taskListService;
        this.authService = authService;
    }

    @PostMapping("/new")
    public TaskListDTO addNewTask(@Validated @RequestBody NewTaskListDTO newTaskListDTO) {
        if (!authService.userExists(newTaskListDTO.getUserId())){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        TaskList taskList = new TaskList();
        taskList.setListName(newTaskListDTO.getListName());
        taskList.setOwner(new User(newTaskListDTO.getUserId()));
        try{
            taskList = taskListService.save(taskList);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "list already exists");
        }
        return TaskListDTO.create(taskList);
    }

    @GetMapping("/all/{id}")
    public List<TaskListDTO> getAllTaskList(@PathVariable UUID id){
        if (!authService.userExists(id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        return TaskListDTO.create(taskListService.findByUserId(id));
    }

    @DeleteMapping("/delete/{userId}/{listId}")
    public List<TaskListDTO> deleteTaskList(
            @PathVariable UUID userId,
            @PathVariable Long listId
    ){
        if (!authService.userExists(userId)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        if (!taskListService.existsById(listId)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "List not found");
        }
        taskListService.deleteListById(listId);
        return TaskListDTO.create(
                taskListService.findByUserId(userId)
        );

    }
}
