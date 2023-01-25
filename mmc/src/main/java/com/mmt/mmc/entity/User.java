package com.mmt.mmc.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;
    @Column @ColumnDefault("0")
    private int isManager;
    @Column @ColumnDefault("0")
    private int isKakao;
    @Column @ColumnDefault("0")
    private int isOnline;
    @Column
    private String profileImage;
    @Column(nullable = false, unique = true)
    private String identity;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false, unique = true)
    private String name;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false, unique = true)
    private String nickname;
    @Column(nullable = false)
    private int language;
    @Column
    private String phone;
    @Column
    private String academicAbility;
    @Column
    private String workplace;
    @Column
    private String baekjoonId;
    @Column
    private String award;
    @Column @ColumnDefault("0")
    private int point;
    @Column @ColumnDefault("0")
    private int temperature;

    @Builder
    public User(int userId, int isManager, int isKakao, int isOnline, String profileImage, String identity, String password, String name, String email, String nickname, int language, String phone, String academicAbility, String workplace, String baekjoonId, String award, int point, int temperature) {
        this.userId = userId;
        this.isManager = isManager;
        this.isKakao = isKakao;
        this.isOnline = isOnline;
        this.profileImage = profileImage;
        this.identity = identity;
        this.password = password;
        this.name = name;
        this.email = email;
        this.nickname = nickname;
        this.language = language;
        this.phone = phone;
        this.academicAbility = academicAbility;
        this.workplace = workplace;
        this.baekjoonId = baekjoonId;
        this.award = award;
        this.point = point;
        this.temperature = temperature;
    }

}
