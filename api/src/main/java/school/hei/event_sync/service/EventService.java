package school.hei.event_sync.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import school.hei.event_sync.dto.request.CreateEventRequest;
import school.hei.event_sync.dto.request.UpdateEventRequest;
import school.hei.event_sync.dto.response.EventResponse;
import school.hei.event_sync.dto.response.SessionSummary;
import school.hei.event_sync.model.Event;
import school.hei.event_sync.model.Session;
import school.hei.event_sync.repository.EventRepository;
import school.hei.event_sync.utils.DateUtils;

import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    public List<EventResponse> listEvents() {
        return eventRepository.findAllByOrderByStartDateAsc()
                .stream()
                .map(this::toEventResponse)
                .toList();
    }

    public EventResponse getEventById(UUID id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Event not found: " + id));
        return toEventResponse(event);
    }

    @Transactional
    public EventResponse createEvent(CreateEventRequest request) {
        Event event = toEventEntity(request);
        event = eventRepository.save(event);
        return toEventResponse(event);
    }

    @Transactional
    public EventResponse updateEvent(UUID id, UpdateEventRequest request) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Event not found: " + id));
        applyUpdateRequest(request, event);
        event = eventRepository.save(event);
        return toEventResponse(event);
    }

    @Transactional
    public void deleteEvent(UUID id) {
        if (!eventRepository.existsById(id)) {
            throw new EntityNotFoundException("Event not found: " + id);
        }
        eventRepository.deleteById(id);
    }

    private EventResponse toEventResponse(Event event) {
        EventResponse dto = new EventResponse();
        dto.setId(event.getId());
        dto.setTitle(event.getTitle());
        dto.setDescription(event.getDescription());
        dto.setStartDate(DateUtils.fromTimestamp(event.getStartDate()));
        dto.setEndDate(DateUtils.fromTimestamp(event.getEndDate()));
        dto.setLocation(event.getLocation());
        if (event.getSessions() != null) {
            dto.setSessions(event.getSessions().stream()
                    .map(this::toSessionSummary)
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

    private Event toEventEntity(CreateEventRequest request) {
        Event event = new Event();
        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setStartDate(DateUtils.toTimestamp(request.getStartDate()));
        event.setEndDate(DateUtils.toTimestamp(request.getEndDate()));
        event.setLocation(request.getLocation());
        return event;
    }

    private void applyUpdateRequest(UpdateEventRequest request, Event event) {
        if (request.getTitle() != null) event.setTitle(request.getTitle());
        if (request.getDescription() != null) event.setDescription(request.getDescription());
        if (request.getStartDate() != null) event.setStartDate(DateUtils.toTimestamp(request.getStartDate()));
        if (request.getEndDate() != null) event.setEndDate(DateUtils.toTimestamp(request.getEndDate()));
        if (request.getLocation() != null) event.setLocation(request.getLocation());
    }
}