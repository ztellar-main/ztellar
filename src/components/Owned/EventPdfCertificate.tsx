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
};
const EventPdfCertificate = ({ fname, lname, mname }: Props) => {
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
      top: "355px",
      // display: "flex",
      alignItems: "center",
      // justifyContent: "center",
      fontWeight: "semibold",
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
      <Page size="A4" orientation="portrait" style={styles.page}>
        <View style={styles.view}>
          <Image
            style={styles.image}
            src="https://res.cloudinary.com/dbagrkam0/image/upload/v1717102167/ztellar/yf9tcsjfpozq7jdqqt4y.jpg"
          />
          <View style={styles.textView}>
            <Text style={styles.text}>
              {/* {props.fname} {props.mname}. {props.lname} */}
              {fname} {mName}. {lname}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default EventPdfCertificate;
