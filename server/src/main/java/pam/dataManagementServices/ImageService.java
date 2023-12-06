package pam.dataManagementServices;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImageService {
    String uploadProfileImage(long userID, MultipartFile image) throws IOException;
    String uploadPlaceImage(long placeID, MultipartFile image) throws IOException;
    String uploadListImage(long listID, MultipartFile image) throws IOException;
    byte[] getProfileImage(long userID) throws IOException;
    byte[] getPlaceImage(long placeID) throws IOException;
    byte[] getListImage(long listID) throws IOException;
    void deleteProfileImage(long userID);
    void deletePlaceImage(long placeID);
    void deleteListImage(long listID);
}
