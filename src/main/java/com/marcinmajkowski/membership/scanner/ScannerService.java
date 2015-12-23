package com.marcinmajkowski.membership.scanner;

import com.google.common.base.Joiner;
import com.marcinmajkowski.membership.checkin.CheckInRepository;
import com.marcinmajkowski.membership.enumeration.CodeSource;
import jssc.*;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

/**
 * Created by Marcin on 10/12/2015.
 */
@Service
public class ScannerService {

    private static final Log logger = LogFactory.getLog(ScannerService.class);

    private SimpMessagingTemplate template;

    private CheckInRepository checkInRepository;

    private static SerialPort serialPort;

    private static SerialNativeInterface serialNativeInterface = new SerialNativeInterface();

    @Value("${scanner.defaultPortName}")
    private String portName;

    @Autowired
    public ScannerService(SimpMessagingTemplate template, CheckInRepository checkInRepository) {
        this.template = template;
        this.checkInRepository = checkInRepository;
    }

    @Scheduled(fixedRate = 10000)
    public void checkConnectionStatus() {
        logger.debug("Checking serial port connection status");
        //TODO check if listener is still up

        if (serialPort == null || !serialPort.isOpened()) {
            logger.debug("Barcode scanner is not connected");
            String[] ports = serialNativeInterface.getSerialPortNames();
            logger.debug("COM ports available: " + Joiner.on(", ").join(ports));

            //TODO reconnection based on runtime application settings or looking for barcode scanner on every port (how?)
            for (String port : ports) {
                if (portName.equals(port)) {
                    initializeSerialPort();
                    break;
                }
            }
        }
    }

    @PostConstruct
    public void initializeSerialPort() {
        logger.info("Connecting port " + portName);

        serialPort = new SerialPort(portName);
        try {
            serialPort.openPort(); //TODO handle type_port_busy and type_port_not_found exceptions
            serialPort.setParams( //TODO get these values from application settings menu
                    SerialPort.BAUDRATE_9600,
                    SerialPort.DATABITS_8,
                    SerialPort.STOPBITS_1,
                    SerialPort.PARITY_NONE
            );
            int mask = SerialPort.MASK_RXCHAR + SerialPort.MASK_DSR;
            serialPort.setEventsMask(mask);
            serialPort.addEventListener(new SerialPortReader());
        } catch (SerialPortException e) {
            e.printStackTrace(); //FIXME remove print stack trace if it works
        }
    }

    @PreDestroy
    public void closeSerialPort() {
        logger.info("Closing serial port");
        if (serialPort != null && serialPort.isOpened()) {
            try {
                serialPort.purgePort(SerialPort.PURGE_TXABORT);
                serialPort.purgePort(SerialPort.PURGE_RXABORT);
                serialPort.closePort();
            } catch (SerialPortException e) {
                e.printStackTrace();
            }
        }
    }

    class SerialPortReader implements SerialPortEventListener {

        private StringBuilder receivedCharacters = new StringBuilder();

        @Override
        public void serialEvent(SerialPortEvent serialPortEvent) {
            logger.debug("COM port event occured");

            if (serialPortEvent.isRXCHAR()) { // If data is available
                logger.info(serialPortEvent.getEventValue() + " bytes available");
                try {
                    byte[] bytes = serialPort.readBytes(serialPortEvent.getEventValue());
                    logger.info("Received: '" + new String(bytes) + "'");
                    receivedCharacters.append(new String(bytes));
                    int lineTerminatorIndex = receivedCharacters.indexOf("\r\n");
                    if (lineTerminatorIndex != -1) {
                        String code = receivedCharacters.substring(0, lineTerminatorIndex);
                        logger.info("Sending: " + code);
                        template.convertAndSend("/scanner/check-in", code);
//                        checkInRepository.checkIn(code, CodeSource.SCANNER); //FIXME exception here causes Listener death
                        receivedCharacters = new StringBuilder(); //FIXME put the rest of the buffer into builder
                    }
                } catch (SerialPortException e) {
                    e.printStackTrace();
                }
            } else if (serialPortEvent.isDSR()) {
                //TODO handle this event
                if (serialPortEvent.getEventValue() == 1) {
                    logger.info("DSR - ON");
                } else {
                    logger.info("DSR - OFF");
                }
            }
        }
    }
}
