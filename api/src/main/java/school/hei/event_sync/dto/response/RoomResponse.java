package school.hei.event_sync.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomResponse {
    private String id;
    private String name;
    private Integer capacity;
    private String location;
}