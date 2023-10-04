package edu.fra.uas.user.controller;

import edu.fra.uas.user.common.HttpRequestHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import edu.fra.uas.user.model.Message;
import edu.fra.uas.user.model.Room;
import edu.fra.uas.user.model.User;
import edu.fra.uas.user.service.RoomService;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE })
@RestController
@RequestMapping(value = { "/rooms" })
public class RoomController implements RoomService {

    private static final Logger log = LoggerFactory.getLogger(RoomController.class);

    // Read the URL to the external API from a configuration file.
    @Value("${api.external.url.rooms}")
    String apiUrl;

    /**
     * This method handles GET requests to fetch all rooms.
     *
     * @return a list of all rooms as HTTP response
     */
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAll() {
        log.info("GET -> /rooms"); // Log the request.

        // Define the expected response type (List of rooms).
        ParameterizedTypeReference<List<Room>> responseType = new ParameterizedTypeReference<>() {
        };

        // Use HttpRequestHelper to send the request to the external API.
        return HttpRequestHelper.getRequestList(this.apiUrl, responseType);
    }

    /**
     * This method handles GET requests to fetch a specific room by its ID.
     *
     * @param id the room ID to fetch
     * @return the room object as HTTP response
     */
    @GetMapping(value = { "/{id}" }, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getById(@PathVariable("id") Long id) {
        // Define the expected response type (single room).
        ParameterizedTypeReference<Room> responseType = new ParameterizedTypeReference<>() {
        };

        // Use HttpRequestHelper to send the request to the external API and include the
        // room ID in the URI.
        return HttpRequestHelper.getRequest(apiUrl + "/" + id, responseType);
    }

    /**
     * This method handles POST requests to create a new room.
     *
     * @param room the room to create
     * @return the created room as HTTP response
     */
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> create(@RequestBody Room room) {
        log.info("POST -> /rooms -> {}", room); // Log the request with the room data.

        // Define the expected response type (single room).
        ParameterizedTypeReference<Room> responseType = new ParameterizedTypeReference<>() {
        };

        // Use HttpRequestHelper to send the POST request to the external API and pass
        // the created room as the request body.
        return HttpRequestHelper.postRequest(this.apiUrl, room, responseType);
    }

    /**
     * This method handles PUT requests to update an existing room.
     *
     * @param id   the room id to update
     * @param room the room to update
     * @return the updated room as HTTP response
     */
    @PutMapping(value = {
            "/{id}" }, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> update(@PathVariable("id") long id, @RequestBody Room room) {
        log.info("POST -> /rooms/{} -> {}", id, room); // Log the update request with the new room data.

        // Define the expected response type (single room).
        ParameterizedTypeReference<Room> responseType = new ParameterizedTypeReference<>() {
        };

        // Use HttpRequestHelper to send the PUT request to the external API and include
        // the room ID in the URI.
        return HttpRequestHelper.putRequest(this.apiUrl + '/' + id, room, responseType);
    }

    /**
     * This method handles DELETE requests to delete a room by its ID.
     *
     * @param id the room ID to delete
     * @return message as HTTP response
     */
    @DeleteMapping(value = { "/{id}" })
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        log.info("Delete: /rooms/{}", id); // Log the delete request with the ID of the room to be deleted.

        // Define the expected response type (single room).
        ParameterizedTypeReference<Room> responseType = new ParameterizedTypeReference<>() {
        };

        // Use HttpRequestHelper to send the DELETE request to the external API and
        // include the room ID in the URI.
        return HttpRequestHelper.deleteRequest(this.apiUrl + '/' + id, responseType);
    }

    /**
     * This method handles POST requests to join a room by room ID.
     *
     * @param roomId the room ID to join
     * @param user   the user to join
     * @return room as HTTP response
     */
    @PutMapping(value = {
            "/{id}/join" }, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Override
    public ResponseEntity<?> joinRoom(@PathVariable("id") Long roomId, @RequestBody User user) {
        log.info("POST: /rooms/{}/join", roomId); // Log the request to join a room.

        // Define the expected response type (single room).
        ParameterizedTypeReference<Room> responseType = new ParameterizedTypeReference<>() {
        };

        // Use HttpRequestHelper to send the POST request to join the room and include
        // the user data in the request body.
        return HttpRequestHelper.postRequest(this.apiUrl + '/' + roomId + "/join", user, responseType);
    }

    /**
     * This method handles GET requests to leave a room by room and user ID.
     *
     * @param roomId the id of the room
     * @param userId the id of the user
     * @return the room as HTTP response
     */
    @GetMapping(value = { "/{roomId}/leave/{userId}" }, produces = MediaType.APPLICATION_JSON_VALUE)
    @Override
    public ResponseEntity<?> leaveRoom(@PathVariable("roomId") Long roomId, @PathVariable("userId") Long userId) {
        log.info("POST: /rooms/{}/leave/{}", roomId, userId); // Log the request to leave a room.

        // Define the expected response type (single room).
        ParameterizedTypeReference<Room> responseType = new ParameterizedTypeReference<>() {
        };

        // Use HttpRequestHelper to send the GET request to leave the room and include
        // the user and room IDs in the URI.
        return HttpRequestHelper.getRequest(this.apiUrl + '/' + roomId + "/leave/" + userId, responseType);
    }

    /**
     * This method handles POST requests to send a message to a specific room by
     * room ID.
     *
     * @param roomId  the id of the room
     * @param message the message to send
     * @return room as HTTP response
     */
    @PostMapping(value = {
            "/{roomId}/messages" }, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Override
    public ResponseEntity<?> sendMessage(@PathVariable("roomId") Long roomId, @RequestBody Message message) {
        log.info("POST: /rooms/{}/messages -> {}", roomId, message); // Log the request to send a message.

        // Define the expected response type (single room).
        ParameterizedTypeReference<Room> responseType = new ParameterizedTypeReference<>() {
        };

        // Use HttpRequestHelper to send the POST request to send a message to the room
        // and include the message data in the request body.
        return HttpRequestHelper.postRequest(this.apiUrl + '/' + roomId + "/messages", message, responseType);
    }
}
