package controller;


import lombok.extern.slf4j.Slf4j;
import model.LoginRequest;
import model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;
import request.RegisterRequest;
import services.UserService;
import java.util.List;


@RestController
@RequestMapping("/api/v1")
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
    @PostMapping("/loginUser")
    public String loginUser(@RequestBody LoginRequest loginRequest){

        return userService.loginUser(loginRequest);
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody RegisterRequest request) {
        return userService.registerUser(request);
    }

}
