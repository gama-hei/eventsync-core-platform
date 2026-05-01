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
public class SpeakerResponse {
    private String id;
    private String fullName;
    private String profilePicture;
    private String bio;
    private List<String> externalLinks;
    private List<SessionSummary> sessions;
}
