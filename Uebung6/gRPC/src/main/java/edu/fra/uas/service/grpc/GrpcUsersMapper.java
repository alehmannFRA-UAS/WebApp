package edu.fra.uas.service.grpc;

// compiled class (generated by the protoc compiler) is imported
import edu.fra.uas.grpc.UsersServiceOuterClass;

import edu.fra.uas.model.User;

public class GrpcUsersMapper {

    public static UsersServiceOuterClass.UserProto mapUserToProto(User user) {
        return UsersServiceOuterClass.UserProto.newBuilder()
                .setId(user.getId())
                .setRole(user.getRole())
                .setFirstName(user.getFirstName())
                .setLastName(user.getLastName())
                .setEmail(user.getEmail())
                .setPassword(user.getPassword())
                .build();
    }

    public static User mapProtoToUser(UsersServiceOuterClass.UserProto userProto) {
        return new User(userProto.getId(), 
                        userProto.getRole(), 
                        userProto.getFirstName(), 
                        userProto.getLastName(), 
                        userProto.getEmail(), 
                        userProto.getPassword());
    }

}
