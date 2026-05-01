package school.hei.event_sync.dto.response;

import java.util.UUID;

public class LoginResponse {
    private String token;
    private String type;
    private UUID organizerId;
    private String email;
    private String fullName;
}
