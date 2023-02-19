package com.mmt.mmc.entity;

import com.mmt.mmc.model.dto.UserDto;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@DynamicUpdate
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
    @Column
    private String authToken;
    @Column
    private String refreshToken;
    @Column @ColumnDefault("0")
    private int lectureCount;


    public UserDto toDto(){
        UserDto userDto = UserDto.builder()
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
        return userDto;
    }
}
