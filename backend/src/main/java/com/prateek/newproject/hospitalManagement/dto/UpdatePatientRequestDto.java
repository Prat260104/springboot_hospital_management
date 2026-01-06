package com.prateek.newproject.hospitalManagement.dto;

import com.prateek.newproject.hospitalManagement.entity.type.BloodGroupType;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdatePatientRequestDto {
    private String name;
    private LocalDate birthDate;
    private String gender;
    private BloodGroupType bloodGroup;
}
