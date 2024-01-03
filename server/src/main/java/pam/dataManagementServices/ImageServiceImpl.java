package pam.dataManagementServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pam.model.List;
import pam.model.Place;
import pam.model.User;
import pam.repositories.ListRepository;
import pam.repositories.PlaceRepository;
import pam.repositories.UserRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class ImageServiceImpl implements ImageService{
    public static final String PATH_PROFILE_PIC = "src/main/resources/static/images/profiles/";
    public static final String PATH_PLACE_PIC = "src/main/resources/static/images/places/";

    public static final String PATH_LIST_PIC = "src/main/resources/static/images/lists/";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private ListRepository listRepository;

    @Override
    public String uploadProfileImage(long userID, MultipartFile image) throws IOException {
        String uuid = UUID.randomUUID() + "_" + image.getOriginalFilename();

        Path uploadPath = Paths.get(PATH_PROFILE_PIC + uuid);

        if(!Files.exists(uploadPath)){
            Files.createDirectories(uploadPath);
        }

        Files.copy(image.getInputStream(), uploadPath, StandardCopyOption.REPLACE_EXISTING);

        User user = userRepository.findOne(userID);
        user.setImage(uuid);
        userRepository.save(user);

        return uuid;
    }

    @Override
    public String uploadPlaceImage(long placeID, MultipartFile image) throws IOException {
        String uuid = UUID.randomUUID() + "_" + image.getOriginalFilename();

        Path uploadPath = Paths.get(PATH_PLACE_PIC + uuid);

        if(!Files.exists(uploadPath)){
            Files.createDirectories(uploadPath);
        }

        Files.copy(image.getInputStream(), uploadPath, StandardCopyOption.REPLACE_EXISTING);

        Place place = placeRepository.findOne(placeID);
        place.setImage(uuid);
        placeRepository.save(place);

        return uuid;
    }

    @Override
    public String uploadListImage(long listID, MultipartFile image) throws IOException {
        String uuid = UUID.randomUUID() + "_" + image.getOriginalFilename();

        Path uploadPath = Paths.get(PATH_LIST_PIC + uuid);

        if(!Files.exists(uploadPath)){
            Files.createDirectories(uploadPath);
        }

        Files.copy(image.getInputStream(), uploadPath, StandardCopyOption.REPLACE_EXISTING);

        List list = listRepository.findOne(listID);
        list.setImage(uuid);
        listRepository.save(list);

        return uuid;
    }

    @Override
    public byte[] getProfileImage(long userID) throws IOException {
        String uuid = userRepository.findOne(userID).getImage();
        if(uuid == null){
            return null;
        }
        Path path = Paths.get(PATH_PROFILE_PIC + uuid);
        return Files.readAllBytes(path);
    }

    @Override
    public byte[] getPlaceImage(long placeID) throws IOException {
        String uuid = placeRepository.findOne(placeID).getImage();
        if(uuid == null){
            return null;
        }
        Path path = Paths.get(PATH_PLACE_PIC + uuid);
        return Files.readAllBytes(path);
    }

    @Override
    public byte[] getListImage(long listID) throws IOException {
        String uuid = listRepository.findOne(listID).getImage();
        if(uuid == null){
            return null;
        }
        Path path = Paths.get(PATH_LIST_PIC + uuid);
        return Files.readAllBytes(path);
    }

    @Override
    public void deleteProfileImage(long userID) throws IOException {
        String uuid = userRepository.findOne(userID).getImage();
        if(uuid == null){
            return;
        }
        Path path = Paths.get(PATH_PROFILE_PIC + uuid);

        Files.delete(path);
        User user = userRepository.findOne(userID);
        user.setImage(null);
        userRepository.save(user);
    }

    @Override
    public void deletePlaceImage(long placeID) throws IOException {
        String uuid = placeRepository.findOne(placeID).getImage();
        if(uuid == null){
            return;
        }
        Path path = Paths.get(PATH_PLACE_PIC + uuid);

        Files.delete(path);
        Place place = placeRepository.findOne(placeID);
        place.setImage(null);
        placeRepository.save(place);
    }

    @Override
    public void deleteListImage(long listID) throws IOException {
        String uuid = listRepository.findOne(listID).getImage();
        if(uuid == null){
            return;
        }
        Path path = Paths.get(PATH_LIST_PIC + uuid);

        Files.delete(path);
        List list = listRepository.findOne(listID);
        list.setImage(null);
        listRepository.save(list);
    }
}
