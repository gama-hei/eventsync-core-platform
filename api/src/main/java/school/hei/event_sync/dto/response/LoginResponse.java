package school.hei.event_sync.dto.response;

import lombok.*;

import java.util.UUID;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class LoginResponse {
    private String token;
    private String type;
    private UUID organizerId;
    private String email;
    private String fullName;
}
