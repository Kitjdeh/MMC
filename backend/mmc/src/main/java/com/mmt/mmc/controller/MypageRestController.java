package com.mmt.mmc.controller;

import com.mmt.mmc.model.dto.QuestionDto;
import com.mmt.mmc.model.service.MypageService;
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
@RequestMapping("/api/v1/mypage")
@CrossOrigin(origins = "*")
public class MypageRestController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private static final Logger log = LoggerFactory.getLogger(MypageRestController.class);

    @Autowired
    private MypageService mypageService;
    
    //내 질문 전체 조회
    @GetMapping("/questions/{user_id}")
    public ResponseEntity<Map<String,Object>> myQuestionList(@PathVariable("user_id") int userId){
        List<QuestionDto> questions = mypageService.findAllMyQuestion(userId);
        Map<String,Object> map = new HashMap<>();
        map.put("result",SUCCESS);
        map.put("questions",questions);

        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    //내 강의 전체 조회
    @GetMapping("/answers/{user_id}")
    public ResponseEntity<Map<String,Object>> myLectureList(@PathVariable("user_id") int userId){
        List<QuestionDto> lectures=mypageService.findAllMyLecture(userId);
        Map<String,Object> map = new HashMap<>();
        map.put("result",SUCCESS);
        map.put("questions",lectures);
        return new ResponseEntity<>(map,HttpStatus.OK);
    }

}
