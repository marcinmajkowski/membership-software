package com.marcinmajkowski.membershipsoftware.group;

import javax.persistence.*;

@Entity
public class TrainingGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false)
    private String name;

    protected TrainingGroup() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
