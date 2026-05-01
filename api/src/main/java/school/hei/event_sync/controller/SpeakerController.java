package school.hei.event_sync.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import school.hei.event_sync.dto.response.SpeakerResponse;
import school.hei.event_sync.service.SpeakerService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/speakers")
@RequiredArgsConstructor
public class SpeakerController {

    private final SpeakerService speakerService;

    @GetMapping
    public ResponseEntity<List<SpeakerResponse>> listSpeakers() {
        return ResponseEntity.ok(speakerService.listSpeakers());
    }

    @GetMapping("/{speakerId}")
    public ResponseEntity<SpeakerResponse> getSpeaker(@PathVariable UUID speakerId) {
        return ResponseEntity.ok(speakerService.getSpeakerById(speakerId));
    }
}
