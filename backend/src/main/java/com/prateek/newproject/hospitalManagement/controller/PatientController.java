package com.prateek.newproject.hospitalManagement.controller;

import com.prateek.newproject.hospitalManagement.dto.AppointmentResponseDto;
import com.prateek.newproject.hospitalManagement.dto.CreateAppointmentRequestDto;
import com.prateek.newproject.hospitalManagement.dto.PatientResponseDto;
import com.prateek.newproject.hospitalManagement.dto.UpdatePatientRequestDto;
import com.prateek.newproject.hospitalManagement.service.AppointmentService;
import com.prateek.newproject.hospitalManagement.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patients")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;
    private final AppointmentService appointmentService;

    @PostMapping("/appointments")
    public ResponseEntity<AppointmentResponseDto> createNewAppointment(
            @RequestBody CreateAppointmentRequestDto createAppointmentRequestDto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(appointmentService.createNewAppointment(createAppointmentRequestDto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PatientResponseDto> getPatientById(@PathVariable Long id) {
        return ResponseEntity.ok(patientService.getPatientById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PatientResponseDto> updatePatient(@PathVariable Long id,
            @RequestBody UpdatePatientRequestDto updatePatientRequestDto) {
        return ResponseEntity.ok(patientService.updatePatient(id, updatePatientRequestDto));
    }

    @GetMapping("/{id}/appointments")
    public ResponseEntity<List<AppointmentResponseDto>> getPatientAppointments(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.getAllAppointmentsOfPatient(id));
    }

    @DeleteMapping("/appointments/{appointmentId}")
    public ResponseEntity<Void> cancelAppointment(@PathVariable Long appointmentId) {
        appointmentService.deleteAppointment(appointmentId);
        return ResponseEntity.noContent().build();
    }
}
