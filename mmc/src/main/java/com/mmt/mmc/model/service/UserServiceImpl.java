package com.mmt.mmc.model.service;

import com.mmt.mmc.entity.User;
import com.mmt.mmc.model.dto.UserDto;
import com.mmt.mmc.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService{

    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    /**
    *회원가입
    */
    @Override
    public void addUser(UserDto userDto) {
        validateDuplicateUser(userDto.toEntity());//중복 회원 검증 , 이후 암호화 적용 및 JWP적용
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
    public UserDto findUser(int userId) {
        return userRepository.findById(userId).get().toDto();
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
     * 전체 회원 조회
     * 전체 강사 리스트 가져오기 할 때 사용(/api/v1/questions/{question_id}/trainer)
     * @return
     */
//    @Override
//    public List<UserDto> findAllUser() {
//        return userRepository.findAll();
//    }


    //증복 name 검사
    private void validateDuplicateUser(User user){
        userRepository.findByName(user.getName())
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 회원입니다.");
                });
    }

    //
//    public
}
