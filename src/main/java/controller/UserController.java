package controller;


import lombok.extern.slf4j.Slf4j;
import model.LoginRequest;
import model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;
import request.RegisterRequest;
import services.UserService;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1")
public class UserController {
    public UserController(){

    }
    @Autowired
    UserService userService;
    @PostMapping(path="/addUser")
    public User createUser(@RequestBody User user)
    {
        log.info("Creating user");

        return  userService.createUser(user);
    }
    @GetMapping(path="/users")
    public List<User> getUsers()
    {
        log.info("Get all users");
        return userService.getUsers();
    }

    @GetMapping(path="user/:id")
    public User getUser(int id){
        log.info("Get user by id", id);
        return userService.getUser(id);
    }
    @PostMapping("/loginUser")
    public String loginUser(@RequestBody LoginRequest loginRequest){

        return userService.loginUser(loginRequest);
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody RegisterRequest request) {
        return userService.registerUser(request);
    }

}
