import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import styled from 'styled-components'

const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
    //   position:'relative'

    },

    view:{
        // backgroundColor:'red',
        position:'relative',
        top:'0',
        width:'100%',
        left:'0',
        height:'100%'

    },
    image:{
        width:'100%',
        height:'100%'
    },
    textView:{
        width:'400px',
        height:'70px',
        // backgroundColor:'red',
        position:'absolute',
        top:'170px',
        left:'400px',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        fontSize:'28px',
        fontWeight:'900',
        textAlign:'center'
    },

  });

const PdfCertificate = (props) => {
    return(
    <Document>
        <Page orientation='landscape' size="A4" style={styles.page}>
            <View style={styles.view}>
                <Image style={styled.image} src='https://res.cloudinary.com/diblak4eh/image/upload/v1710654660/vmx8c8cnzirgmyfzgx8f.png' />
                <View style={styles.textView}>
                    <Text style={styles.text}>{props.fname} {props.mname}. {props.lname}</Text>
                </View>
            </View>
        </Page>
    </Document>
    )
}

export default PdfCertificate
