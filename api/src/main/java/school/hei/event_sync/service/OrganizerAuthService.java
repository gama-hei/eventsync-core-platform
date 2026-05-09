package school.hei.event_sync.service;

import school.hei.event_sync.dto.response.LoginResponse;
import school.hei.event_sync.model.Organizer;
import school.hei.event_sync.repository.OrganizerRepository;
import school.hei.event_sync.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.Instant;

@Service
@RequiredArgsConstructor
public class OrganizerAuthService {

    private final OrganizerRepository organizerRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    @Transactional
    public LoginResponse authenticate(String email, String password) {
        System.out.println("=== AUTHENTICATION DEBUG ===");
        System.out.println("1. Email reçu: '" + email + "'");
        System.out.println("2. Password reçu: '" + password + "'");

        Organizer organizer = organizerRepository.findByEmail(email);

        if (organizer == null) {
            System.out.println(" Organizer non trouvé dans la base");
            throw new RuntimeException("Invalid email or password");
        }

        System.out.println("3. Organizer trouvé: " + organizer.getEmail());
        System.out.println("4. Hash en base: " + organizer.getPassword());
        System.out.println("5. PasswordEncoder: " + passwordEncoder.getClass().getSimpleName());

        boolean passwordMatches = passwordEncoder.matches(password, organizer.getPassword());
        System.out.println("6. Password matches: " + passwordMatches);

        if (!passwordMatches) {
            System.out.println("7. Test avec 'admin123': " + passwordEncoder.matches("admin123", organizer.getPassword()));
            System.out.println(" Mot de passe incorrect");
            throw new RuntimeException("Invalid email or password");
        }

        if (!organizer.getIsActive()) {
            System.out.println(" Compte désactivé");
            throw new RuntimeException("Account is disabled");
        }

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            System.out.println("8. Spring Security authentication: OK");
        } catch (Exception e) {
            System.out.println("8. Spring Security authentication failed: " + e.getMessage());
        }

        String token = jwtUtil.generateToken(email);
        System.out.println("9. Token généré avec succès");

        organizer.setLastLogin(Timestamp.from(Instant.now()));
        organizerRepository.save(organizer);

        return LoginResponse.builder()
                .token(token)
                .type("Bearer")
                .organizerId(organizer.getId())
                .email(email)
                .fullName(organizer.getFullName())
                .build();
    }

    public Organizer validateTokenAndGetOrganizer(String token) {
        try {
            String email = jwtUtil.extractEmail(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);

            if (jwtUtil.validateToken(token, userDetails)) {
                return organizerRepository.findByEmail(email);
            }
            throw new RuntimeException("Invalid token");
        } catch (Exception e) {
            throw new RuntimeException("Invalid or expired token");
        }
    }

    public Organizer getCurrentOrganizer() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("No authenticated organizer found");
        }
        String email = authentication.getName();
        return organizerRepository.findByEmail(email);
    }

    @Transactional
    public void changePassword(String email, String oldPassword, String newPassword) {
        Organizer organizer = organizerRepository.findByEmail(email);
        if (!passwordEncoder.matches(oldPassword, organizer.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }
        organizer.setPassword(passwordEncoder.encode(newPassword));
        organizerRepository.save(organizer);
    }

    @Transactional
    public Organizer createOrganizer(String email, String password, String fullName) {
        if (organizerRepository.existsByEmail(email)) {
            throw new RuntimeException("Organizer already exists with email: " + email);
        }

        Organizer organizer = Organizer.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .fullName(fullName)
                .isActive(true)
                .createdAt(Timestamp.from(Instant.now()))
                .build();

        return organizerRepository.save(organizer);
    }

    @Transactional
    public void deactivateOrganizer(String email) {
        Organizer organizer = organizerRepository.findByEmail(email);
        organizer.setIsActive(false);
        organizerRepository.save(organizer);
    }

    @Transactional
    public void reactivateOrganizer(String email) {
        Organizer organizer = organizerRepository.findByEmail(email);
        organizer.setIsActive(true);
        organizerRepository.save(organizer);
    }

    public boolean emailExists(String email) {
        return organizerRepository.existsByEmail(email);
    }
}