package school.hei.event_sync.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import school.hei.event_sync.dto.response.LiveSessionResponse;
import school.hei.event_sync.dto.response.SessionResponse;
import school.hei.event_sync.service.SessionService;

import java.util.List;

@RestController
@RequestMapping("/sessions")
@RequiredArgsConstructor
public class SessionController {

    private final SessionService sessionService;

    @GetMapping
    public ResponseEntity<List<SessionResponse>> listSessions(
            @RequestParam(required = false) String eventId,
            @RequestParam(required = false) String roomId,
            @RequestParam(required = false) String speakerId,
            @RequestParam(required = false) Boolean live) {
        return ResponseEntity.ok(sessionService.listSessions(eventId, roomId, speakerId, live));
    }

    @GetMapping("/live")
    public ResponseEntity<List<LiveSessionResponse>> getLiveSessions() {
        return ResponseEntity.ok(sessionService.getLiveSessions());
    }

    @GetMapping("/{sessionId}")
    public ResponseEntity<SessionResponse> getSession(@PathVariable String sessionId) {
        return ResponseEntity.ok(sessionService.getSessionById(sessionId));
    }
}