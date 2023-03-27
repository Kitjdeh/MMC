package com.mmt.mmc.model.service;

import com.mmt.mmc.controller.JWTUtil;
import com.mmt.mmc.controller.SHA256;
import com.mmt.mmc.entity.QuestionTrainer;
import com.mmt.mmc.entity.User;
import com.mmt.mmc.exception.IdIncorrectException;
import com.mmt.mmc.exception.PwIncorrectException;
import com.mmt.mmc.model.dto.QuestionTrainerDto;
import com.mmt.mmc.model.dto.UserDto;
import com.mmt.mmc.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.transaction.Transactional;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserService{

    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Autowired
    private JWTUtil jwtUtil;

    @Override
    public HashMap<String, Object> loginUser(UserDto tempUserDto) throws NoSuchAlgorithmException, IdIncorrectException, PwIncorrectException {
        System.out.println("login before");
        HashMap<String, Object> result = new HashMap<>();
        UserDto userDto = findByIdentityUser(tempUserDto.getIdentity());

        //유저 아이디 존재 x
        if(userDto == null)
            throw new IdIncorrectException();
        //비밀번호 불일치
        else if(!userDto.getPassword().equals(new SHA256().getHash(tempUserDto.getPassword())))
            throw new PwIncorrectException();
        //아이디도 존재하고 비밀번호도 일치할 경우
        else {
            //auth,refresh 토큰 생성
            String authToken = jwtUtil.createAuthToken(userDto.getUserId());
            String refreshToken = jwtUtil.createRefreshToken();
            userDto.setAuthToken(authToken);
            userDto.setRefreshToken(refreshToken);
            //발급된 토큰들을 DB에 저장해준다.
            modifyUser(userDto);
            result.put("userDto",userDto);
            return result;
        }
    }

    //로그아웃
    public void logoutUser(int userId){
        UserDto userDto = findByIdUser(userId);
        userDto.setRefreshToken(null);
        userDto.setAuthToken(null);
        modifyUser(userDto);
    }


    /**
    *회원가입
    */
    @Override
    public void addUser(UserDto userDto) throws NoSuchAlgorithmException {
        System.out.println("USERDTO "+userDto);
//        validateDuplicateUser(userDto.toEntity());//중복 회원 검증 , 이후 암호화 적용 및 JWP적용
        userDto.setPassword(new SHA256().getHash(userDto.getPassword()));
        userRepository.save(userDto.toEntity());
    }

    /**
     * 
     * 회원탈퇴
     * @param userId
     */
    @Override
    public void removeUser(int userId) {
        userRepository.deleteById(userId);
    }

    @Override
    public UserDto findByIdUser(int userId) {
        User result = userRepository.findById(userId).orElse(null);
        if(result==null) return null;
        else return result.toDto();
    }

    @Override
    public UserDto findByIdentityUser(String identity) {
        User result = userRepository.findByIdentity(identity).orElse(null);
        if(result==null) return null;
        else return result.toDto();
    }


    /**
     * 회원수정
     * @param userDto
     */
    @Override
    public void modifyUser(UserDto userDto) {
        userRepository.save(userDto.toEntity());
    }

    /**
     * 전체 회원 수 조회
     */
    @Override
    public int findAllUser() {
        int users = userRepository.findAll().size();
        return users;
    }

    //증복 name 검사
    private void validateDuplicateUser(User user){
        userRepository.findByIdentity(user.getIdentity());
    }

    public Map<String, Object> validRefreshToken(UserDto userDto){
        Map<String, Object> resultMap = new HashMap<>();
        //refresh token 유효한지 점검
        jwtUtil.checkAndGetClaims(userDto.getRefreshToken());

        //DB에 저장된 refresh 토큰의 정보가 전달된 토큰의 정보와 같은지 판단
        if(userDto.getRefreshToken().equals(findByIdUser(userDto.getUserId()).getRefreshToken())){
            //새로운 auth token 발행
            String authToken = jwtUtil.createAuthToken(userDto.getUserId());
            resultMap.put("jwt-auth-token",authToken);
            Map<String, Object> info = jwtUtil.checkAndGetClaims(authToken);
            resultMap.putAll(info);
        }
        return resultMap;
    }
}
