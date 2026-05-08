package school.hei.event_sync.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrganizerResponse {
    private UUID id;
    private String email;
    private String fullName;
    private Boolean isActive;
    private Timestamp lastLogin;
    private Timestamp createdAt;
}