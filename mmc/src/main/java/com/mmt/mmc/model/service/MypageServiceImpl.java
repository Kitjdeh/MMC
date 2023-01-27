package com.mmt.mmc.model.service;

import com.mmt.mmc.entity.Question;
import com.mmt.mmc.entity.QuestionTrainer;
import com.mmt.mmc.model.dto.QuestionDto;
import com.mmt.mmc.model.dto.QuestionTrainerDto;
import com.mmt.mmc.repository.QuestionRepository;
import com.mmt.mmc.repository.QuestionTrainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MypageServiceImpl implements MypageService{

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private QuestionTrainerRepository questionTrainerRepository;

    //내 질문 전체 조회
    @Override
    public List<QuestionDto> findAllMyQuestion(int userId) {
        List<Question> questions = questionRepository.findByUserId(userId);
        List<QuestionDto> questionDtoList = new ArrayList<>();
        for(Question question: questions){
            QuestionDto dto = question.toDto();
            questionDtoList.add(dto);
        }
        return questionDtoList;
    }

    //내 강의 전체 조회
    /*
     * 1. userId로 해당 강사가 신청한 QuestionTrainer 리스트 추출
     * 2. QuestionTrainer 리스트를 돌면서 각 요소의 questionId를 통해 question 정보 획득, questionDtoList에 추가
     */
    @Override
    public List<QuestionDto> findAllMyLecture(int userId) {
        List<QuestionTrainer> questionTrainers = questionTrainerRepository.findByUserId(userId);
        List<QuestionDto> questionDtoList = new ArrayList<>();
        for(QuestionTrainer questionTrainer: questionTrainers){
            QuestionTrainerDto dto = questionTrainer.toDto();
            Optional<Question> questionWrapper = questionRepository.findById(dto.getQuestionId());
            if(questionWrapper.isPresent()){
                Question question = questionWrapper.get();
                QuestionDto questionDto = question.toDto();
                questionDtoList.add(questionDto);
            }
        }
        return questionDtoList;
    }
}
