package com.dts_challenge.spring_boot_backend.controller;

import com.dts_challenge.spring_boot_backend.entity.Task;
import com.dts_challenge.spring_boot_backend.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/tasks")
@Tag(name = "Task API", description = "CRUD operations for task management")

public class TaskController {

    @Autowired // Dependency injection
    private TaskService service;

    @PostMapping
    @Operation(summary = "Create a task")
    public ResponseEntity<Task> create(@Valid @RequestBody Task task) {
        return new ResponseEntity<>(service.createTask(task), HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(summary = "Get all tasks")
    public List<Task> getAll() { return service.getAllTasks(); }


    @GetMapping("/{id}")
    @Operation(summary = "Get task by ID")
    public Task getById(@PathVariable Long id) { return service.getTaskById(id); }

    // Update the status of a task
    // Expect a JSON object in the request body, and deserialized into a map structure
    // Map is to store this JSON object - Key: name of field; Value: corresponding status value
    @PutMapping("/{id}/status")
    @Operation(summary = "Update task status")
    public Task updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return service.updateStatus(id, body.get("status"));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a task")
    public void delete(@PathVariable Long id) { service.deleteTask(id); }

}
