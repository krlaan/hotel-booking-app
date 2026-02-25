package com.krlaan.hotelbooking.controller;

import com.krlaan.hotelbooking.exception.RoleAlreadyExistException;
import com.krlaan.hotelbooking.model.Role;
import com.krlaan.hotelbooking.model.User;
import com.krlaan.hotelbooking.service.IRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
public class RoleController {

    private final IRoleService roleService;

    @GetMapping("/all-roles")
    public ResponseEntity<List<Role>> getAllRoles() {
        List<Role> roles = roleService.getAllRoles();
        return ResponseEntity.ok(roles);
    }

    @PostMapping("/create-new-role")
    public ResponseEntity<String> createRole(@RequestBody Role role) {
        try {
            roleService.createRole(role);
            return ResponseEntity.ok("Role created successfully!");

        } catch (RoleAlreadyExistException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PostMapping("/add-role-to-user")
    public User addRoleToUser(
            @RequestParam("userId") Long userId,
            @RequestParam("roleId") Long roleId) {
        return roleService.addRoleToUser(userId, roleId);
    }

    @DeleteMapping("/delete/{roleId}")
    public void deleteRole(@PathVariable Long roleId) {
        roleService.deleteRole(roleId);
    }

    @PostMapping("/delete-all-users-from-role/{roleId}")
    public Role deleteAllUsersFromRole(@PathVariable Long roleId) {
        return roleService.deleteAllUsersFromRole(roleId);
    }

    @PostMapping("/delete-user-from-role")
    public User deleteUserFromRole(
            @RequestParam("userId") Long userId,
            @RequestParam("roleId") Long roleId) {
        return roleService.deleteUserFromRole(userId, roleId);
    }
}
