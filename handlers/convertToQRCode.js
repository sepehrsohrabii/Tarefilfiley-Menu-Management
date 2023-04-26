import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Linking,
} from "react-native"; // Import Platform from react-native
import QRCode from "react-native-qrcode-svg";
import theme from "../config/theme";
import * as Sharing from "expo-sharing";
import { Icon } from "@rneui/themed";
const MyQRCode = ({ item }) => {
  const [isLoading, setIsLoading] = useState(false);
  const qrCodeRef = useRef();

  const restaurantLink = "https://menu.tarefilfiley.me/" + item.link;

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
  const handleOpenMenuLink = async () => {
    const supported = await Linking.canOpenURL(restaurantLink);
    if (supported) {
      await Linking.openURL(restaurantLink);
    } else {
      window.open(restaurantLink, "_blank");
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
      <View style={styles.buttonContainer}>
        {isLoading ? (
          <TouchableOpacity style={styles.buttonDL} onPress={() => {}}>
            <ActivityIndicator size="small" color={theme.colors.three} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.buttonDL}
            onPress={() => {
              setIsLoading(true);
              handleDownloadQRCode();
              setIsLoading(false);
            }}
          >
            <Text style={styles.buttonText}>دانلود QRCode</Text>
            <Icon
              type="ionicon"
              name="cloud-download-outline"
              color={theme.colors.white}
              size={24}
            />
          </TouchableOpacity>
        )}
        <View style={{ flex: 0.1 }}></View>
        <TouchableOpacity
          style={styles.buttonLink}
          onPress={() => {
            handleOpenMenuLink();
          }}
        >
          <Text style={styles.buttonLinkText}>لینک منو</Text>
          <Icon
            type="feather"
            name="external-link"
            color={theme.colors.one}
            size={24}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  qrCodeContainer: {
    alignItems: "center",
    textAlign: "center",
    borderWidth: 0,
    borderRadius: 20,
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
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
    width: "100%",
    padding: 35,
  },
  buttonDL: {
    backgroundColor: theme.colors.one,
    flex: 1,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  buttonText: {
    fontFamily: theme.typography.subTitle_M.fontFamily,
    fontSize: theme.typography.subTitle_M.fontSize,
    color: theme.colors.white,
    textAlign: "center",
  },
  buttonLinkText: {
    fontFamily: theme.typography.subTitle_M.fontFamily,
    fontSize: theme.typography.subTitle_M.fontSize,
    color: theme.colors.one,
    textAlign: "center",
  },
  buttonLink: {
    backgroundColor: theme.colors.three,
    flex: 1,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
});
export default MyQRCode;
