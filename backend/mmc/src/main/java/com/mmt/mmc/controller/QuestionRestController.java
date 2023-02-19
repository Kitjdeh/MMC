package com.mmt.mmc.controller;

import com.mmt.mmc.model.dto.QuestionDto;
import com.mmt.mmc.model.dto.QuestionTrainerDto;
import com.mmt.mmc.model.dto.UserDto;
import com.mmt.mmc.model.service.LectureNoteService;
import com.mmt.mmc.model.service.QuestionService;
import com.mmt.mmc.model.service.S3FileUploadService;
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
@CrossOrigin(origins = "*")
public class QuestionRestController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private static final Logger log = LoggerFactory.getLogger(QuestionRestController.class);

    @Autowired
    private QuestionService questionService;

    @Autowired
    private LectureNoteService lectureNoteService;

    @Autowired
    private S3FileUploadService s3FileUploadService;

    //질문 전체 조회
    @GetMapping
    public ResponseEntity<Map<String,Object>> questionList() {
        List<QuestionDto> questions = questionService.findAllQuestion();
        Map<String,Object> map = new HashMap<>();
        map.put("result",SUCCESS);
        map.put("questions",questions);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    //질문 등록
    @PostMapping
    public ResponseEntity<Map<String,Object>> questionAdd(@RequestBody QuestionDto question) throws Exception {
        int questionNum = question.getQuestionNumber();
        question.setImageUrl(questionService.grabzIt(questionNum));
        questionService.saveQuestion(question);
        Map<String,Object> map = new HashMap<>();
        map.put("result",SUCCESS);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    //질문 상세 조회
    @GetMapping("/{question_id}")
    public ResponseEntity<Map<String,Object>> questionDetails(@PathVariable("question_id") int questionId){
        QuestionDto questionDto = questionService.findQuestion(questionId);
        Map<String,Object> map = new HashMap<>();
        map.put("result",SUCCESS);
        map.put("question",questionDto);
        return new ResponseEntity<>(map,HttpStatus.OK);
    }

    //질문 수정
    @PatchMapping("/{question_id}")
    public ResponseEntity<Map<String,Object>> questionModify(@PathVariable("question_id") int questionId, @RequestBody QuestionDto question) throws Exception {
        int questionNum = question.getQuestionNumber();
        int savedQuestionNum = questionService.findQuestion(questionId).getQuestionNumber();
        System.out.println("requestQuestionNum"+savedQuestionNum);
        System.out.println();
        if(savedQuestionNum != questionNum){
            question.setImageUrl(questionService.grabzIt(questionNum));
        }
        questionService.saveQuestion(question);
        Map<String,Object> map = new HashMap<>();
        map.put("result",SUCCESS);
        return new ResponseEntity<>(map,HttpStatus.OK);
    }

    //질문 삭제
    @Transactional
    @DeleteMapping("/{question_id}")
    public ResponseEntity<Map<String,Object>> questionRemove(@PathVariable("question_id") int questionId){
        questionService.deleteQuestionTrainerList(questionId);
        if(lectureNoteService.findLectureNote(questionId)!=null) {
            lectureNoteService.removeLectureNote(lectureNoteService.findLectureNote(questionId).getLectureNoteId());
        }
        questionService.deleteQuestion(questionId);
        Map<String,Object> map = new HashMap<>();
        map.put("result",SUCCESS);
        return new ResponseEntity<>(map,HttpStatus.OK);
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
    @PatchMapping("/lecture/{question_id}/{user_id}")
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

    //강사 전체 조회
    @GetMapping("/{question_id}/trainer")
    public ResponseEntity<Map<String,Object>> trainerList(@PathVariable("question_id") int questionId){
        Map<String,Object> map = new HashMap<>();
        List<UserDto> trainers = questionService.findAllTrainer(questionId);
        map.put("result",SUCCESS);
        map.put("users",trainers);
        return new ResponseEntity<>(map,HttpStatus.OK);
    }
}
