package school.hei.event_sync.dto.request;

import jakarta.validation.constraints.NotBlank;
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
public class CreateRoomRequest {
    @NotBlank(message = "Room name is required")
    @Size(max = 100, message = "Room name must be less than 100 characters")
    private String name;

    @Positive(message = "Capacity must be positive")
    private Integer capacity;

    private String location;
}