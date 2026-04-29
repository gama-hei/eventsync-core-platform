package school.hei.event_sync.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import school.hei.event_sync.model.enums.LinkType;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity()
@Table(name = "speaker")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Speaker {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, length = 255)
    private String fullName;

    @Column(nullable = false)
    private String profilePicture;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String bio;

    @CreationTimestamp
    @Column(updatable = false)
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp updatedAt;

    @OneToMany(mappedBy = "speaker", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SpeakerLink> links = new ArrayList<>();


    public void addLink(SpeakerLink link) {
        links.add(link);
        link.setSpeaker(this);
    }

    public void removeLink(SpeakerLink link) {
        links.remove(link);
        link.setSpeaker(null);
    }

    public List<SpeakerLink> getLinksByType(LinkType type) {
        return links
                .stream()
                .filter(link -> link.getLinkType() == type)
                .collect(Collectors.toList());
    }
}
