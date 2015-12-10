package com.marcinmajkowski.membership.scanner;

import jssc.SerialPort;
import jssc.SerialPortException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 * Created by Marcin on 10/12/2015.
 */
@Service
public class ScannerService {

    private SimpMessagingTemplate template;

    @Autowired
    public ScannerService(SimpMessagingTemplate template) {
        this.template = template;
    }

    //FIXME naive implementation
    @Async
    public void scanning() {
        SerialPort serialPort = new SerialPort("COM6");
        try {
            serialPort.openPort();
            serialPort.setParams(
                    SerialPort.BAUDRATE_9600,
                    SerialPort.DATABITS_8,
                    SerialPort.STOPBITS_1,
                    SerialPort.PARITY_NONE
            );
            StringBuilder sb = new StringBuilder();
            while (true) {
                byte[] buffer = serialPort.readBytes(1);
                String chunk = new String(buffer);
                if ("\n".equals(chunk)) {
                    String payload = "{\"number\": \"" + sb.toString() + "\"}";
                    System.out.println(payload);
                    this.template.convertAndSend("/scanner/check-in", payload);
                    sb = new StringBuilder();
                } else if ("\r".equals(chunk)) {
                    //
                } else {
                    sb.append(chunk);
                }
            }
        } catch (SerialPortException e) {
            e.printStackTrace();
        } finally {
            if (serialPort != null) {
                try {
                    serialPort.closePort();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
