import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native"; // Import Platform from react-native
import QRCode from "react-native-qrcode-svg";
import theme from "../config/theme";
import * as Sharing from "expo-sharing";

const MyQRCode = ({ item }) => {
  const qrCodeRef = useRef();

  const restaurantLink = "http://localhost:19006/" + item.link;

  const handleDownloadQRCode = async () => {
    try {
      const uri = `https://api.qrserver.com/v1/create-qr-code/?data=${restaurantLink}&size=300x300&format=svg`;
      if (Platform.OS === "web") {
        const blob = await fetch(uri).then((r) => r.blob());
        const objectUrl = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = objectUrl;
        anchor.download = `${item.englishName}`; // set your desired filename here
        anchor.click();
      } else {
        await Sharing.shareAsync(uri);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.qrCodeContainer}>
        <QRCode
          // ref={qrCodeRef}
          value={restaurantLink}
          logo={item.logo}
          logoSize={50}
          logoBackgroundColor="white"
          logoMargin={5}
          logoBorderRadius={10}
          size={250}
          color="black"
          backgroundColor="white"
          getRef={qrCodeRef}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleDownloadQRCode();
        }}
      >
        <Text style={styles.buttonText}>دانلود فایل کیو آر کد</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  qrCodeContainer: {
    alignItems: "center",
    textAlign: "center",
    borderWidth: 0,
    borderRadius: 30,
    padding: 30,
    borderColor: theme.colors.one,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  button: {
    backgroundColor: theme.colors.one,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
    marginTop: 50,
  },
  buttonText: {
    fontFamily: theme.typography.subTitle_M.fontFamily,
    fontSize: theme.typography.subTitle_M.fontSize,
    color: theme.colors.white,
    textAlign: "center",
  },
});
export default MyQRCode;
