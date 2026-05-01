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
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    @GetMapping("/sessions/{sessionId}/questions")
    public ResponseEntity<List<QuestionResponse>> getSessionQuestions(@PathVariable UUID sessionId) {
        return ResponseEntity.ok(questionService.getSessionQuestions(sessionId));
    }

    @PostMapping("/sessions/{sessionId}/questions")
    public ResponseEntity<QuestionResponse> createQuestion(@PathVariable UUID sessionId,
                                                           @Valid @RequestBody CreateQuestionRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(questionService.createQuestion(sessionId, request));
    }

    @PostMapping("/questions/{questionId}/upvote")
    public ResponseEntity<QuestionResponse> upvoteQuestion(@PathVariable UUID questionId) {
        return ResponseEntity.ok(questionService.upvoteQuestion(questionId));
    }
}