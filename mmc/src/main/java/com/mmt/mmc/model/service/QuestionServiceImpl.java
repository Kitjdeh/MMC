package com.mmt.mmc.model.service;

import com.mmt.mmc.entity.Question;
import com.mmt.mmc.model.dto.QuestionDto;
import com.mmt.mmc.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
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
    public void savePost(QuestionDto questionDto) {
        questionRepository.save(questionDto.toEntity()).getQuestionId();
    }

    @Override
    public QuestionDto getQuestionOne(int questionId) {
        Optional<Question> questionWrapper = questionRepository.findById(questionId);
        if(questionWrapper.isPresent()){
            Question question = questionWrapper.get();
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
            return dto;
        }
        return null;
    }

    @Override
    public void deleteQuestion(int questionId) {
        Optional<Question> questionWrapper = questionRepository.findById(questionId);
        if(questionWrapper.isPresent()){
            Question question= questionWrapper.get();
            questionRepository.deleteById(question.getQuestionId());
        }
    }

    @Override
    public void modifyQuestion(int questionId) {
        Optional<Question> questionWrapper = questionRepository.findById(questionId);
        //추가 작성 필요
    }
}
