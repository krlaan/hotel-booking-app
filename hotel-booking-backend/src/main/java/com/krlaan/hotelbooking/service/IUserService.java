package com.krlaan.hotelbooking.service;

import com.krlaan.hotelbooking.exception.UserAlreadyExistException;
import com.krlaan.hotelbooking.model.User;

import java.util.List;

public interface IUserService {
    void registerUser(User user) throws UserAlreadyExistException;

    List<User> getAllUsers();

    User getUser(String email);

    void deleteUser(String email);
}
