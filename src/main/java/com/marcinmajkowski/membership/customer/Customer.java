package com.marcinmajkowski.membership.customer;

import com.marcinmajkowski.membership.card.Card;
import com.marcinmajkowski.membership.group.TrainingGroup;
import com.marcinmajkowski.membership.user.User;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;

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
    private Collection<TrainingGroup> trainingGroups;

    @Column
    private String note;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "owner")
    private Collection<Card> cards;

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

    public Collection<TrainingGroup> getTrainingGroups() {
        return trainingGroups;
    }

    public void setTrainingGroups(Collection<TrainingGroup> trainingGroups) {
        this.trainingGroups = trainingGroups;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Collection<Card> getCards() {
        return cards;
    }

    public void setCards(Collection<Card> cards) {
        this.cards = cards;
    }

    public User getStaffMember() {
        return staffMember;
    }

    public void setStaffMember(User staffMember) {
        this.staffMember = staffMember;
    }
}
