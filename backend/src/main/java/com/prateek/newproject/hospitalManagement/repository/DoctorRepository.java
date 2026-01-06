package com.prateek.newproject.hospitalManagement.repository;

import com.prateek.newproject.hospitalManagement.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
}