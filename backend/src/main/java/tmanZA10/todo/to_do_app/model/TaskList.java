package tmanZA10.todo.to_do_app.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = {"list_name", "user_id"})
})
public class TaskList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false)
    private String listName;
    @Column(nullable = false)
    private List<String> tasks = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User owner;

    public TaskList() {
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

    public List<String> getTasks() {
        return tasks;
    }

    public void setTasks(List<String> tasks) {
        this.tasks = tasks;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    @Override
    public String toString() {
        return "TaskList{" +
                "id=" + id +
                ", listName='" + listName + '\'' +
                ", tasks=" + tasks +
                ", owner=" + owner +
                '}';
    }
}
