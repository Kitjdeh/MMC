package com.mmt.mmc.model.service;

import com.mmt.mmc.model.dto.QuestionDto;

import java.util.List;
import java.util.Map;

public interface QuestionService {
    List<QuestionDto> getQuestionList();
    void saveQuestion(QuestionDto questionDto);
    QuestionDto getQuestionOne(int questionId);
    boolean deleteQuestion(int questionId);
    String findImageUrl(int questionId);
}
