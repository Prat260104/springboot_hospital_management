package com.prateek.newproject.hospitalManagement.controller;

import com.prateek.newproject.hospitalManagement.dto.DepartmentRequestDto;
import com.prateek.newproject.hospitalManagement.dto.DepartmentResponseDto;
import com.prateek.newproject.hospitalManagement.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/departments")
@RequiredArgsConstructor
public class DepartmentController {

    private final DepartmentService departmentService;

    @GetMapping
    public ResponseEntity<List<DepartmentResponseDto>> getAllDepartments() {
        return ResponseEntity.ok(departmentService.getAllDepartments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DepartmentResponseDto> getDepartmentById(@PathVariable Long id) {
        return ResponseEntity.ok(departmentService.getDepartmentById(id));
    }

    @PostMapping
    public ResponseEntity<DepartmentResponseDto> createDepartment(
            @RequestBody DepartmentRequestDto departmentRequestDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(departmentService.createDepartment(departmentRequestDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DepartmentResponseDto> updateDepartment(@PathVariable Long id,
            @RequestBody DepartmentRequestDto departmentRequestDto) {
        return ResponseEntity.ok(departmentService.updateDepartment(id, departmentRequestDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDepartment(@PathVariable Long id) {
        departmentService.deleteDepartment(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{departmentId}/doctors/{doctorId}")
    public ResponseEntity<DepartmentResponseDto> assignDoctorToDepartment(@PathVariable Long departmentId,
            @PathVariable Long doctorId) {
        return ResponseEntity.ok(departmentService.assignDoctorToDepartment(departmentId, doctorId));
    }

    @DeleteMapping("/{departmentId}/doctors/{doctorId}")
    public ResponseEntity<DepartmentResponseDto> removeDoctorFromDepartment(@PathVariable Long departmentId,
            @PathVariable Long doctorId) {
        return ResponseEntity.ok(departmentService.removeDoctorFromDepartment(departmentId, doctorId));
    }
}
