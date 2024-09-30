import { PDFViewer } from '@react-pdf/renderer';
import SampleCertificate from '../components/SampleCertificate';

const ViewCertificateSample = () => {
  return (
    <div>
      <PDFViewer>
        <SampleCertificate />
      </PDFViewer>
    </div>
  );
};

export default ViewCertificateSample;
