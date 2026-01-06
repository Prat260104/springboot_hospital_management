package com.prateek.newproject.hospitalManagement.service;

import com.prateek.newproject.hospitalManagement.dto.LoginRequestDto;
import com.prateek.newproject.hospitalManagement.dto.LoginResponseDto;
import com.prateek.newproject.hospitalManagement.dto.SignUpRequestDto;
import com.prateek.newproject.hospitalManagement.dto.SignupResponseDto;
import com.prateek.newproject.hospitalManagement.entity.User;
import com.prateek.newproject.hospitalManagement.entity.type.AuthProviderType;
import com.prateek.newproject.hospitalManagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    public LoginResponseDto login(LoginRequestDto loginRequestDto) {
        User user = userRepository.findByUsername(loginRequestDto.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(loginRequestDto.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return LoginResponseDto.builder()
                .userId(user.getId())
                .token("dummy-token")
                .build();
    }

    public SignupResponseDto signup(SignUpRequestDto signupRequestDto) {
        User user = User.builder()
                .username(signupRequestDto.getUsername())
                .password(signupRequestDto.getPassword())
                .providerType(AuthProviderType.EMAIL)
                .build();

        user = userRepository.save(user);

        return SignupResponseDto.builder()
                .userId(user.getId())
                .build();
    }
}
