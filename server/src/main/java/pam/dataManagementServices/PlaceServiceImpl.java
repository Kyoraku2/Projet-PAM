package pam.dataManagementServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pam.model.CategoryEnum;
import pam.model.Place;
import pam.model.PlaceRequestBody;
import pam.model.User;
import pam.repositories.PlaceRepository;
import pam.repositories.UserRepository;

@Service
public class PlaceServiceImpl implements PlaceService{
    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Iterable<Place> getAllPlaces() {
        return placeRepository.findAll();
    }

    @Override
    public Iterable<Place> getPlacesOfUser(long userId) {
        User user = userRepository.findOne(userId);
        return placeRepository.findAllByOwner(user);
    }

    @Override
    public Iterable<Place> getFavorites(long userId) {
        return userRepository.findOne(userId).getFavorites();
    }

    @Override
    public Iterable<Place> getPlacesOfList(long listId) {
        return placeRepository.findAllByLists_Id(listId);
    }

    @Override
    public Place getPlace(long id) {
        return placeRepository.findOne(id);
    }

    @Override
    public Place createPlace(String name, String description, double latitude, double longitude, String category, User owner) {
        Place place = new Place(owner, name, description, latitude, longitude, CategoryEnum.valueOf(category));
        return placeRepository.save(place);
    }

    @Override
    public Place createPlace(Place place) {
        return placeRepository.save(place);
    }

    @Override
    public Place createPlace(PlaceRequestBody placeRequestBody) {
        Place place = new Place(
                userRepository.findOne(placeRequestBody.getOwnerID()),
                placeRequestBody.getName(),
                placeRequestBody.getDescription(),
                placeRequestBody.getLatitude(),
                placeRequestBody.getLongitude(),
                placeRequestBody.getCategory()
        );
        return placeRepository.save(place);
    }

    @Override
    public Place updatePlace(long placeID, long ownerID, String name, String description, double latitude, double longitude, String category) {
        Place placeFromDB = placeRepository.findOne(placeID);
        placeFromDB.setName(name);
        placeFromDB.setDescription(description);
        placeFromDB.setLatitude(latitude);
        placeFromDB.setLongitude(longitude);
        placeFromDB.setCategory(CategoryEnum.valueOf(category));
        return placeRepository.save(placeFromDB);
    }

    @Override
    public Place updatePlace(Place place) {
        return placeRepository.save(place);
    }

    @Override
    public Place updatePlace(PlaceRequestBody placeRequestBody) {
        Place placeFromDB = placeRepository.findOne(placeRequestBody.getId());
        placeFromDB.setName(placeRequestBody.getName());
        placeFromDB.setDescription(placeRequestBody.getDescription());
        placeFromDB.setLatitude(placeRequestBody.getLatitude());
        placeFromDB.setLongitude(placeRequestBody.getLongitude());
        placeFromDB.setCategory(placeRequestBody.getCategory());
        return placeRepository.save(placeFromDB);
    }

    @Override
    public void deletePlace(long id) {
        placeRepository.delete(id);
    }

    @Override
    public Place addToFavorite(long userId, long placeId) {
        Place placeFromDB = placeRepository.findOne(placeId);
        User userFromDB = userRepository.findOne(userId);
        placeFromDB.getFavorites().add(userFromDB);
        userFromDB.getFavorites().add(placeFromDB);
        userRepository.save(userFromDB);
        return placeRepository.save(placeFromDB);
    }

    @Override
    public Place addToFavorite(User user, Place place) {
        Place placeFromDB = placeRepository.findOne(place.getId());
        User userFromDB = userRepository.findOne(user.getUserID());
        placeFromDB.getFavorites().add(userFromDB); 
        userFromDB.getFavorites().add(placeFromDB);
        userRepository.save(userFromDB);
        return placeRepository.save(placeFromDB);
    }

    @Override
    public Place removeFromFavorite(long userId, long placeId) {
        Place placeFromDB = placeRepository.findOne(placeId);
        User userFromDB = userRepository.findOne(userId);
        placeFromDB.getFavorites().remove(userFromDB);
        userFromDB.getFavorites().remove(placeFromDB);
        userRepository.save(userFromDB);
        return placeRepository.save(placeFromDB);
    }

    @Override
    public Place removeFromFavorite(User user, Place place) {
        Place placeFromDB = placeRepository.findOne(place.getId());
        User userFromDB = userRepository.findOne(user.getUserID());
        placeFromDB.getFavorites().remove(userFromDB);
        userFromDB.getFavorites().remove(placeFromDB);
        userRepository.save(userFromDB);
        return placeRepository.save(placeFromDB);
    }
}
