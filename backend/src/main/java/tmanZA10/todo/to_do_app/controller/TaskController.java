package tmanZA10.todo.to_do_app.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tmanZA10.todo.to_do_app.dto.TaskDTO;
import tmanZA10.todo.to_do_app.dto.error.BadRequestDTO;
import tmanZA10.todo.to_do_app.dto.request.NewTaskRequestDTO;
import tmanZA10.todo.to_do_app.dto.response.TasksByIdResponseDTO;
import tmanZA10.todo.to_do_app.exceptions.DuplicateTastException;
import tmanZA10.todo.to_do_app.model.Task;
import tmanZA10.todo.to_do_app.service.TaskListService;
import tmanZA10.todo.to_do_app.service.TaskService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/task")
public class TaskController {

    private final TaskService taskService;
    private final TaskListService taskListService;

    public TaskController(TaskService taskService, TaskListService taskListService) {
        this.taskService = taskService;
        this.taskListService = taskListService;
    }

    @PostMapping("/new")
    public ResponseEntity<?> addTask (@RequestBody NewTaskRequestDTO request) {

        if (taskListService.existsByIdAndUserId(
                request.getTaskListId(), request.getUserId()
        )) return invalidTaskList();

        Task newtask;

        try{
            newtask = taskService.addTask(request);
        }catch (DuplicateTastException e){
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(
                            new BadRequestDTO(
                                    HttpStatus.CONFLICT,
                                    "Task already exists"
                            )
                    );
        }
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(TaskDTO.create(newtask));
    }

    @GetMapping("/all/{userId}/{listId}")
    public ResponseEntity<?> getTaskList (@PathVariable UUID userId, @PathVariable long listId) {
        if (taskListService.existsByIdAndUserId(listId, userId)){
            return invalidTaskList();
        }
        List<Task> tasks = taskService.getTasksByListId(listId);
        return ResponseEntity
                .ok()
                .body(
                        TasksByIdResponseDTO.create(
                                tasks, userId, listId
                        )
                );
    }

    private ResponseEntity<BadRequestDTO> invalidTaskList(){
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(new BadRequestDTO(
                        HttpStatus.NOT_FOUND,
                        "TaskList does not exist"));
    }
}
