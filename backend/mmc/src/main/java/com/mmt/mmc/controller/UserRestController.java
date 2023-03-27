package com.mmt.mmc.controller;

import com.mmt.mmc.exception.IdIncorrectException;
import com.mmt.mmc.exception.PwIncorrectException;
import com.mmt.mmc.model.dto.UserDto;
import com.mmt.mmc.model.service.S3FileUploadService;
import com.mmt.mmc.model.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@Slf4j
@CrossOrigin(origins = "*")
public class UserRestController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    private UserService userService;

    @Autowired
    private S3FileUploadService s3FileUploadService;

    //로그인
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> userLogin(@RequestBody UserDto userDto) throws IdIncorrectException, PwIncorrectException, NoSuchAlgorithmException {
        Map<String, Object> resultMap = new HashMap<>();
        UserDto tempUserDto = (UserDto) userService.loginUser(userDto).get("userDto");
        //생성된 토큰 정보를 클라이언트에게 전달
        resultMap.put("jwt-auth-token", tempUserDto.getAuthToken());
        resultMap.put("jwt-refresh-token", tempUserDto.getRefreshToken());
        resultMap.put("userId", tempUserDto.getUserId());
        //userId와 access토큰만 넘어간다.
        return new ResponseEntity<>(resultMap,HttpStatus.ACCEPTED);
    }
    
    //로그아웃
    @GetMapping("/logout")
    public ResponseEntity<String> userLogout(@RequestParam int userId) {
        log.debug("logout: {}", userId);
        userService.logoutUser(userId);
        return new ResponseEntity<>(SUCCESS,HttpStatus.ACCEPTED);
    }

    //회원가입
    @PostMapping("/users")
    public ResponseEntity<String> userAdd(@RequestPart("user") UserDto userDto, @RequestPart(value = "profile",required = false) MultipartFile multipartFile) throws Exception{
        if(multipartFile != null){
            userDto.setProfileImage(s3FileUploadService.upload(multipartFile));
        }
        userService.addUser(userDto);
        return new ResponseEntity<>(SUCCESS,HttpStatus.OK);
    }

    //회원삭제
    @DeleteMapping("/users/{user_id}")
    public ResponseEntity<String> userRemove(@PathVariable("user_id") int userId){
        userService.removeUser(userId);
        return new ResponseEntity<>(SUCCESS,HttpStatus.OK);
    }

    //회원수정
    @PatchMapping("/users/{user_id}")
    public ResponseEntity<String> userModify(@PathVariable("user_id") int userId, @RequestBody UserDto userDto){
        userService.modifyUser(userDto);
        return new ResponseEntity<>(SUCCESS,HttpStatus.OK);
    }

    //회원상세
    @GetMapping("/users/{user_id}")
    public ResponseEntity<UserDto> userDetails(@PathVariable("user_id") int userId){
        UserDto userDto = userService.findByIdUser(userId);
        return new ResponseEntity<>(userDto,HttpStatus.OK);
    }

    //refresh 토큰 검증 및 사용
    @PostMapping("/users/refresh")
    public ResponseEntity<Map<String,Object>> userRefreshToken(@RequestBody UserDto userDto){
        //refresh 토큰 유효 검증
        Map<String,Object> resultMap = userService.validRefreshToken(userDto);
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }

    @GetMapping("/users/count")
    public ResponseEntity<Map<String,Object>> userCount(){
        Map<String,Object> map = new HashMap<>();
        int userCount = userService.findAllUser();
        map.put("result",SUCCESS);
        map.put("users",userCount);
        return new ResponseEntity<>(map, HttpStatus.ACCEPTED);
    }

}
