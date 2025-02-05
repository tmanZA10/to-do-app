package tmanZA10.todo.to_do_app.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tmanZA10.todo.to_do_app.dto.BadRequestDTO;
import tmanZA10.todo.to_do_app.exceptions.EmailTakenException;
import tmanZA10.todo.to_do_app.exceptions.PasswordMissMatchException;
import tmanZA10.todo.to_do_app.dto.UserInfoDTO;
import tmanZA10.todo.to_do_app.dto.UserSignUpDTO;
import tmanZA10.todo.to_do_app.service.AuthService;

@RestController
@RequestMapping("/api/v1/")
class AuthController {

    private AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("signup")
    public ResponseEntity<?> signUpUser(@Valid @RequestBody UserSignUpDTO user){
        UserInfoDTO registered;
        try{
            registered = service.saveNewUser(user);
        }catch (PasswordMissMatchException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(
                            new BadRequestDTO(
                                    HttpStatus.BAD_REQUEST,
                                    "Passwords do not match."
                            )
                    );
        }catch (EmailTakenException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(
                            new BadRequestDTO(
                                    HttpStatus.BAD_REQUEST,
                                    "Email already taken"
                            )
                    );
        }
        return ResponseEntity.status(HttpStatus.OK).body(registered);

    }
}
