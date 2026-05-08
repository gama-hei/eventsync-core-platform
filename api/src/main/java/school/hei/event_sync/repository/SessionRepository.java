package school.hei.event_sync.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import school.hei.event_sync.model.Session;
import java.sql.Timestamp;
import java.util.List;

@Repository
public interface SessionRepository extends JpaRepository<Session, String> {
    List<Session> findByEvent_Id(String eventId);
    List<Session> findByRoom_Id(String roomId);
    List<Session> findBySpeakers_Id(String speakerId);
    List<Session> findByStartTimeLessThanEqualAndEndTimeGreaterThanEqual(Timestamp start, Timestamp end);
    List<Session> findByEvent_IdAndStartTimeLessThanEqualAndEndTimeGreaterThanEqual(String eventId, Timestamp start, Timestamp end);
    List<Session> findAllByOrderByStartTimeAsc();
}