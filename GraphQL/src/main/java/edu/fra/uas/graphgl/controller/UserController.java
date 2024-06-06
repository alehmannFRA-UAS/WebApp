package edu.fra.uas.graphgl.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import edu.fra.uas.graphgl.model.User;
import edu.fra.uas.graphgl.service.UserService;

@Controller
public class UserController {
    @Autowired
    private UserService userService;

    @QueryMapping(name = "userById")
    public User userById(@Argument Long id) {
        return this.userService.getUserById(id);
    }

}
