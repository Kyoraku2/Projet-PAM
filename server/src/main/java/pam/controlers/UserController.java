package pam.controlers;

import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pam.dataManagementServices.UserService;
import pam.model.User;
import pam.utils.ApiResponse;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static pam.model.User.*;

@RestController
@RequestMapping("api/users")
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

    @RequestMapping("all")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> list(){
        return ApiResponse.ok(userService.getAllUsers());
    }

    @RequestMapping("details")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> getOneUser(
        @RequestParam(value="id", required = false) Integer id
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

    @RequestMapping("create")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> createUser(
        @RequestParam(value="username") String username,
        @RequestParam(value="password") String password,
        @RequestParam(value="email") String email,
        @RequestParam(value="image", required = false) String image,
        @RequestParam(value="description", required = false) String description
    ){
        List<String> errors = new ArrayList<>();
        // Check username
        if(username == null){
            errors.add("Missing username");
        }else{
            verifyUsername(username, errors);
        }

        // Check password
        if(password == null){
            errors.add("Missing password");
        }

        // Check email
        if(email == null){
            errors.add("Missing email");
        }else{
            verifyEmail(email, errors);
        }

        // Check description
        if(description != null){
            verifyDescription(description, errors);
        }

        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }
        return ApiResponse.ok(
                userService.createUser(
                        username,
                        password,
                        email,
                        image==null ? DEFAULT_IMAGE : image,
                        description==null ? DEFAULT_DESCRIPTION : description
                )
        );
    }

    @RequestMapping("update")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> updateUser(
        @RequestParam(value="id") Integer id,
        @RequestParam(value="username") String username,
        @RequestParam(value="password") String password,
        @RequestParam(value="email") String email,
        @RequestParam(value="image", required = false) String image,
        @RequestParam(value="description", required = false) String description
    ){
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
        if(username != null){
            verifyUsername(username, errors);
        }

        // Check email
        if(email != null){
            verifyEmail(email, errors);
        }

        // Check description
        if(description != null){
            verifyDescription(description, errors);
        }

        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }
        return ApiResponse.ok(
                userService.updateUser(
                        id,
                        username,
                        password,
                        email,
                        image==null ? DEFAULT_IMAGE : image,
                        description==null ? DEFAULT_DESCRIPTION : description
                )
        );
    }

    @RequestMapping("delete")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> deleteUser(
        @RequestParam(value="id") Integer id
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

    // list : OK
    // details : OK
    // create : OK
    // update : OK
    // delete : OK


    // TODO : check for login
    // TODO : manage image upload
}
