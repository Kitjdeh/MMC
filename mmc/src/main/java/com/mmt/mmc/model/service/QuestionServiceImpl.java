package com.mmt.mmc.model.service;

import com.mmt.mmc.entity.Question;
import com.mmt.mmc.model.dto.QuestionDto;
import com.mmt.mmc.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class QuestionServiceImpl implements QuestionService{

    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public List<QuestionDto> getQuestionList() {
        List<Question> questions = questionRepository.findAll();
        List<QuestionDto> questionDtoList = new ArrayList<>();

        for(Question question: questions){
            QuestionDto dto = QuestionDto.builder()
                    .questionId(question.getQuestionId())
                    .userId(question.getUserId())
                    .progress(question.getProgress())
                    .progressScore(question.getProgressScore())
                    .language(question.getLanguage())
                    .category(question.getCategory())
                    .algorithm(question.getAlgorithm())
                    .source(question.getSource())
                    .questionNumber(question.getQuestionNumber())
                    .title(question.getTitle())
                    .content(question.getContent())
                    .reservation(question.getReservation())
                    .code(question.getCode())
                    .point(question.getPoint())
                    .build();
            questionDtoList.add(dto);
        }
        return questionDtoList;
    }

    @Override
    @Transactional
    public void saveQuestion(QuestionDto questionDto) {
        questionRepository.save(questionDto.toEntity()).getQuestionId();
    }

    @Override
    public QuestionDto getQuestionOne(int questionId) {
        Optional<Question> questionWrapper = questionRepository.findById(questionId);
        if(questionWrapper.isPresent()){
            Question question = questionWrapper.get();
            QuestionDto dto = question.toDto();
            return dto;
        }
        return null;
    }

    @Override
    public boolean deleteQuestion(int questionId) {
        Optional<Question> questionWrapper = questionRepository.findById(questionId);
        if(questionWrapper.isPresent()){
            Question question= questionWrapper.get();
            questionRepository.deleteById(question.getQuestionId());
            return true;
        }
        return false;
    }

    @Override
    public String findImageUrl(int questionId) {
        Optional<Question> questionWrapper = questionRepository.findById(questionId);
        if(questionWrapper.isPresent()){
            Question question=questionWrapper.get();
            return question.getImageUrl();
        }
        return null;
    }
}
