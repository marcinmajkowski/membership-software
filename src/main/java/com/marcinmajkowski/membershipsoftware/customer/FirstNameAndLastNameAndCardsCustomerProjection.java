package com.marcinmajkowski.membershipsoftware.customer;

import com.marcinmajkowski.membershipsoftware.card.Card;
import org.springframework.data.rest.core.config.Projection;

import java.util.Collection;

/**
 * Created by Marcin on 10/01/2016.
 */
@Projection(name = "firstNameAndLastNameAndCards", types = Customer.class)
interface FirstNameAndLastNameAndCardsCustomerProjection {

    String getFirstName();

    String getLastName();

    Collection<Card> getCards();
}
