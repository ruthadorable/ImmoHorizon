package com.immohorizon.propertymanagement.services;


import com.immohorizon.propertymanagement.model.LoginRequest;
import com.immohorizon.propertymanagement.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.immohorizon.propertymanagement.repository.UserRepository;
import com.immohorizon.propertymanagement.request.RegisterRequest;
import java.util.List;


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
        User newUser = new User();
        user.setEmail(user.getEmail());
        user.setNom(user.getNom());
        user.setIdRole(user.getIdRole());
        user.setNoGsm(user.getNoGsm());
        // encrypt password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
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

    public String loginUser(LoginRequest loginRequest) {
        System.out.println("step 1: check null value");
        if (loginRequest.getEmail() == null || loginRequest.getPassword() == null) {
            throw new RuntimeException("Null email or password");
        }
        System.out.println("Step 2: find User by email");
        User user = userRepo.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User by email not found"));
        System.out.println("Encrypt password");
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
        try {
            System.out.println("Token:"+jwtService.generateToken(loginRequest.getEmail()));
            return jwtService.generateToken(loginRequest.getEmail());
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
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
        user.setNoGsm(request.noGsm);
        user.setIdRole(request.idRole);
        // encrypt password
        user.setPassword(passwordEncoder.encode(request.password));
        return userRepo.save(user);
    }
}
