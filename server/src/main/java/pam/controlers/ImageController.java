package pam.controlers;

import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pam.dataManagementServices.ImageService;
import pam.dataManagementServices.ListService;
import pam.dataManagementServices.PlaceService;
import pam.dataManagementServices.UserService;
import pam.model.Place;
import pam.model.User;
import pam.utils.ApiResponse;

import java.io.IOException;

@RestController
@RequestMapping("api")
public class ImageController {
    @Autowired
    private ImageService imageService;

    @Autowired
    private UserService userService;

    @Autowired
    private PlaceService placeService;

    @Autowired
    private ListService listService;

    private static final Logger logger = Logger.getLogger(ImageController.class);

    public ImageController(){
        super();
        logger.info("Initialize image controller...");
    }

    @GetMapping("/user/{id}/profileImage")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> getUserProfileImage(
            @PathVariable(value = "id") Long userID
    ){
        // Verifications
        if(userID == null){
            return ApiResponse.badRequest("Missing userID");
        }else{
            if(userID < 0){
                return ApiResponse.badRequest("Invalid userID");
            }
        }
        User user = userService.getUser(userID);
        if(user == null){
            return ApiResponse.notFound("User not found");
        }

        // Processing data
        byte[] image = null;
        try {
            image = imageService.getProfileImage(userID);
        } catch (IOException e) {
            return ApiResponse.internalServerError("Error while getting image: " + e.getMessage());
        }

        if(image == null){
            return ApiResponse.noContent("No image found");
        }

        return ApiResponse.ok(image);
    }

    @GetMapping("/place/{id}/image")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> getPlaceImage(
            @PathVariable(value = "id") Integer placeID
    ){
        // Verifications
        if(placeID == null){
            return ApiResponse.badRequest("Missing placeID");
        }else{
            if(placeID < 0){
                return ApiResponse.badRequest("Invalid placeID");
            }
        }

        Place place = placeService.getPlace(placeID);
        if(place == null){
            return ApiResponse.notFound("Place not found");
        }

        // Processing data
        byte[] image = null;
        try {
            image = imageService.getPlaceImage(placeID);
        } catch (IOException e) {
            return ApiResponse.internalServerError("Error while getting image: " + e.getMessage());
        }

        if(image == null){
            return ApiResponse.noContent("No image found");
        }

        return ApiResponse.ok(image);
    }

    @GetMapping("/list/{id}/image")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> getListImage(
            @PathVariable(value = "id") Integer listID
    ){
        // Verifications
        if(listID == null){
            return ApiResponse.badRequest("Missing listID");
        }else{
            if(listID < 0){
                return ApiResponse.badRequest("Invalid listID");
            }
        }

        pam.model.List list = listService.getList(listID);
        if(list == null){
            return ApiResponse.notFound("List not found");
        }

        // Processing data
        byte[] image = null;
        try {
            image = imageService.getListImage(listID);
        } catch (IOException e) {
            return ApiResponse.internalServerError("Error while getting image: " + e.getMessage());
        }

        if(image == null){
            return ApiResponse.noContent("No image found");
        }
        return ApiResponse.ok(image);
    }

    @PostMapping("/user/{id}/profileImage")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> setUserProfileImage(
            @PathVariable(value = "id") Long userID,
            @RequestBody MultipartFile image
            ){
        // Verifications
        if(userID == null){
            return ApiResponse.badRequest("Missing userID");
        }else{
            if(userID < 0){
                return ApiResponse.badRequest("Invalid userID");
            }
        }

        if(image == null){
            return ApiResponse.badRequest("Missing image");
        }

        User user = userService.getUser(userID);
        if(user == null){
            return ApiResponse.notFound("User not found");
        }

        // Processing data
        String uuid = "";
        try {
            uuid = imageService.uploadProfileImage(userID, image);
        } catch (IOException e) {
            return ApiResponse.internalServerError("Error while uploading image: " + e.getMessage());
        }
        if(uuid == null){
            return ApiResponse.internalServerError("Error while uploading image: "+image.getOriginalFilename());
        }

        user.setImage(uuid);
        userService.updateUser(user);

        return ApiResponse.ok("Image uploaded successfully: "+image.getOriginalFilename());
    }

