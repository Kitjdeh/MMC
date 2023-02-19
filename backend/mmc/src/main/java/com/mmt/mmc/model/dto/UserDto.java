package com.mmt.mmc.model.dto;

import com.mmt.mmc.entity.User;
import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
    private String authToken;
    private String refreshToken;
    private int lectureCount;

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
                .authToken(authToken)
                .refreshToken(refreshToken)
                .lectureCount(lectureCount)
                .build();
        return build;
    }


}
