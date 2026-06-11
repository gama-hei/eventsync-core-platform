package school.hei.event_sync.config;

import school.hei.event_sync.model.Organizer;
import school.hei.event_sync.repository.OrganizerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.Instant;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final OrganizerRepository organizerRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) {
        if (organizerRepository.findByEmail("admin@eventsync.com") == null) {
            String email = "admin@eventsync.com";
            String plainPassword = "admin123";
            String encodedPassword = passwordEncoder.encode(plainPassword);

            log.info("Creating admin user:");
            log.info("   Email: {}", email);
            log.info("   Password: {}", plainPassword);
            log.info("   Generated hash: {}", encodedPassword);

            Organizer organizer = Organizer.builder()
                    .email(email)
                    .password(encodedPassword)
                    .fullName("Administrator")
                    .isActive(true)
                    .createdAt(Timestamp.from(Instant.now()))
                    .build();

            organizerRepository.save(organizer);

            Organizer saved = organizerRepository.findByEmail(email);
            if (saved != null) {
                log.info("Admin created successfully!");
                log.info("   Password verification: {}", passwordEncoder.matches(plainPassword, saved.getPassword()));
            } else {
                log.error("Failed to create admin user");
            }
        } else {
            log.info("Admin already exists in database");
        }
    }
}