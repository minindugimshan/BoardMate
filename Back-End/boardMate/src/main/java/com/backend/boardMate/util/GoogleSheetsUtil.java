//package com.backend.boardMate.util;
//
//import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
//import com.google.api.client.json.jackson2.JacksonFactory;
//import com.google.api.services.sheets.v4.Sheets;
//import com.google.api.services.sheets.v4.SheetsScopes;
//import com.google.auth.http.HttpCredentialsAdapter;
//import com.google.auth.oauth2.GoogleCredentials;
//
//import java.io.FileInputStream;
//import java.io.IOException;
//import java.security.GeneralSecurityException;
//import java.util.Collections;
//
//public class GoogleSheetsUtil {
//
//    private static final String APPLICATION_NAME = "Boardmate";
//    private static final String CREDENTIALS_FILE_PATH = "src/main/resources/boardmate-454207-49e588f81b76";
//
//    public static Sheets getSheetsService() throws IOException, GeneralSecurityException {
//        // Load credentials from the service account key file
//        GoogleCredentials credentials = GoogleCredentials.fromStream(new FileInputStream(CREDENTIALS_FILE_PATH))
//                .createScoped(Collections.singleton(SheetsScopes.SPREADSHEETS));
//
//        // Create the Sheets API client
//        return new Sheets.Builder(
//                GoogleNetHttpTransport.newTrustedTransport(),
//                JacksonFactory.getDefaultInstance(),
//                new HttpCredentialsAdapter(credentials))
//                .setApplicationName(APPLICATION_NAME)
//                .build();
//    }
//}