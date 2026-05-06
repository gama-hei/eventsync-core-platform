package school.hei.event_sync.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import school.hei.event_sync.dto.request.CreateRoomRequest;
import school.hei.event_sync.dto.request.UpdateRoomRequest;
import school.hei.event_sync.dto.response.RoomResponse;
import school.hei.event_sync.dto.response.RoomSessionsResponse;
import school.hei.event_sync.dto.response.SessionSummary;
import school.hei.event_sync.model.Room;
import school.hei.event_sync.model.Session;
import school.hei.event_sync.repository.RoomRepository;
import school.hei.event_sync.repository.SessionRepository;
import school.hei.event_sync.utils.DateUtils;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final SessionRepository sessionRepository;

    public List<RoomResponse> listRooms() {
        return roomRepository.findAll().stream()
                .map(this::toRoomResponse)
                .toList();
    }

    public RoomSessionsResponse getRoomSessions(UUID roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new EntityNotFoundException("Room not found: " + roomId));
        List<Session> sessions = sessionRepository.findByRoom_Id(roomId);
        RoomSessionsResponse response = new RoomSessionsResponse();
        response.setRoom(toRoomResponse(room));
        response.setSessions(sessions.stream().map(this::toSessionSummary).toList());
        return response;
    }

    @Transactional
    public RoomResponse createRoom(CreateRoomRequest request) {
        if (roomRepository.existsByName(request.getName())) {
            throw new EntityExistsException("Room with name '" + request.getName() + "' already exists");
        }
        Room room = toRoomEntity(request);
        room = roomRepository.save(room);
        return toRoomResponse(room);
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
        return toRoomResponse(room);
    }

    @Transactional
    public void deleteRoom(UUID roomId) {
        if (!roomRepository.existsById(roomId)) {
            throw new EntityNotFoundException("Room not found: " + roomId);
        }
        roomRepository.deleteById(roomId);
    }

    private RoomResponse toRoomResponse(Room room) {
        RoomResponse dto = new RoomResponse();
        dto.setId(room.getId());
        dto.setName(room.getName());
        return dto;
    }

    private SessionSummary toSessionSummary(Session session) {
        SessionSummary summary = new SessionSummary();
        summary.setId(session.getId());
        summary.setTitle(session.getTitle());
        summary.setStartTime(DateUtils.fromTimestamp(session.getStartTime()));
        summary.setEndTime(DateUtils.fromTimestamp(session.getEndTime()));
        summary.setRoomId(session.getRoom() != null ? session.getRoom().getId() : null);
        summary.setCapacity(session.getCapacity());
        summary.setEventId(session.getEvent() != null ? session.getEvent().getId() : null);
        return summary;
    }

    private Room toRoomEntity(CreateRoomRequest request) {
        Room room = new Room();
        room.setName(request.getName());
        return room;
    }
}