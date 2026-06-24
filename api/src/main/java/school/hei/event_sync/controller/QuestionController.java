package school.hei.event_sync.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import school.hei.event_sync.dto.request.CreateQuestionRequest;
import school.hei.event_sync.dto.response.QuestionResponse;
import school.hei.event_sync.service.QuestionService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    @GetMapping("/sessions/{sessionId}/questions")
    public ResponseEntity<List<QuestionResponse>> getSessionQuestions(@PathVariable String sessionId) {
        return ResponseEntity.ok(questionService.getSessionQuestions(sessionId));
    }

    @PostMapping("/sessions/{sessionId}/questions")
    public ResponseEntity<QuestionResponse> createQuestion(@PathVariable String sessionId,
                                                           @Valid @RequestBody CreateQuestionRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(questionService.createQuestion(sessionId, request));
    }

    @PostMapping("/questions/{questionId}/upvote")
    public ResponseEntity<QuestionResponse> upvoteQuestion(@PathVariable String questionId) {
        return ResponseEntity.ok(questionService.upvoteQuestion(questionId));
    }
}