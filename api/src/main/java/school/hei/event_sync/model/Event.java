package school.hei.event_sync.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.security.InvalidParameterException;
import java.sql.Timestamp;

@Entity
@Table(name = "event")
@Data
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column
    private String title;

    @Column(nullable=false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "start_date", nullable = false)
    private Timestamp startDate;

    @Column(name = "end_date", nullable = false)
    private Timestamp endDate;

    @Column(nullable = false)
    private String location;

    @CreationTimestamp
    @Column(name = "created_at",  nullable = false, updatable = false)
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at",  nullable = false,  updatable = false)
    private Timestamp updatedAt;


    @PrePersist
    @PreUpdate
    public void validatedDates() {
        if (endDate != null && startDate != null && endDate.before(startDate))
            throw new InvalidParameterException("endDate and/or startDate must be before start date");
    }

}
