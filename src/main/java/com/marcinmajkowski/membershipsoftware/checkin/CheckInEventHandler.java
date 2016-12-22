package com.marcinmajkowski.membershipsoftware.checkin;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@RepositoryEventHandler(CheckIn.class)
public class CheckInEventHandler {

    private final static Log logger = LogFactory.getLog(CheckInEventHandler.class);

    @HandleBeforeCreate
    public void handleCheckInBeforeCreate(CheckIn checkIn) {
        //TODO probably should inform client if he tried to set timestamp and we are going to overwrite it
        //TODO auditing
        checkIn.setTimestamp(new Date());
    }
}
