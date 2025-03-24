package tmanZA10.todo.to_do_app.service;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import tmanZA10.todo.to_do_app.dto.request.NewTaskRequestDTO;
import tmanZA10.todo.to_do_app.exceptions.DuplicateTastException;
import tmanZA10.todo.to_do_app.model.Task;
import tmanZA10.todo.to_do_app.model.TaskList;
import tmanZA10.todo.to_do_app.repository.TaskRepository;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task addTask(NewTaskRequestDTO request) throws DuplicateTastException {
        TaskList taskList = new TaskList();
        taskList.setId(request.getTaskListId());
        Task task = new Task();
        task.setTask(request.getTask());
        task.setDueDate(request.getDueDate());
        task.setDueTime(request.getDueTime());
        task.setPriority(request.getPriority());
        task.setCompleted(false);
        task.setTaskList(taskList);
        try{
            return taskRepository.save(task);
        }catch (DataIntegrityViolationException x){
            throw new DuplicateTastException();
        }
    }

    public List<Task> getTasksByListId(long listId) {
        return taskRepository.findAllByTaskListId(listId);
    }

    public boolean taskExists(long taskId, long listId) {
        return taskRepository.existsByIdAndTaskListId(taskId, listId);
    }

    public Task completeTask(long taskId){
        Task task = taskRepository.findById(taskId).get();
        task.setCompleted(true);
        return taskRepository.save(task);
    }

    public void deleteTask(long taskId){
        taskRepository.deleteById(taskId);
    }
}
