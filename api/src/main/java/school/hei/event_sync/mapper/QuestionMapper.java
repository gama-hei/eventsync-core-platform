package school.hei.event_sync.mapper;

import org.mapstruct.*;
import school.hei.event_sync.dto.request.CreateQuestionRequest;
import school.hei.event_sync.dto.response.QuestionResponse;
import school.hei.event_sync.model.Question;

@Mapper(componentModel = "spring", uses = DateMapper.class)
public interface QuestionMapper {

    @Mapping(target = "sessionId", source = "session.id")
    @Mapping(target = "createdAt", source = "createdAt", qualifiedByName = "timestampToString")
    QuestionResponse toDto(Question question);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "session", ignore = true)
    @Mapping(target = "upvotes", constant = "0")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Question toEntity(CreateQuestionRequest request);
}