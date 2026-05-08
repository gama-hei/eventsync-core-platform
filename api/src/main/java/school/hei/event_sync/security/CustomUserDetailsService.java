package school.hei.event_sync.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import school.hei.event_sync.model.Organizer;
import school.hei.event_sync.repository.OrganizerRepository;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final OrganizerRepository organizerRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Organizer organizer = organizerRepository.findByEmail(email);

        if (organizer == null) {
            throw new UsernameNotFoundException("Organizer not found with email: " + email);
        }

        return User
                .builder()
                .username(organizer.getEmail())
                .password(organizer.getPassword())
                .roles("ORGANIZER")
                .build();
    }
}