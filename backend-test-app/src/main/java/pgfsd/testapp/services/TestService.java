package pgfsd.testapp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pgfsd.testapp.entities.Test;
import pgfsd.testapp.repositories.TestRepository;

import java.util.Optional;

@Service
public class TestService {

    @Autowired
    private TestRepository testRepository;


    @Transactional
    public Long addTest(Test test) {
        Test savedTest = testRepository.save(test);
        if (savedTest == null) {
            throw new IllegalStateException("Test not saved");
        }
        return savedTest.getId();
    }

    @Transactional
    public Test getRandomTest() {
        int randomIndex = (int) Math.floor(testRepository.count() * Math.random());
        Test test = testRepository
                .findRandomTest(PageRequest.of(randomIndex, 1))
                .getContent()
                .get(0);
        if (test == null) {
            throw new IllegalStateException("Random test could not be found");
        }
        return test;
    }

    @Transactional
    public Test getTestById(Long id) {
        Optional<Test> test = this.testRepository.findById(id);
        if (test.isEmpty()) {
            throw new IllegalStateException("Test with given id could not be found");
        }
        return test.get();
    }
}
