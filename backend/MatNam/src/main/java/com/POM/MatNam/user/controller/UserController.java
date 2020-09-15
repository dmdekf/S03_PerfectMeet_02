package com.POM.MatNam.user.controller;

import java.util.HashMap;
import java.util.Map;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.POM.MatNam.response.BasicResponse;
import com.POM.MatNam.response.ErrorResponse;
import com.POM.MatNam.user.dto.SignupRequestDTO;
import com.POM.MatNam.user.dto.User;
import com.POM.MatNam.user.service.UserService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	private UserService userService;
	
	@Transactional
	@PostMapping("/signup")
	@ApiOperation(value = "회원 가입")
	public Object signup(@Valid @RequestBody SignupRequestDTO request) {
		ResponseEntity<BasicResponse> response = null;
		Map<String, Object> errors = new HashMap<>();
		int check = userService.duplicateCheck(request);
		if(check==1) {
			errors.put("field", "email");
			errors.put("data", request.getEmail());
			final ErrorResponse result = setErrors("E-4001", "이미 존재하는 이메일입니다.", errors);
			
			response = new ResponseEntity<BasicResponse>(result, HttpStatus.CONFLICT);
		}else if(check==2) {
			errors.put("field", "email");
			errors.put("data", request.getEmail());
			final ErrorResponse result = setErrors("E-4001", "이미 존재하는 이메일입니다.", errors);
			
			response = new ResponseEntity<BasicResponse>(result, HttpStatus.CONFLICT);
		}else {
			User user = userService.signup(request);
			final BasicResponse result = new BasicResponse();
			result.status = "S-200";
			result.message = "회원가입에 성공했습니다.";
			response = new ResponseEntity<BasicResponse>(result, HttpStatus.CREATED);
			
		}
		return response;
	}
	
	private ErrorResponse setErrors(String status, String message, Map<String, Object> errors) {
        ErrorResponse res = new ErrorResponse();
        res.status = status;
        res.message = message;
        res.errors = errors;
        return res;
    }
}
