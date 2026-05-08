package school.hei.event_sync.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import school.hei.event_sync.dto.request.CreateSpeakerRequest;
import school.hei.event_sync.dto.request.UpdateSpeakerRequest;
import school.hei.event_sync.dto.response.SpeakerResponse;
import school.hei.event_sync.service.SpeakerService;

import java.util.List;

@RestController
@RequestMapping("/admin/speakers")
@RequiredArgsConstructor
public class AdminSpeakerController {

    private final SpeakerService speakerService;

    @GetMapping
    public ResponseEntity<List<SpeakerResponse>> getAllSpeakers() {
        return ResponseEntity.ok(speakerService.listSpeakers());
    }

    @GetMapping("/{speakerId}")
    public ResponseEntity<SpeakerResponse> getSpeakerById(@PathVariable String speakerId) {
        return ResponseEntity.ok(speakerService.getSpeakerById(speakerId));
    }

    @PostMapping
    public ResponseEntity<SpeakerResponse> createSpeaker(@Valid @RequestBody CreateSpeakerRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(speakerService.createSpeaker(request));
    }

    @PutMapping("/{speakerId}")
    public ResponseEntity<SpeakerResponse> updateSpeaker(@PathVariable String speakerId,
                                                         @Valid @RequestBody UpdateSpeakerRequest request) {
        return ResponseEntity.ok(speakerService.updateSpeaker(speakerId, request));
    }

    @DeleteMapping("/{speakerId}")
    public ResponseEntity<Void> deleteSpeaker(@PathVariable String speakerId) {
        speakerService.deleteSpeaker(speakerId);
        return ResponseEntity.noContent().build();
    }
}