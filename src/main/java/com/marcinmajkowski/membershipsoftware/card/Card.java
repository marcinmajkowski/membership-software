package com.marcinmajkowski.membershipsoftware.card;

import com.marcinmajkowski.membershipsoftware.customer.Customer;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(unique = true, length = 12)
    @Size(min = 12, max = 12)
    private String code;

    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    private Date issueTimestamp;

    @ManyToOne(optional = false)
    private Customer owner;

    protected Card() {
    }

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
