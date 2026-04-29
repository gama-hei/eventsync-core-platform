package school.hei.event_sync.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "speaker")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Speaker {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Column(name = "profile_picture", length = 500)
    private String profilePicture;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String bio;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @OneToMany(mappedBy = "speaker", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SpeakerLink> links = new ArrayList<>();

    @ManyToMany(mappedBy = "speakers")
    private List<Session> sessions = new ArrayList<>();

    public void addLink(SpeakerLink link) {
        links.add(link);
        link.setSpeaker(this);
    }

    public void removeLink(SpeakerLink link) {
        links.remove(link);
        link.setSpeaker(null);
    }
}