package edu.fra.uas.user.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.fra.uas.user.model.User;
import edu.fra.uas.user.service.UserService;

@RestController
@RequestMapping(value = {"/users"})
public class UserController {

    // Logger for logging requests
    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    // Autowire the UserService for handling user-related operations
    @Autowired
    private UserService userService;

    /**
     * Handle GET requests to fetch all users
     *
     * @return a list of all users
     */
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<User>> getAll() {
        log.info("Get -> /users"); // Log the request.

        // Fetch all users from the UserService.
        Iterable<User> usersIterable = this.userService.getAll();

        // Convert the iterable of users into a list for the response.
        List<User> users = new ArrayList<>();
        for (User user : usersIterable) {
            users.add(user);
        }

        // Return the list of users as a JSON response with HTTP status OK.
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    /**
     * Handle GET requests to fetch a user by their ID
     *
     * @param id the ID of the user
     * @return a JSON response with user and HTTP status OK
     */
    @GetMapping(value = {"/{username}"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> getByUsername(@PathVariable("username") String username) {
        log.info("Get -> /users/{}", username); // Log the request with the user's ID.

        // Fetch the user by their ID from the UserService.
        User user = this.userService.getByUsername(username);

        // Return the user as a JSON response with HTTP status OK.
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    /**
     * Handle POST requests to create a new user
     *
     * @param user the user to create
     * @return a JSON response with a created user and HTTP status Created
     */
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> create(@RequestBody User user) {
        log.info("Post -> /users"); // Log the request.

        // Create the user using the UserService.
        user = this.userService.create(user);

        // Return the created user as a JSON response with HTTP status CREATED.
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    /**
     * Handle PUT requests to update an existing user
     *
     * @param user the user to update
     * @return the updated user as a JSON response with HTTP status ACCEPTED
     */
    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> update(@RequestBody User user) {
        log.info("Put -> /users"); // Log the request.

        // Update the user using the UserService.
        user = this.userService.update(user);

        // Return the updated user as a JSON response with HTTP status ACCEPTED.
        return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
    }

    /**
     * Handle DELETE requests to delete a user by their ID
     *
     * @param id the ID of the user
     * @return a JSON response with HTTP status ACCEPTED
     */
    @DeleteMapping(value = {"/{id}"})
    public ResponseEntity<String> delete(@PathVariable("id") Long id) {
        log.info("Delete -> /users/{}", id); // Log the request with the user's ID.

        // Delete the user by their ID using the UserService.
        this.userService.delete(id);

        // Return a response message indicating that the user is deleted with HTTP status ACCEPTED.
        return new ResponseEntity<>("User is deleted", HttpStatus.ACCEPTED);
    }
}
