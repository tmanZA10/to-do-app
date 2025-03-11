package tmanZA10.todo.to_do_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tmanZA10.todo.to_do_app.model.TaskList;

import java.util.List;
import java.util.UUID;

@Repository
public interface TaskListRepository extends JpaRepository<TaskList, Long> {

    List<TaskList> findAllByUserId(UUID userId);
}
