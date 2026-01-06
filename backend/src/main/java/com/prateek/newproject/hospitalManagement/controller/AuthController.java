package com.prateek.newproject.hospitalManagement.controller;

import com.prateek.newproject.hospitalManagement.dto.LoginRequestDto;
import com.prateek.newproject.hospitalManagement.dto.LoginResponseDto;
import com.prateek.newproject.hospitalManagement.dto.SignUpRequestDto;
import com.prateek.newproject.hospitalManagement.dto.SignupResponseDto;
import com.prateek.newproject.hospitalManagement.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto loginRequestDto) {
        return ResponseEntity.ok(authService.login(loginRequestDto));
    }

    @PostMapping("/signup")
    public ResponseEntity<SignupResponseDto> signup(@RequestBody SignUpRequestDto signupRequestDto) {
        return ResponseEntity.ok(authService.signup(signupRequestDto));
    }
}
