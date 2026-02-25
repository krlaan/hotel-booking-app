package com.krlaan.hotelbooking.service;

import com.krlaan.hotelbooking.model.Role;
import com.krlaan.hotelbooking.model.User;

import java.util.List;

public interface IRoleService {
    List<Role> getRoles();

    Role getRoleByName(String name);

    Role createRole(Role role);

    User addRoleToUser(Long userId, Long roleId);

    void deleteRole(Long id);

    User deleteUserFromRole(Long userId, Long roleId);

    Role deleteAllUsersFromRole(Long roleId);
}
