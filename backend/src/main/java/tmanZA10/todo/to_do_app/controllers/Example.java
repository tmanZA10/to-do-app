package tmanZA10.todo.to_do_app.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
class Example {

    @GetMapping("/")
    public String root(){
        return "Hello from SpringBoot";
    }
}
