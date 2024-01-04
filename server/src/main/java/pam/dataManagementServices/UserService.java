package pam.dataManagementServices;

import pam.model.User;
public interface UserService {
    Iterable<User> getAllUsers();

    User getUser(long id);
    User getUser(String username);

    User createUser(String username, String password, String email, String description);
    User createUser(User user);

    User updateUser(long id, String username, String password, String email, String description);
    User updateUser(User user);

    User updatePosition(long id, double latitude, double longitude);

    void deleteUser(long id);
    void deleteUser(User user);
}
