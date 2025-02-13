package tmanZA10.todo.to_do_app.service;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import tmanZA10.todo.to_do_app.dto.LogInResponseDTO;
import tmanZA10.todo.to_do_app.dto.UserInfoDTO;
import tmanZA10.todo.to_do_app.dto.LogInRequestDTO;
import tmanZA10.todo.to_do_app.exceptions.BadPasswordException;
import tmanZA10.todo.to_do_app.exceptions.UserNotFoundException;
import tmanZA10.todo.to_do_app.model.User;
import tmanZA10.todo.to_do_app.exceptions.EmailTakenException;
import tmanZA10.todo.to_do_app.exceptions.PasswordMissMatchException;
import tmanZA10.todo.to_do_app.dto.SignUpRequestDTO;
import tmanZA10.todo.to_do_app.repository.AuthRepository;
import tmanZA10.todo.to_do_app.security.PasswordHash;
import tmanZA10.todo.to_do_app.security.auth.JWTProvider;

import java.time.Instant;

@Service
public class AuthService {

    private AuthRepository repository;
    private PasswordHash passwordHash;
    private JWTProvider jwtProvider;

    public AuthService(AuthRepository repository, PasswordHash passwordHash, JWTProvider jwtProvider) {
        this.repository = repository;
        this.passwordHash = passwordHash;
        this.jwtProvider = jwtProvider;
    }

    public UserInfoDTO signUpNewUser(SignUpRequestDTO user) throws
                                                    PasswordMissMatchException,
                                                    EmailTakenException {
        if (!user.passwordEquality()) throw new PasswordMissMatchException();
        User registeredUser;

        try{
            registeredUser = repository.save(new User(user.getName(), user.getEmail(), passwordHash.hash(user.getPassword())));
        }catch (DataIntegrityViolationException e){
            throw new EmailTakenException();
        }
        return new UserInfoDTO(registeredUser.getId(), registeredUser.getName(), registeredUser.getEmail());
    }

    public LogInResponseDTO signInUser(LogInRequestDTO logInRequestDTO) throws
                                                            UserNotFoundException,
                                                            BadPasswordException {
        User user = repository.findByEmail(logInRequestDTO.getEmail());
        if (user == null) throw new UserNotFoundException();
        if (!passwordHash.verify(logInRequestDTO.getPassword(), user.getPassword())) throw new BadPasswordException();
        Instant now = Instant.now();
        return new LogInResponseDTO(
                user.getId(),
                jwtProvider.generateAccessToken(user, now),
                jwtProvider.generateRefreshToken(user, now)
        );
    }
}
