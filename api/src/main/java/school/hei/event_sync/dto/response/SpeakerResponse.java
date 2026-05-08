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
public class SpeakerResponse {
    private String id;
    private String fullName;
    private String profilePicture;
    private String bio;
    private List<String> externalLinks;
    private List<SessionSummary> sessions;
}