package com.mmt.mmc.controller;

import com.mmt.mmc.model.dto.QuestionDto;
import com.mmt.mmc.model.dto.QuestionTrainerDto;
import com.mmt.mmc.model.dto.UserDto;
import com.mmt.mmc.model.service.QuestionService;
import com.mmt.mmc.model.service.UserService;
import io.swagger.models.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
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

    //질문 전체 조회
    @GetMapping
    public ResponseEntity<List<QuestionDto>> questionList() {
        List<QuestionDto> questions = questionService.findAllQuestion();
        log.info("questionList");
        return new ResponseEntity<List<QuestionDto>>(questions, HttpStatus.OK);
    }

    //질문 등록
    @PostMapping
    public ResponseEntity<String> questionAdd(@RequestBody QuestionDto question){
        //사이트 url -> image url로 변경 로직 작성 필요
        //
        questionService.saveQuestion(question);
        return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
    }

    //질문 상세 조회
    @GetMapping("/{question_id}")
    public ResponseEntity<QuestionDto> questionDetails(@PathVariable("question_id") int questionId){
        QuestionDto questionDto = questionService.findQuestion(questionId);
        return new ResponseEntity<QuestionDto>(questionDto,HttpStatus.OK);
    }

    //질문 수정
    @PatchMapping("/{question_id}")
    public ResponseEntity<String> questionModify(@PathVariable("question_id") int questionId, @RequestBody QuestionDto question){
        questionService.saveQuestion(question);
        return new ResponseEntity<>(SUCCESS,HttpStatus.OK);
    }

    //질문 삭제
    @DeleteMapping("/{question_id}")
    public ResponseEntity<String> questionRemove(@PathVariable("question_id") int questionId){
        if(questionService.deleteQuestion(questionId)){
            return new ResponseEntity<>(SUCCESS,HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(FAIL,HttpStatus.BAD_REQUEST);
        }
    }

    //질문 이미지 조회
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

    //강사 신청
    @PostMapping("/lecture")
    public ResponseEntity<Map<String,Object>> questionTrainerAdd(@RequestBody QuestionTrainerDto questionTrainer){
        questionService.saveQuestionTrainer(questionTrainer);

        Map<String,Object> map = new HashMap<>();
        map.put("result",SUCCESS);

        return new ResponseEntity<Map<String,Object>>(map,HttpStatus.OK);
    }

    //강사 신청 수락
    @PatchMapping("/lecture/{question_id}")
    public ResponseEntity<Map<String,Object>> questionTrainerModify(@RequestBody QuestionTrainerDto questionTrainer){
        questionService.saveQuestionTrainer(questionTrainer);
        Map<String,Object> map = new HashMap<>();
        map.put("result",SUCCESS);
        return new ResponseEntity<Map<String,Object>>(map,HttpStatus.OK);
    }

    //강사 신청 삭제
    @Transactional
    @DeleteMapping("/lecture/{question_id}/{user_id}")
    public ResponseEntity<Map<String,Object>> questionTrainerRemove(@PathVariable("question_id") int questionId, @PathVariable("user_id") int userId){
        questionService.deleteQuestionTrainer(questionId,userId);
        Map<String,Object> map = new HashMap<>();
        map.put("result",SUCCESS);
        return new ResponseEntity<>(map,HttpStatus.OK);
    }

    //강사 전체 정보 조회
    @GetMapping("/{question_id}/trainer")
    public ResponseEntity<Map<String,Object>> trainerList(@PathVariable("question_id") int questionId){
        Map<String,Object> map = new HashMap<>();
        List<UserDto> trainers = questionService.findAllTrainer(questionId);
        map.put("result",SUCCESS);
        map.put("users",trainers);
        return new ResponseEntity<>(map,HttpStatus.OK);
    }
}
