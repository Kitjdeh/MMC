package com.mmt.mmc.controller;

import com.mmt.mmc.entity.User;
import com.mmt.mmc.model.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
public class UserRestController {
//    private static final String HEADER_AUTH = "access-token";
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    private UserService userService;

    //회원가입
    @PostMapping
    public ResponseEntity<String> userSave(User user) throws Exception{
        userService.addUser(user);
        return new ResponseEntity<String>(SUCCESS,HttpStatus.OK);
    }

    @PatchMapping("/{userId}")
    public ResponseEntity<String> userRemove(int userId){
        userService.removeUser(userId);
        return new ResponseEntity<>(SUCCESS,HttpStatus.OK);
    }



}
