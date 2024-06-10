package edu.fra.uas.graphgl.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

import edu.fra.uas.graphgl.model.User;
import edu.fra.uas.graphgl.service.UserService;

@Controller
@SchemaMapping(typeName="User")
public class UserController {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @QueryMapping(name = "users")
    public Iterable<User> getAllUsers() {
        return this.userService.getAllUsers();
    }

    @QueryMapping(name = "userById")
    public User userById(@Argument Long id) {
        return this.userService.getUserById(id);
    }

    @MutationMapping
    public User addUser(@Argument String firstName, @Argument String lastName, @Argument String email,
            @Argument String password) {
        User user = new User(-1, "USER", firstName, lastName, email, password);
        LOGGER.info("Create user: {}", user);

        return this.userService.createUser(user);
    }

    @MutationMapping
    public User updateUser(@Argument Long id, @Argument String firstName, @Argument String lastName,
            @Argument String email, @Argument String password) {
        User user = this.userService.getUserById(id);

        if (firstName != null && !firstName.isEmpty()) {
            user.setFirstName(firstName);
        }

        if (lastName != null && !lastName.isEmpty()) {
            user.setLastName(lastName);
        }

        if (email != null && !email.isEmpty()) {
            user.setEmail(email);
        }

        if (password != null && !password.isEmpty()) {
            user.setPassword(password);
        }

        return this.userService.updateUser(user);
    }

    @MutationMapping
    public String deleteUser(@Argument Long id) {
        if (this.userService.getUserById(id) != null) {
            this.userService.deleteUser(id);
            return "User with id '" + id + "' is deleted";
        }
        return "User with id '" + id + "' does not exist.";
    }
}