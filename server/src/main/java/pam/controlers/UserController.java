package pam.controlers;

import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pam.dataManagementServices.UserService;
import pam.model.User;
import pam.model.UserRequestBody;
import pam.utils.ApiResponse;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static pam.model.User.*;

@RestController
@RequestMapping("api")
public class UserController {
    @Autowired
    private UserService userService;

    private static final Logger logger = Logger.getLogger(UserController.class);

    public UserController(){
        super();
        logger.info("Initialize user controller...");
    }

    private void verifyUsername(String username, List<String> errors){
        // Check username length
        if(username.length() < USERNAME_MIN_LENGTH || username.length() > USERNAME_MAX_LENGTH){
            errors.add("Username must be between " + USERNAME_MIN_LENGTH + " and " + USERNAME_MAX_LENGTH + " characters.");
        }
        // Check username characters
        Pattern pattern = Pattern.compile("[^a-zA-Z0-9_-]");
        Matcher matcher = pattern.matcher(username);
        if(matcher.find()){
            errors.add("Username must contain only letters, numbers, dash and underscore.");
        }
    }

    private void verifyEmail(String email, List<String> errors){
        // Check email format
        Pattern pattern = Pattern.compile("^[A-Za-z0-9+_.-]+@(.+)$");
        Matcher matcher = pattern.matcher(email);
        if(!matcher.find()){
            errors.add("Invalid email format");
        }
    }

    public void verifyDescription(String description, List<String> errors){
        // Check description length
        if(description.length() > DESCRIPTION_MAX_LENGTH){
            errors.add("Description must be less than " + DESCRIPTION_MAX_LENGTH + " characters.");
        }
    }

    @GetMapping("users")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> list(){
        return ApiResponse.ok(userService.getAllUsers());
    }

    @GetMapping("users/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> getOneUser(
        @PathVariable(value="id") Long id
    ){
        if(id == null){
            return ApiResponse.badRequest("Missing id");
        }
        User user = userService.getUser(id);
        if(id < 0 || user == null){
            return ApiResponse.badRequest("Invalid id");
        }
        return ApiResponse.ok(user);
    }

    @PostMapping("users")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> createUser(
        @RequestParam(value = "user") String userJson
    ){
        UserRequestBody user = UserRequestBody.fromJson(userJson);
        List<String> errors = new ArrayList<>();
        // Check username
        if(user.getUsername() == null){
            errors.add("Missing username");
        }else{
            verifyUsername(user.getUsername(), errors);
        }

        // Check password
        if(user.getPassword() == null){
            errors.add("Missing password");
        }

        // Check email
        if(user.getEmail() == null){
            errors.add("Missing email");
        }else{
            verifyEmail(user.getEmail(), errors);
        }

        // Check description
        if(user.getDescription() != null){
            verifyDescription(user.getDescription(), errors);
        }

        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }
        return ApiResponse.ok(
                userService.createUser(
                        user.getUsername(),
                        user.getPassword(),
                        user.getEmail(),
                        user.getDescription()
                )
        );
    }

    @PutMapping("users/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> updateUser(
        @PathVariable(value="id") Long id,
        @RequestParam(value = "user") String userJson
    ){
        UserRequestBody user = UserRequestBody.fromJson(userJson);
        List<String> errors = new ArrayList<>();
        // Check id
        if(id == null) {
            errors.add("Missing id");
        }else{
            if(id < 0 || userService.getUser(id) == null) {
                errors.add("Invalid id");
            }
        }

        // Check username
        if(user.getUsername() != null){
            verifyUsername(user.getUsername(), errors);
        }

        // Check email
        if(user.getEmail() != null){
            verifyEmail(user.getEmail(), errors);
        }

        // Check description
        if(user.getDescription() != null){
            verifyDescription(user.getDescription(), errors);
        }

        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }
        return ApiResponse.ok(
                userService.updateUser(
                        id,
                        user.getUsername(),
                        user.getPassword(),
                        user.getEmail(),
                        user.getDescription()
                )
        );
    }

    @DeleteMapping("users/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> deleteUser(
        @PathVariable(value="id") Long id
    ){
        if(id == null){
            return ApiResponse.badRequest("Missing id");
        }
        if(id < 0 || userService.getUser(id) == null){
            return ApiResponse.badRequest("Invalid id");
        }
        userService.deleteUser(id);
        return ApiResponse.ok("User deleted");
    }

    @PatchMapping("users/{id}/position")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> updatePosition(
        @PathVariable(value="id") Long id,
        @RequestParam(value="latitude") double latitude,
        @RequestParam(value="longitude") double longitude
    ){
        if(id == null){
            return ApiResponse.badRequest("Missing id");
        }
        if(id < 0 || userService.getUser(id) == null){
            return ApiResponse.badRequest("Invalid id");
        }
        userService.updatePosition(id, latitude, longitude);
        return ApiResponse.ok("Position updated");
    }

    // list : OK
    // details : OK
    // create : OK
    // update : OK
    // delete : OK
}
