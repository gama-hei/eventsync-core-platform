package school.hei.event_sync.dto.request;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateEventRequest {

    @Size(max = 200)
    private String title;

    private String description;

    private String startDate;

    private String endDate;

    @Size(max = 255)
    private String location;
}
