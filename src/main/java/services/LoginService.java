package services;

import model.LoginRequest;
import model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repository.LoginRepository;

import java.util.Optional;

@Service
public class LoginService {
    @Autowired
    private LoginRepository loginRepository;


    private String doLogin(LoginRequest request){
        Optional<User> users =loginRepository.findByEmail(request.getEmail()) ;
        if(users.isPresent()){
            return "User details found";
        }
        return "User details not found";

    }

    setToken()
    {

    }
}
