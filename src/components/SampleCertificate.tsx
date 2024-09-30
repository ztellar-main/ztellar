import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';

// Register font
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    //   position:'relative'
  },

  view: {
    // backgroundColor:'red',
    position: 'relative',
    top: '0',
    width: '100%',
    left: '0',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textView: {
    width: '100%',
    // height: "70px",
    position: 'absolute',
    top: '410px',
    // display: "flex",
    alignItems: 'center',
    // justifyContent: "center",
    fontWeight: 'bold',
    marginLeft: '0',
    letterSpacing: '3px',
  },
  text: {
    fontSize: '28px',
    fontWeight: 'medium',
    textAlign: 'center',
  },
});
const imageSrc =
  'https://res.cloudinary.com/deiqbqxh6/image/upload/f_auto,q_auto/v1/qwe/dtmbq0bludkn14ch41x0';

const SampleCertificate = () => {
  return (
    <Document>
      <Page size="A4" orientation="portrait" style={styles.page}>
        <View style={styles.view}>
          <Image style={styles.image} src={imageSrc} />
          <View style={styles.textView}>
            <Text style={styles.text}>
              {/* {fname.toUpperCase()} {mName.toUpperCase()}. {lname.toUpperCase()} */}
              Denver Bigayan
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default SampleCertificate;
