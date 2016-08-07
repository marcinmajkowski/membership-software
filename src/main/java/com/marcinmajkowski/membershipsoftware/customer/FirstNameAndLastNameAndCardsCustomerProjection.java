package com.marcinmajkowski.membershipsoftware.customer;

import com.marcinmajkowski.membershipsoftware.card.Card;
import org.springframework.data.rest.core.config.Projection;

import java.util.Collection;

/*
 * Projection used to produce collection of all customers first name, last name and numbers of all their cards.
 * Angular client use this to build sidebar list of all customers. List can be filtered then using card number.
 */
@Projection(name = "firstNameAndLastNameAndCards", types = Customer.class)
interface FirstNameAndLastNameAndCardsCustomerProjection {

    String getFirstName();

    String getLastName();

    Collection<Card> getCards();
}
