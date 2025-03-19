package tmanZA10.todo.to_do_app.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tmanZA10.todo.to_do_app.dto.error.BadRequestDTO;
import tmanZA10.todo.to_do_app.dto.request.NewTaskListRequestDTO;
import tmanZA10.todo.to_do_app.dto.response.TaskListsResponseDTO;
import tmanZA10.todo.to_do_app.exceptions.DuplicateListException;
import tmanZA10.todo.to_do_app.model.TaskList;
import tmanZA10.todo.to_do_app.service.AuthService;
import tmanZA10.todo.to_do_app.service.TaskListService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/tasklist")
public class TaskListController {

    private final TaskListService taskListService;
    private final AuthService authService;

    public TaskListController(TaskListService taskListService, AuthService authService) {
        this.taskListService = taskListService;
        this.authService = authService;
    }

    @PostMapping("/new")
    public ResponseEntity<?> createTaskList(
            @Valid @RequestBody NewTaskListRequestDTO requestDTO
            ){

        if (!authService.userExists(requestDTO.getUserId())) return invalidUser();

        List<TaskList> taskLists;
        try {
            taskLists= taskListService.addNewList(requestDTO);
        }catch (DuplicateListException x){
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(
                            new BadRequestDTO(
                                    HttpStatus.CONFLICT,
                                    "Task list already exists."
                            )
                    );
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(
                TaskListsResponseDTO.create(
                        taskLists, requestDTO.getUserId()
                )
        );

    }

    @GetMapping("/all/{userId}")
    public ResponseEntity<?> getAllTaskLists(@PathVariable UUID userId){

        if (!authService.userExists(userId)) return invalidUser();
        List<TaskList> taskLists = taskListService.getTaskListsByUserId(userId);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(TaskListsResponseDTO.create(
                        taskLists, userId
                ));
    }

    @DeleteMapping("delete/{userId}/{taskListId}")
    public ResponseEntity<?> deleteTaskList(
            @PathVariable UUID userId,
            @PathVariable long taskListId
    ) {
        if (taskListService.existsByIdAndUserId(taskListId, userId)){
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(
                            new BadRequestDTO(
                                    HttpStatus.NOT_FOUND,
                                    "Tasklist does not exist."
                            )
                    );
        }

        taskListService.deleteTaskList(taskListId);
        List<TaskList> allTaskLists = taskListService.getTaskListsByUserId(userId);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(
                        TaskListsResponseDTO.create(allTaskLists, userId)
                );
    }

    private ResponseEntity<BadRequestDTO> invalidUser() {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(new BadRequestDTO(
                        HttpStatus.NOT_FOUND,
                        "User not found."
                ));
    }
}
