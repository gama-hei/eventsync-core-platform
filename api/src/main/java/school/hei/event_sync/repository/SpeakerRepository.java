package school.hei.event_sync.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import school.hei.event_sync.model.Speaker;
import java.util.List;

@Repository
public interface SpeakerRepository extends JpaRepository<Speaker, String> {
    List<Speaker> findByFullNameContainingIgnoreCase(String name);
}