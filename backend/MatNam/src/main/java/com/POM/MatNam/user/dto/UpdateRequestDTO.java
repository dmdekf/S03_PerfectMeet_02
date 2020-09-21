package com.POM.MatNam.user.dto;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import org.springframework.lang.Nullable;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Valid
@Getter
@Setter
public class UpdateRequestDTO {
    @ApiModelProperty(required = true)
    @NotBlank(message = "비밀번호는 필수 입력값입니다.")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d$@$!%*#?&]{8,}$")
    String password;

    @ApiModelProperty(required = true)
    @NotBlank(message = "닉네임은 필수 입력값입니다.")
    String nickname;
    
    @ApiModelProperty(required = false)
    @Nullable
    String profileImg;
}
