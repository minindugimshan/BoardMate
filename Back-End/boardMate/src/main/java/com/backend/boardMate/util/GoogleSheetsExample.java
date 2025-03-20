//package com.backend.boardMate.util;
//
//import com.google.api.services.sheets.v4.Sheets;
//import com.google.api.services.sheets.v4.model.ValueRange;
//import com.google.api.services.sheets.v4.SheetsScopes;
//import com.google.auth.http.HttpCredentialsAdapter;
//import com.google.auth.oauth2.GoogleCredentials;
//import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
//import com.google.api.client.json.jackson2.JacksonFactory;
//
//import java.io.FileInputStream;
//import java.io.IOException;
//import java.security.GeneralSecurityException;
//import java.util.Collections;
//import java.util.List;
//
//public class GoogleSheetsExample {
//
//    private static final String SPREADSHEET_ID = "1R-rMeI1JfoY-P0QSVThC1xu1DOgK9QsUIsfzr9Hl7jk";
//    private static final String RANGE = "Sheet1!A1:D10"; // Adjust the range as needed
//
//    public static void main(String[] args) throws IOException, GeneralSecurityException {
//        // Load credentials from the service account key file
//        GoogleCredentials credentials = GoogleCredentials.fromStream(new FileInputStream("path/to/your/service-account-key.json"))
//                .createScoped(Collections.singleton(SheetsScopes.SPREADSHEETS));
//
//        // Create the Sheets API client
//        Sheets sheetsService = new Sheets.Builder(
//                GoogleNetHttpTransport.newTrustedTransport(),
//                JacksonFactory.getDefaultInstance(),
//                new HttpCredentialsAdapter(credentials))
//                .setApplicationName("Google Sheets Example")
//                .build();
//
//        // Read data from Google Sheets
//        ValueRange response = sheetsService.spreadsheets().values()
//                .get(SPREADSHEET_ID, RANGE)
//                .execute();
//
//        List<List<Object>> values = response.getValues();
//        if (values == null || values.isEmpty()) {
//            System.out.println("No data found.");
//        } else {
//            for (List<Object> row : values) {
//                System.out.println(row);
//            }
//        }
//    }
//}
