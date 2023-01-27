package com.mmt.mmc.model.dto;

import com.mmt.mmc.entity.QuestionTrainer;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class QuestionTrainerDto {
    private int questionTrainerId;
    private int userId;
    private int questionId;
    private int isAdopt;

    public QuestionTrainer toEntity(){
        QuestionTrainer questionTrainer = QuestionTrainer.builder()
                .userId(userId)
                .questionId(questionId)
                .isAdopt(isAdopt)
                .build();
        return questionTrainer;
    }

    @Builder
    public QuestionTrainerDto(int userId, int questionId, int isAdopt) {
        this.userId = userId;
        this.questionId = questionId;
        this.isAdopt = isAdopt;
    }
}
