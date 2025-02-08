package tmanZA10.todo.to_do_app.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tmanZA10.todo.to_do_app.dto.*;
import tmanZA10.todo.to_do_app.exceptions.BadPasswordException;
import tmanZA10.todo.to_do_app.exceptions.EmailTakenException;
import tmanZA10.todo.to_do_app.exceptions.PasswordMissMatchException;
import tmanZA10.todo.to_do_app.exceptions.UserNotFoundException;
import tmanZA10.todo.to_do_app.service.AuthService;

@RestController
@RequestMapping("/api/v1/")
@CrossOrigin
class AuthController {

    private AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("signup")
    public ResponseEntity<?> signUpUser(@Valid @RequestBody UserSignUpDTO user){
        UserInfoDTO registered;
        try{
            registered = service.signUpNewUser(user);
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

    @PostMapping("login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody UserLoginDTO userLoginDTO){
        LoggedInUserDTO loggedInUser;
        try {
            loggedInUser = service.signInUser(userLoginDTO);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }catch (BadPasswordException x){
            return new ResponseEntity<>("Bad password", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(loggedInUser, HttpStatus.OK);
    }

}
