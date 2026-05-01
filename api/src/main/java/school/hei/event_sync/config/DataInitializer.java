package school.hei.event_sync.config;

import school.hei.event_sync.model.Organizer;
import school.hei.event_sync.repository.OrganizerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.time.Instant;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final OrganizerRepository organizerRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (organizerRepository.count() == 0) {
            Organizer organizer = Organizer.builder()
                    .email("organizer@eventsync.com")
                    .password(passwordEncoder.encode("Organizer123!"))
                    .fullName("Default Organizer")
                    .isActive(true)
                    .createdAt(Timestamp.from(Instant.now()))
                    .build();

            organizerRepository.save(organizer);
            log.info("✅ Default organizer created: organizer@eventsync.com / Organizer123!");
            log.info("⚠️  PLEASE CHANGE THIS PASSWORD ON FIRST LOGIN!");
        } else {
            log.info("✅ Database already contains {} organizers", organizerRepository.count());
        }
    }
}