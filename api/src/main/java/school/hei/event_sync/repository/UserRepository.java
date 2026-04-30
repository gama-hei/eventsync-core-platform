package school.hei.event_sync.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import school.hei.event_sync.model.Organizer;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<Organizer, UUID> {
    Optional<Organizer> findByEmail(String email);
    boolean existsByEmail(String email);
    Optional<Organizer> findByEmailAndIsActiveTrue(String email);
}
