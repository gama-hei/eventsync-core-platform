package school.hei.event_sync.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import school.hei.event_sync.dto.request.AssignSpeakersRequest;
import school.hei.event_sync.dto.request.CreateSessionRequest;
import school.hei.event_sync.dto.request.UpdateSessionRequest;
import school.hei.event_sync.dto.response.LiveSessionResponse;
import school.hei.event_sync.dto.response.SessionResponse;
import school.hei.event_sync.mapper.SessionMapper;
import school.hei.event_sync.model.Session;
import school.hei.event_sync.model.Speaker;
import school.hei.event_sync.repository.*;

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
    private final SessionMapper sessionMapper;

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

        return sessions.stream().map(sessionMapper::toDto).toList();
    }

    public List<LiveSessionResponse> getLiveSessions() {
        Timestamp now = new Timestamp(System.currentTimeMillis());
        List<Session> liveSessions = sessionRepository.findByStartTimeLessThanEqualAndEndTimeGreaterThanEqual(now, now);
        return liveSessions.stream().map(sessionMapper::toLiveDto).toList();
    }

    public SessionResponse getSessionById(UUID id) {
        Session session = sessionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Session not found: " + id));
        return sessionMapper.toDto(session);
    }

    @Transactional
    public SessionResponse createSession(UUID eventId, CreateSessionRequest request) {
        eventRepository.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException("Event not found: " + eventId));
        roomRepository.findById(UUID.fromString(request.getRoomId()))
                .orElseThrow(() -> new EntityNotFoundException("Room not found: " + request.getRoomId()));

        Session session = sessionMapper.toEntity(request);
        session.setEvent(eventRepository.getReferenceById(eventId));
        session.setRoom(roomRepository.getReferenceById(UUID.fromString(request.getRoomId())));

        if (request.getSpeakerIds() != null && !request.getSpeakerIds().isEmpty()) {
            List<Speaker> speakers = speakerRepository.findAllById(
                    request.getSpeakerIds().stream().map(UUID::fromString).toList());
            speakers.forEach(session::addSpeaker);
        }

        session = sessionRepository.save(session);
        return sessionMapper.toDto(session);
    }

    @Transactional
    public SessionResponse updateSession(UUID sessionId, UpdateSessionRequest request) {
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new EntityNotFoundException("Session not found: " + sessionId));
        sessionMapper.updateFromRequest(request, session);

        if (request.getRoomId() != null) {
            roomRepository.findById(UUID.fromString(request.getRoomId()))
                    .orElseThrow(() -> new EntityNotFoundException("Room not found"));
            session.setRoom(roomRepository.getReferenceById(UUID.fromString(request.getRoomId())));
        }

        session = sessionRepository.save(session);
        return sessionMapper.toDto(session);
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
        return sessionMapper.toDto(session);
    }
}