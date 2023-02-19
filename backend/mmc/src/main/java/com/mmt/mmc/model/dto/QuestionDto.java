package com.mmt.mmc.model.dto;

import com.mmt.mmc.entity.Question;
import lombok.*;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class QuestionDto {
    private int questionId;
    private int userId;
    private int progress;
    private int progressScore;
    private int language;
    private int category;
    private int algorithm;
    private int source;
    private int questionNumber;
    private String title;
    private String content;
    private Date reservation;
    private String code;
    private int point;
    private String imageUrl;
    private String date;

    public Question toEntity(){
        Question question = Question.builder()
                .questionId(questionId)
                .userId(userId)
                .progress(progress)
                .progressScore(progressScore)
                .language(language)
                .category(category)
                .algorithm(algorithm)
                .source(source)
                .questionNumber(questionNumber)
                .title(title)
                .content(content)
                .reservation(reservation)
                .code(code)
                .point(point)
                .imageUrl(imageUrl)
                .build();
        return question;
    }

    @Builder
    public QuestionDto(int questionId, int userId, int progress, int progressScore, int language, int category, int algorithm, int source, int questionNumber, String title, String content, Date reservation, String code, int point, String imageUrl, String date) {
        this.questionId = questionId;
        this.userId = userId;
        this.progress = progress;
        this.progressScore = progressScore;
        this.language = language;
        this.category = category;
        this.algorithm = algorithm;
        this.source = source;
        this.questionNumber = questionNumber;
        this.title = title;
        this.content = content;
        this.reservation = reservation;
        this.code = code;
        this.point = point;
        this.imageUrl = imageUrl;
        this.date = date;
    }
}
