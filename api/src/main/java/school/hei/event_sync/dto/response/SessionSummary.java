package school.hei.event_sync.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SessionSummary {
    private String id;
    private String title;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String roomId;
    private Integer capacity;
    private String eventId;
}