package pgfsd.testapp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pgfsd.testapp.entities.Test;
import pgfsd.testapp.repositories.TestRepository;

@Service
public class TestService {

    @Autowired
    private TestRepository testRepository;


    public boolean addTest(Test test){
        return testRepository.save(test) != null;
    }
}
