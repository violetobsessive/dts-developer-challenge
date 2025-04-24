package com.dts_challenge.spring_boot_backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.dts_challenge.spring_boot_backend.entity.Task;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long>{}
