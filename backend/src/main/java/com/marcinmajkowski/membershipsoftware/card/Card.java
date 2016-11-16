package com.marcinmajkowski.membershipsoftware.card;

import com.marcinmajkowski.membershipsoftware.customer.Customer;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(unique = true, nullable = false)
    private String code;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date issueTimestamp;

    @ManyToOne(optional = false)
    private Customer owner;

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

    public Customer getOwner() {
        return owner;
    }

    public void setOwner(Customer owner) {
        this.owner = owner;
    }
}
