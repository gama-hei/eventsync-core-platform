package school.hei.event_sync.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import school.hei.event_sync.model.SpeakerLink;
import java.util.List;

@Repository
public interface SpeakerLinkRepository extends JpaRepository<SpeakerLink, String> {
    List<SpeakerLink> findBySpeaker_Id(String speakerId);
}