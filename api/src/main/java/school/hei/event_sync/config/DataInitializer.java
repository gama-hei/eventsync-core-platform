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
        organizerRepository.deleteAll();
        log.info(" Tous les organisateurs ont été supprimés");

        String email = "admin@eventsync.com";
        String plainPassword = "admin123";
        String encodedPassword = passwordEncoder.encode(plainPassword);

        log.info(" Création de l'admin:");
        log.info("   Email: {}", email);
        log.info("   Mot de passe: {}", plainPassword);
        log.info("   Hash généré: {}", encodedPassword);

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
            log.info("Admin créé avec succès!");
            log.info("   Vérification mot de passe: {}", passwordEncoder.matches(plainPassword, saved.getPassword()));
        } else {
            log.error(" echec de la création de l'admin");
        }
    }
}