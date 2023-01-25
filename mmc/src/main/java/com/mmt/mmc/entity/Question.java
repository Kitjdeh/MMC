package com.mmt.mmc.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
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

    @Builder
    public Question(int questionId, int userId, int progress, int progressScore, int language, int category, int algorithm, int source, int questionNumber, String title, String content, Date reservation, String code, int point) {
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
    }
}
