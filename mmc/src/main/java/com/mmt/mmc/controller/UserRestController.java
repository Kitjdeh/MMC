package com.mmt.mmc.controller;

import com.mmt.mmc.model.dto.UserDto;
import com.mmt.mmc.model.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<String> userAdd(@RequestBody UserDto userDto) throws Exception{
        userService.addUser(userDto);
        return new ResponseEntity<>(SUCCESS,HttpStatus.OK);
    }

    @DeleteMapping("/{user_id}")
    public ResponseEntity<String> userRemove(@PathVariable("user_id") int userId){
        userService.removeUser(userId);
        return new ResponseEntity<>(SUCCESS,HttpStatus.OK);
    }

    @PatchMapping("/{user_id}")
    public ResponseEntity<String> userModify(@PathVariable("user_id") int userId, @RequestBody UserDto userDto){
        userService.modifyUser(userDto);
        return new ResponseEntity<>(SUCCESS,HttpStatus.OK);
    }

    @GetMapping("/{user_id}")
    public ResponseEntity<UserDto> userDetails(@PathVariable("user_id") int userId){
        UserDto userDto = userService.findUser(userId);
        System.out.println("UserRestController " + userDto);
        return new ResponseEntity<>(userDto,HttpStatus.OK);
    }
}
