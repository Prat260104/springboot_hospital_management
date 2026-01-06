package com.prateek.newproject.hospitalManagement.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UpdateAppointmentRequestDto {
    private LocalDateTime appointmentTime;
    private String reason;
}
