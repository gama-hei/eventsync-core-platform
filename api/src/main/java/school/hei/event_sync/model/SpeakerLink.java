package school.hei.event_sync.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import school.hei.event_sync.model.enums.LinkType;

import java.sql.Timestamp;

@Entity
@Table(name = "speaker_link")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SpeakerLink {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "speaker_id", nullable = false)
    private Speaker speaker;

    @Column(nullable = false, length = 500)
    private String linkUrl;

    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private LinkType linkType = LinkType.OTHER;

    @CreationTimestamp
    @Column
    private Timestamp createdAt;
}
