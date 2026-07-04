package com.immohorizon.propertymanagement.dto;

import lombok.Data;

@Data
public class MessageDto {
    private int id;
    private String message;
    private String status;
    private Object data;

}
