package com.mmt.mmc.model.service;

import com.mmt.mmc.entity.Question;
import com.mmt.mmc.entity.QuestionTrainer;
import com.mmt.mmc.entity.User;
import com.mmt.mmc.model.dto.QuestionDto;
import com.mmt.mmc.model.dto.QuestionTrainerDto;
import com.mmt.mmc.model.dto.UserDto;
import com.mmt.mmc.repository.QuestionRepository;
import com.mmt.mmc.repository.QuestionTrainerRepository;
import com.mmt.mmc.repository.UserRepository;
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

    @Autowired
    private QuestionTrainerRepository questionTrainerRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<QuestionDto> findAllQuestion() {
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
        questionRepository.save(questionDto.toEntity());
    }

    @Override
    public QuestionDto findQuestion(int questionId) {
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

    @Override
    public void saveQuestionTrainer(QuestionTrainerDto questionTrainerDto) {
        questionTrainerRepository.save(questionTrainerDto.toEntity());
    }

    @Override
    public void deleteQuestionTrainer(int questionId, int userId) {
        questionTrainerRepository.deleteByQuestionIdAndUserId(questionId,userId);
    }

    @Override
    public List<UserDto> findAllTrainer(int questionId) {
        List<QuestionTrainer> questionWrapper = questionTrainerRepository.findByQuestionId(questionId);
        List<UserDto> userDtoList = new ArrayList<>();

        for(QuestionTrainer questionTrainer: questionWrapper){
            QuestionTrainerDto dto = questionTrainer.toDto();
            Optional<User> userWrapper = userRepository.findById(dto.getUserId());
            if(userWrapper.isPresent()){
                User user = userWrapper.get();
                UserDto userDto = user.toDto();
                userDtoList.add(userDto);
            }
        }
        return userDtoList;
    }

}
