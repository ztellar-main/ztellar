import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { useBeforeUnload } from "react-router-dom";
import { PDFDownloadLink } from '@react-pdf/renderer';

import { PDFViewer } from '@react-pdf/renderer';
import PdfCertificate from '../../components/Owned/PdfCertificate';
import { useSelector } from 'react-redux';
const Sample = () => {
  // const user = useSelector(state => state.user.currentUser);
  const user = useSelector(state => state.user.currentUser);
  return (
    <>
    <PDFViewer>
      <PdfCertificate fname={user?.fname} mname={user?.mname} lname={user?.lname} />
    </PDFViewer>



    <PDFDownloadLink document={<PdfCertificate fname={user?.fname} mname={user?.mname} lname={user?.lname} />} fileName='SAMPLE'>
    <button>DOWNLOAD</button>

      
    </PDFDownloadLink>
      

    <p>asdasd</p>
          

    </>
  )
}

export default Sample
