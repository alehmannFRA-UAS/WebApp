package edu.fra.uas.user.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import edu.fra.uas.user.model.User;
import edu.fra.uas.user.service.UserService;
import jakarta.annotation.PostConstruct;

@Component
public class InitData {
     private final Logger log = LoggerFactory.getLogger(InitData.class);
    
    @Autowired
    UserService userService;

    @PostConstruct
    public void init() {
        log.debug("### Initialize Data ###");

        log.debug("create user admin");
        User user = new User();
        user.setRole("ADMIN");
        user.setFirstName("Administrator");
        user.setLastName("Administrator");
        user.setUsername("admin");
        user.setEmail("admin@example.com");
        user.setPassword("extremeSecurePassword1234");
        userService.create(user);

        log.debug("create user alice");
        user = new User();
        user.setRole("USER");
        user.setFirstName("Alice");
        user.setLastName("Adams");
        user.setUsername("alice");
        user.setEmail("alice@example.com");
        user.setPassword("alice1234");
        userService.create(user);

        log.debug("create user bob");
        user = new User();
        user.setRole("USER");
        user.setFirstName("Bob");
        user.setLastName("Builder");
        user.setUsername("bob");
        user.setEmail("bob@example.com");
        user.setPassword("bob1234");
        userService.create(user);

        log.debug("### Data initialized ###");
    }
    
}
