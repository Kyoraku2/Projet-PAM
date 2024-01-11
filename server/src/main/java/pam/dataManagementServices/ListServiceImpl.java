package pam.dataManagementServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pam.model.List;
import pam.model.ListRequestBody;
import pam.model.Place;
import pam.model.User;
import pam.repositories.ListRepository;
import pam.repositories.PlaceRepository;

@Service
public class ListServiceImpl implements ListService{
    @Autowired
    private ListRepository listRepository;

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private UserService userService;

    @Override
    public Iterable<List> getAllLists() {
        return listRepository.findAll();
    }

    @Override
    public Iterable<List> getListsByOwner(User owner) {
        return listRepository.findByOwner(owner);
    }

    @Override
    public Iterable<List> getListsByOwnerID(long ownerID) {
        return listRepository.findByOwner(userService.getUser(ownerID));
    }

    @Override
    public List getList(long listID) {
        return listRepository.findOne(listID);
    }

    @Override
    public List getList(List list) {
        return listRepository.findOne(list.getId());
    }

    @Override
    public List createList(User owner, String name, String description, boolean isShared) {
        List list = new List(owner, name, description, null, isShared);
        return listRepository.save(list);
    }

    @Override
    public List createList(List list) {
        return listRepository.save(list);
    }
    @Override
    public List createList(ListRequestBody listRequestBody) {
        List list = new List(
                userService.getUser(listRequestBody.getOwnerID()),
                listRequestBody.getName(),
                listRequestBody.getDescription(),
                listRequestBody.isShared()
        );
        return listRepository.save(list);
    }

    @Override
    public List updateList(List list) {
        List listFromDB = listRepository.findOne(list.getId());
        listFromDB.setName(list.getName());
        listFromDB.setDescription(list.getDescription());
        listFromDB.setShared(list.isShared());
        return listRepository.save(listFromDB);
    }

    @Override
    public List updateList(long listID, String name, String description, boolean isShared) {
        List listFromDB = listRepository.findOne(listID);
        listFromDB.setName(name);
        listFromDB.setDescription(description);
        listFromDB.setShared(isShared);
        return listRepository.save(listFromDB);
    }

    @Override
    public List updateList(long listID, ListRequestBody listRequestBody) {
        List listFromDB = listRepository.findOne(listID);
        listFromDB.setName(listRequestBody.getName());
        listFromDB.setDescription(listRequestBody.getDescription());
        listFromDB.setShared(listRequestBody.isShared());
        return listRepository.save(listFromDB);
    }

    @Override
    public void deleteList(List list) {
        listRepository.delete(list.getId());
    }

    @Override
    public void deleteList(long listID) {
        listRepository.delete(listID);
    }

    @Override
    public List removePlace(List list, Place place) {
        List listFromBD = listRepository.findOne(list.getId());
        Place placeFromBD = placeRepository.findOne(place.getId());
        listFromBD.getPlaces().remove(place);
        placeFromBD.getLists().remove(list);
        placeRepository.save(placeFromBD);
        return listRepository.save(listFromBD);
    }

    @Override
    public List removePlace(long listID, long placeID) {
        List list = listRepository.findOne(listID);
        Place place = placeRepository.findOne(placeID);
        list.getPlaces().remove(place);
        place.getLists().remove(list);
        placeRepository.save(place);
        return listRepository.save(list);
    }

    @Override
    public List addPlace(List list, Place place) {
        List listFromBD = listRepository.findOne(list.getId());
        Place placeFromBD = placeRepository.findOne(place.getId());
        listFromBD.getPlaces().add(place);
        placeFromBD.getLists().add(list);
        placeRepository.save(placeFromBD);
        return listRepository.save(listFromBD);
    }

    @Override
    public List addPlace(long listID, long placeID) {
        List list = listRepository.findOne(listID);
        Place place = placeRepository.findOne(placeID);
        list.getPlaces().add(place);
        place.getLists().add(list);
        placeRepository.save(place);
        return listRepository.save(list);
    }

    @Override
    public List shareList(List list, User user) {
        User userFromDB = userService.getUser(user.getUserID());
        List listFromDB = listRepository.findOne(list.getId());
        listFromDB.getContributors().add(userFromDB);
        listFromDB.setShared(true);
        userFromDB.getContributedLists().add(listFromDB);
        userService.updateUser(userFromDB);
        return listRepository.save(listFromDB);
    }

    @Override
    public List shareList(long listID, long userID) {
        User user = userService.getUser(userID);
        List list = listRepository.findOne(listID);
        list.getContributors().add(user);
        list.setShared(true);
        user.getContributedLists().add(list);
        userService.updateUser(user);
        return listRepository.save(list);
    }

    @Override
    public Iterable<List> getListsByContributor(User contributor) {
        return listRepository.findByContributors(contributor);
    }

    @Override
    public Iterable<List> getListsByOwnerAndByShared(User owner, boolean shared) {
        return listRepository.findByOwnerAndIsShared(owner, shared);
    }
}
