/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

import "../../../App.css";

import { PDFViewer } from "@react-pdf/renderer";
// import THBText from "thai-baht-text";

import moment from "moment";

import FontSarabun from "./font/Sarabun-Bold.ttf";
import FontSarabunLight from "./font/Sarabun-Light.ttf";
// import Prompt from "./font/Prompt-Regular.ttf";
// import Mitr from "./font/Mitr-Regular.ttf";
// import { useState, useEffect } from "react";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";

import PropTypes from "prop-types";

Font.register({
  family: "Sarabun",
  src: FontSarabun,
});
Font.register({
  family: "SarabunLight",
  src: FontSarabunLight,
});
// Font.register({
//   family: "Mitr",
//   src: Mitr,
// });

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
    margin: 1,
    fontFamily: "SarabunLight",
  },
  header1: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 20,
    marginTop: 100,
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  body: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  footer: {
    fontSize: 12,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 10,
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
    height: "20px",
  },
  flexrow: {
    display: "flex",
    flexDirection: "row",
    textAlign:'left'
    
  },
  flexcol: {
    display: "flex",
    flexDirection: "column",
    // alignSelf:"flex-start",
    // paddingLeft: '15'
  },
  flexrowbetween: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    wordBreak: "break-word",
  },
  flexrowaround: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "space-around",
    justifyContent: "space-evenly",
    wordBreak: "break-word",
  },
  flexrowcenter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
  },
  flexrowend: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    textAlign: "right",
  },
  flexrowstart: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    textAlign: "left",
  },
  text10: {
    fontSize: 10,
    fontFamily: "SarabunLight",
  },
  text10b: {
    fontSize: 10,
    fontFamily: "Sarabun",
  },
  text11: {
    fontSize: 11,
    fontFamily: "SarabunLight",
  },
  text11b: {
    fontSize: 11,
    fontFamily: "Sarabun",
  },
  text12: {
    fontSize: 12,
    fontFamily: "SarabunLight",
  },
  text12b: {
    fontSize: 12,
    fontFamily: "Sarabun",
  },
  text13b: {
    fontSize: 13,
    fontFamily: "Sarabun",
    marginBottom: "15",
  },
  text14b: {
    fontSize: 14,
    fontFamily: "Sarabun",
    marginBottom: "15",
  },
  gap100: {
    gap:'100',
  },
  imageContainer: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
    wordBreak: "break-word",
  },
  image: {
    width: 70,
    height: 70,
  },
  image1: {
    width: 90,
    height: 90,
  },
  mt5: {
    marginTop: 5,
    wordBreak: "break-word",
  },
  mt10: {
    marginTop: 10,
    wordBreak: "break-word",
  },
  space44: {
    marginRight: 62,
  },
  space100: {
    marginRight: 99,
  },
  space118: {
    marginRight: 118,
  },
  underlineText: {
    textDecoration: "underline",
    textDecorationStyle: "dot",
  },
  underlineCenter: {
    borderBottom: "1",
    marginBottom: "10",
  },
  underline1Center: {
    borderBottom: "1",
    paddingBottom: "15",
  },
  table: {
    display: "table",
    width: "100%",
    // alignItems: "flex-start",
    // borderStyle: "solid",
    // borderWidth: 1,
    // borderColor: "#000",
    marginBottom: 10,
  },
  colorHead: {
    backgroundColor: "#D9D9D9",
  },
  tableRow: {
    margin: "auto",
    display: "flex",
    flexDirection: "row",
    // alignItems: "flex-start",
  },
  tableCellHead1: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "15%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableCellHead2: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "15%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableCellHead3: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "15%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableCell1: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "15%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableCell2: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "15%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "auto",
  },
  tableCell3: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "15%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableCell4: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "right",
    width: "30%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
});

