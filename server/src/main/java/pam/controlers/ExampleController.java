package pam.controlers;

import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pam.dataManagementServices.ExampleService;
import pam.dataManagementServices.ImageService;
import pam.model.ExampleEntity;
import pam.utils.ApiResponse;

import java.io.IOException;

@RestController
@RequestMapping("api/example")
public class ExampleController {
    @Autowired
    private ExampleService exampleService;

    @Autowired
    private ImageService imageService;

    private static final Logger logger = Logger.getLogger(ExampleController.class);

    public ExampleController(){
        super();
        logger.info("Initialize example controller...");
    }

    @RequestMapping("entities")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> list(){
        return ApiResponse.ok(exampleService.getAllExampleEntities());
    }

    @GetMapping("entity")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> getOneExampleEntity(
        @RequestParam(value="id", required = false) Integer id
    ){
        if(id == null){
            return ApiResponse.badRequest("Missing id");
        }
        if(id < 0){
            return ApiResponse.badRequest("Invalid id");
        }
        ExampleEntity entity = exampleService.getExampleEntity(id);
        if(entity == null){
            return ApiResponse.notFound("Entity not found");
        }
        return ApiResponse.ok(entity);
    }

    @GetMapping("defaultImage")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> getDefaultImage(){
        byte[] image = null;
        try {
            image = imageService.getListImage(3);
        } catch (IOException e) {
            e.printStackTrace();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);

        return ResponseEntity.ok().headers(headers).body(image);
    }
}
