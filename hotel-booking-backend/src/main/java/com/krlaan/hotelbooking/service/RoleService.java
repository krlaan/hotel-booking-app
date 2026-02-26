package com.krlaan.hotelbooking.service;

import com.krlaan.hotelbooking.exception.RoleAlreadyExistException;
import com.krlaan.hotelbooking.exception.UserAlreadyExistException;
import com.krlaan.hotelbooking.model.Role;
import com.krlaan.hotelbooking.model.User;
import com.krlaan.hotelbooking.repository.RoleRepository;
import com.krlaan.hotelbooking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoleService implements IRoleService {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @Override
    public void createRole(Role role) {
        String roleName = "ROLE_" + role.getName().toUpperCase();

        Role roleInfo = new Role(roleName);
        if (roleRepository.existsByName(roleName)) {
            throw new RoleAlreadyExistException(roleInfo.getName() + " role already exists!");
        }
        roleRepository.save(roleInfo);
    }

    @Override
    public User addRoleToUser(Long userId, Long roleId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Role> role = roleRepository.findById(roleId);

        if (user.isPresent() && user.get().getRoles().contains(role.get())) {
            throw new UserAlreadyExistException(
                    user.get().getFirstName() + " is already assign to the role " + role.get().getName());
        }

        if (role.isPresent()) {
            role.get().addRoleToUser(user.get());
            roleRepository.save(role.get());
        }

        return user.get();
    }

    @Override
    public void deleteRole(Long roleId) {
        this.deleteAllUsersFromRole(roleId);
        roleRepository.deleteById(roleId);
    }

    @Override
    public User deleteUserFromRole(Long userId, Long roleId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Role> role = roleRepository.findById(roleId);

        if (role.isPresent() && role.get().getUsers().contains(user.get())) {
            role.get().getUsers().remove(user.get());
            roleRepository.save(role.get());
            return user.get();
        }

        throw new UsernameNotFoundException("User not found!");
    }

    @Override
    public Role deleteAllUsersFromRole(Long roleId) {
        Optional<Role> role = roleRepository.findById(roleId);

        role.get().deleteAllUsersFromRole();

        return roleRepository.save(role.get());
    }
}
