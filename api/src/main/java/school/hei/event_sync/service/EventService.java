package school.hei.event_sync.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import school.hei.event_sync.dto.request.CreateEventRequest;
import school.hei.event_sync.dto.request.UpdateEventRequest;
import school.hei.event_sync.dto.response.EventResponse;
import school.hei.event_sync.mapper.EventMapper;
import school.hei.event_sync.model.Event;
import school.hei.event_sync.repository.EventRepository;

import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final EventMapper eventMapper;

    public List<EventResponse> listEvents() {
        return eventRepository.findAllByOrderByStartDateAsc()
                .stream()
                .map(eventMapper::toDto)
                .toList();
    }

    public EventResponse getEventById(UUID id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Event not found: " + id));
        return eventMapper.toDto(event);
    }

    @Transactional
    public EventResponse createEvent(CreateEventRequest request) {
        Event event = eventMapper.toEntity(request);
        event = eventRepository.save(event);
        return eventMapper.toDto(event);
    }

    @Transactional
    public EventResponse updateEvent(UUID id, UpdateEventRequest request) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Event not found: " + id));
        eventMapper.updateFromRequest(request, event);
        event = eventRepository.save(event);
        return eventMapper.toDto(event);
    }

    @Transactional
    public void deleteEvent(UUID id) {
        if (!eventRepository.existsById(id)) {
            throw new EntityNotFoundException("Event not found: " + id);
        }
        eventRepository.deleteById(id);
    }
}