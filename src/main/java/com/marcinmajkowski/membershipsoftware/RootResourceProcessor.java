package com.marcinmajkowski.membershipsoftware;

import com.marcinmajkowski.membershipsoftware.codeInput.CodeInputController;
import org.springframework.data.rest.webmvc.RepositoryLinksResource;
import org.springframework.hateoas.ResourceProcessor;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
import org.springframework.stereotype.Component;

@Component
public class RootResourceProcessor implements ResourceProcessor<RepositoryLinksResource> {

    @Override
    public RepositoryLinksResource process(RepositoryLinksResource repositoryLinksResource) {
        repositoryLinksResource.add(ControllerLinkBuilder.linkTo(CodeInputController.class).withRel("codeInputs"));

        return repositoryLinksResource;
    }
}
