package com.mmt.mmc.model.service;

import com.mmt.mmc.exception.IdIncorrectException;
import com.mmt.mmc.exception.PwIncorrectException;
import com.mmt.mmc.model.dto.UserDto;

import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

public interface UserService {


    //로그인
    HashMap<String, Object> loginUser(UserDto userDto) throws NoSuchAlgorithmException, IdIncorrectException, PwIncorrectException;

    //로그아웃
    public void logoutUser(int userId);

    //회원가입
    public void addUser(UserDto userDto) throws NoSuchAlgorithmException;

    //회원탈퇴
    public void removeUser(int userId);

    //회원 정보 조회
    public UserDto findByIdUser(int userId);

    public UserDto findByIdentityUser(String identity);

    //회원 정보 수정
    public void modifyUser(UserDto userDto);

    //유효 토큰 확인
    Map<String, Object> validRefreshToken(UserDto userDto);



    //회원 정보 모두 조회(강사 리스트 조회시 사용)
//    public List<UserDto> findAllUser();
//
//    UserDto getUser(int userId);

}
