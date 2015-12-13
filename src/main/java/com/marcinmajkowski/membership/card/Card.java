package com.marcinmajkowski.membership.card;

import com.marcinmajkowski.membership.person.Person;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by Marcin on 08/12/2015.
 */
@Entity
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(unique = true)
    private String code;

    private Date issueTimestamp;

    @ManyToOne
    private Person owner;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Date getIssueTimestamp() {
        return issueTimestamp;
    }

    public void setIssueTimestamp(Date issueTimestamp) {
        this.issueTimestamp = issueTimestamp;
    }

    public Person getOwner() {
        return owner;
    }

    public void setOwner(Person owner) {
        this.owner = owner;
    }
}
