package school.hei.event_sync.dto.reponse;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuestionResponse {
    private String id;
    private String content;
    private String authorName;
    private Integer upvotes;
    private String sessionId;
    private String createdAt;
}
