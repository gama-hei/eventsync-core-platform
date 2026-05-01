package school.hei.event_sync;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.session.jdbc.autoconfigure.JdbcSessionAutoConfiguration;

@SpringBootApplication(exclude = JdbcSessionAutoConfiguration.class)
public class EventSyncApplication {
    public static void main(String[] args) {
        SpringApplication.run(EventSyncApplication.class, args);
    }
}
