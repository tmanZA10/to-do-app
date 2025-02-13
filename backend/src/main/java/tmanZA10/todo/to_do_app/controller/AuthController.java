package tmanZA10.todo.to_do_app.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
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
@RequestMapping("/auth")
class AuthController {

    private AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("/signup")
    @CrossOrigin
    public ResponseEntity<?> signUpUser(@Valid @RequestBody SignUpRequestDTO user){
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
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(
                            new BadRequestDTO(
                                    HttpStatus.CONFLICT,
                                    "Email already taken"
                            )
                    );
        }
        return ResponseEntity.status(HttpStatus.OK).body(registered);

    }

    @PostMapping("/login")
    @CrossOrigin
    public ResponseEntity<?> loginUser(@Valid @RequestBody LogInRequestDTO logInRequestDTO,
                                       HttpServletResponse response){
        LogInResponseDTO loggedInUser;
        try {
            loggedInUser = service.signInUser(logInRequestDTO);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>(new BadRequestDTO(
                    HttpStatus.NOT_FOUND,
                    "User not found."
            ), HttpStatus.NOT_FOUND);
        }catch (BadPasswordException x){
            return new ResponseEntity<>(
                    new BadRequestDTO(
                            HttpStatus.UNAUTHORIZED,
                            "Password is invalid."
                    ),
                    HttpStatus.UNAUTHORIZED
            );
        }

        Cookie tokenCookie = new Cookie("refreshToken", loggedInUser.getRefreshToken());
        tokenCookie.setHttpOnly(true);
        tokenCookie.setSecure(false);
        tokenCookie.setPath("/");
//        tokenCookie.setMaxAge();


        response.addCookie(tokenCookie);

        return new ResponseEntity<>(loggedInUser, HttpStatus.OK);
    }

}
