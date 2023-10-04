package edu.fra.uas.user.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.fra.uas.user.model.User;
import edu.fra.uas.user.repository.UserRepository;

@Service
public class UserService {
    private static final Logger log = LoggerFactory.getLogger(UserService.class);
    private Long nextUserId = 1L;

    @Autowired
    private UserRepository userRepository;

    public User create(User user) {
        log.info("createUser: {}", user);
        user.setId(this.nextUserId++);
        this.userRepository.put(user.getId(), user);
        return user;
    }

    public Iterable<User> getAll() {
        log.info("getAllUsers");
        return this.userRepository.values();
    }

    public User getById(Long id) {
        log.info("get user by id: {}", id);
        return this.userRepository.get(id);
    }

    public User getByUsername(String username) {
        log.info("get user by username: {}", username);
        User user = null;
        for (User item : this.userRepository.values()) {
            if (item.getUsername().equalsIgnoreCase(username)) {
                user = item;
                break;
            }
        }
        return user;
    }

    public User update(User user) {
        log.info("update user: {}", user);
        this.userRepository.put(user.getId(), user);
        return user;
    }

    public void delete(Long id) {
        log.info("delete user: {}", id);
        this.userRepository.remove(id);
    }

}
