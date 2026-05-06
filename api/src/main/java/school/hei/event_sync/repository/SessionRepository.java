package school.hei.event_sync.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import school.hei.event_sync.model.Session;
import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;


@Repository
public interface SessionRepository extends JpaRepository<Session, UUID>{

    List<Session> findByEvent_Id(UUID eventId);
    List<Session> findByRoom_Id(UUID roomId);
    List<Session> findBySpeakers_Id(UUID speakerId);

    List<Session> findByStartTimeLessThanEqualAndEndTimeGreaterThanEqual(Timestamp start, Timestamp end); 
    List<Session> findByEvent_IdAndStartTimeLessThanEqualAndEndTimeGreaterThanEqual(
            UUID eventId, Timestamp start, Timestamp end);
    List<Session> findAllByOrderByStartTimeAsc();

}
