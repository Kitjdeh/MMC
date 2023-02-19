package com.mmt.mmc.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionTrainerId implements Serializable {
    private int userId;
    private int questionId;
}
