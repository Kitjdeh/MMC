package com.mmt.mmc.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserUpdateDto {
    private int userId;
    private int isManager;
    private int isKakao;
    private int isOnline;
    private String profileImage;
    private String identity;
    private String password;
    private String name;
    private String email;
    private String nickname;
    private int language;
    private String phone;
    private String academicAbility;
    private String workplace;
    private String baekjoonId;
    private String award;
    private int point;
    private int temperature;

}