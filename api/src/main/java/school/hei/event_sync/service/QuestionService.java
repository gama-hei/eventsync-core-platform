package school.hei.event_sync.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import school.hei.event_sync.dto.request.CreateQuestionRequest;
import school.hei.event_sync.dto.response.QuestionResponse;
import school.hei.event_sync.model.Question;
import school.hei.event_sync.model.Session;
import school.hei.event_sync.repository.QuestionRepository;
import school.hei.event_sync.repository.SessionRepository;
import school.hei.event_sync.utils.DateUtils;

import jakarta.persistence.EntityNotFoundException;
import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final SessionRepository sessionRepository;

    public List<QuestionResponse> getSessionQuestions(UUID sessionId) {
        if (!sessionRepository.existsById(sessionId)) {
            throw new EntityNotFoundException("Session not found: " + sessionId);
        }
        return questionRepository.findBySession_IdOrderByUpvotesDesc(sessionId)
                .stream()
                .map(this::toQuestionResponse)
                .toList();
    }

    @Transactional
    public QuestionResponse createQuestion(UUID sessionId, CreateQuestionRequest request) {
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new EntityNotFoundException("Session not found: " + sessionId));

        Timestamp now = new Timestamp(System.currentTimeMillis());
        if (session.getStartTime().after(now) || session.getEndTime().before(now)) {
            throw new IllegalStateException("Questions can only be posted during a live session");
        }

        Question question = toQuestionEntity(request);
        question.setSession(session);
        question = questionRepository.save(question);
        return toQuestionResponse(question);
    }

    @Transactional
    public QuestionResponse upvoteQuestion(UUID questionId) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new EntityNotFoundException("Question not found: " + questionId));
        question.incrementUpvotes();
        questionRepository.save(question);
        return toQuestionResponse(question);
    }

    private QuestionResponse toQuestionResponse(Question question) {
        QuestionResponse dto = new QuestionResponse();
        dto.setId(question.getId());
        dto.setContent(question.getContent());
        dto.setAuthorName(question.getAuthorName());
        dto.setUpvotes(question.getUpvotes());
        dto.setSessionId(question.getSession() != null ? question.getSession().getId() : null);
        dto.setCreatedAt(DateUtils.fromTimestamp(question.getCreatedAt()));
        return dto;
    }

    private Question toQuestionEntity(CreateQuestionRequest request) {
        Question question = new Question();
        question.setContent(request.getContent());
        question.setAuthorName(request.getAuthorName());
        question.setUpvotes(0);
        return question;
    }
}