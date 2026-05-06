package school.hei.event_sync.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import school.hei.event_sync.dto.request.AssignSpeakersRequest;
import school.hei.event_sync.dto.request.CreateSessionRequest;
import school.hei.event_sync.dto.request.UpdateSessionRequest;
import school.hei.event_sync.dto.response.*;
import school.hei.event_sync.model.*;
import school.hei.event_sync.repository.*;
import school.hei.event_sync.utils.DateUtils;

import jakarta.persistence.EntityNotFoundException;
import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SessionService {

    private final SessionRepository sessionRepository;
    private final EventRepository eventRepository;
    private final RoomRepository roomRepository;
    private final SpeakerRepository speakerRepository;

    public List<SessionResponse> listSessions(UUID eventId, UUID roomId, UUID speakerId, Boolean live) {
        List<Session> sessions;
        if (live != null && live) {
            Timestamp now = new Timestamp(System.currentTimeMillis());
            sessions = sessionRepository.findByStartTimeLessThanEqualAndEndTimeGreaterThanEqual(now, now);
        } else if (eventId != null) {
            sessions = sessionRepository.findByEvent_Id(eventId);
        } else if (roomId != null) {
            sessions = sessionRepository.findByRoom_Id(roomId);
        } else if (speakerId != null) {
            sessions = sessionRepository.findBySpeakers_Id(speakerId);
        } else {
            sessions = sessionRepository.findAllByOrderByStartTimeAsc();
        }
        return sessions.stream().map(this::toSessionResponse).toList();
    }

    public List<LiveSessionResponse> getLiveSessions() {
        Timestamp now = new Timestamp(System.currentTimeMillis());
        List<Session> live = sessionRepository.findByStartTimeLessThanEqualAndEndTimeGreaterThanEqual(now, now);
        return live.stream().map(this::toLiveSessionResponse).toList();
    }

    public SessionResponse getSessionById(UUID id) {
        Session session = sessionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Session not found: " + id));
        return toSessionResponse(session);
    }

    @Transactional
    public SessionResponse createSession(UUID eventId, CreateSessionRequest request) {
        eventRepository.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException("Event not found: " + eventId));
        roomRepository.findById(UUID.fromString(request.getRoomId()))
                .orElseThrow(() -> new EntityNotFoundException("Room not found: " + request.getRoomId()));

        Session session = toSessionEntity(request);
        session.setEvent(eventRepository.getReferenceById(eventId));
        session.setRoom(roomRepository.getReferenceById(UUID.fromString(request.getRoomId())));

        if (request.getSpeakerIds() != null && !request.getSpeakerIds().isEmpty()) {
            List<Speaker> speakers = speakerRepository.findAllById(
                    request.getSpeakerIds().stream().map(UUID::fromString).toList());
            speakers.forEach(session::addSpeaker);
        }

        session = sessionRepository.save(session);
        return toSessionResponse(session);
    }

    @Transactional
    public SessionResponse updateSession(UUID sessionId, UpdateSessionRequest request) {
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new EntityNotFoundException("Session not found: " + sessionId));
        applyUpdateRequest(request, session);

        if (request.getRoomId() != null) {
            roomRepository.findById(UUID.fromString(request.getRoomId()))
                    .orElseThrow(() -> new EntityNotFoundException("Room not found"));
            session.setRoom(roomRepository.getReferenceById(UUID.fromString(request.getRoomId())));
        }

        session = sessionRepository.save(session);
        return toSessionResponse(session);
    }

    @Transactional
    public void deleteSession(UUID sessionId) {
        if (!sessionRepository.existsById(sessionId)) {
            throw new EntityNotFoundException("Session not found: " + sessionId);
        }
        sessionRepository.deleteById(sessionId);
    }

    @Transactional
    public SessionResponse assignSpeakers(UUID sessionId, AssignSpeakersRequest request) {
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new EntityNotFoundException("Session not found: " + sessionId));
        List<Speaker> speakers = speakerRepository.findAllById(
                request.getSpeakerIds().stream().map(UUID::fromString).toList());
        session.getSpeakers().clear();
        speakers.forEach(session::addSpeaker);
        sessionRepository.save(session);
        return toSessionResponse(session);
    }

    private SessionResponse toSessionResponse(Session session) {
        SessionResponse dto = new SessionResponse();
        dto.setId(session.getId());
        dto.setTitle(session.getTitle());
        dto.setDescription(session.getDescription());
        dto.setStartTime(DateUtils.fromTimestamp(session.getStartTime()));
        dto.setEndTime(DateUtils.fromTimestamp(session.getEndTime()));
        dto.setRoomId(session.getRoom() != null ? session.getRoom().getId() : null);
        dto.setCapacity(session.getCapacity());
        dto.setEventId(session.getEvent() != null ? session.getEvent().getId() : null);
        if (session.getSpeakers() != null) {
            dto.setSpeakers(session.getSpeakers().stream()
                    .map(this::toSpeakerSummary)
                    .toList());
        }
        if (session.getQuestions() != null) {
            dto.setQuestions(session.getQuestions().stream()
                    .map(this::toQuestionResponse)
                    .toList());
        }
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

    private LiveSessionResponse toLiveSessionResponse(Session session) {
        LiveSessionResponse dto = new LiveSessionResponse();
        dto.setId(session.getId());
        dto.setTitle(session.getTitle());
        dto.setStartTime(DateUtils.fromTimestamp(session.getStartTime()));
        dto.setEndTime(DateUtils.fromTimestamp(session.getEndTime()));
        dto.setRoom(session.getRoom() != null ? toRoomResponse(session.getRoom()) : null);
        if (session.getSpeakers() != null) {
            dto.setSpeakers(session.getSpeakers().stream()
                    .map(this::toSpeakerSummary)
                    .toList());
        }
        return dto;
    }

    private RoomResponse toRoomResponse(Room room) {
        RoomResponse dto = new RoomResponse();
        dto.setId(room.getId());
        dto.setName(room.getName());
        return dto;
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

    private Session toSessionEntity(CreateSessionRequest request) {
        Session session = new Session();
        session.setTitle(request.getTitle());
        session.setDescription(request.getDescription());
        session.setStartTime(DateUtils.toTimestamp(request.getStartTime()));
        session.setEndTime(DateUtils.toTimestamp(request.getEndTime()));
        session.setCapacity(request.getCapacity() != null ? request.getCapacity() : 0);
        return session;
    }

    private void applyUpdateRequest(UpdateSessionRequest request, Session session) {
        if (request.getTitle() != null) session.setTitle(request.getTitle());
        if (request.getDescription() != null) session.setDescription(request.getDescription());
        if (request.getStartTime() != null) session.setStartTime(DateUtils.toTimestamp(request.getStartTime()));
        if (request.getEndTime() != null) session.setEndTime(DateUtils.toTimestamp(request.getEndTime()));
        if (request.getCapacity() != null) session.setCapacity(request.getCapacity());
    }
}