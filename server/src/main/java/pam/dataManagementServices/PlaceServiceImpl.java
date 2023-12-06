package pam.dataManagementServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Point;
import org.springframework.stereotype.Service;
import pam.model.CategoryEnum;
import pam.model.Place;
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
    public Place getPlace(long id) {
        return placeRepository.findOne(id);
    }

    @Override
    public Place createPlace(String name, String description, Point location, String category, User owner) {
        Place place = new Place(owner, name, description, location, CategoryEnum.valueOf(category));
        return placeRepository.save(place);
    }

    @Override
    public Place createPlace(Place place) {
        return placeRepository.save(place);
    }

    @Override
    public Place updatePlace(long placeID, long ownerID, String name, String description, Point location, String category) {
        Place placeFromDB = placeRepository.findOne(placeID);
        placeFromDB.setName(name);
        placeFromDB.setDescription(description);
        placeFromDB.setCoordinates(location);
        placeFromDB.setCategory(CategoryEnum.valueOf(category));
        return placeRepository.save(placeFromDB);
    }

    @Override
    public Place updatePlace(Place place) {
        return placeRepository.save(place);
    }

    @Override
    public void deletePlace(long id) {
        placeRepository.delete(id);
    }

    @Override
    public Place addToFavorite(long userId, long placeId) {
        Place placeFromDB = placeRepository.findOne(placeId);
        boolean added = placeFromDB.getFavorites().add(
                userRepository.findOne(userId)
        );
        return added ? placeRepository.save(placeFromDB) : null;
    }

    @Override
    public Place addToFavorite(User user, Place place) {
        boolean added = place.getFavorites().add(user);
        return added ? placeRepository.save(place) : null;
    }

    @Override
    public Place removeFromFavorite(long userId, long placeId) {
        Place placeFromDB = placeRepository.findOne(placeId);
        boolean removed = placeFromDB.getFavorites().remove(
                userRepository.findOne(userId)
        );
        return removed ? placeRepository.save(placeFromDB) : null;
    }

    @Override
    public Place removeFromFavorite(User user, Place place) {
        boolean removed = place.getFavorites().remove(user);
        return removed ? placeRepository.save(place) : null;
    }
}
