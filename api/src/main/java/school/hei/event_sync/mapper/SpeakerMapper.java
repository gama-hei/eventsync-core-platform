package school.hei.event_sync.mapper;

import org.mapstruct.*;
import school.hei.event_sync.dto.request.CreateSpeakerRequest;
import school.hei.event_sync.dto.request.UpdateSpeakerRequest;
import school.hei.event_sync.dto.response.SpeakerResponse;
import school.hei.event_sync.dto.response.SpeakerSummary;
import school.hei.event_sync.model.Speaker;
import school.hei.event_sync.model.SpeakerLink;
import school.hei.event_sync.model.Session;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = {SessionMapper.class})
public interface SpeakerMapper {

    @Mapping(target = "externalLinks", expression = "java(getExternalLinkUrls(speaker))")
    @Mapping(target = "sessions", source = "sessions")
    SpeakerResponse toDto(Speaker speaker);

    SpeakerSummary toSummary(Speaker speaker);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "profilePicture", source = "profilePicture")
    @Mapping(target = "links", ignore = true)
    @Mapping(target = "sessions", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Speaker toEntity(CreateSpeakerRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "links", ignore = true)
    @Mapping(target = "sessions", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateFromRequest(UpdateSpeakerRequest request, @MappingTarget Speaker speaker);

    default List<String> getExternalLinkUrls(Speaker speaker) {
        if (speaker.getLinks() == null) {
            return List.of();
        }
        return speaker.getLinks().stream()
                .map(SpeakerLink::getLinkUrl)
                .collect(Collectors.toList());
    }
}