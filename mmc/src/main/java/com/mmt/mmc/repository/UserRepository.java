package com.mmt.mmc.repository;

import com.mmt.mmc.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    public User save(User user);
    //로그인할 때 사용
    public Optional<User> findById(int userId);
    public Optional<User> findByName(String name);
    public List<User> findAll();

    public void deleteById(int userId);
}
