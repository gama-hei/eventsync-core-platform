package school.hei.event_sync.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import school.hei.event_sync.model.Event;
import java.util.List;
import java.util.UUID;

@Repository
public interface EventRepository extends JpaRepository<Event, UUID>{
    List<Event> findAllByOrderByStartDateAsc();
}
