package com.krlaan.hotelbooking.service;

import com.krlaan.hotelbooking.exception.UserAlreadyExistException;
import com.krlaan.hotelbooking.model.Role;
import com.krlaan.hotelbooking.model.User;
import com.krlaan.hotelbooking.repository.RoleRepository;
import com.krlaan.hotelbooking.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User registerUser(User user) throws UserAlreadyExistException {
        if (userRepository.existByEmail(user.getEmail())) {
            throw new UserAlreadyExistException(user.getEmail() + "already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Role userRole = roleRepository.findByName("ROLE_USER").get();
        user.setRoles(Collections.singleton(userRole));

        return userRepository.save(user);
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUser(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Transactional
    @Override
    public void deleteUser(String email) {
        userRepository.deleteByEmail(email);
    }
}
