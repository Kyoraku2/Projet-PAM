package pam.dataManagementServices;

import pam.model.ExampleEntity;

public interface ExampleService {
    ExampleEntity getExampleEntity(long id_exampleEntity);
    Iterable<ExampleEntity> getAllExampleEntities();
    ExampleEntity addExampleEntity(String name, String description);
    ExampleEntity addExampleEntity(ExampleEntity exampleEntity);
}
