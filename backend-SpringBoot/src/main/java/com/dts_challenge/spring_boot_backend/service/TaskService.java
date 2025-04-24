package com.dts_challenge.spring_boot_backend.service;

import com.dts_challenge.spring_boot_backend.dao.TaskRepository;
import com.dts_challenge.spring_boot_backend.entity.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TaskService {

    @Autowired
    private TaskRepository repository;


    // Use predefined CRUD methods extending JpaRepository to implement business logics

    //Create a task
    public Task createTask(Task task){
        return repository.save(task);
    }

    //Retrieve all tasks
    public List<Task> getAllTasks(){
        return repository.findAll();
    }

    //Retrieve a task by ID
    public Task getTaskById(Long id){
        return repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Task not found"));
    }

    //Update the status of a task
    public Task updateStatus(Long id, String status){
        Task task = getTaskById(id);
        System.out.println(task.getStatus());
        task.setStatus(status);
        return repository.save(task);
    }
    //Delete a task by id
    public void deleteTask(Long id){
        repository.deleteById(id);
    }

}
