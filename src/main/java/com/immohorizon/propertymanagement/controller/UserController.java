package com.immohorizon.propertymanagement.controller;


import com.immohorizon.propertymanagement.model.LoginRequest;
import com.immohorizon.propertymanagement.model.LoginResponse;
import com.immohorizon.propertymanagement.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.immohorizon.propertymanagement.request.RegisterRequest;
import com.immohorizon.propertymanagement.services.UserService;
import java.util.List;

//@CrossOrigin(origins = "http://localhost:4200")
@CrossOrigin(origins="http://immohorizon-demo.s3-website-us-east-1.amazonaws.com")
@RestController
@RequestMapping("/api/auth")
public class UserController {
    public UserController(){

    }
    @Autowired
    UserService userService;
    private static final Logger logger =
            LoggerFactory.getLogger(UserService.class);

    @PostMapping(path="/addUser")
    public User createUser(@RequestBody User user)
    {
        logger.info("Creating user");
        return  userService.createUser(user);
    }
    @GetMapping(path="/users")
    public List<User> getUsers()
    {
        logger.info("Get all users");
        return userService.getUsers();
    }

    @GetMapping(path="user/:id")
    public User getUser(int id){
        logger.info("Get user by id", id);
        return userService.getUser(id);
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {

        LoginResponse response = userService.login(
                request.getEmail(),
                request.getPassword()
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping(path="/register")
    public User registerUser(@RequestBody RegisterRequest request) {
        return userService.registerUser(request);
    }

}
