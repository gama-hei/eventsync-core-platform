package school.hei.event_sync.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import school.hei.event_sync.model.Organizer;
import school.hei.event_sync.repository.OrganizerRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final OrganizerRepository organizerRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Organizer organizer = organizerRepository.findByEmail(email);

        return User
                .builder()
                .username(organizer.getEmail())
                .password(organizer.getPassword())
                .roles("ORGANIZER")
                .build();
    }
}
