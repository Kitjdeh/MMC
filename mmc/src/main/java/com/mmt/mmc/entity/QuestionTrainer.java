package com.mmt.mmc.entity;

import com.mmt.mmc.model.dto.QuestionTrainerDto;
import com.mmt.mmc.model.dto.QuestionTrainerId;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@NoArgsConstructor
@DynamicUpdate
@IdClass(QuestionTrainerId.class)
public class QuestionTrainer implements Serializable {

    @Id
    @Column(name="user_id",nullable = false)
    private int userId;

    @Id
    @Column(name="question_id",nullable = false)
    private int questionId;

    @Column(name="is_adopt",nullable = false)
    private int isAdopt;

    public QuestionTrainerDto toDto(){
        QuestionTrainerDto questionTrainerDto = QuestionTrainerDto.builder()
                .userId(userId)
                .questionId(questionId)
                .isAdopt(isAdopt)
                .build();
        return questionTrainerDto;
    }

    @Builder
    public QuestionTrainer(int userId, int questionId, int isAdopt) {
        this.userId = userId;
        this.questionId = questionId;
        this.isAdopt = isAdopt;
    }
}
