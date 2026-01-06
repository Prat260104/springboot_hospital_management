package com.prateek.newproject.hospitalManagement.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class InsuranceRequestDto {
    private String policyNumber;
    private String provider;
    private LocalDate validUntil;
}
