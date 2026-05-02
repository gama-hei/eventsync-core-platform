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
@Table(name = "session")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "start_time", nullable = false)
    private Timestamp startTime;

    @Column(name = "end_time", nullable = false)
    private Timestamp endTime;

    @Column(nullable = false)
    private Integer capacity = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Question> questions = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "session_speaker",
            joinColumns = @JoinColumn(name = "session_id"),
            inverseJoinColumns = @JoinColumn(name = "speaker_id")
    )
    private List<Speaker> speakers = new ArrayList<>();

    @PrePersist
    @PreUpdate
    private void validateDates() {
        if (endTime != null && startTime != null && endTime.before(startTime)) {
            throw new IllegalStateException("End time must be after start time");
        }
    }

    public void addSpeaker(Speaker speaker) {
        speakers.add(speaker);
        speaker.getSessions().add(this);
    }

    public void removeSpeaker(Speaker speaker) {
        speakers.remove(speaker);
        speaker.getSessions().remove(this);
    }

    public void addQuestion(Question question) {
        questions.add(question);
        question.setSession(this);
    }

    public void removeQuestion(Question question) {
        questions.remove(question);
        question.setSession(null);
    }
}