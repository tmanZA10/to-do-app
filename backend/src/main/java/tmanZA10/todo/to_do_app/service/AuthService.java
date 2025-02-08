package tmanZA10.todo.to_do_app.service;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import tmanZA10.todo.to_do_app.dto.LoggedInUserDTO;
import tmanZA10.todo.to_do_app.dto.UserInfoDTO;
import tmanZA10.todo.to_do_app.dto.UserLoginDTO;
import tmanZA10.todo.to_do_app.exceptions.BadPasswordException;
import tmanZA10.todo.to_do_app.exceptions.UserNotFoundException;
import tmanZA10.todo.to_do_app.model.User;
import tmanZA10.todo.to_do_app.exceptions.EmailTakenException;
import tmanZA10.todo.to_do_app.exceptions.PasswordMissMatchException;
import tmanZA10.todo.to_do_app.dto.UserSignUpDTO;
import tmanZA10.todo.to_do_app.repository.AuthRepository;
import tmanZA10.todo.to_do_app.security.PasswordHash;
import tmanZA10.todo.to_do_app.security.auth.JWTProvider;

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

    public UserInfoDTO signUpNewUser(UserSignUpDTO user) throws
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

    public LoggedInUserDTO  signInUser(UserLoginDTO userLoginDTO) throws
                                                            UserNotFoundException,
                                                            BadPasswordException {
        User user = repository.findByEmail(userLoginDTO.getEmail());
        if (user == null) throw new UserNotFoundException();
        if (!passwordHash.verify(userLoginDTO.getPassword(), user.getPassword())) throw new BadPasswordException();

        return new LoggedInUserDTO(user.getId(), jwtProvider.generateToken(user));
    }
}
