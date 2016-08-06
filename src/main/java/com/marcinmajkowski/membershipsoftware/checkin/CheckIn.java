package com.marcinmajkowski.membershipsoftware.checkin;

import com.marcinmajkowski.membershipsoftware.card.Card;
import com.marcinmajkowski.membershipsoftware.customer.Customer;
import com.marcinmajkowski.membershipsoftware.enumeration.Channel;
import com.marcinmajkowski.membershipsoftware.enumeration.CodeSource;
import com.marcinmajkowski.membershipsoftware.group.TrainingGroup;
import com.marcinmajkowski.membershipsoftware.payment.Payment;
import com.marcinmajkowski.membershipsoftware.user.User;

import javax.persistence.*;
import java.util.Date;

@Entity
public class CheckIn {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp;

    @ManyToOne(optional = true)
    private Card card;

    @ManyToOne(optional = false)
    private Customer customer;

    @Enumerated(EnumType.STRING)
    private CodeSource codeSource;

    @Enumerated(EnumType.STRING)
    private Channel channel;

    @ManyToOne(optional = false)
    private User staffMember;

    @ManyToOne(optional = false)
    private TrainingGroup trainingGroup;

    @ManyToOne(optional = false)
    private Payment payment;

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

    public CodeSource getCodeSource() {
        return codeSource;
    }

    public void setCodeSource(CodeSource codeSource) {
        this.codeSource = codeSource;
    }

    public Channel getChannel() {
        return channel;
    }

    public void setChannel(Channel channel) {
        this.channel = channel;
    }

    public User getStaffMember() {
        return staffMember;
    }

    public void setStaffMember(User staffMember) {
        this.staffMember = staffMember;
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
}
