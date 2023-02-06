package com.mmt.mmc.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.mmt.mmc.model.dto.QuestionDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.Date;

@Getter
@Entity
@NoArgsConstructor
@DynamicUpdate
public class Question{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="question_id")
    private int questionId;

    @Column(name="user_id",nullable = false)
    private int userId;

    @Column(nullable = false)
    private int progress;

    @Column(name="progress_score")
    private int progressScore;

    @Column(nullable = false)
    private int language;

    @Column(nullable = false)
    private int category;

    @Column(nullable = false)
    private int algorithm;

    @Column(nullable = false)
    private int source;

    @Column(name="question_number", nullable = false)
    private int questionNumber;

    @Column(length = 100, nullable = false)
    private String title;

    @Column(length = 1000, nullable = false)
    private String content;

    @Column(nullable = true)
    private Date reservation;

    @Column(length = 10000, nullable = false)
    private String code;

    @Column(nullable = false)
    private int point;

    @Column(name="image_url", length = 200)
    private String imageUrl;

    @Column
    private String date;

    public QuestionDto toDto(){
        QuestionDto questionDto = QuestionDto.builder()
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
                .date(date)
                .build();
        return questionDto;
    }

    @Builder
    public Question(int questionId, int userId, int progress, int progressScore, int language, int category, int algorithm, int source, int questionNumber, String title, String content, Date reservation, String code, int point, String imageUrl, String date) {
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
        this.date=date;
    }
}
