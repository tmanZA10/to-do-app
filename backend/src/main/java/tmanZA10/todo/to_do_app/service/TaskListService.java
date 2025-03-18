package tmanZA10.todo.to_do_app.service;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import tmanZA10.todo.to_do_app.dto.request.NewTaskListRequestDTO;
import tmanZA10.todo.to_do_app.exceptions.DuplicateListException;
import tmanZA10.todo.to_do_app.model.TaskList;
import tmanZA10.todo.to_do_app.model.User;
import tmanZA10.todo.to_do_app.repository.TaskListRepository;

import java.util.List;
import java.util.UUID;

@Service
public class TaskListService {

    private final TaskListRepository repo;

    public TaskListService(TaskListRepository repo) {
        this.repo = repo;
    }

    public List<TaskList> addNewList(NewTaskListRequestDTO data) throws DuplicateListException {
        User user = new User(data.getUserId());
        TaskList taskList = new TaskList(data.getListName(), user);
        try{
            repo.save(taskList);
        }catch (DataIntegrityViolationException e){
            throw new DuplicateListException();
        }
        return repo.findAllByUserId(user.getId());
    }

    public List<TaskList> getTaskListsByUserId(UUID userId) {
        return repo.findAllByUserId(userId);
    }

    public boolean existsByIdAndUserId(long id, UUID userId) {
        return !repo.existsByIdAndUserId(id, userId);
    }

}
