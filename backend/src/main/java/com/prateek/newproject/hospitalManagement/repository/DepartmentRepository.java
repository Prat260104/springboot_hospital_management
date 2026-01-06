package com.prateek.newproject.hospitalManagement.repository;

import com.prateek.newproject.hospitalManagement.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
}