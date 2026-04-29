package school.hei.event_sync.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

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

}
