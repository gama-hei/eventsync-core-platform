package school.hei.event_sync.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SessionResponse {
    private String id;
    private String title;
    private String description;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String roomId;
    private String roomName;
    private Integer capacity;
    private String eventId;
    private List<SpeakerSummary> speakers;
    private List<QuestionResponse> questions;
}