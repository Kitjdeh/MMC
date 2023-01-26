package com.mmt.mmc.model.service;

import com.mmt.mmc.model.dto.UserDto;

public interface UserService {
//    HashMap<String, Object> login(User user) throws NoSuchAlgorithmException, IdIncorrectException, Exception;

//    void registerUser(User user) throws NoSuchAlgorithmException;

    //회원가입
    public void addUser(UserDto userDto); //예외 처리 안해줌

    //회원탈퇴
    public void removeUser(int userId);

    //회원 정보 조회
    public UserDto findUser(int userId);

    //회원 정보 수정
    public void modifyUser(UserDto userDto);

    //회원 정보 모두 조회(강사 리스트 조회시 사용)
//    public List<UserDto> findAllUser();
//
//    UserDto getUser(int userId);

}
