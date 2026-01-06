package com.prateek.newproject.hospitalManagement.controller;

import com.prateek.newproject.hospitalManagement.dto.AppointmentResponseDto;
import com.prateek.newproject.hospitalManagement.dto.DoctorResponseDto;
import com.prateek.newproject.hospitalManagement.dto.UpdateDoctorRequestDto;
import com.prateek.newproject.hospitalManagement.service.AppointmentService;
import com.prateek.newproject.hospitalManagement.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctors")
@RequiredArgsConstructor
public class DoctorController {

    private final AppointmentService appointmentService;
    private final DoctorService doctorService;

    @GetMapping("/appointments")
    public ResponseEntity<List<AppointmentResponseDto>> getAllAppointmentsOfDoctor(@RequestParam Long doctorId) {
        return ResponseEntity.ok(appointmentService.getAllAppointmentsOfDoctor(doctorId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoctorResponseDto> getDoctorById(@PathVariable Long id) {
        return ResponseEntity.ok(doctorService.getDoctorById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DoctorResponseDto> updateDoctor(@PathVariable Long id,
            @RequestBody UpdateDoctorRequestDto updateDoctorRequestDto) {
        return ResponseEntity.ok(doctorService.updateDoctor(id, updateDoctorRequestDto));
    }
}
