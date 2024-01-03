package pam.controlers;

import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pam.dataManagementServices.ImageService;
import pam.dataManagementServices.ListService;
import pam.dataManagementServices.PlaceService;
import pam.dataManagementServices.UserService;
import pam.model.List;
import pam.model.ListRequestBody;
import pam.model.Place;
import pam.utils.ApiResponse;

import java.io.IOException;
import java.util.ArrayList;

import static pam.model.List.*;

@RestController
@RequestMapping("api")
public class ListController {
    @Autowired
    private ListService listService;

    @Autowired
    private UserService userService;

    @Autowired
    private PlaceService placeService;

    @Autowired
    private ImageService imageService;

    private static final Logger logger = Logger.getLogger(ListController.class);

    public ListController(){
        super();
        logger.info("Initialize list controller...");
    }

    private void verifyListID(long listID, java.util.List<String> errors){
        // Check listID
        if(listService.getList(listID) == null || listID < 0){
            errors.add("Invalid listID");
        }
    }

    private void verifyOwnerID(long ownerID, java.util.List<String> errors){
        // Check ownerID
        if(userService.getUser(ownerID) == null || ownerID < 0){
            errors.add("Invalid ownerID");
        }
    }

    private void verifyName(String name, java.util.List<String> errors){
        // Check name
        if(name == null || name.length() < MIN_NAME_LENGTH || name.length() > MAX_NAME_LENGTH){
            errors.add("Name must be between " + MIN_NAME_LENGTH + " and " + MAX_NAME_LENGTH + " characters long");
        }
    }

    private void verifyDescription(String description, java.util.List<String> errors){
        // Check description
        if(description == null || description.length() > MAX_DESCRIPTION_LENGTH){
            errors.add("Description must be less than " + MAX_DESCRIPTION_LENGTH + " characters long");
        }
    }

    private void verifyPlaceID(Long placeID, java.util.List<String> errors){
        // Check placeID
        if(placeID == null){
            errors.add("Missing placeID");
        }else{
            if(placeService.getPlace(placeID) == null || placeID < 0){
                errors.add("Invalid placeID");
            }
        }
    }

    private ListRequestBody addImage(ListRequestBody list) throws IOException {
        byte[] image = imageService.getListImage(list.getId());
        if(image != null){
            list.setImageResp(image);
        }
        return list;
    }

    private Iterable<ListRequestBody> addImages(Iterable<ListRequestBody> lists) throws IOException {
        ArrayList<ListRequestBody> res = new ArrayList<>();
        for(ListRequestBody list : lists){
            res.add(addImage(list));
        }
        return res;
    }

    @GetMapping("/lists")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> list(
            @RequestParam(value = "userID") Long userID
    ){
        if(userID != null){
            java.util.List<String> errors = new ArrayList<>();
            // Check ownerID
            verifyOwnerID(userID, errors);
            if(!errors.isEmpty()){
                return ApiResponse.badRequest(errors);
            }

            Iterable<ListRequestBody> lists;

            try{
                lists = addImages(
                        ListRequestBody.convert(
                                listService.getListsByOwnerID(userID)
                        )
                );
            }catch (IOException e){
                return ApiResponse.internalServerError("Error while loading images: " + e.getMessage());
            }

            return ApiResponse.ok(lists);
        }
        Iterable<ListRequestBody> lists;
        try{
            lists = addImages(
                    ListRequestBody.convert(
                            listService.getAllLists()
                    )
            );
        }catch (IOException e){
            return ApiResponse.internalServerError("Error while loading images: " + e.getMessage());
        }
        return ApiResponse.ok(lists);
    }

