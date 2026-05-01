package school.hei.event_sync.utils;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public final class DateUtils {
    private DateUtils() {}

    public static Timestamp toTimestamp(String isoDate) {
        if (isoDate == null) return null;
        LocalDateTime ldt = LocalDateTime.parse(isoDate, DateTimeFormatter.ISO_DATE_TIME);
        return Timestamp.valueOf(ldt);
    }

    public static String fromTimestamp(Timestamp timestamp) {
        if (timestamp == null) return null;
        return timestamp.toLocalDateTime().format(DateTimeFormatter.ISO_DATE_TIME);
    }
}