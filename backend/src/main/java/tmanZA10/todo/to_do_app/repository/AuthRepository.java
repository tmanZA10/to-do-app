package tmanZA10.todo.to_do_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tmanZA10.todo.to_do_app.model.User;

import java.util.UUID;

@Repository
public interface AuthRepository extends JpaRepository<User, UUID> {

    User findByEmail(String email);
}
