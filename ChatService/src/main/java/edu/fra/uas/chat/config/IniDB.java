package edu.fra.uas.chat.config;

import org.springframework.stereotype.Component;

import edu.fra.uas.chat.model.Room;
import edu.fra.uas.chat.service.RoomService;
import jakarta.annotation.PostConstruct;

@Component
public class IniDB {
    private final RoomService roomService;

    public IniDB(RoomService roomService) {
        this.roomService = roomService;
    }

    @PostConstruct
    public void iniDB() {
        this.roomService.create(new Room("API: Allgemeiner Chat"));
        this.roomService.create(new Room("API: Technik-Diskussion"));
        this.roomService.create(new Room("API: Offenes Forum"));
    }
}
