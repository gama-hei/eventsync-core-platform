package school.hei.event_sync.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomSessionsResponse {
    private String roomId;
    private String roomName;
    private Integer capacity;
    private String location;
    private List<SessionResponse> sessions;
}