package com.prateek.newproject.hospitalManagement.dto;

import lombok.Data;

@Data
public class DepartmentRequestDto {
    private String name;
    private Long headDoctorId;
}
