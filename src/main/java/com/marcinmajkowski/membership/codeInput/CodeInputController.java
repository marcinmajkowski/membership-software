package com.marcinmajkowski.membership.codeInput;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/codeInputs")
public class CodeInputController {

    private static final Log logger = LogFactory.getLog(CodeInputController.class);

    private SimpMessagingTemplate template;

    @Autowired
    public CodeInputController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @RequestMapping(method = RequestMethod.POST)
    public CodeInput create(@RequestBody CodeInput codeInput) {
        String code = codeInput.getCode();
        logger.info("Received code input: " + code);
        if (code.matches("^\\d{12}$")) {
            template.convertAndSend("/scanner/check-in", code);
        }

        return codeInput;
    }
}
