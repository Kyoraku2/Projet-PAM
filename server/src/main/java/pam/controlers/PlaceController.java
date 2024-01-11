package pam.controlers;

import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pam.dataManagementServices.ImageService;
import pam.dataManagementServices.PlaceService;
import pam.dataManagementServices.UserService;
import pam.model.CategoryEnum;
import pam.model.Place;
import pam.model.PlaceRequestBody;
import pam.utils.ApiResponse;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static pam.model.Place.*;

// TODO : check if the user is the owner of the place before updating/deleting it
// TODO : maybe same thing with reading it
@RestController
@RequestMapping("api")
public class PlaceController {
    @Autowired
    private PlaceService placeService;

    @Autowired
    private UserService userService;

    @Autowired
    private ImageService imageService;

    private static final Logger logger = Logger.getLogger(PlaceController.class);

    public PlaceController(){
        super();
        logger.info("Initialize place controller...");
    }

    private void verifyPlaceID(Long placeID, List<String> errors){
        // Check placeID
        if(placeID == null){
            errors.add("Missing placeID");
        }else{
            if(placeService.getPlace(placeID) == null || placeID < 0){
                errors.add("Invalid placeID");
            }
        }
    }

    private void verifyOwnerID(Long ownerID, List<String> errors){
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

    public void verifyCategory(String category, List<String> errors){
        // Check category
        if(!CategoryEnum.contains(category)){
            errors.add("Invalid category");
        }
    }


    @GetMapping("/places")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> list(){
        Iterable<PlaceRequestBody> placesResp = PlaceRequestBody.convert(
            placeService.getAllPlaces()
        );
        return ApiResponse.ok(placesResp);
    }

    @GetMapping("/places/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> details(
            @PathVariable Long id
    ){
        List<String> errors = new ArrayList<>();
        verifyPlaceID(id, errors);
        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }

        return ApiResponse.ok(
            new PlaceRequestBody(placeService.getPlace(id))
        );
    }

    @PostMapping("/places")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> create(
            @RequestParam(value = "place") String placeJson,
            @RequestParam(value = "image", required = false) MultipartFile image
    ){
        PlaceRequestBody place = PlaceRequestBody.fromJSON(placeJson);
        List<String> errors = new ArrayList<>();
        verifyOwnerID(place.getOwnerID(), errors);
        verifyName(place.getName(), errors);

        if(place.getDescription() != null && !place.getDescription().isEmpty()){
            verifyDescription(place.getDescription(), errors);
        }

        if(place.getCategory() != null && !place.getCategory().toString().isEmpty()){
            verifyCategory(place.getCategory().toString(), errors);
        }

        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }

        Place placeFromBD = placeService.createPlace(place);

        if(image != null){
            try{
                imageService.uploadPlaceImage(placeFromBD.getId(), image);
            }catch (IOException e){
                return ApiResponse.internalServerError("Error while saving image: " + e.getMessage());
            }
        }

        return ApiResponse.ok(new PlaceRequestBody(placeFromBD));
    }

    @PutMapping("/places/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> create(
            @PathVariable Long id,
            @RequestParam(value = "place") String placeJson,
            @RequestParam(value = "image", required = false) MultipartFile image
    ){
        PlaceRequestBody place = PlaceRequestBody.fromJSON(placeJson);
        List<String> errors = new ArrayList<>();
        verifyPlaceID(id, errors);
        verifyOwnerID(place.getOwnerID(), errors);
        verifyName(place.getName(), errors);

        if(place.getDescription() != null && !place.getDescription().isEmpty()){
            verifyDescription(place.getDescription(), errors);
        }

        if(place.getCategory() != null && !place.getCategory().toString().isEmpty()){
            verifyCategory(place.getCategory().toString(), errors);
        }

        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }

        place.setId(id);
        Place placeFromBD = placeService.updatePlace(place);

        if(image != null){
            try{
                if(placeService.getPlace(id).getImage() != null){
                    imageService.deletePlaceImage(id);
                }
                imageService.uploadPlaceImage(id, image);
            }catch (Exception e){
                return ApiResponse.badRequest("Error while saving image : " + e.getMessage());
            }
        }

        return ApiResponse.ok(new PlaceRequestBody(placeFromBD));
    }

    @DeleteMapping("/places/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> delete(
            @PathVariable Long id
    ){
        List<String> errors = new ArrayList<>();
        verifyPlaceID(id, errors);
        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }

        try{
            if(placeService.getPlace(id).getImage() != null){
                imageService.deletePlaceImage(id);
            }
        }catch (Exception e){
            return ApiResponse.badRequest("Error while deleting image : " + e.getMessage());
        }

        placeService.deletePlace(id);
        return ApiResponse.ok("Place deleted");
    }

    @PatchMapping("/places/user/{userID}/addToFavorite/{placeID}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> addToFavorite(
            @PathVariable Long userID,
            @PathVariable Long placeID
    ){
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

        placeService.addToFavorite(
                userService.getUser(userID),
                placeService.getPlace(placeID)
        );

        return ApiResponse.ok("Place added to favorites");
    }

    @PatchMapping("/places/user/{userID}/removeFromFavorite/{placeID}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> removeFromFavorite(
            @PathVariable Long userID,
            @PathVariable Long placeID){
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

        placeService.removeFromFavorite(
                userService.getUser(userID),
                placeService.getPlace(placeID)
        );

        return ApiResponse.ok("Place removed from favorites");
    }

    @GetMapping("/places/user/{userID}/favorites")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> getFavorites(
            @PathVariable Long userID
    ){
        List<String> errors = new ArrayList<>();
        verifyOwnerID(userID, errors);
        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }

        return ApiResponse.ok(
                PlaceRequestBody.convert(
                        placeService.getFavorites(userID)
                )
        );
    }

    @GetMapping("/places/user/{userID}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> getPlacesByUser(
            @PathVariable(value = "userID") Long userID
    ){
        List<String> errors = new ArrayList<>();
        verifyOwnerID(userID, errors);
        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }

        Iterable<PlaceRequestBody> placesResp = PlaceRequestBody.convert(
                placeService.getPlacesOfUser(userID)
        );

        return ApiResponse.ok(placesResp);
    }

    @GetMapping("/places/list/{listID}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> getPlacesByList(
            @PathVariable(value = "listID") Long listID
    ){
        List<String> errors = new ArrayList<>();

        if(listID == null){
            errors.add("Missing listID");
        }else{
            if(listID < 0){
                errors.add("Invalid listID");
            }
        }

        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }

        Iterable<PlaceRequestBody> placesResp = PlaceRequestBody.convert(
                placeService.getPlacesOfList(listID)
        );

        return ApiResponse.ok(placesResp);
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
}
