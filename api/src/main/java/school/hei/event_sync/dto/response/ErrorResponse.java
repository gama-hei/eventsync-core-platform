package school.hei.event_sync.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@Getter
@Setter
public class ErrorResponse {
    private String error;
    private String timestamp;
    private String path;

    public ErrorResponse(String error, String timestamp, String path) {
        this.error = error;
        this.timestamp = java.time.LocalDateTime.now().toString();
        this.path = path;
    }

    public ErrorResponse(String error){
        this.error = error;
        this.timestamp = java.time.LocalDateTime.now().toString();
    }
}
