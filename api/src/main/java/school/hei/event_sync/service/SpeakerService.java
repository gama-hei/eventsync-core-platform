package school.hei.event_sync.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import school.hei.event_sync.dto.request.CreateSpeakerRequest;
import school.hei.event_sync.dto.request.UpdateSpeakerRequest;
import school.hei.event_sync.dto.response.SessionSummary;
import school.hei.event_sync.dto.response.SpeakerResponse;
import school.hei.event_sync.dto.response.SpeakerSummary;
import school.hei.event_sync.model.Speaker;
import school.hei.event_sync.model.SpeakerLink;
import school.hei.event_sync.model.Session;
import school.hei.event_sync.repository.SpeakerLinkRepository;
import school.hei.event_sync.repository.SpeakerRepository;
import school.hei.event_sync.utils.DateUtils;

import jakarta.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SpeakerService {

    private final SpeakerRepository speakerRepository;
    private final SpeakerLinkRepository speakerLinkRepository;

    public List<SpeakerResponse> listSpeakers() {
        return speakerRepository.findAll().stream()
                .map(this::toSpeakerResponse)
                .toList();
    }

    public SpeakerResponse getSpeakerById(UUID id) {
        Speaker speaker = speakerRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Speaker not found: " + id));
        return toSpeakerResponse(speaker);
    }

    @Transactional
    public SpeakerResponse createSpeaker(CreateSpeakerRequest request) {
        Speaker speaker = toSpeakerEntity(request);
        if (request.getExternalLinks() != null && !request.getExternalLinks().isEmpty()) {
            for (String url : request.getExternalLinks()) {
                SpeakerLink link = new SpeakerLink();
                link.setLinkUrl(url);
                speaker.addLink(link);
            }
        }
        speaker = speakerRepository.save(speaker);
        return toSpeakerResponse(speaker);
    }

    @Transactional
    public SpeakerResponse updateSpeaker(UUID speakerId, UpdateSpeakerRequest request) {
        Speaker speaker = speakerRepository.findById(speakerId)
                .orElseThrow(() -> new EntityNotFoundException("Speaker not found: " + speakerId));
        applyUpdateRequest(request, speaker);

        if (request.getExternalLinks() != null) {
            speakerLinkRepository.deleteAll(speaker.getLinks());
            speaker.getLinks().clear();
            for (String url : request.getExternalLinks()) {
                SpeakerLink link = new SpeakerLink();
                link.setLinkUrl(url);
                speaker.addLink(link);
            }
        }
        speaker = speakerRepository.save(speaker);
        return toSpeakerResponse(speaker);
    }

    @Transactional
    public void deleteSpeaker(UUID speakerId) {
        if (!speakerRepository.existsById(speakerId)) {
            throw new EntityNotFoundException("Speaker not found: " + speakerId);
        }
        speakerRepository.deleteById(speakerId);
    }

    // ---------- Conversions ----------
    private SpeakerResponse toSpeakerResponse(Speaker speaker) {
        SpeakerResponse dto = new SpeakerResponse();
        dto.setId(speaker.getId());
        dto.setFullName(speaker.getFullName());
        dto.setProfilePicture(speaker.getProfilePicture());
        dto.setBio(speaker.getBio());
        if (speaker.getLinks() != null) {
            dto.setExternalLinks(speaker.getLinks().stream()
                    .map(SpeakerLink::getLinkUrl)
                    .toList());
        }
        if (speaker.getSessions() != null) {
            dto.setSessions(speaker.getSessions().stream()
                    .map(this::toSessionSummary)
                    .toList());
        }
        return dto;
    }

    private SpeakerSummary toSpeakerSummary(Speaker speaker) {
        SpeakerSummary summary = new SpeakerSummary();
        summary.setId(speaker.getId());
        summary.setFullName(speaker.getFullName());
        return summary;
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

    private Speaker toSpeakerEntity(CreateSpeakerRequest request) {
        Speaker speaker = new Speaker();
        speaker.setFullName(request.getFullName());
        speaker.setProfilePicture(request.getProfilePicture());
        speaker.setBio(request.getBio());
        return speaker;
    }

    private void applyUpdateRequest(UpdateSpeakerRequest request, Speaker speaker) {
        if (request.getFullName() != null) speaker.setFullName(request.getFullName());
        if (request.getProfilePicture() != null) speaker.setProfilePicture(request.getProfilePicture());
        if (request.getBio() != null) speaker.setBio(request.getBio());
    }
}