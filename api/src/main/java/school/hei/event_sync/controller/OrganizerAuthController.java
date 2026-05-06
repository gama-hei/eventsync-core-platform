package school.hei.event_sync.controller;

import org.springframework.http.HttpStatus;
import school.hei.event_sync.dto.request.ChangePasswordRequest;
import school.hei.event_sync.dto.request.LoginRequest;
import school.hei.event_sync.dto.response.ErrorResponse;
import school.hei.event_sync.dto.response.LoginResponse;
import school.hei.event_sync.dto.response.MessageResponse;
import school.hei.event_sync.dto.response.OrganizerResponse;
import school.hei.event_sync.model.Organizer;
import school.hei.event_sync.service.OrganizerAuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/auth/organizer")
@RequiredArgsConstructor
public class OrganizerAuthController {

    private final OrganizerAuthService organizerAuthService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            LoginResponse response = organizerAuthService.authenticate(
                    request.getEmail(),
                    request.getPassword()
            );
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {

            ErrorResponse errorResponse = new ErrorResponse(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(errorResponse);
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentOrganizer(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.substring(7);
            Organizer organizer = organizerAuthService.validateTokenAndGetOrganizer(token);

            OrganizerResponse organizerResponse = OrganizerResponse.builder()
                    .id(organizer.getId())
                    .email(organizer.getEmail())
                    .fullName(organizer.getFullName())
                    .isActive(organizer.getIsActive())
                    .lastLogin(organizer.getLastLogin())
                    .createdAt(organizer.getCreatedAt())
                    .build();

            return ResponseEntity.ok(organizerResponse);
        } catch (RuntimeException e) {
            ErrorResponse errorResponse = new ErrorResponse(e.getMessage());
            return ResponseEntity
                    .status(401)
                    .body(errorResponse);
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

            MessageResponse messageResponse = new MessageResponse("Password changed successfully");

            return ResponseEntity.ok(messageResponse);
        } catch (RuntimeException e) {
            ErrorResponse errorResponse = new ErrorResponse(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(errorResponse);
        }
    }
}