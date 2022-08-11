package pgfsd.testapp.Dto;


import lombok.*;
import pgfsd.testapp.entities.Test;

import javax.validation.constraints.NotNull;

@Data
public class PostTestReqDto {
    @NotNull
    private Test test;
}
