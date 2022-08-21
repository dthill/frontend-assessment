package pgfsd.testapp.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pgfsd.testapp.Dto.PostTestReqDto;
import pgfsd.testapp.entities.Test;
import pgfsd.testapp.services.TestService;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    private TestService testService;

    @PostMapping()
    Long postTest(@Validated @RequestBody PostTestReqDto testReqDto) {
        return this.testService.addTest(testReqDto.getTest());
    }

    @GetMapping()
    Test getRandomTest() {
        return this.testService.getRandomTest();
    }

    @GetMapping("/{id}")
    Test getTestById(@PathVariable Long id) {
        return this.testService.getTestById(id);
    }
}
