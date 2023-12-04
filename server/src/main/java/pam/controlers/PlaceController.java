package pam.controlers;

import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Point;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pam.dataManagementServices.PlaceService;
import pam.dataManagementServices.UserService;
import pam.model.CategoryEnum;
import pam.model.Place;
import pam.utils.ApiResponse;

import java.util.ArrayList;
import java.util.List;

import static pam.model.Place.*;

@RestController
@RequestMapping("api/places")
public class PlaceController {
    @Autowired
    private PlaceService placeService;

    @Autowired
    private UserService userService;

    private static final Logger logger = Logger.getLogger(PlaceController.class);

    public PlaceController(){
        super();
        logger.info("Initialize place controller...");
    }

    private void verifyPlaceID(Integer placeID, List<String> errors){
        // Check placeID
        if(placeID == null){
            errors.add("Missing placeID");
        }else{
            if(placeService.getPlace(placeID) == null || placeID < 0){
                errors.add("Invalid placeID");
            }
        }
    }

    private void verifyOwnerID(Integer ownerID, List<String> errors){
        // Check ownerID
        if(ownerID == null){
            errors.add("Missing ownerID");
        }else{
            if(userService.getUser(ownerID) == null || ownerID < 0){
                errors.add("Invalid ownerID");
            }
        }
    }

    private void verifyName(String name, List<String> errors){
        // Check name length
        if(name.length() > MAX_NAME_LENGTH || name.length() < MIN_NAME_LENGTH){
            errors.add("Name must be between " + MIN_NAME_LENGTH + " and " + MAX_NAME_LENGTH + " characters.");
        }
    }

    public void verifyDescription(String description, List<String> errors){
        // Check description length
        if(description.length() > Place.MAX_DESCRIPTION_LENGTH){
            errors.add("Description must be less than " + Place.MAX_DESCRIPTION_LENGTH + " characters.");
        }
    }

    public void verifyCoordinates(){
        // TODO
    }

    public void verifyCategory(String category, List<String> errors){
        // Check category
        if(!CategoryEnum.contains(category)){
            errors.add("Invalid category");
        }
    }

    @RequestMapping("/all")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> list(){
        return ApiResponse.ok(placeService.getAllPlaces());
    }

    @RequestMapping("/details")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> details(@RequestParam(value = "id") Integer id){
        List<String> errors = new ArrayList<>();
        verifyPlaceID(id, errors);
        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }
        return ApiResponse.ok(placeService.getPlace(id));
    }

    @RequestMapping("/create")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> create(@RequestParam(value = "ownerID") Integer ownerID,
                                         @RequestParam(value = "name") String name,
                                         @RequestParam(value = "description", required = false) String description,
                                         @RequestParam(value = "image", required = false) String image,
                                         // TODO : add coordinates
                                         @RequestParam(value = "category", required = false) String category){
        List<String> errors = new ArrayList<>();
        verifyOwnerID(ownerID, errors);
        verifyName(name, errors);

        if(description == null || description.isEmpty()){
            description = DEFAULT_DESCRIPTION;
        }
        verifyDescription(description, errors);

        if(image == null || image.isEmpty()){
            image = DEFAULT_IMAGE;
        }

        if(category == null || category.isEmpty()){
            category = DEFAULT_CATEGORY;
        }
        verifyCategory(category, errors);

        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }
        Place place = new Place(userService.getUser(ownerID), name, description, image, new Point(0,0), CategoryEnum.valueOf(category));
        return ApiResponse.ok(place);
    }

    @RequestMapping("/update")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> update(@RequestParam(value = "id") Integer id,
                                         @RequestParam(value = "ownerID") Integer ownerID,
                                         @RequestParam(value = "name") String name,
                                         @RequestParam(value = "description", required = false) String description,
                                         @RequestParam(value = "image", required = false) String image,
                                         // TODO : add coordinates
                                         @RequestParam(value = "category", required = false) String category){
        List<String> errors = new ArrayList<>();
        verifyPlaceID(id, errors);
        verifyOwnerID(ownerID, errors);
        verifyName(name, errors);

        if(description == null || description.isEmpty()){
            description = DEFAULT_DESCRIPTION;
        }
        verifyDescription(description, errors);

        if(image == null || image.isEmpty()){
            image = DEFAULT_IMAGE;
        }

        if(category == null || category.isEmpty()){
            category = DEFAULT_CATEGORY;
        }
        verifyCategory(category, errors);

        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }
        Place place = placeService.updatePlace(id, ownerID, name, description, image, new Point(0,0), category);
        return ApiResponse.ok(place);
    }

    @RequestMapping("/delete")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> delete(@RequestParam(value = "id") Integer id){
        List<String> errors = new ArrayList<>();
        verifyPlaceID(id, errors);
        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }
        placeService.deletePlace(id);
        return ApiResponse.ok("Place deleted");
    }

    @RequestMapping("/addToFavorite")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> addToFavorite(@RequestParam(value = "userID") Integer userID,
                                                @RequestParam(value = "placeID") Integer placeID){
        List<String> errors = new ArrayList<>();
        verifyPlaceID(placeID, errors);
        verifyOwnerID(userID, errors);
        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }

        Place place = placeService.getPlace(placeID);
        if(place.getFavorites().contains(userService.getUser(userID))){
            return ApiResponse.badRequest("Place already in favorites");
        }

        return ApiResponse.ok(placeService.addToFavorite(
                userService.getUser(userID), placeService.getPlace(placeID)
        ));
    }

    @RequestMapping("/removeFromFavorite")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> removeFromFavorite(@RequestParam(value = "userID") Integer userID,
                                                     @RequestParam(value = "placeID") Integer placeID){
        List<String> errors = new ArrayList<>();
        verifyPlaceID(placeID, errors);
        verifyOwnerID(userID, errors);
        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }

        Place place = placeService.getPlace(placeID);
        if(!place.getFavorites().contains(userService.getUser(userID))){
            return ApiResponse.badRequest("Place not in favorites");
        }

        return ApiResponse.ok(placeService.removeFromFavorite(
                userService.getUser(userID), placeService.getPlace(placeID)
        ));
    }

    @RequestMapping("/user/favorites")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> getFavorites(@RequestParam(value = "userID") Integer userID){
        List<String> errors = new ArrayList<>();
        verifyOwnerID(userID, errors);
        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }
        return ApiResponse.ok(placeService.getFavorites(userID));
    }

    @RequestMapping("/user")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> getPlacesByUser(@RequestParam(value = "userID") Integer userID){
        List<String> errors = new ArrayList<>();
        verifyOwnerID(userID, errors);
        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }
        return ApiResponse.ok(placeService.getPlacesOfUser(userID));
    }



    // list : OK
    // details : OK
    // create : Partially OK
    // update : Partially OK
    // delete : OK
    // Add to favorites : OK
    // Remove from favorites : OK
    // Get favorites of one user : OK
    // Get all places of one user : OK


    // TODO : manage image upload
}
