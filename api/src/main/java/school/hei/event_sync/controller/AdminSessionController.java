package school.hei.event_sync.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import school.hei.event_sync.dto.request.AssignSpeakersRequest;
import school.hei.event_sync.dto.request.CreateSessionRequest;
import school.hei.event_sync.dto.request.UpdateSessionRequest;
import school.hei.event_sync.dto.response.SessionResponse;
import school.hei.event_sync.service.SessionService;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminSessionController {

    private final SessionService sessionService;

    @GetMapping("/sessions")
    public ResponseEntity<List<SessionResponse>> getAllSessions() {
        return ResponseEntity.ok(sessionService.getAllSessions());
    }

    @GetMapping("/sessions/{sessionId}")
    public ResponseEntity<SessionResponse> getSessionById(@PathVariable String sessionId) {
        return ResponseEntity.ok(sessionService.getSessionById(sessionId));
    }

    @GetMapping("/events/{eventId}/sessions")
    public ResponseEntity<List<SessionResponse>> getSessionsByEvent(@PathVariable String eventId) {
        return ResponseEntity.ok(sessionService.getSessionsByEvent(eventId));
    }

    @PostMapping("/events/{eventId}/sessions")
    public ResponseEntity<SessionResponse> createSession(@PathVariable String eventId,
                                                         @Valid @RequestBody CreateSessionRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(sessionService.createSession(eventId, request));
    }

    @PutMapping("/sessions/{sessionId}")
    public ResponseEntity<SessionResponse> updateSession(@PathVariable String sessionId,
                                                         @Valid @RequestBody UpdateSessionRequest request) {
        return ResponseEntity.ok(sessionService.updateSession(sessionId, request));
    }

    @DeleteMapping("/sessions/{sessionId}")
    public ResponseEntity<Void> deleteSession(@PathVariable String sessionId) {
        sessionService.deleteSession(sessionId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/sessions/{sessionId}/speakers")
    public ResponseEntity<SessionResponse> assignSpeakers(@PathVariable String sessionId,
                                                          @Valid @RequestBody AssignSpeakersRequest request) {
        return ResponseEntity.ok(sessionService.assignSpeakers(sessionId, request));
    }
}