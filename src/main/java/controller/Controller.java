package controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class Controller {


    @GetMapping("/get")
    public @ResponseBody ResponseEntity <String>get()
    {
        return new ResponseEntity<String>( "Get Response", HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public @ResponseBody ResponseEntity<String> getById(@RequestParam String id)
    {
        return new ResponseEntity<String>("Get ID Response", HttpStatus.OK);
    }

    @PostMapping("/post")
    public @ResponseBody ResponseEntity <String>post()
    {
        return new ResponseEntity<String>("Post Response",HttpStatus.OK);
    }

    @PutMapping("/put")
    public @ResponseBody ResponseEntity<String> put()
    {
        return new ResponseEntity<String>("Put Response",HttpStatus.OK);
    }
    @PatchMapping("/patch")
    public @ResponseBody ResponseEntity<String> patch()
    {
         return new ResponseEntity<String>("Patch Response", HttpStatus.OK);
    }

}
