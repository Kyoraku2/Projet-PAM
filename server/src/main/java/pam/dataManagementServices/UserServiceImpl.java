package pam.dataManagementServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pam.model.User;
import pam.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepository;

    @Override
    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUser(long id) {
        return userRepository.findOne(id);
    }

    @Override
    public User getUser(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User createUser(String username, String password, String email, String description) {
        User newUser = new User(username, password, email, null, description);
        return userRepository.save(newUser);
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(long id, String username, String password, String email, String description) {
        User userFromDB = userRepository.findOne(id);
        userFromDB.setUsername(username);
        userFromDB.setPassword(password);
        userFromDB.setEmail(email);
        userFromDB.setDescription(description);
        return userRepository.save(userFromDB);
    }

    @Override
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(long id) {
        userRepository.delete(id);
    }

    @Override
    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    @Override
    public User updatePosition(long id, double latitude, double longitude) {
        User userFromDB = userRepository.findOne(id);
        userFromDB.setLatitude(latitude);
        userFromDB.setLongitude(longitude);
        return userRepository.save(userFromDB);
    }
}
