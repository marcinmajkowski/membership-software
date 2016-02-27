package com.marcinmajkowski.membership.customer;

import com.marcinmajkowski.membership.card.Card;
import com.marcinmajkowski.membership.checkin.CheckIn;
import com.marcinmajkowski.membership.group.TrainingGroup;
import com.marcinmajkowski.membership.payment.Payment;
import com.marcinmajkowski.membership.user.User;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

/**
 * Created by Marcin on 08/12/2015.
 */
@Entity
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column
    @Temporal(TemporalType.DATE)
    private Date birthday;

    @Column
    private String email;

    @Column
    private String phone;

    @ManyToMany
    private Set<TrainingGroup> trainingGroups;

    @Column
    private String note;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "owner")
    private Set<Card> cards;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "payer")
    private Set<Payment> payments;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "customer")
    private Set<CheckIn> checkIns;

    @ManyToOne(optional = false)
    private User staffMember;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Set<TrainingGroup> getTrainingGroups() {
        return trainingGroups;
    }

    public void setTrainingGroups(Set<TrainingGroup> trainingGroups) {
        this.trainingGroups = trainingGroups;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Set<Card> getCards() {
        return cards;
    }

    public void setCards(Set<Card> cards) {
        this.cards = cards;
    }

    public Set<Payment> getPayments() {
        return payments;
    }

    public void setPayments(Set<Payment> payments) {
        this.payments = payments;
    }

    public Set<CheckIn> getCheckIns() {
        return checkIns;
    }

    public void setCheckIns(Set<CheckIn> checkIns) {
        this.checkIns = checkIns;
    }

    public User getStaffMember() {
        return staffMember;
    }

    public void setStaffMember(User staffMember) {
        this.staffMember = staffMember;
    }
}
