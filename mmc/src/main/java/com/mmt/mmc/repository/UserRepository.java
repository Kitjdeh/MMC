package com.mmt.mmc.repository;

import com.mmt.mmc.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    //회원 저장
//    public Optional<User> save(User user);
    //회원 정보 삭제
    public void deleteById(int userId);
    //로그인할 때 + 로그인 정보 수정할 때 사용
    public Optional<User> findById(int userId);
    //이름으로 회원 정보 찾기
    public Optional<User> findByName(String name);
    
//    public List<UserDto> findAll();


}