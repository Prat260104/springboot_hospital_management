package com.prateek.newproject.hospitalManagement.dto;

import lombok.Data;

import java.util.List;

@Data
public class DepartmentResponseDto {
    private Long id;
    private String name;
    private DoctorResponseDto headDoctor;
    private List<DoctorResponseDto> doctors;
}