export const ReportPdf = ({
  openModalReceiptSubFull,
  handleModalReceiptSubFull,
  dataPdf,
}) => {
  console.log(dataPdf);

  const itemsPerPage = 1; // จำนวนรายการต่อหน้า

  // แบ่งรายการออกเป็นหน้าตามจำนวนที่กำหนด

  const generatePages = (data) => {
    const totalPages = Math.ceil(data?.length / itemsPerPage);
    const pages = [];

    for (let i = 0; i < totalPages; i++) {
      const start = i * itemsPerPage;
      const end = start + itemsPerPage;
      const slicedData = data.slice(start, end).map((item, index) => ({
        ...item,
        index: start + index + 1, // เพิ่ม property index เพื่อเก็บลำดับ
      }));
      pages.push(slicedData);
    }

    return pages;
  };

  const pages = generatePages(dataPdf);

  console.log(pages);

  return (
    <Dialog
      open={openModalReceiptSubFull}
      handler={handleModalReceiptSubFull}
      size="xl"
    >
      {/* <DialogHeader></DialogHeader> */}
      <DialogBody>
        {/* <Page size={[842, 595]} style={styles.page}> */}
        {/*  9 x 11 นิ้ว (792 คือ 9 นิ้ว x 72 คือ DPI, 936 คือ 11 นิ้ว x 72 คือ DPI) */}
        <PDFViewer width="100%" height="600px">
          <Document>
            {pages?.map((pageData, index) => (
              <Page key={index} size="A4" style={styles.page}>
                <View
                  style={[
                    styles.flexrowcenter,
                    styles.underlineText,
                    styles.underlineCenter,
                  ]}
                >
                  <Text style={[styles.text14b, styles.spacesm]}>
                    รายงานประวัติการรียอด{"  "}
                  </Text>
                </View>
                <View style={[styles.flexrow, styles.mtsm20 ]}>
                  <View style={[styles.flexrow  , {width:'220px'} ]}>
                    <Text style={[styles.text11b]}>
                      ลูกค้า :{"  "}
                    </Text>
                    <Text style={[styles.text11]}>{pageData[0]?.user} </Text>
                  </View>
                  <View style={[styles.flexrow , {width:'200px'} ]}>
                    <Text style={[styles.text11b, styles.spacesm]}>
                      จำนวนเงินยืม :{"  "}
                    </Text>
                    <Text style={[styles.text11, styles.spacesm]}>
                      {Number(pageData[0]?.price).toLocaleString()}{" "}
                    </Text>
                    <Text style={[styles.text11]}>บาท</Text>
                  </View>
                  <View style={[styles.flexrow]}>
                    <Text style={[styles.text11b, styles.spacesm]}>
                      จำนวนวัน :{"  "}
                    </Text>
                    <Text style={[styles.text11, styles.spacesm]}>
                      {pageData[0]?.data_list?.length}{" "}
                    </Text>
                    <Text style={[styles.text11]}>วัน</Text>
                  </View>
                </View>
                <View style={[styles.flexrow, styles.underline1Center , styles.gap30]}>
                  <View style={[styles.flexrow, styles.mt10 , {width:'220px'}  ]}>
                    <Text style={[styles.text11b, styles.spacesm]}>
                      วันที่รียอด :{"  "}
                    </Text>
                    <Text style={[styles.text11,]}>
                      {moment(pageData?.[0]?.date)
                        .add(543, "years")
                        .format("DD-MM-YYYY")}{" "}
                    </Text>
                  </View>
                  <View style={[styles.flexrow, styles.mt10 , {width:'200px'} ]}>
                    <Text style={[styles.text11b]}>
                      ได้รับสุทธิ :{" "}
                    </Text>
                    <Text style={[styles.text11, styles.spacesm]}>
                      {Number(pageData[0]?.total_sum).toLocaleString()}{" "}
               
                    </Text>
                    <Text style={[styles.flexrowcenter, styles.text11]}>
                      บาท
                    </Text>
                  </View>
                  <View style={[styles.flexrow, styles.mt10]}>
                    <Text style={[styles.text11b, styles.spacesm]}>
                      จ่ายเกิน :{"  "}
                    </Text>
                    <Text style={[styles.text11, styles.spacesm]}>
                      {Number(pageData[0]?.qty_overpay).toLocaleString()}{" "}
                    </Text>
                    <Text style={[styles.flexrowcenter, styles.text11]}>
                      บาท
                    </Text>
                  </View>
                </View>
                {/*-----------  หัวตาราง ---------------------  */}
                <View style={[styles.flexcol, { marginTop: "10" }]}>
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCellHead1, styles.colorHead]}>
                      งวดที่ {""}
                    </Text>
                    <Text style={[styles.tableCellHead2, styles.colorHead]}>
                      วันที่ {""}
                    </Text>
                    <Text style={[styles.tableCellHead3, styles.colorHead]}>
                      จำนวนเงิน {""}
                    </Text>
                  </View>
                  {pageData[0]?.data_list?.map((item, itemIndex) => {
                    return (
                      <>
                        <View key={itemIndex} style={styles.tableRow}>
                          <Text style={styles.tableCell1}>
                            {itemIndex + 1 || ""} {""}
                          </Text>
                          <Text
                            style={[styles.tableCell2, { textAlign: "left" }]}
                          >
                            {" "}
                            {moment(pageData?.date)
                              .add(543, "years")
                              .format("DD-MM-YYYY")}{" "}
                            {""}
                          </Text>
                          <Text style={styles.tableCell3}>
                            {" "}
                            {Number(item?.price).toLocaleString() || ""} {""}
                          </Text>
                        </View>
                      </>
                    );
                  })}
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCell4,styles.text11b, styles.spacesm]}>
                      จ่ายแล้ว{"  "}
                    </Text>
                    <Text style={[styles.tableCell2, styles.text11]}>
                      {Number(pageData[0]?.price_pay).toLocaleString()}{" "}
                    </Text>
                  </View>
                </View>
              </Page>
            ))}
          </Document>
        </PDFViewer>
      </DialogBody>
      <DialogFooter className="p-0 m-0 pb-3 px-5">
        <Button
          // variant="text"
          color="gray"
          size="sm"
          onClick={() => handleModalReceiptSubFull()}
          className="mr-4"
        >
          <span className="text-sm">ออก</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

ReportPdf.propTypes = {
  openModalReceiptSubFull: PropTypes.bool.isRequired,
  handleModalReceiptSubFull: PropTypes.func.isRequired,
};

export default ReportPdf;
