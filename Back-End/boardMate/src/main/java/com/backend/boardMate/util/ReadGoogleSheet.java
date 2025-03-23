//package com.backend.boardMate.util;
//
//import com.google.api.services.sheets.v4.Sheets;
//import com.google.api.services.sheets.v4.model.ValueRange;
//
//import java.io.IOException;
//import java.security.GeneralSecurityException;
//import java.util.List;
//
//public class ReadGoogleSheet {
//
//    public static void main(String[] args) throws IOException, GeneralSecurityException {
//        String spreadsheetId = "1R-rMeI1JfoY-P0QSVThC1xu1DOgK9QsUIsfzr9Hl7jk";
//        String range = "Sheet1!A1:D10"; // Adjust the range as needed
//
//        Sheets sheetsService = GoogleSheetsUtil.getSheetsService();
//        ValueRange response = sheetsService.spreadsheets().values()
//                .get(spreadsheetId, range)
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
