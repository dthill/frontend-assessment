package pgfsd.testapp.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pgfsd.testapp.Dto.PostTestReqDto;
import pgfsd.testapp.services.TestService;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    private TestService testService;

    @PostMapping()
    void postTest(@Validated @RequestBody PostTestReqDto testReqDto){
        System.out.println(testReqDto);
        this.testService.addTest(testReqDto.getTest());
    }
}
