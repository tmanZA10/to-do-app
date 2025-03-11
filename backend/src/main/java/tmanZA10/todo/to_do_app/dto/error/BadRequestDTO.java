package tmanZA10.todo.to_do_app.dto.error;

import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

public class BadRequestDTO {

    private LocalDateTime dateTime;
    private HttpStatus status;
    private String message;

    protected BadRequestDTO() {
    }

    public BadRequestDTO( HttpStatus status, String message) {
        this.dateTime = LocalDateTime.now();
        this.status = status;
        this.message = message;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