    @GetMapping(value = "/lists/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> details(
            @PathVariable Long id
    ){
        java.util.List<String> errors = new ArrayList<>();
        verifyListID(id, errors);
        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }
        List listFromDB = listService.getList(id);
        ListRequestBody list;
        try{
            list = addImage(
                    new ListRequestBody(
                            listFromDB
                    )
            );
        }catch (IOException e){
            return ApiResponse.internalServerError("Error while loading image: " + e.getMessage());
        }
        list.setPlaces(listFromDB.getPlaces());
        return ApiResponse.ok(list);
    }

    @PostMapping("/lists")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> create(
            @RequestParam(value = "list") String jsonList,
            @RequestParam(value = "image", required = false) MultipartFile image
    ){
        ListRequestBody list = ListRequestBody.fromJSON(jsonList);
        java.util.List<String> errors = new ArrayList<>();
        // Check name
        verifyName(list.getName(), errors);

        // Check ownerID
        verifyOwnerID(list.getOwnerID(), errors);

        if(list.getDescription() != null && !list.getDescription().isEmpty()){
            verifyDescription(list.getDescription(), errors);
        }

        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }

        List listFromDB = listService.createList(list);

        if(image != null){
            try{
                imageService.uploadListImage(listFromDB.getId(), image);
            }catch (IOException e){
                return ApiResponse.internalServerError("Error while saving image: " + e.getMessage());
            }
        }

        ListRequestBody res;

        try{
            res = addImage(
                    new ListRequestBody(
                            listFromDB
                    )
            );
        }catch (IOException e){
            return ApiResponse.internalServerError("Error while loading image: " + e.getMessage());
        }

        return ApiResponse.ok(res);
    }

    @PutMapping("/lists/{listID}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> update(
            @PathVariable Long listID,
            @RequestParam(value = "list") String jsonList,
            @RequestParam(value = "image", required = false) MultipartFile image
    ){
        ListRequestBody list = ListRequestBody.fromJSON(jsonList);
        java.util.List<String> errors = new ArrayList<>();
        // Check listID
        verifyListID(listID, errors);
        // Check name
        verifyName(list.getName(), errors);
        // Check ownerID
        verifyOwnerID(list.getOwnerID(), errors);

        if(list.getDescription() != null && !list.getDescription().isEmpty()){
            verifyDescription(list.getDescription(), errors);
        }

        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }

        List listFromDB = listService.updateList(listID, list);

        if(image != null){
            try{
                if(listFromDB.getImage() != null){
                    // Delete old image
                    imageService.deleteListImage(listFromDB.getId());
                }
                // Upload new image
                imageService.uploadListImage(listFromDB.getId(), image);
            }catch (IOException e){
                return ApiResponse.internalServerError("Error while saving image: " + e.getMessage());
            }
        }

        ListRequestBody res;

        try{
            res = addImage(
                    new ListRequestBody(
                            listFromDB
                    )
            );
        }catch (IOException e){
            return ApiResponse.internalServerError("Error while loading image: " + e.getMessage());
        }

        res.setPlaces(listFromDB.getPlaces());
        return ApiResponse.ok(res);
    }

    @PatchMapping("/lists/{listID}/addPlace/{placeID}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> addPlace(
            @PathVariable Long id,
            @PathVariable Long placeID
    ){
        java.util.List<String> errors = new ArrayList<>();
        // Check listID
        verifyListID(id, errors);
        // Check placeID
        verifyPlaceID(placeID, errors);
        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }

        listService.addPlace(
                listService.getList(id),
                placeService.getPlace(placeID)
        );

        return ApiResponse.ok("Place added to list");
    }

    @PatchMapping("/lists/{id}/removePlace/{placeID}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> removePlace(
            @PathVariable Long id,
            @PathVariable Long placeID
    ){
        java.util.List<String> errors = new ArrayList<>();
        // Check listID
        verifyListID(id, errors);
        // Check placeID
        verifyPlaceID(placeID, errors);
        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }

        listService.removePlace(
                listService.getList(id),
                placeService.getPlace(placeID)
        );

        return ApiResponse.ok("Place removed from list");
    }

    @DeleteMapping("/lists/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> delete(
            @PathVariable Long id
    ){
        java.util.List<String> errors = new ArrayList<>();
        // Check listID
        verifyListID(id, errors);
        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }

        try{
            if(listService.getList(id).getImage() != null){
                imageService.deleteListImage(listService.getList(id).getId());
            }
        }catch (IOException e){
            return ApiResponse.internalServerError("Error while deleting image: " + e.getMessage());
        }
        listService.deleteList(id);
        return ApiResponse.ok("List deleted");
    }
}
