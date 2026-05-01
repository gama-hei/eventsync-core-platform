package school.hei.event_sync.mapper;

import org.mapstruct.*;
import school.hei.event_sync.dto.request.CreateEventRequest;
import school.hei.event_sync.dto.request.UpdateEventRequest;
import school.hei.event_sync.dto.response.EventResponse;
import school.hei.event_sync.model.Event;
import school.hei.event_sync.model.Session;

import java.util.List;

@Mapper(componentModel = "spring", uses = {SessionMapper.class})
public interface EventMapper {

    @Mapping(target = "sessions", source = "sessions")
    EventResponse toDto(Event event);

    List<EventResponse> toDtoList(List<Event> events);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "sessions", ignore = true)
    Event toEntity(CreateEventRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "sessions", ignore = true)
    void updateFromRequest(UpdateEventRequest request, @MappingTarget Event event);
}