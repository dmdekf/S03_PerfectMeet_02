package com.POM.MatNam.user.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.POM.MatNam.user.dto.User;

public interface UserDao extends JpaRepository<User, Long>{
	Optional<User> findByEmail(String email);
	Optional<User> findByNickname(String email);
}
