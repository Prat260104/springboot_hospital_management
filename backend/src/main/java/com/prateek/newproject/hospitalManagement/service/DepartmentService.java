package com.prateek.newproject.hospitalManagement.service;

import com.prateek.newproject.hospitalManagement.dto.DepartmentRequestDto;
import com.prateek.newproject.hospitalManagement.dto.DepartmentResponseDto;
import com.prateek.newproject.hospitalManagement.entity.Department;
import com.prateek.newproject.hospitalManagement.entity.Doctor;
import com.prateek.newproject.hospitalManagement.repository.DepartmentRepository;
import com.prateek.newproject.hospitalManagement.repository.DoctorRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final DoctorRepository doctorRepository;
    private final ModelMapper modelMapper;

    public List<DepartmentResponseDto> getAllDepartments() {
        return departmentRepository.findAll()
                .stream()
                .map(department -> modelMapper.map(department, DepartmentResponseDto.class))
                .collect(Collectors.toList());
    }

    public DepartmentResponseDto getDepartmentById(Long id) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Department not found with id: " + id));
        return modelMapper.map(department, DepartmentResponseDto.class);
    }

    @Transactional
    public DepartmentResponseDto createDepartment(DepartmentRequestDto departmentRequestDto) {
        Department department = new Department();
        department.setName(departmentRequestDto.getName());

        if (departmentRequestDto.getHeadDoctorId() != null) {
            Doctor headDoctor = doctorRepository.findById(departmentRequestDto.getHeadDoctorId())
                    .orElseThrow(() -> new EntityNotFoundException(
                            "Doctor not found with id: " + departmentRequestDto.getHeadDoctorId()));
            department.setHeadDoctor(headDoctor);
        }

        Department savedDepartment = departmentRepository.save(department);
        return modelMapper.map(savedDepartment, DepartmentResponseDto.class);
    }

    @Transactional
    public DepartmentResponseDto updateDepartment(Long id, DepartmentRequestDto departmentRequestDto) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Department not found with id: " + id));

        department.setName(departmentRequestDto.getName());

        if (departmentRequestDto.getHeadDoctorId() != null) {
            Doctor headDoctor = doctorRepository.findById(departmentRequestDto.getHeadDoctorId())
                    .orElseThrow(() -> new EntityNotFoundException(
                            "Doctor not found with id: " + departmentRequestDto.getHeadDoctorId()));
            department.setHeadDoctor(headDoctor);
        }

        return modelMapper.map(department, DepartmentResponseDto.class);
    }

    @Transactional
    public void deleteDepartment(Long id) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Department not found with id: " + id));
        departmentRepository.delete(department);
    }

    @Transactional
    public DepartmentResponseDto assignDoctorToDepartment(Long departmentId, Long doctorId) {
        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new EntityNotFoundException("Department not found with id: " + departmentId));
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new EntityNotFoundException("Doctor not found with id: " + doctorId));

        department.getDoctors().add(doctor);
        doctor.getDepartments().add(department);

        return modelMapper.map(department, DepartmentResponseDto.class);
    }

    @Transactional
    public DepartmentResponseDto removeDoctorFromDepartment(Long departmentId, Long doctorId) {
        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new EntityNotFoundException("Department not found with id: " + departmentId));
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new EntityNotFoundException("Doctor not found with id: " + doctorId));

        department.getDoctors().remove(doctor);
        doctor.getDepartments().remove(department);

        return modelMapper.map(department, DepartmentResponseDto.class);
    }
}
