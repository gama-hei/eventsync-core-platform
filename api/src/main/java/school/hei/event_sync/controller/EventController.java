package school.hei.event_sync.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import school.hei.event_sync.dto.response.EventResponse;
import school.hei.event_sync.service.EventService;

import java.util.List;

@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @GetMapping
    public ResponseEntity<List<EventResponse>> listEvents() {
        return ResponseEntity.ok(eventService.listEvents());
    }

    @GetMapping("/{eventId}")
    public ResponseEntity<EventResponse> getEvent(@PathVariable String eventId) {
        return ResponseEntity.ok(eventService.getEventById(eventId));
    }
}