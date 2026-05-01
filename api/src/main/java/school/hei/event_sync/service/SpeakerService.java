package school.hei.event_sync.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import school.hei.event_sync.dto.request.CreateSpeakerRequest;
import school.hei.event_sync.dto.request.UpdateSpeakerRequest;
import school.hei.event_sync.dto.response.SpeakerResponse;
import school.hei.event_sync.mapper.SpeakerMapper;
import school.hei.event_sync.model.Speaker;
import school.hei.event_sync.model.SpeakerLink;
import school.hei.event_sync.repository.SpeakerLinkRepository;
import school.hei.event_sync.repository.SpeakerRepository;

import jakarta.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SpeakerService {

    private final SpeakerRepository speakerRepository;
    private final SpeakerLinkRepository speakerLinkRepository;
    private final SpeakerMapper speakerMapper;

    public List<SpeakerResponse> listSpeakers() {
        return speakerRepository.findAll().stream()
                .map(speakerMapper::toDto)
                .toList();
    }

    public SpeakerResponse getSpeakerById(UUID id) {
        Speaker speaker = speakerRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Speaker not found: " + id));
        return speakerMapper.toDto(speaker);
    }

    @Transactional
    public SpeakerResponse createSpeaker(CreateSpeakerRequest request) {
        Speaker speaker = speakerMapper.toEntity(request);
        if (request.getExternalLinks() != null && !request.getExternalLinks().isEmpty()) {
            List<SpeakerLink> links = new ArrayList<>();
            for (String url : request.getExternalLinks()) {
                SpeakerLink link = new SpeakerLink();
                link.setLinkUrl(url);
                speaker.addLink(link);
            }
        }
        speaker = speakerRepository.save(speaker);
        return speakerMapper.toDto(speaker);
    }

    @Transactional
    public SpeakerResponse updateSpeaker(UUID speakerId, UpdateSpeakerRequest request) {
        Speaker speaker = speakerRepository.findById(speakerId)
                .orElseThrow(() -> new EntityNotFoundException("Speaker not found: " + speakerId));
        speakerMapper.updateFromRequest(request, speaker);

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
        return speakerMapper.toDto(speaker);
    }

    @Transactional
    public void deleteSpeaker(UUID speakerId) {
        if (!speakerRepository.existsById(speakerId)) {
            throw new EntityNotFoundException("Speaker not found: " + speakerId);
        }
        speakerRepository.deleteById(speakerId);
    }
}