package tmanZA10.todo.to_do_app.service;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import tmanZA10.todo.to_do_app.dto.UserInfoDTO;
import tmanZA10.todo.to_do_app.model.User;
import tmanZA10.todo.to_do_app.exceptions.EmailTakenException;
import tmanZA10.todo.to_do_app.exceptions.PasswordMissMatchException;
import tmanZA10.todo.to_do_app.dto.UserSignUpDTO;
import tmanZA10.todo.to_do_app.repository.AuthRepository;
import tmanZA10.todo.to_do_app.security.PasswordHash;

@Service
public class AuthService {

    private AuthRepository repository;
    private PasswordHash passwordHash;

    public AuthService(AuthRepository repository, PasswordHash passwordHash) {
        this.repository = repository;
        this.passwordHash = passwordHash;
    }

    public UserInfoDTO saveNewUser(UserSignUpDTO user) throws PasswordMissMatchException,
                                                    EmailTakenException
    {
        if (!user.passwordEquality()) throw new PasswordMissMatchException();
        User registeredUser;

        try{
            registeredUser = repository.save(new User(user.getName(), user.getEmail(), passwordHash.hash(user.getPassword())));
        }catch (DataIntegrityViolationException e){
            throw new EmailTakenException();
        }
        return new UserInfoDTO(registeredUser.getId(), registeredUser.getName(), registeredUser.getEmail());
    }
}
