package pam.dataManagementServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pam.model.ExampleEntity;
import pam.repositories.ExampleRepository;

@Service
public class ExampleServiceImpl implements ExampleService{
    @Autowired
    private ExampleRepository exampleRepository;

    @Override
    public ExampleEntity getExampleEntity(long id_exampleEntity) {
        return exampleRepository.findOne(id_exampleEntity);
    }

    @Override
    public Iterable<ExampleEntity> getAllExampleEntities() {
        return exampleRepository.findAll();
    }

    @Override
    public ExampleEntity addExampleEntity(String name, String description) {
        return exampleRepository.save(new ExampleEntity(name, description));
    }

    @Override
    public ExampleEntity addExampleEntity(ExampleEntity exampleEntity) {
        return exampleRepository.save(exampleEntity);
    }
}
