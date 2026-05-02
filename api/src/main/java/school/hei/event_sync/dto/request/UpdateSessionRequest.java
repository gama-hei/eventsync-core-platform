package school.hei.event_sync.dto.request;


import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateSessionRequest {

    @Size(max = 200)
    private String title;

    private String description;

    private String startTime;

    private String endTime;

    private String roomId;

    @PositiveOrZero
    private Integer capacity;
}