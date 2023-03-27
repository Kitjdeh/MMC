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
import it.grabz.grabzit.GrabzItClient;
import it.grabz.grabzit.parameters.ImageOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionServiceImpl implements QuestionService{

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private QuestionTrainerRepository questionTrainerRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private S3FileUploadService s3FileUploadService;

    //질문 전체 조회
    @Override
    public List<QuestionDto> findAllQuestion() {
        List<Question> questions = questionRepository.findAll();
        List<QuestionDto> questionDtoList = new ArrayList<>();

        for(Question question: questions){
            QuestionDto dto = question.toDto();
            questionDtoList.add(dto);
        }
        return questionDtoList;
    }

    /*
     * 질문 등록
     * 질문 수정
     */
    @Override
    @Transactional
    public void saveQuestion(QuestionDto questionDto) {
        questionRepository.save(questionDto.toEntity());
    }

    // 질문 상세 조회
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

    // 질문 삭제
    @Override
    public void deleteQuestion(int questionId) {
        Optional<Question> questionWrapper = questionRepository.findById(questionId);
        if(questionWrapper.isPresent()){
            Question question= questionWrapper.get();
            questionRepository.deleteById(question.getQuestionId());
        }
    }

    // 질문 이미지 조회
    @Override
    public String findImageUrl(int questionId) {
        Optional<Question> questionWrapper = questionRepository.findById(questionId);
        if(questionWrapper.isPresent()){
            Question question=questionWrapper.get();
            return question.getImageUrl();
        }
        return null;
    }

    // 강사 신청
    @Override
    public void saveQuestionTrainer(QuestionTrainerDto questionTrainerDto) {
        questionTrainerRepository.save(questionTrainerDto.toEntity());
    }

    // 강사 신청 삭제
    @Override
    public void deleteQuestionTrainer(int questionId, int userId) {
        questionTrainerRepository.deleteByQuestionIdAndUserId(questionId,userId);
    }

    // 강사 전체 조회
    /*
     * 1. questionId로 해당 질문에 신청한 QuestionTrainer 리스트 추출
     * 2. QuestionTrainer 리스트를 돌면서 각 요소의 userId를 통해 user 정보 획득, userDtoList에 추가
     */
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

    // URL to Img(GrabzIt)
    public String grabzIt(int questionNum) throws Exception {
        GrabzItClient grabzIt = new GrabzItClient("MjhhZTRkM2EzZmI5NDgwMjg3ODg3YzBmZWU3ZTg4OWQ=", "Pz8/BT8/Pz8/Iz8PaT8/JT8/aEA/eWMAPwI/Pws/Rz8=");

        ImageOptions options = new ImageOptions();
        options.setBrowserHeight(-1);

        grabzIt.URLToImage("https://www.acmicpc.net/problem/"+questionNum,options);
        String filename=questionNum+".jpg";
        grabzIt.SaveTo(filename);

        String path=System.getProperty("user.dir");
        File file =new File(path+"/"+filename);
        String url=s3FileUploadService.uploadFiles(file);
        return url;
    }

    //강사 전체 삭제
    @Override
    public void deleteQuestionTrainerList(int questionId) {
        questionTrainerRepository.deleteAllByQuestionId(questionId);
    }


}
