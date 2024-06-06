package edu.fra.uas.graphgl.repository;

import java.util.HashMap;

import org.springframework.stereotype.Repository;

import edu.fra.uas.graphgl.model.User;

@Repository
public class UserRepository extends HashMap<Long, User> {
    
}
