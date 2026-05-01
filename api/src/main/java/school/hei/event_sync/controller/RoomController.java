package school.hei.event_sync.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import school.hei.event_sync.dto.response.RoomResponse;
import school.hei.event_sync.dto.response.RoomSessionsResponse;
import school.hei.event_sync.service.RoomService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @GetMapping
    public ResponseEntity<List<RoomResponse>> listRooms() {
        return ResponseEntity.ok(roomService.listRooms());
    }

    @GetMapping("/{roomId}/sessions")
    public ResponseEntity<RoomSessionsResponse> getRoomSessions(@PathVariable UUID roomId) {
        return ResponseEntity.ok(roomService.getRoomSessions(roomId));
    }
}