package school.hei.event_sync.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import school.hei.event_sync.dto.request.CreateRoomRequest;
import school.hei.event_sync.dto.request.UpdateRoomRequest;
import school.hei.event_sync.dto.response.RoomResponse;
import school.hei.event_sync.model.Room;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Mapper(componentModel = "spring", uses = DateMapper.class)
public interface RoomMapper {

    RoomResponse toDto(Room room);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Room toEntity(CreateRoomRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateFromRequest(UpdateRoomRequest request, @MappingTarget Room room);
}