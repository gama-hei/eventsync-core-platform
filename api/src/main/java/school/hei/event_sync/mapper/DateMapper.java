package school.hei.event_sync.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Named;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Mapper(componentModel = "spring")
public interface DateMapper {

    @Named("stringToTimestamp")
    default Timestamp toTimestamp(String dateTime) {
        if (dateTime == null) {
            return null;
        }
        LocalDateTime ldt = LocalDateTime.parse(dateTime, DateTimeFormatter.ISO_DATE_TIME);
        return Timestamp.valueOf(ldt);
    }

    @Named("timestampToString")
    default String toString(Timestamp timestamp) {
        if (timestamp == null) {
            return null;
        }
        return timestamp.toLocalDateTime().format(DateTimeFormatter.ISO_DATE_TIME);
    }
}