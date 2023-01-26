package com.mmt.mmc.model.service;

import com.mmt.mmc.entity.Question;
import com.mmt.mmc.model.dto.QuestionDto;

import java.util.List;

public interface MypageService {
    List<QuestionDto> findAllMyQuestion(int userId);
    List<QuestionDto> findAllMyLecture(int userId);
}
