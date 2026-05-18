package school.hei.event_sync.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import school.hei.event_sync.dto.request.CreateRoomRequest;
import school.hei.event_sync.dto.request.UpdateRoomRequest;
import school.hei.event_sync.dto.response.*;
import school.hei.event_sync.model.Question;
import school.hei.event_sync.model.Room;
import school.hei.event_sync.model.Session;
import school.hei.event_sync.model.Speaker;
import school.hei.event_sync.repository.RoomRepository;
import school.hei.event_sync.repository.SessionRepository;

import jakarta.persistence.EntityNotFoundException;
import school.hei.event_sync.utils.DateUtils;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class RoomService {

    private final RoomRepository roomRepository;
    private final SessionRepository sessionRepository;

    public List<RoomResponse> listRooms() {
        return roomRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public RoomResponse getRoomById(String roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new EntityNotFoundException("Room not found with id: " + roomId));
        return mapToResponse(room);
    }

    public RoomResponse createRoom(CreateRoomRequest request) {
        if (roomRepository.existsByName(request.getName())) {
            throw new IllegalStateException("Room with name " + request.getName() + " already exists");
        }

        Room room = new Room();
        room.setName(request.getName());
        room.setCapacity(request.getCapacity());
        room.setLocation(request.getLocation());

        Room savedRoom = roomRepository.save(room);
        return mapToResponse(savedRoom);
    }

    public RoomResponse updateRoom(String roomId, UpdateRoomRequest request) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new EntityNotFoundException("Room not found with id: " + roomId));

        if (request.getName() != null && !request.getName().equals(room.getName())) {
            if (roomRepository.existsByName(request.getName())) {
                throw new IllegalStateException("Room with name " + request.getName() + " already exists");
            }
            room.setName(request.getName());
        }

        if (request.getCapacity() != null) {
            room.setCapacity(request.getCapacity());
        }

        if (request.getLocation() != null) {
            room.setLocation(request.getLocation());
        }

        Room updatedRoom = roomRepository.save(room);
        return mapToResponse(updatedRoom);
    }

    public void deleteRoom(String roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new EntityNotFoundException("Room not found with id: " + roomId));

        List<Session> sessions = sessionRepository.findByRoom_Id(roomId);
        if (!sessions.isEmpty()) {
            throw new IllegalStateException("Cannot delete room with existing sessions");
        }

        roomRepository.delete(room);
    }

    public RoomSessionsResponse getRoomSessions(String roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new EntityNotFoundException("Room not found with id: " + roomId));

        List<Session> sessions = sessionRepository.findByRoom_Id(roomId);

        sessions.sort((s1, s2) -> s1.getStartTime().compareTo(s2.getStartTime()));

        List<SessionResponse> sessionResponses = sessions.stream()
                .map(this::mapSessionToResponse)
                .collect(Collectors.toList());

        RoomSessionsResponse response = new RoomSessionsResponse();
        response.setRoomId(room.getId());
        response.setRoomName(room.getName());
        response.setCapacity(room.getCapacity());
        response.setLocation(room.getLocation());
        response.setSessions(sessionResponses);

        return response;
    }

    private RoomResponse mapToResponse(Room room) {
        RoomResponse response = new RoomResponse();
        response.setId(room.getId());
        response.setName(room.getName());
        response.setCapacity(room.getCapacity());
        response.setLocation(room.getLocation());
        return response;
    }

    private SessionResponse mapSessionToResponse(Session session) {
        SessionResponse response = new SessionResponse();
        response.setId(session.getId());
        response.setTitle(session.getTitle());
        response.setDescription(session.getDescription());
        response.setStartTime(session.getStartTime().toLocalDateTime());
        response.setEndTime(session.getEndTime().toLocalDateTime());
        response.setCapacity(session.getCapacity());
        response.setEventId(session.getEvent().getId());

        if(session.getSpeakers() != null){
            response.setSpeakers(session.getSpeakers().stream()
                    .map(this::toSpeakerSummary)
                    .toList());
        }
        if(session.getQuestions() != null){
            response.setQuestions(session.getQuestions().stream()
                    .map(this::toQuestionResponse)
                    .toList());
        }
        response.setRoomId(session.getRoom() != null ? session.getRoom().getId() : null);
        response.setRoomName(session.getRoom() != null ? session.getRoom().getName() : null);
        return response;
    }

    private SpeakerSummary toSpeakerSummary(Speaker speaker) {
        SpeakerSummary summary = new SpeakerSummary();
        summary.setId(speaker.getId());
        summary.setFullName(speaker.getFullName());
        return summary;
    }
    private QuestionResponse toQuestionResponse(Question question) {
        QuestionResponse dto = new QuestionResponse();
        dto.setId(question.getId());
        dto.setContent(question.getContent());
        dto.setAuthorName(question.getAuthorName());
        dto.setUpvotes(question.getUpvotes());
        dto.setSessionId(question.getSession() != null ? question.getSession().getId() : null);
        dto.setCreatedAt(DateUtils.fromTimestamp(question.getCreatedAt()));
        return dto;
    }
}