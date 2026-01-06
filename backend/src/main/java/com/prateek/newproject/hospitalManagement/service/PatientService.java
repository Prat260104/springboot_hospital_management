package com.prateek.newproject.hospitalManagement.service;

import com.prateek.newproject.hospitalManagement.dto.PatientResponseDto;
import com.prateek.newproject.hospitalManagement.entity.Patient;
import com.prateek.newproject.hospitalManagement.repository.PatientRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor

public class PatientService {

    private final PatientRepository patientRepository;
    private final ModelMapper modelMapper;

    @Transactional
    public PatientResponseDto getPatientById(Long patientId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new EntityNotFoundException("Patient Not " +
                        "Found with id: " + patientId));
        return modelMapper.map(patient, PatientResponseDto.class);
    }

    public List<PatientResponseDto> getAllPatients(Integer pageNumber, Integer pageSize) {
        return patientRepository.findAllPatients(PageRequest.of(pageNumber, pageSize))
                .stream()
                .map(patient -> modelMapper.map(patient, PatientResponseDto.class))
                .collect(Collectors.toList());
    }

    @Transactional
    public PatientResponseDto updatePatient(Long patientId,
            com.prateek.newproject.hospitalManagement.dto.UpdatePatientRequestDto updatePatientRequestDto) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found with id: " + patientId));

        if (updatePatientRequestDto.getName() != null) {
            patient.setName(updatePatientRequestDto.getName());
        }
        if (updatePatientRequestDto.getBirthDate() != null) {
            patient.setBirthDate(updatePatientRequestDto.getBirthDate());
        }
        if (updatePatientRequestDto.getGender() != null) {
            patient.setGender(updatePatientRequestDto.getGender());
        }
        if (updatePatientRequestDto.getBloodGroup() != null) {
            patient.setBloodGroup(updatePatientRequestDto.getBloodGroup());
        }

        return modelMapper.map(patient, PatientResponseDto.class);
    }

    @Transactional
    public void deletePatient(Long patientId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found with id: " + patientId));
        patientRepository.delete(patient);
    }

    public List<PatientResponseDto> searchPatientsByName(String name) {
        return patientRepository.findByNameContainingOrderByIdDesc(name)
                .stream()
                .map(patient -> modelMapper.map(patient, PatientResponseDto.class))
                .collect(Collectors.toList());
    }

    public List<PatientResponseDto> getPatientsByBloodGroup(
            com.prateek.newproject.hospitalManagement.entity.type.BloodGroupType bloodGroup) {
        return patientRepository.findByBloodGroup(bloodGroup)
                .stream()
                .map(patient -> modelMapper.map(patient, PatientResponseDto.class))
                .collect(Collectors.toList());
    }
}
