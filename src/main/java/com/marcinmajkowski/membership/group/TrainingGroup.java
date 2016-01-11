package com.marcinmajkowski.membership.group;

import javax.persistence.*;

/**
 * Created by Marcin on 10/01/2016.
 */
@Entity
public class TrainingGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false)
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
