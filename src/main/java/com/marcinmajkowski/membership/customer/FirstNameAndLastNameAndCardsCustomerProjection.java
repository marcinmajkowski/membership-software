package com.marcinmajkowski.membership.customer;

import com.marcinmajkowski.membership.card.Card;
import org.springframework.data.rest.core.config.Projection;

import java.util.Collection;

@Projection(name = "firstNameAndLastNameAndCards", types = Customer.class)
interface FirstNameAndLastNameAndCardsCustomerProjection {

    String getFirstName();

    String getLastName();

    Collection<Card> getCards();
}
