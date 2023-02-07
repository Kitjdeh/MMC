package com.mmt.mmc.model.service;

import com.mmt.mmc.model.dto.QuestionDto;

import java.util.List;

public interface MypageService {
    //내 질문 전체 조회
    List<QuestionDto> findAllMyQuestion(int userId);

    //내 강의 전체 조회
    List<QuestionDto> findAllMyLecture(int userId);
}
