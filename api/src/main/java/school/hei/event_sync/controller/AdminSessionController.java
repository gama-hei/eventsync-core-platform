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

import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class AdminSessionController {

    private final SessionService sessionService;

    @PostMapping("/admin/events/{eventId}/sessions")
    public ResponseEntity<SessionResponse> createSession(@PathVariable UUID eventId,
                                                         @Valid @RequestBody CreateSessionRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(sessionService.createSession(eventId, request));
    }

    @PutMapping("/admin/sessions/{sessionId}")
    public ResponseEntity<SessionResponse> updateSession(@PathVariable UUID sessionId,
                                                         @Valid @RequestBody UpdateSessionRequest request) {
        return ResponseEntity.ok(sessionService.updateSession(sessionId, request));
    }

    @DeleteMapping("/admin/sessions/{sessionId}")
    public ResponseEntity<Void> deleteSession(@PathVariable UUID sessionId) {
        sessionService.deleteSession(sessionId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/admin/sessions/{sessionId}/speakers")
    public ResponseEntity<SessionResponse> assignSpeakers(@PathVariable UUID sessionId,
                                                          @Valid @RequestBody AssignSpeakersRequest request) {
        return ResponseEntity.ok(sessionService.assignSpeakers(sessionId, request));
    }
}