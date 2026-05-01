package school.hei.event_sync.controller;

import school.hei.event_sync.dto.request.ChangePasswordRequest;
import school.hei.event_sync.dto.request.LoginRequest;
import school.hei.event_sync.model.Organizer;
import school.hei.event_sync.service.OrganizerAuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/auth/organizer")
@RequiredArgsConstructor
public class OrganizerAuthController {

    private final OrganizerAuthService organizerAuthService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            Map<String, Object> authResponse = organizerAuthService.authenticate(
                    request.getEmail(),
                    request.getPassword()
            );
            return ResponseEntity.ok(authResponse);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentOrganizer(@RequestHeader("Authorization") String authHeader) {
        try {
            // Extract token from Bearer header
            String token = authHeader.substring(7);
            Organizer organizer = organizerAuthService.validateTokenAndGetOrganizer(token);

            return ResponseEntity.ok(Map.of(
                    "id", organizer.getId(),
                    "email", organizer.getEmail(),
                    "fullName", organizer.getFullName(),
                    "isActive", organizer.getIsActive(),
                    "lastLogin", organizer.getLastLogin(),
                    "createdAt", organizer.getCreatedAt()
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request,
                                            @RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.substring(7);
            Organizer organizer = organizerAuthService.validateTokenAndGetOrganizer(token);

            organizerAuthService.changePassword(
                    organizer.getEmail(),
                    request.getOldPassword(),
                    request.getNewPassword()
            );

            return ResponseEntity.ok(Map.of("message", "Password changed successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        }
    }
}