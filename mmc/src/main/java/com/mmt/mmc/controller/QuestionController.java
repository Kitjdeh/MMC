package com.mmt.mmc.controller;

import com.mmt.mmc.model.dto.QuestionDto;
import com.mmt.mmc.model.service.QuestionService;
import io.swagger.models.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/questions")
public class QuestionController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private static final Logger log = LoggerFactory.getLogger(QuestionController.class);

    @Autowired
    private QuestionService questionService;

    @GetMapping
    public ResponseEntity<List<QuestionDto>> questionList() {
        List<QuestionDto> questions = questionService.getQuestionList();
        log.info("questionList");
        return new ResponseEntity<List<QuestionDto>>(questions, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<String> questionAdd(@RequestBody QuestionDto question){
        System.out.println(question);
        log.trace("questionAdd", question);
        questionService.savePost(question);
        return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
    }

    @GetMapping("/{question_id}")
    public ResponseEntity<QuestionDto> questionDetails(@PathVariable("question_id") int questionId){
        QuestionDto questionDto = questionService.getQuestionOne(questionId);
        return new ResponseEntity<QuestionDto>(questionDto,HttpStatus.OK);
    }

    @PatchMapping("/{question_id}")
    public ResponseEntity<String> questionModify(@PathVariable("question_id") int questionId, @RequestBody QuestionDto question){
        questionService.modifyQuestion(questionId);
        QuestionDto questionDto = questionService.getQuestionOne(questionId);

        questionService.savePost(question);
        return new ResponseEntity<>(SUCCESS,HttpStatus.OK);
    }

    @DeleteMapping("/{question_id}")
    public ResponseEntity<String> questionDelete(@PathVariable("question_id") int questionId){
        questionService.deleteQuestion(questionId);
        return new ResponseEntity<>(SUCCESS,HttpStatus.OK);
    }

}
