package controller;

import model.LoginRequest;
import model.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import services.LoginService;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin
public class LoginController {

    @Autowired
    private LoginService loginService;
    @PostMapping("/onLogin")
    public ResponseEntity<LoginResponse> login(@ResponseBody LoginRequest request){
        LoginResponse response= new LoginResponse();
        response.setToken("Token Details");
        String result= loginService.doLogin(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }



}
