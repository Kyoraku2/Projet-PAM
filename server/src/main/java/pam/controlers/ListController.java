package pam.controlers;

import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pam.dataManagementServices.ListService;
import pam.dataManagementServices.PlaceService;
import pam.dataManagementServices.UserService;
import pam.model.List;
import pam.utils.ApiResponse;

import java.util.ArrayList;

import static pam.model.List.*;

@RestController
@RequestMapping("api/lists")
public class ListController {
    @Autowired
    private ListService listService;

    @Autowired
    private UserService userService;

    @Autowired
    private PlaceService placeService;

    private static final Logger logger = Logger.getLogger(ListController.class);

    public ListController(){
        super();
        logger.info("Initialize list controller...");
    }

    private void verifyListID(Integer listID, java.util.List<String> errors){
        // Check listID
        if(listID == null){
            errors.add("Missing listID");
        }else{
            if(listService.getList(listID) == null || listID < 0){
                errors.add("Invalid listID");
            }
        }
    }

    private void verifyOwnerID(Integer ownerID, java.util.List<String> errors){
        // Check ownerID
        if(ownerID == null){
            errors.add("Missing ownerID");
        }else{
            if(userService.getUser(ownerID) == null || ownerID < 0){
                errors.add("Invalid ownerID");
            }
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

    private void verifyPlaceID(Integer placeID, java.util.List<String> errors){
        // Check placeID
        if(placeID == null){
            errors.add("Missing placeID");
        }else{
            if(placeService.getPlace(placeID) == null || placeID < 0){
                errors.add("Invalid placeID");
            }
        }
    }

    @RequestMapping("/all")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> list(){
        return ApiResponse.ok(listService.getAllLists());
    }

    @RequestMapping("/details")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> details(@RequestParam(value = "id") Integer id){
        java.util.List<String> errors = new ArrayList<>();
        verifyListID(id, errors);
        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }
        return ApiResponse.ok(listService.getList(id));
    }

    @RequestMapping("/create")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> create(
            @RequestParam(value = "name") String name,
            @RequestParam(value = "ownerID") Integer ownerID,
            @RequestParam(value = "description", required = false) String description
    ){
        java.util.List<String> errors = new ArrayList<>();
        // Check name
        verifyName(name, errors);

        // Check ownerID
        verifyOwnerID(ownerID, errors);

        if(description == null || description.isEmpty()){
            description = DEFAULT_DESCRIPTION;
        }
        verifyDescription(description, errors);

        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }

        List list = new List(userService.getUser(ownerID), name, description, false);
        return ApiResponse.ok(listService.createList(list));
    }

    @RequestMapping("/update")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> update(
            @RequestParam(value = "id") Integer id,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "isShared", required = false) Boolean isShared
    ){
        java.util.List<String> errors = new ArrayList<>();
        // Check listID
        verifyListID(id, errors);
        verifyName(name, errors);


        if(description != null){
            verifyDescription(description, errors);
        }else{
            description = DEFAULT_DESCRIPTION;
        }

        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }

        if(isShared == null){
            isShared = false;
        }

        return ApiResponse.ok(listService.updateList(
                id,
                name,
                description,
                isShared
        ));
    }

    @RequestMapping("/addPlace")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> addPlace(
            @RequestParam(value = "listID") Integer listID,
            @RequestParam(value = "placeID") Integer placeID
    ){
        java.util.List<String> errors = new ArrayList<>();
        // Check listID
        verifyListID(listID, errors);
        // Check placeID
        verifyPlaceID(placeID, errors);
        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }
        return ApiResponse.ok(listService.addPlace(
                listService.getList(listID),
                placeService.getPlace(placeID)
        ));
    }

    @RequestMapping("/removePlace")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> removePlace(
            @RequestParam(value = "listID") Integer listID,
            @RequestParam(value = "placeID") Integer placeID
    ){
        java.util.List<String> errors = new ArrayList<>();
        // Check listID
        verifyListID(listID, errors);
        // Check placeID
        verifyPlaceID(placeID, errors);
        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }
        return ApiResponse.ok(listService.removePlace(
                listService.getList(listID),
                placeService.getPlace(placeID)
        ));
    }

    @RequestMapping("/delete")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> delete(
            @RequestParam(value = "id") Integer id
    ){
        java.util.List<String> errors = new ArrayList<>();
        // Check listID
        verifyListID(id, errors);
        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }
        listService.deleteList(id);
        return ApiResponse.ok("List deleted");
    }

    @RequestMapping("/user/all")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> getAllListsOfUser(
            @RequestParam(value = "userID") Integer userID
    ){
        java.util.List<String> errors = new ArrayList<>();
        // Check ownerID
        verifyOwnerID(userID, errors);
        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }
        return ApiResponse.ok(listService.getListsByOwner(userService.getUser(userID)));
    }


    // list : OK
    // details : OK
    // create : OK
    // update : OK
    // addPlace : OK
    // removePlace : OK
    // addPlaces : OK
    // delete : OK
    // get all lists of one user : OK
}
