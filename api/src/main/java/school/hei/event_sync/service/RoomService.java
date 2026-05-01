package school.hei.event_sync.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import school.hei.event_sync.dto.request.CreateRoomRequest;
import school.hei.event_sync.dto.request.UpdateRoomRequest;
import school.hei.event_sync.dto.response.RoomResponse;
import school.hei.event_sync.dto.response.RoomSessionsResponse;
import school.hei.event_sync.mapper.RoomMapper;
import school.hei.event_sync.mapper.SessionMapper;
import school.hei.event_sync.model.Room;
import school.hei.event_sync.model.Session;
import school.hei.event_sync.repository.RoomRepository;
import school.hei.event_sync.repository.SessionRepository;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final SessionRepository sessionRepository;
    private final RoomMapper roomMapper;
    private final SessionMapper sessionMapper;

    public List<RoomResponse> listRooms() {
        return roomRepository.findAll().stream()
                .map(roomMapper::toDto)
                .toList();
    }

    public RoomSessionsResponse getRoomSessions(UUID roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new EntityNotFoundException("Room not found: " + roomId));
        List<Session> sessions = sessionRepository.findByRoom_Id(roomId);
        RoomSessionsResponse response = new RoomSessionsResponse();
        response.setRoom(roomMapper.toDto(room));
        response.setSessions(sessions.stream().map(sessionMapper::toSummary).toList());
        return response;
    }

    @Transactional
    public RoomResponse createRoom(CreateRoomRequest request) {
        if (roomRepository.existsByName(request.getName())) {
            throw new EntityExistsException("Room with name '" + request.getName() + "' already exists");
        }
        Room room = roomMapper.toEntity(request);
        room = roomRepository.save(room);
        return roomMapper.toDto(room);
    }

    @Transactional
    public RoomResponse updateRoom(UUID roomId, UpdateRoomRequest request) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new EntityNotFoundException("Room not found: " + roomId));
        if (request.getName() != null && !request.getName().equals(room.getName())) {
            if (roomRepository.existsByName(request.getName())) {
                throw new EntityExistsException("Room name already taken");
            }
            room.setName(request.getName());
        }
        room = roomRepository.save(room);
        return roomMapper.toDto(room);
    }

    @Transactional
    public void deleteRoom(UUID roomId) {
        if (!roomRepository.existsById(roomId)) {
            throw new EntityNotFoundException("Room not found: " + roomId);
        }
        roomRepository.deleteById(roomId);
    }
}