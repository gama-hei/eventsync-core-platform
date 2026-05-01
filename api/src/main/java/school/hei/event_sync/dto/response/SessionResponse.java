package school.hei.event_sync.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SessionResponse {
    private String id;
    private String title;
    private String description;
    private String startTime;
    private String endTime;
    private String roomId;
    private Integer capacity;
    private String eventId;
    private List<SpeakerSummary> speakers;
    private List<QuestionResponse> questions;
}
