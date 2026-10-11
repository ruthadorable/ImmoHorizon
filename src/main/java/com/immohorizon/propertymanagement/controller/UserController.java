package com.immohorizon.propertymanagement.controller;

import com.immohorizon.propertymanagement.model.LoginRequest;
import com.immohorizon.propertymanagement.model.LoginResponse;
import com.immohorizon.propertymanagement.model.User;
import com.immohorizon.propertymanagement.request.RegisterRequest;
import com.immohorizon.propertymanagement.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins="${FRONTEND_URL}")
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
    @GetMapping(path="/all")
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

    @DeleteMapping(path="delete/{id}")
    public ResponseEntity<Void> deleteUser(
            @PathVariable int id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

}