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

import java.util.UUID;

@RestController
@RequestMapping("/admin/speakers")
@RequiredArgsConstructor
public class AdminSpeakerController {

    private final SpeakerService speakerService;

    @PostMapping
    public ResponseEntity<SpeakerResponse> createSpeaker(@Valid @RequestBody CreateSpeakerRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(speakerService.createSpeaker(request));
    }

    @PutMapping("/{speakerId}")
    public ResponseEntity<SpeakerResponse> updateSpeaker(@PathVariable UUID speakerId,
                                                         @Valid @RequestBody UpdateSpeakerRequest request) {
        return ResponseEntity.ok(speakerService.updateSpeaker(speakerId, request));
    }

    @DeleteMapping("/{speakerId}")
    public ResponseEntity<Void> deleteSpeaker(@PathVariable UUID speakerId) {
        speakerService.deleteSpeaker(speakerId);
        return ResponseEntity.noContent().build();
    }
}