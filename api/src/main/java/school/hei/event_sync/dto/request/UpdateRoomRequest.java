package school.hei.event_sync.dto.request;

import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateRoomRequest {
    @Size(max = 100, message = "Room name must be less than 100 characters")
    private String name;

    @Positive(message = "Capacity must be positive")
    private Integer capacity;

    @Size(max = 255, message = "Location must be less than 255 characters")
    private String location;
}