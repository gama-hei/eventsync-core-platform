package school.hei.event_sync.dto.response;

import lombok.*;

import java.sql.Timestamp;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class OrganizerResponse {
    private UUID id;
    private String email;
    private String fullName;
    private boolean isActive;
    private Timestamp lastLogin;
    private Timestamp createdAt;
}
