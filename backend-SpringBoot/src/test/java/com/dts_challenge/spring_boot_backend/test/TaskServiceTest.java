package com.dts_challenge.spring_boot_backend.test;

import jakarta.validation.constraints.*;
import com.dts_challenge.spring_boot_backend.dao.TaskRepository;
import com.dts_challenge.spring_boot_backend.entity.Task;
import com.dts_challenge.spring_boot_backend.service.TaskService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;

import java.time.LocalDateTime;
import java.util.List;

@SpringBootTest
public class TaskServiceTest {
    @Autowired // dependence injection
    private TaskService taskService;

    @Autowired
    private TaskRepository repository;

    @Test
    void createTask() {
        Task task = new Task(null, "Unit Test Task", "Test", "Pending", LocalDateTime.now().plusDays(1));
        Task saved = taskService.createTask(task);

        Assertions.assertNotNull(saved.getId());
        Assertions.assertEquals("Unit Test Task", saved.getTitle());
    }
    @Test
    void getTaskById() {
        Task task = taskService.createTask(new Task(null, "GetById Task", null, "Pending", LocalDateTime.now().plusDays(1)));
        Task fetched = taskService.getTaskById(task.getId());

        Assertions.assertEquals(task.getId(), fetched.getId());
        Assertions.assertEquals("GetById Task", fetched.getTitle());
    }

    @Test
    void getAllTasks() {
        Task task1 = taskService.createTask(new Task(null, "Task 1", null, "Pending", LocalDateTime.now().plusDays(1)));
        Task task2 = taskService.createTask(new Task(null, "Task 2", null, "Pending", LocalDateTime.now().plusDays(2)));

        List<Task> allTasks = taskService.getAllTasks();

        Assertions.assertTrue(allTasks.size() >= 2); // Ensure at least 2 tasks exist
        Assertions.assertTrue(allTasks.stream().anyMatch(t -> t.getTitle().equals("Task 1")));
        Assertions.assertTrue(allTasks.stream().anyMatch(t -> t.getTitle().equals("Task 2")));
    }

    @Test
    void updateStatus() {
        Task task = taskService.createTask(new Task(null, "Update Test", null, "Pending", LocalDateTime.now().plusDays(1)));
        Task updated = taskService.updateStatus(task.getId(), "Completed");
        Assertions.assertEquals("Completed", updated.getStatus());
    }

    @Test
    void deleteTask() {
        Task task = taskService.createTask(new Task(null, "Delete Test", null, "Pending", LocalDateTime.now().plusDays(1)));
        Long id = task.getId();
        taskService.deleteTask(id);
        Assertions.assertThrows(ResourceNotFoundException.class, () -> taskService.getTaskById(id));
    }

}
