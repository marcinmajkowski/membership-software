package com.marcinmajkowski.membershipsoftware.checkin;

import com.marcinmajkowski.membershipsoftware.card.Card;
import com.marcinmajkowski.membershipsoftware.customer.Customer;
import com.marcinmajkowski.membershipsoftware.group.TrainingGroup;
import com.marcinmajkowski.membershipsoftware.payment.Payment;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
public class CheckIn {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp;

    @ManyToOne
    private Card card;

    @ManyToOne(optional = false)
    private Customer customer;

    @ManyToOne
    private TrainingGroup trainingGroup;

    @ManyToOne
    private Payment payment;

    protected CheckIn() {
    }

    public Long getId() {
        return id;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public Card getCard() {
        return card;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public void setCard(Card card) {
        this.card = card;
    }

    public TrainingGroup getTrainingGroup() {
        return trainingGroup;
    }

    public void setTrainingGroup(TrainingGroup trainingGroup) {
        this.trainingGroup = trainingGroup;
    }

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    /**
     * Returns true if there is payment for this checkIn.
     *
     * I tried using @Formula("payment_id is not null") on private boolean paid field but false was returned when
     * new checkIn with payment had been created. It seemed like it does not work well on insert.
     */
    public boolean isPaid() {
        return payment != null;
    }
}
