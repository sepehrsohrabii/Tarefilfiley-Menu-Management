import RBSheet from "react-native-raw-bottom-sheet";
import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import theme from "../config/theme";
import { Icon } from "@rneui/themed";
import MyQRCode from "../handlers/convertToQRCode";

const QRCodeSheet = ({ item }) => {
  const refQRCodeSheet = useRef();
  return (
    <View>
      <TouchableOpacity
        style={styles.qrCodeButton}
        onPress={() => {
          refQRCodeSheet.current.open();
        }}
      >
        <Icon type="ionicon" name="qr-code" size={34} />
      </TouchableOpacity>
      <RBSheet
        ref={refQRCodeSheet}
        closeOnDragDown={true}
        height={700}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          container: {
            backgroundColor: theme.colors.white,
            paddingHorizontal: 60,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: -5,
            },
            shadowOpacity: 0.2,
            shadowRadius: 6.27,

            elevation: 10,
          },
          draggableIcon: {
            backgroundColor: theme.colors.one,
          },
        }}
      >
        <View>
          <Text style={styles.title}>{item.persianName}</Text>
          <Text style={styles.subTitle}>کیو آر کد</Text>
          <MyQRCode item={item} />
        </View>
      </RBSheet>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontFamily: theme.typography.heading3.fontFamily,
    fontSize: theme.typography.heading3.fontSize,
    color: theme.colors.one,
    marginTop: "30px",
    textAlign: "center",
  },
  subTitle: {
    fontFamily: theme.typography.productTitle.fontFamily,
    fontSize: theme.typography.productTitle.fontSize,
    color: theme.colors.defaultTextColor,
    marginBottom: "30px",
    textAlign: "center",
  },
  qrCodeButton: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
});
export default QRCodeSheet;
