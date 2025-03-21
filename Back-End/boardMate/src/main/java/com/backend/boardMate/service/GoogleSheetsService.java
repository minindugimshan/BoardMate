////package com.backend.boardMate.service;
////
////import com.backend.boardMate.util.GoogleSheetsUtil;
////import com.google.api.services.sheets.v4.Sheets;
////import com.google.api.services.sheets.v4.model.ValueRange;
////import org.springframework.stereotype.Service;
////
////import java.io.IOException;
////import java.security.GeneralSecurityException;
////import java.util.Arrays;
////import java.util.List;
//
////@Service
////public class GoogleSheetsService {
////
////    private final Sheets sheetsService;
////    private final String spreadsheetId = "YOUR_SPREADSHEET_ID";
////    private final String range = "Sheet1!A2:E"; // Adjust the range as needed
//
////    public GoogleSheetsService(Sheets sheetsService) {
////        this.sheetsService = sheetsService;
////    }
////
////    public List<List<Object>> readData() throws IOException {
////        ValueRange response = sheetsService.spreadsheets().values()
////                .get(spreadsheetId, range)
////                .execute();
////        return response.getValues();
////    }
////
////    public void writeData(List<List<Object>> data) throws IOException {
////        ValueRange body = new ValueRange().setValues(data);
////        sheetsService.spreadsheets().values()
////                .update(spreadsheetId, range, body)
////                .setValueInputOption("RAW")
////                .execute();
////    }
////}
//
////    @Service
////    public class GoogleSheetsService {
////
////        public List<List<Object>> readData(String spreadsheetId, String range) throws IOException, GeneralSecurityException {
////            Sheets sheetsService = GoogleSheetsUtil.getSheetsService();
////            ValueRange response = sheetsService.spreadsheets().values()
////                    .get(spreadsheetId, range)
////                    .execute();
////            return response.getValues();
////        }
////
////        public void writeData(String spreadsheetId, String range, List<Object> rowData) throws IOException, GeneralSecurityException {
////            Sheets sheetsService = GoogleSheetsUtil.getSheetsService();
////            ValueRange body = new ValueRange()
////                    .setValues(Arrays.asList(rowData));
////            sheetsService.spreadsheets().values()
////                    .update(spreadsheetId, range, body)
////                    .setValueInputOption("RAW")
////                    .execute();
////        }
////    }
//
//package com.backend.boardMate.service;
//
//import com.backend.boardMate.util.GoogleSheetsUtil;
//import com.google.api.services.sheets.v4.Sheets;
//import com.google.api.services.sheets.v4.model.ValueRange;
//import org.springframework.stereotype.Service;
//
//import java.io.IOException;
//import java.security.GeneralSecurityException;
//import java.util.List;
//
//@Service
//public class GoogleSheetsService {
//
//    private static final String SPREADSHEET_ID = "1R-rMeI1JfoY-P0QSVThC1xu1DOgK9QsUIsfzr9Hl7jk";
//    private static final String RANGE = "Sheet1!A1:G100"; // Adjust the range as needed
//
//    private final Sheets sheetsService;
//
//    public GoogleSheetsService() throws IOException, GeneralSecurityException {
//        this.sheetsService = GoogleSheetsUtil.getSheetsService();
//    }
//
//    public List<List<Object>> readData() throws IOException {
//        ValueRange response = sheetsService.spreadsheets().values()
//                .get(SPREADSHEET_ID, RANGE)
//                .execute();
//        return response.getValues();
//    }
//
//    public void writeData(List<List<Object>> data) throws IOException {
//        ValueRange body = new ValueRange().setValues(data);
//        sheetsService.spreadsheets().values()
//                .update(SPREADSHEET_ID, RANGE, body)
//                .setValueInputOption("RAW")
//                .execute();
//    }
//}