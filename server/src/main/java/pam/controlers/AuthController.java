package pam.controlers;

import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pam.dataManagementServices.UserService;
import pam.model.AuthResponseBody;
import pam.model.User;
import pam.utils.ApiResponse;
import pam.web.JwtGenerator;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("api/auth")
public class AuthController {
    private static final Logger logger = Logger.getLogger(AuthController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private JwtGenerator jwtGenerator;

    public AuthController(){
        super();
        logger.info("Initialize auth controller...");
    }

    public void verifyUsername(String username, List<String> errors){
        if(username == null || username.isEmpty()){
            errors.add("Username is required");
        }else{
            User user = userService.getUser(username);
            if(user != null){
                errors.add("Username already taken");
            }
            if(username.length() < User.USERNAME_MIN_LENGTH || username.length() > User.USERNAME_MAX_LENGTH){
                errors.add("Username must be between " + User.USERNAME_MIN_LENGTH + " and " + User.USERNAME_MAX_LENGTH + " characters");
            }
        }
    }

    public void verifyPassword(String password, List<String> errors){
        if(password == null || password.isEmpty()){
            errors.add("Password is required");
        }
    }

    public void verifyEmail(String email, List<String> errors){
        if(email == null || email.isEmpty()){
            errors.add("Email is required");
        }else{
            User user = userService.getUser(email);
            if(user != null){
                errors.add("Email already taken");
            }
            Pattern pattern = Pattern.compile("^[A-Za-z0-9+_.-]+@(.+)$");
            Matcher matcher = pattern.matcher(email);
            if(!matcher.find()){
                errors.add("Invalid email format");
            }
        }
    }

    @RequestMapping("/register")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> register(
            @RequestParam(value = "username") String username,
            @RequestParam(value = "password") String password,
            @RequestParam(value = "email") String email
    ){
        // Verify parameters
        List<String> errors = new ArrayList<>();
        verifyUsername(username, errors);
        verifyPassword(password, errors);
        verifyEmail(email, errors);
        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }

        // Treatment
        User user = userService.createUser(username, password, email, User.DEFAULT_DESCRIPTION);
        String jwt = jwtGenerator.generateJwt(user);
        return ApiResponse.ok(new AuthResponseBody(user, jwt));
    }

    @RequestMapping("/login")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> login(
            @RequestParam(value = "username") String username,
            @RequestParam(value = "password") String password
    ){
        // Verify parameters
        List<String> errors = new ArrayList<>();
        if(username == null || username.isEmpty()){
            errors.add("Username is required");
        }
        if(password == null || password.isEmpty()){
            errors.add("Password is required");
        }
        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }

        // Treatment
        User user = userService.getUser(username);
        if(user == null){
            return ApiResponse.unauthorized("Bad credentials...");
        }
        if(!user.getPassword().equals(password)){
            return ApiResponse.unauthorized("Bad credentials...");
        }
        String jwt = jwtGenerator.generateJwt(user);
        return ApiResponse.ok(new AuthResponseBody(user, jwt));
    }
}
