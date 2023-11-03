package edu.fra.uas.user.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.fra.uas.user.model.User;
import edu.fra.uas.user.model.UserDTO;
import edu.fra.uas.user.repository.UserRepository;

/**
 * This class represents the service for the user.
 */
@Service
public class UserService {

    private static final Logger log = org.slf4j.LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    private long nextUserId = 1;

    public User createUser(User user) {
        user.setId(nextUserId++);
        log.debug("createUser: {}", user);
        userRepository.put(user.getId(), user);
        return userRepository.get(user.getId());
    }

    public Iterable<User> getAllUsers() {
        log.debug("getAllUsers");
        return userRepository.values();
    }

    public User getUserById(long id) {
        log.debug("getUser: {}", id);
        return userRepository.get(id);
    }

    public User updateUser(User user) {
        log.debug("updateUser: {}", user);
        userRepository.put(user.getId(), user);
        return userRepository.get(user.getId());
    }

    public User deleteUser(long id) {
        log.debug("deleteUser: {}", id);
        return userRepository.remove(id);
    }

    public List<UserDTO> getAllUsersDTO() {
        log.debug("getAllUsersDTO");
        Iterable<User> userIter = this.getAllUsers();
        List<User> usersOrigList = new ArrayList<>();
        for (User user : userIter) {
            usersOrigList.add(user);
        }
        List<UserDTO> usersTargetList = new ArrayList<>();
        for (User source : usersOrigList) {
            UserDTO target = new UserDTO();
            BeanUtils.copyProperties(source, target);
            usersTargetList.add(target);
        }
        return usersTargetList;
    }

}
