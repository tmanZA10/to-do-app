package tmanZA10.todo.to_do_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tmanZA10.todo.to_do_app.model.Task;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findAllByTaskListId(long id);
}
