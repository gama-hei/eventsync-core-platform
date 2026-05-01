package school.hei.event_sync.mapper;

import org.mapstruct.*;
import school.hei.event_sync.dto.request.CreateSessionRequest;
import school.hei.event_sync.dto.request.UpdateSessionRequest;
import school.hei.event_sync.dto.response.*;
import school.hei.event_sync.model.Session;
import school.hei.event_sync.model.Speaker;

@Mapper(componentModel = "spring", uses = {SpeakerMapper.class, RoomMapper.class, QuestionMapper.class, DateMapper.class})
public interface SessionMapper {

    @Mapping(target = "roomId", source = "room.id")
    @Mapping(target = "eventId", source = "event.id")
    @Mapping(target = "speakers", source = "speakers")
    @Mapping(target = "questions", source = "questions")
    SessionResponse toDto(Session session);

    @Mapping(target = "roomId", source = "room.id")
    @Mapping(target = "eventId", source = "event.id")
    SessionSummary toSummary(Session session);

    @Mapping(target = "room", source = "room")
    @Mapping(target = "speakers", source = "speakers")
    LiveSessionResponse toLiveDto(Session session);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "event", ignore = true)
    @Mapping(target = "room", ignore = true)
    @Mapping(target = "speakers", ignore = true)
    @Mapping(target = "questions", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "startTime", source = "startTime", qualifiedByName = "stringToTimestamp")
    @Mapping(target = "endTime", source = "endTime", qualifiedByName = "stringToTimestamp")
    Session toEntity(CreateSessionRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "event", ignore = true)
    @Mapping(target = "room", ignore = true)
    @Mapping(target = "speakers", ignore = true)
    @Mapping(target = "questions", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "startTime", source = "startTime", qualifiedByName = "stringToTimestamp")
    @Mapping(target = "endTime", source = "endTime", qualifiedByName = "stringToTimestamp")
    void updateFromRequest(UpdateSessionRequest request, @MappingTarget Session session);
}