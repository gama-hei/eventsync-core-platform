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
public class LiveSessionResponse {
    private String id;
    private String title;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private RoomResponse room;
    private List<SpeakerSummary> speakers;
}