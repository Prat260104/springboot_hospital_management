package com.prateek.newproject.hospitalManagement.service;

import com.prateek.newproject.hospitalManagement.dto.DoctorResponseDto;
import com.prateek.newproject.hospitalManagement.dto.OnboardDoctorRequestDto;
import com.prateek.newproject.hospitalManagement.entity.Doctor;
import com.prateek.newproject.hospitalManagement.entity.User;
import com.prateek.newproject.hospitalManagement.entity.type.RoleType;
import com.prateek.newproject.hospitalManagement.repository.DoctorRepository;
import com.prateek.newproject.hospitalManagement.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;

    public List<DoctorResponseDto> getAllDoctors() {
        return doctorRepository.findAll()
                .stream()
                .map(doctor -> modelMapper.map(doctor, DoctorResponseDto.class))
                .collect(Collectors.toList());
    }

    @Transactional
    public DoctorResponseDto onBoardNewDoctor(OnboardDoctorRequestDto onBoardDoctorRequestDto) {
        User user = userRepository.findById(onBoardDoctorRequestDto.getUserId()).orElseThrow();

        if (doctorRepository.existsById(onBoardDoctorRequestDto.getUserId())) {
            throw new IllegalArgumentException("Already a doctor");
        }

        Doctor doctor = Doctor.builder()
                .name(onBoardDoctorRequestDto.getName())
                .specialization(onBoardDoctorRequestDto.getSpecialization())
                .user(user)
                .build();

        user.getRoles().add(RoleType.DOCTOR);

        return modelMapper.map(doctorRepository.save(doctor), DoctorResponseDto.class);
    }

    public DoctorResponseDto getDoctorById(Long doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(
                        () -> new jakarta.persistence.EntityNotFoundException("Doctor not found with id: " + doctorId));
        return modelMapper.map(doctor, DoctorResponseDto.class);
    }

    @Transactional
    public DoctorResponseDto updateDoctor(Long doctorId,
            com.prateek.newproject.hospitalManagement.dto.UpdateDoctorRequestDto updateDoctorRequestDto) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(
                        () -> new jakarta.persistence.EntityNotFoundException("Doctor not found with id: " + doctorId));

        if (updateDoctorRequestDto.getName() != null) {
            doctor.setName(updateDoctorRequestDto.getName());
        }
        if (updateDoctorRequestDto.getSpecialization() != null) {
            doctor.setSpecialization(updateDoctorRequestDto.getSpecialization());
        }

        return modelMapper.map(doctor, DoctorResponseDto.class);
    }

    @Transactional
    public void deleteDoctor(Long doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(
                        () -> new jakarta.persistence.EntityNotFoundException("Doctor not found with id: " + doctorId));
        doctorRepository.delete(doctor);
    }

    public List<DoctorResponseDto> getDoctorsBySpecialization(String specialization) {
        return doctorRepository.findAll()
                .stream()
                .filter(doctor -> doctor.getSpecialization() != null &&
                        doctor.getSpecialization().toLowerCase().contains(specialization.toLowerCase()))
                .map(doctor -> modelMapper.map(doctor, DoctorResponseDto.class))
                .collect(Collectors.toList());
    }
}
