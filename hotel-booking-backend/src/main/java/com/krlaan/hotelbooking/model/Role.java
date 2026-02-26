package com.krlaan.hotelbooking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @JsonIgnore
    @ManyToMany(mappedBy = "roles")
    private Collection<User> users = new HashSet<>();

    public Role(String name) {
        this.name = name;
    }

    public void addRoleToUser(User user) {
        user.getRoles().add(this);
        this.getUsers().add(user);
    }

    public void deleteRoleFromUser(User user) {
        user.getRoles().remove(this);
        this.getUsers().remove(user);
    }

    public void deleteAllUsersFromRole() {
        if (this.getUsers() != null) {
            List<User> roleUsers = this.getUsers().stream().toList();
            roleUsers.forEach(this::deleteRoleFromUser);
        }
    }

    public String getName() {
        return name != null ? name : "";
    }
}
