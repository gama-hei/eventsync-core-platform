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
public class LiveSessionResponse {
    private String id;
    private String title;
    private String startTime;
    private String endTime;
    private RoomResponse room;
    private List<SpeakerSummary> speakers;
}
