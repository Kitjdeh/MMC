package com.mmt.mmc.model.service;

import com.mmt.mmc.model.dto.QuestionDto;

import java.util.List;

public interface QuestionService {
    List<QuestionDto> getQuestionList();
    void savePost(QuestionDto questionDto);
    QuestionDto getQuestionOne(int questionId);
    void deleteQuestion(int questionId);
    void modifyQuestion(int questionId);
}
