package com.mmt.mmc.controller;

import com.mmt.mmc.model.dto.QuestionDto;
import com.mmt.mmc.model.service.QuestionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/questions")
public class QuestionRestController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private static final Logger log = LoggerFactory.getLogger(QuestionRestController.class);

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
        //사이트 url -> image url로 변경 로직 작성 필요
        //
        questionService.saveQuestion(question);
        return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
    }

    @GetMapping("/{question_id}")
    public ResponseEntity<QuestionDto> questionDetails(@PathVariable("question_id") int questionId){
        QuestionDto questionDto = questionService.getQuestionOne(questionId);
        return new ResponseEntity<QuestionDto>(questionDto,HttpStatus.OK);
    }

    @PatchMapping("/{question_id}")
    public ResponseEntity<String> questionModify(@PathVariable("question_id") int questionId, @RequestBody QuestionDto question){
        questionService.saveQuestion(question);
        return new ResponseEntity<>(SUCCESS,HttpStatus.OK);
    }

    @DeleteMapping("/{question_id}")
    public ResponseEntity<String> questionRemove(@PathVariable("question_id") int questionId){
        if(questionService.deleteQuestion(questionId)){
            return new ResponseEntity<>(SUCCESS,HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(FAIL,HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{question_id}/image")
    public ResponseEntity<Map<String,Object>> questionImageUrlDetails(@PathVariable("question_id") int questionId){
        Map<String, Object> map = new HashMap<>();
        String url=questionService.findImageUrl(questionId);
        if(url!=null) {
            map.put("result", SUCCESS);
            map.put("imageUrl", url);
            return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
        }
        else{
            map.put("result",FAIL);
            return new ResponseEntity<Map<String, Object>>(map, HttpStatus.BAD_REQUEST);
        }
    }

}
