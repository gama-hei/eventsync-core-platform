package school.hei.event_sync.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateSpeakerRequest {

    @NotBlank
    @Size(max = 100)
    private String fullName;

    private String profilePicture;

    @NotBlank
    private String bio;

    private List<String> externalLinks;
}
