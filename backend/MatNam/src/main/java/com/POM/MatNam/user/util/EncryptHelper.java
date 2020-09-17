package com.POM.MatNam.user.util;

public interface EncryptHelper {
    String encrypt(String password);
    
    boolean isMatch(String password, String hashed);
}
