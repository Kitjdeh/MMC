package com.mmt.mmc.model.service;

import com.mmt.mmc.model.dto.QuestionDto;
import com.mmt.mmc.model.dto.QuestionTrainerDto;
import com.mmt.mmc.model.dto.UserDto;

import java.util.List;


public interface QuestionService {
    //질문 전체 조회
    List<QuestionDto> findAllQuestion();

    /*
     * 질문 등록
     * 질문 수정
     */
    void saveQuestion(QuestionDto questionDto);
    
    // 질문 상세 조회
    QuestionDto findQuestion(int questionId);
    
    // 질문 삭제
    void deleteQuestion(int questionId);
    
    // 질문 이미지 조회
    String findImageUrl(int questionId);

    // 강사신청
    void saveQuestionTrainer(QuestionTrainerDto questionTrainerDto);
    
    // 강사 신청 삭제
    void deleteQuestionTrainer(int questionId,int userId);
    
    // 강사 전체 조회
    List<UserDto> findAllTrainer(int questionId);

    // URL to Img(GrabzIt)
    public String grabzIt(int questionNum) throws Exception;

    // 강사 전체 삭제
    void deleteQuestionTrainerList(int questionId);
}
