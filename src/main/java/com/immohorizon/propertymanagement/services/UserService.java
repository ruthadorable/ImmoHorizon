package com.immohorizon.propertymanagement.services;


import com.immohorizon.propertymanagement.dto.UpdateUserRequest;
import com.immohorizon.propertymanagement.dto.UserDto;
import com.immohorizon.propertymanagement.mapper.UserMapper;
import com.immohorizon.propertymanagement.model.LoginRequest;
import com.immohorizon.propertymanagement.model.LoginResponse;
import com.immohorizon.propertymanagement.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.immohorizon.propertymanagement.repository.UserRepository;
import com.immohorizon.propertymanagement.request.RegisterRequest;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Locale;


@Service
public class UserService {
    @Autowired
    UserRepository userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserMapper mapper;
    private static final Logger logger =
            LoggerFactory.getLogger(UserService.class);


    public User createUser(User user){
        logger.info("Creating user{user}");
        User newUser = new User();
        user.setEmail(user.getEmail());
        user.setNom(user.getNom());
        user.setRole(user.getRole());
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

    public LoginResponse login(String email, String password) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtService.generateToken(user);

        UserDto userDTO = new UserDto(
                user.getIdUser(),
                user.getRole(),
                user.getNom(),
                user.getPrenom(),
                user.getEmail(),
                user.getNoGsm()
        );

        return new LoginResponse(token, userDTO);
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
            System.out.println("Token:"+jwtService.generateToken(mapper.toEntity(loginRequest)));
            return jwtService.generateToken(mapper.toEntity(loginRequest));
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
        user.setNom(request.nom);
        user.setPrenom(request.prenom);
        user.setNoGsm(request.noGsm);
        user.setRole(request.role);
        // encrypt password
        user.setPassword(passwordEncoder.encode(request.password));
        return userRepo.save(user);
    }
    @Transactional(readOnly = true)
    public List<UserDto> getAllUsers() {
        return userRepo.findAll()
                .stream()
                .map(this.mapper::toDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public UserDto getUserById(int id) {
        return mapper.toDto(userRepo.getReferenceById(id));
    }
    public UserDto updateUser(
            int id,
            UpdateUserRequest request
    ) {
        User user = findUser(id);
        String email = normalizeEmail(request.email());

        userRepo.findAll().stream()
                .filter(existing -> existing.getIdUser() != id)
                .filter(existing -> existing.getEmail().equalsIgnoreCase(email))
                .findFirst()
                .ifPresent(existing -> {
                    throw new ResponseStatusException(
                            HttpStatus.CONFLICT,
                            "A user with this email already exists"
                    );
                });

        user.setPrenom(request.firstName().trim());
        user.setNom(request.lastName().trim());
        user.setEmail(email);
        //user.setRole(validateRole(request.role()));


        return mapper.toDto(userRepo.save(user));
    }

    public void deleteUser(int id) {
        User user = findUser(id);
        userRepo.delete(user);
    }

    private User findUser(int id) {
        return userRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));
    }

    private String normalizeEmail(String email) {
        return email.trim().toLowerCase(Locale.ROOT);
    }

    private String validateRole(String role) {
        String normalized = role.trim().toUpperCase(Locale.ROOT);

        // Adapt these values to the roles defined in your application.
        if (!List.of("USER", "EMPLOYE", "ADMIN").contains(normalized)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid user role"
            );
        }

        return normalized;
    }

}
