package tmanZA10.todo.to_do_app.model;

import jakarta.persistence.*;

@Entity
@Table( uniqueConstraints = {
        @UniqueConstraint(
                columnNames = {"user_id", "list_name"}
        )
})
public class TaskList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "list_name", nullable = false)
    private String listName;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public TaskList() {
    }

    public TaskList( String listName, User user) {
        this.listName = listName;
        this.user = user;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
