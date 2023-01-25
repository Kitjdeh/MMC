package com.mmt.mmc.model.service;

import com.mmt.mmc.entity.User;

public interface UserService {
//    HashMap<String, Object> login(User user) throws NoSuchAlgorithmException, IdIncorrectException, Exception;

//    void registerUser(User user) throws NoSuchAlgorithmException;

    //회원가입
    public void addUser(User user); //예외 처리 안해줌

    //회원탈퇴
    public void removeUser(int userId);
//
//    void modifyUser(UserDto userDto);
//
//    UserDto getUser(int userId);

}
