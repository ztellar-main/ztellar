import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

type Props = {
  fname: any;
  lname: any;
  mname: any;
  imageSrc: any;
  alignItems: any;
  top: any;
  width: any;
  orientations: any;
  size: any;
  marginLeft: any;
};
const EventPdfCertificate = ({
  fname,
  lname,
  mname,
  imageSrc,
  alignItems,
  top,
  orientations,
  size,
  marginLeft,
}: Props) => {
  // Register font
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
      //   position:'relative'
    },

    view: {
      // backgroundColor:'red',
      position: "relative",
      top: "0",
      width: "100%",
      left: "0",
      height: "100%",
    },
    image: {
      width: "100%",
      height: "100%",
    },
    textView: {
      width: "100%",
      // height: "70px",
      position: "absolute",
      top: top,
      // display: "flex",
      alignItems: alignItems,
      // justifyContent: "center",
      fontWeight: "semibold",
      marginLeft: marginLeft,
    },
    text: {
      fontSize: "28px",
      fontWeight: "medium",
      textAlign: "center",
    },
  });

  const mName = mname.charAt(0);
  return (
    <Document>
      <Page size={size} orientation={orientations} style={styles.page}>
        <View style={styles.view}>
          <Image style={styles.image} src={imageSrc} />
          <View style={styles.textView}>
            <Text style={styles.text}>
              {fname.toUpperCase()} {mName.toUpperCase()}. {lname.toUpperCase()}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default EventPdfCertificate;
