package pam.controlers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pam.dataManagementServices.ListService;
import pam.dataManagementServices.PlaceService;
import pam.dataManagementServices.UserService;
import pam.utils.ApiResponse;

import java.nio.file.Path;
import java.nio.file.Paths;

//@RestController
//@RequestMapping("api/images")
public class ImageController {
    /*public static String PATH_PROFILE_PIC = "src/main/resources/static/images/profiles/";
    public static String PATH_PLACE_PIC = "src/main/resources/static/images/places/";

    @Autowired
    private UserService userService;

    @Autowired
    private PlaceService placeService;

    @Autowired
    private ListService listService;

    private void uploadImage(String path, MultipartFile file){
        try{
            String
        }
    }

    @PostMapping("/upload/profile")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> uploadImage(
            @RequestParam("userID") Integer userID,
            @RequestParam("image") MultipartFile file
    ){
        if(userID == null){
            return ApiResponse.badRequest("Missing userID");
        }
        if(userService.getUser(userID) == null){
            return ApiResponse.badRequest("Invalid userID");
        }
        if(file == null || file.isEmpty()){
            return ApiResponse.badRequest("Missing image");
        }



        return ApiResponse.ok("Image uploaded");
    }*/
}
