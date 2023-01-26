package com.mmt.mmc.model.service;

import com.mmt.mmc.model.dto.QuestionDto;
import com.mmt.mmc.model.dto.QuestionTrainerDto;
import com.mmt.mmc.model.dto.UserDto;

import java.util.List;
import java.util.Map;


public interface QuestionService {
    List<QuestionDto> findAllQuestion();
    void saveQuestion(QuestionDto questionDto);
    QuestionDto findQuestion(int questionId);
    boolean deleteQuestion(int questionId);
    String findImageUrl(int questionId);

    //강사신청
    void saveQuestionTrainer(QuestionTrainerDto questionTrainerDto);
    void deleteQuestionTrainer(int questionId,int userId);
    List<UserDto> findAllTrainer(int questionId);
}
