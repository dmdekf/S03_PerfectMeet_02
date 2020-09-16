package com.POM.MatNam.user.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.POM.MatNam.user.dao.UserAuthDao;
import com.POM.MatNam.user.dao.UserDao;
import com.POM.MatNam.user.dto.LoginRequestDTO;
import com.POM.MatNam.user.dto.SignupRequestDTO;
import com.POM.MatNam.user.dto.User;
import com.POM.MatNam.user.dto.UserAuth;

@Service
public class UserService {
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private UserAuthDao authDao;
	
	public User signup(SignupRequestDTO request) {
		User user = new User();
		user.setEmail(request.getEmail());
		user.setNickname(request.getNickname());
		user.setPassword(request.getPassword());
		user.setAge(request.getAge());
		user.setGender(request.isGender());
		return userDao.save(user);
	}
	
	public int duplicateCheck(SignupRequestDTO request) {
		if(userDao.findByEmail(request.getEmail()).isPresent()) {
			return 1;
		}else if(userDao.findByNickname(request.getNickname()).isPresent()) {
			return 2;
		}
		return 3;
	}
	
	public int login(LoginRequestDTO request) {
		Optional<User> userOpt = userDao.findByEmail(request.getEmail());
		if(userOpt.isPresent()) {
			User user = userOpt.get();
			if(user.getPassword().equals(request.getPassword())) {
				return 3;
			}else {
				return 2;
			}
		}else {
			return 1;
		}
	}
	public void withdraw(String nickname) {
		User user = userDao.findByNickname(nickname).get();
		userDao.deleteById(user.getId());
	}
	public User selectByEmail(String email) {
		return userDao.findByEmail(email).orElse(null);
	}
	public User selectByNickname(String nickname) {
		return userDao.findByNickname(nickname).orElse(null);
	}
}
