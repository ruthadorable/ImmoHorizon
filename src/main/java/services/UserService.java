package services;


import model.LoginRequest;
import model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import repository.UserRepository;
import request.RegisterRequest;
import java.util.List;
import java.util.Optional;


@Service
public class UserService {
    @Autowired
    UserRepository userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;
    private static final Logger logger =
            LoggerFactory.getLogger(UserService.class);


    public User createUser(User user){
        logger.info("Creating user{user}");
        return userRepo.save(user);

    }
    public List<User>getUsers(){
        logger.info("Fetching all users");
        return userRepo.findAll();
    }

    public User getUser(int id){
        logger.info("Fetching user by id");
        return userRepo.getById(id);
    }
    public User getUserByEmail(String email){
        return userRepo.findByEmail(email)
        .orElseThrow(()-> new RuntimeException("Users not found"));
    }

    public String loginUser(LoginRequest loginRequest){
        User user = userRepo.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return jwtService.generateToken(loginRequest);

    }

    public User registerUser(RegisterRequest request) {

        // check if user already exists
        if (userRepo.findByEmail(request.email).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // create user
        User user = new User();
        user.setEmail(request.email);
        user.setNom(request.name);

        // encrypt password
        user.setPassword(passwordEncoder.encode(request.password));

        return userRepo.save(user);
    }
}
