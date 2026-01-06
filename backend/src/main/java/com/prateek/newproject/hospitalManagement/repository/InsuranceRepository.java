package com.prateek.newproject.hospitalManagement.repository;

import com.prateek.newproject.hospitalManagement.entity.Insurance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InsuranceRepository extends JpaRepository<Insurance, Long> {
}