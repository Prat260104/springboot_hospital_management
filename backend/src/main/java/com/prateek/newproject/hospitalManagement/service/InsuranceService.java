package com.prateek.newproject.hospitalManagement.service;

import com.prateek.newproject.hospitalManagement.entity.Insurance;
import com.prateek.newproject.hospitalManagement.entity.Patient;
import com.prateek.newproject.hospitalManagement.repository.InsuranceRepository;
import com.prateek.newproject.hospitalManagement.repository.PatientRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InsuranceService {

    private final InsuranceRepository insuranceRepository;
    private final PatientRepository patientRepository;

    @Transactional
    public Patient assignInsuranceToPatient(Insurance insurance, Long patientId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found with id: " + patientId));

        patient.setInsurance(insurance);
        insurance.setPatient(patient); // bidirectional consistency maintainence

        return patient;
    }

    @Transactional
    public Patient disaccociateInsuranceFromPatient(Long patientId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found with id: " + patientId));

        patient.setInsurance(null);
        return patient;
    }

    @Transactional
    public Insurance createInsurance(
            com.prateek.newproject.hospitalManagement.dto.InsuranceRequestDto insuranceRequestDto, Long patientId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found with id: " + patientId));

        Insurance insurance = Insurance.builder()
                .policyNumber(insuranceRequestDto.getPolicyNumber())
                .provider(insuranceRequestDto.getProvider())
                .validUntil(insuranceRequestDto.getValidUntil())
                .build();

        patient.setInsurance(insurance);
        insurance.setPatient(patient);

        return insuranceRepository.save(insurance);
    }

    @Transactional
    public Insurance updateInsurance(Long insuranceId,
            com.prateek.newproject.hospitalManagement.dto.InsuranceRequestDto insuranceRequestDto) {
        Insurance insurance = insuranceRepository.findById(insuranceId)
                .orElseThrow(() -> new EntityNotFoundException("Insurance not found with id: " + insuranceId));

        if (insuranceRequestDto.getPolicyNumber() != null) {
            insurance.setPolicyNumber(insuranceRequestDto.getPolicyNumber());
        }
        if (insuranceRequestDto.getProvider() != null) {
            insurance.setProvider(insuranceRequestDto.getProvider());
        }
        if (insuranceRequestDto.getValidUntil() != null) {
            insurance.setValidUntil(insuranceRequestDto.getValidUntil());
        }

        return insurance;
    }

    public Insurance getInsuranceByPatientId(Long patientId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found with id: " + patientId));
        return patient.getInsurance();
    }
}
