package school.hei.event_sync.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import school.hei.event_sync.model.Speaker;
import java.util.List;
import java.util.UUID;

@Repository
public interface SpeakerRepository extends JpaRepository<Speaker, UUID> {
    List<Speaker> findByFullNameContainingIgnoreCase(String name);
}