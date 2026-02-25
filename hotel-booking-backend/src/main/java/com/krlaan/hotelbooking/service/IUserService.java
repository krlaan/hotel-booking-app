package com.krlaan.hotelbooking.service;

import com.krlaan.hotelbooking.exception.UserAlreadyExistException;
import com.krlaan.hotelbooking.model.User;

import java.util.List;

public interface IUserService {
    User registerUser(User user) throws UserAlreadyExistException;

    List<User> getUsers();

    User getUser(String email);

    void deleteUser(String email);
}