    @PostMapping("/place/{id}/image")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> setPlaceImage(
            @PathVariable(value = "id") Integer placeID,
            @RequestBody MultipartFile image
    ){
        // Verifications
        if(placeID == null){
            return ApiResponse.badRequest("Missing placeID");
        }else{
            if(placeID < 0){
                return ApiResponse.badRequest("Invalid placeID");
            }
        }

        if(image == null){
            return ApiResponse.badRequest("Missing image");
        }

        Place place = placeService.getPlace(placeID);
        if(place == null){
            return ApiResponse.notFound("Place not found");
        }

        // Processing data
        String uuid = "";
        try {
            uuid = imageService.uploadPlaceImage(placeID, image);
        } catch (IOException e) {
            return ApiResponse.internalServerError("Error while uploading image: " + e.getMessage());
        }
        if(uuid == null){
            return ApiResponse.internalServerError("Error while uploading image: "+image.getOriginalFilename());
        }

        place.setImage(uuid);
        placeService.updatePlace(place);

        return ApiResponse.ok("Image uploaded successfully: "+image.getOriginalFilename());
    }

    @PostMapping("/list/{id}/image")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> setListImage(
            @PathVariable(value = "id") Integer listID,
            @RequestBody MultipartFile image
    ){
        // Verifications
        if(listID == null){
            return ApiResponse.badRequest("Missing listID");
        }else{
            if(listID < 0){
                return ApiResponse.badRequest("Invalid listID");
            }
        }

        if(image == null){
            return ApiResponse.badRequest("Missing image");
        }

        pam.model.List list = listService.getList(listID);
        if(list == null){
            return ApiResponse.notFound("List not found");
        }

        // Processing data
        String uuid = "";
        try {
            uuid = imageService.uploadListImage(listID, image);
        } catch (IOException e) {
            return ApiResponse.internalServerError("Error while uploading image: " + e.getMessage());
        }
        if(uuid == null){
            return ApiResponse.internalServerError("Error while uploading image: "+image.getOriginalFilename());
        }

        list.setImage(uuid);
        listService.updateList(list);

        return ApiResponse.ok("Image uploaded successfully: "+image.getOriginalFilename());
    }

    @DeleteMapping("/user/{id}/profileImage")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> deleteUserProfileImage(
            @PathVariable(value = "id") Long userID
    ) throws IOException {
        // Verifications
        if(userID == null){
            return ApiResponse.badRequest("Missing userID");
        }else{
            if(userID < 0){
                return ApiResponse.badRequest("Invalid userID");
            }
        }
        User user = userService.getUser(userID);
        if(user == null){
            return ApiResponse.notFound("User not found");
        }

        // Processing data
        imageService.deleteProfileImage(userID);

        return ApiResponse.ok("Image deleted");
    }

    @DeleteMapping("/place/{id}/image")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> deletePlaceImage(
            @PathVariable(value = "id") Integer placeID
    ) throws IOException {
        // Verifications
        if(placeID == null){
            return ApiResponse.badRequest("Missing placeID");
        }else{
            if(placeID < 0){
                return ApiResponse.badRequest("Invalid placeID");
            }
        }

        Place place = placeService.getPlace(placeID);
        if(place == null){
            return ApiResponse.notFound("Place not found");
        }

        // Processing data
        imageService.deletePlaceImage(placeID);

        return ApiResponse.ok("Image deleted");
    }

    @DeleteMapping("/list/{id}/image")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> deleteListImage(
            @PathVariable(value = "id") Integer listID
    ) throws IOException {
        // Verifications
        if(listID == null){
            return ApiResponse.badRequest("Missing listID");
        }else{
            if(listID < 0){
                return ApiResponse.badRequest("Invalid listID");
            }
        }

        pam.model.List list = listService.getList(listID);
        if(list == null){
            return ApiResponse.notFound("List not found");
        }

        // Processing data
        imageService.deleteListImage(listID);

        return ApiResponse.ok("Image deleted");
    }
}
