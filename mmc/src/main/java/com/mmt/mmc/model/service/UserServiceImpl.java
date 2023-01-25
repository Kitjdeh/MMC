package com.mmt.mmc.model.service;

import com.mmt.mmc.entity.User;
import com.mmt.mmc.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Transactional
@Service
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
    public void addUser(User user) {
        validateDuplicateUser(user);//중복 회원 검증 , 이후 암호화 적용 및 JWP적용
        userRepository.save(user);
    }

    @Override
    public void removeUser(int userId) {
        userRepository.deleteById(userId);
    }

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
