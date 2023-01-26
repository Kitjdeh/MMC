package com.mmt.mmc.model.dto;

import com.mmt.mmc.entity.User;
import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
public class UserDto {
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

    public User toEntity(){
        User build = User.builder()
                .userId(userId)
                .isManager(isManager)
                .isKakao(isKakao)
                .isOnline(isOnline)
                .profileImage(profileImage)
                .identity(identity)
                .password(password)
                .name(name)
                .email(email)
                .nickname(nickname)
                .language(language)
                .phone(phone)
                .academicAbility(academicAbility)
                .workplace(workplace)
                .baekjoonId(baekjoonId)
                .award(award)
                .point(point)
                .temperature(temperature)
                .build();
        return build;
    }

    @Builder
    public UserDto(int userId, int isManager, int isKakao, int isOnline, String profileImage, String identity, String password, String name, String email, String nickname, int language, String phone, String academicAbility, String baekjoonId, String workplace, String award, int point, int temperature) {
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
