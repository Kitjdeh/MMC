package com.mmt.mmc.repository;

import com.mmt.mmc.entity.QuestionTrainer;
import com.mmt.mmc.model.dto.QuestionTrainerId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionTrainerRepository extends JpaRepository<QuestionTrainer, QuestionTrainerId> {
    List<QuestionTrainer> findByQuestionId(int questionId);
    void deleteByQuestionIdAndUserId(int questionId,int userId);
    List<QuestionTrainer> findByUserId(int userId);
    List<QuestionTrainer> deleteAllByQuestionId(int questionId);
}
