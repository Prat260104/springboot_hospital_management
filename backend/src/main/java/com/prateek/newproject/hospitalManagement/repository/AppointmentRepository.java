package com.prateek.newproject.hospitalManagement.repository;

import com.prateek.newproject.hospitalManagement.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
}