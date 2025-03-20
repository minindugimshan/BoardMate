//package com.backend.boardMate.util;
//
//import com.google.api.services.sheets.v4.Sheets;
//import com.google.api.services.sheets.v4.model.ValueRange;
//
//import java.io.IOException;
//import java.security.GeneralSecurityException;
//import java.util.Arrays;
//import java.util.List;
//
//public class WriteGoogleSheet {
//
//    public static void main(String[] args) throws IOException, GeneralSecurityException {
//        String spreadsheetId = "1R-rMeI1JfoY-P0QSVThC1xu1DOgK9QsUIsfzr9Hl7jk";
//        String range = "Sheet1!A1:D1"; // Adjust the range as needed
//
//        Sheets sheetsService = GoogleSheetsUtil.getSheetsService();
//
//        List<Object> rowData = Arrays.asList("New Title", "New Location", 250000.0, "Apartment");
//        ValueRange body = new ValueRange()
//                .setValues(Arrays.asList(rowData));
//
//        sheetsService.spreadsheets().values()
//                .update(spreadsheetId, range, body)
//                .setValueInputOption("RAW")
//                .execute();
//
//        System.out.println("Data written to Google Sheet.");
//    }
//}
