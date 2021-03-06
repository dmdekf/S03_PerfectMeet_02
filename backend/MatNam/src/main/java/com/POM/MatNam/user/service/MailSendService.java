package com.POM.MatNam.user.service;

import java.util.Properties;
import java.util.Random;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class MailSendService {
	@Value("${sendmail.email}")
    private String MyEmail;

    @Value("${sendmail.password}")
    private String MyPassword;
    
    private boolean lowerCheck;
    private int size;

    public String init() {
        Random ran = new Random();
        StringBuffer sb = new StringBuffer();
        int num = 0;

        do {
            num = ran.nextInt(75) + 48;
            if ((num >= 48 && num <= 57) || (num >= 65 && num <= 90) || (num >= 97 && num <= 122)) {
                sb.append((char) num);
            } else {
                continue;
            }

        } while (sb.length() < size);
        if (lowerCheck) {
            return sb.toString().toLowerCase();
        }
        return sb.toString();
    }

    public String getKey(boolean lowerCheck, int size) {
        this.lowerCheck = lowerCheck;
        this.size = size;
        return init();
    }
    
    private Session getSetting() {
        Properties props = System.getProperties();
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", 587);
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");

        Session session = Session.getInstance(props, new Authenticator() {
            protected javax.mail.PasswordAuthentication getPasswordAuthentication() {
                return new javax.mail.PasswordAuthentication(MyEmail, MyPassword);
            }
        });
        return session;
    }
    
    public void mailSendWithUserKey(String email, String nickname, String key, long id)
            throws AddressException, MessagingException {
        Session session = getSetting();
        String setfrom = MyEmail;
        String htmlStr = "<h2>??????????????? ????????? ?????? ?????????!</h2><br><br>" + "<h3>" + nickname + "???</h3>"
                + "<p>???????????? ????????? ???????????? ????????? ???????????? ???????????? ????????? ????????? : " + "<a href='http://j3a507.p.ssafy.io:8399/user/auth?id=" + id
                + "&key=" + key + "'>????????????</a></p>" + "(?????? ?????? ????????? ??????????????? ??? ???????????? ??????????????? ?????????)";

        MimeMessage message = new MimeMessage(session);

        message.setFrom(new InternetAddress(setfrom));
        message.setRecipient(Message.RecipientType.TO, new InternetAddress(email));
        message.setSubject("????????? ?????? ?????? ???????????????.");
        message.setText(htmlStr, "utf-8", "html");

        Transport.send(message);
    }
    
    public void mailSendWithPassword(String email, String nickname, String password)
            throws AddressException, MessagingException {
        Session session = getSetting();
        String setfrom = MyEmail;
        String htmlStr = "<h2>??????????????? EZI LOG ?????????!</h2><br><br>" + "<h3>" + nickname + "???</h3>" + "?????? ???????????? ??????????????? "
                + password + "?????????.";

        MimeMessage message = new MimeMessage(session);

        message.setFrom(new InternetAddress(setfrom));
        message.setRecipient(Message.RecipientType.TO, new InternetAddress(email));
        message.setSubject("EZI LOG ?????? ?????? ?????? ???????????????.");
        message.setText(htmlStr, "utf-8", "html");

        Transport.send(message);
    }
}
