package school.hei.event_sync.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import school.hei.event_sync.model.SpeakerLink;
import java.util.List;
import java.util.UUID;

@Repository
public interface SpeakerLinkRepository extends JpaRepository<SpeakerLink, UUID> {
    List<SpeakerLink> findBySpeaker_Id(UUID speakerId);
}