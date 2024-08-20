package com.example.server.util;

import com.example.server.models.User;
import jakarta.servlet.http.HttpServletRequest;

public class UserUtil {

    public User getCurrentUser(HttpServletRequest request) {
        return (User) request.getAttribute("user");
    }
}
