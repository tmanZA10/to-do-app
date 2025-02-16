package tmanZA10.todo.to_do_app.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tmanZA10.todo.to_do_app.ConfigProperties.SecurityConfigProperties;
import tmanZA10.todo.to_do_app.dto.*;
import tmanZA10.todo.to_do_app.exceptions.*;
import tmanZA10.todo.to_do_app.service.AuthService;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService service;
    private final SecurityConfigProperties securityConfig;
    public static final String refreshCookieName = "refresh_token";
    public static final String userIdCookieName = "user_id";
    public static final String emailCookieName = "todo_user_email_cookie";



    public AuthController(AuthService service, SecurityConfigProperties securityConfig) {
        this.service = service;
        this.securityConfig = securityConfig;
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

        Cookie tokenCookie, userIdCookie, userEmailCookie;

        tokenCookie = new Cookie(refreshCookieName, loggedInUser.getRefreshToken());
        tokenCookie.setHttpOnly(true);
        tokenCookie.setSecure(securityConfig.isSecureCookies());
        tokenCookie.setPath("/");
//        tokenCookie.setMaxAge();

        userIdCookie = new Cookie(userIdCookieName, loggedInUser.getUserId().toString());
        userIdCookie.setHttpOnly(true);
        userIdCookie.setSecure(securityConfig.isSecureCookies());
        userIdCookie.setPath("/");

        userEmailCookie = new Cookie(emailCookieName, logInRequestDTO.getEmail());
        userIdCookie.setHttpOnly(true);
        userIdCookie.setSecure(securityConfig.isSecureCookies());
        userIdCookie.setPath("/");


        response.addCookie(tokenCookie);
        response.addCookie(userIdCookie);
        response.addCookie(userEmailCookie);

        return new ResponseEntity<>(loggedInUser, HttpStatus.OK);
    }

    @GetMapping("/refresh")
    public ResponseEntity<?> getToken(
            @CookieValue(value = refreshCookieName) String token,
            @CookieValue(value = userIdCookieName) UUID userId,
            @CookieValue(value = emailCookieName) String email
            ) {
        String accessToken;

        try{
            accessToken = service.getNewAccessToken(token, userId, email);
        } catch (InvalidTokenException e) {
            return new ResponseEntity<>(
                    new BadRequestDTO(
                            HttpStatus.UNAUTHORIZED,
                            "Refresh token is invalid."
                    ),
                    HttpStatus.UNAUTHORIZED
            );
        }catch (ExpiredTokenException e) {
            return new ResponseEntity<>(
                    new BadRequestDTO(
                            HttpStatus.UNAUTHORIZED,
                            "Refresh token has expired."
                    ),
                    HttpStatus.UNAUTHORIZED
            );
        }
        catch (UserNotFoundException e) {
            return new ResponseEntity<>(new BadRequestDTO(
                    HttpStatus.NOT_FOUND,
                    "User not found."
            ), HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(
                Map.of("accessToken", accessToken),
                HttpStatus.OK
        );
    }

}
