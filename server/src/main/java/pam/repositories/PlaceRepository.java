package pam.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pam.model.Place;
import pam.model.User;

@Repository
public interface PlaceRepository extends CrudRepository<Place,Long> {
    Iterable<Place> findAllByOwner(User owner);
}
