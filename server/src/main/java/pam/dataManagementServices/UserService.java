package pam.dataManagementServices;

import pam.model.User;

public interface UserService {
    Iterable<User> getAllUsers();

    User getUser(long id);
    User getUser(String username);

    User createUser(String username, String password, String email, String image, String description);
    User createUser(User user);

    User updateUser(long id, String username, String password, String email, String image, String description);
    User updateUser(User user);

    void deleteUser(long id);
    void deleteUser(User user);
}
