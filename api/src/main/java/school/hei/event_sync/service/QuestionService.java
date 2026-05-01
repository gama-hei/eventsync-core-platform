package school.hei.event_sync.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import school.hei.event_sync.dto.request.CreateQuestionRequest;
import school.hei.event_sync.dto.response.QuestionResponse;
import school.hei.event_sync.mapper.QuestionMapper;
import school.hei.event_sync.model.Question;
import school.hei.event_sync.model.Session;
import school.hei.event_sync.repository.QuestionRepository;
import school.hei.event_sync.repository.SessionRepository;

import jakarta.persistence.EntityNotFoundException;
import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final SessionRepository sessionRepository;
    private final QuestionMapper questionMapper;

    public List<QuestionResponse> getSessionQuestions(UUID sessionId) {
        if (!sessionRepository.existsById(sessionId)) {
            throw new EntityNotFoundException("Session not found: " + sessionId);
        }
        List<Question> questions = questionRepository.findBySession_IdOrderByUpvotesDesc(sessionId);
        return questions.stream().map(questionMapper::toDto).toList();
    }

    @Transactional
    public QuestionResponse createQuestion(UUID sessionId, CreateQuestionRequest request) {
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new EntityNotFoundException("Session not found: " + sessionId));

        Timestamp now = new Timestamp(System.currentTimeMillis());
        if (session.getStartTime().after(now) || session.getEndTime().before(now)) {
            throw new IllegalStateException("Questions can only be posted during a live session");
        }

        Question question = questionMapper.toEntity(request);
        question.setSession(session);
        question = questionRepository.save(question);
        return questionMapper.toDto(question);
    }

    @Transactional
    public QuestionResponse upvoteQuestion(UUID questionId) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new EntityNotFoundException("Question not found: " + questionId));
        question.incrementUpvotes();
        questionRepository.save(question);
        return questionMapper.toDto(question);
    }
}