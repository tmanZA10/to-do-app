package tmanZA10.todo.to_do_app.service;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import tmanZA10.todo.to_do_app.exceptions.ListExistsException;
import tmanZA10.todo.to_do_app.model.TaskList;
import tmanZA10.todo.to_do_app.repository.TaskListRepository;

import java.util.List;
import java.util.UUID;

@Service
public class TaskListService {

    private final TaskListRepository taskListRepository;

    public TaskListService(TaskListRepository taskListRepository) {
        this.taskListRepository = taskListRepository;
    }

    public TaskList save(TaskList taskList) throws ListExistsException {
        try{
            return taskListRepository.save(taskList);
        }catch (DataIntegrityViolationException e){
            throw new ListExistsException();
        }
    }

    public List<TaskList> findByUserId(UUID id){
        return taskListRepository.findAllByOwnerId(id);
    }

    public void deleteListById(Long id){
        taskListRepository.deleteById(id);
    }

    public boolean existsById(Long id){
        return taskListRepository.existsById(id);
    }
}
