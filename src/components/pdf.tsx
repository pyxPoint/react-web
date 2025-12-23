import {componentType} from '@/types';
import {useEffect, useState} from 'react';
import {Document, Page, pdfjs} from 'react-pdf';
import workerjs from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import {Skeleton} from '@heroui/react';

pdfjs.GlobalWorkerOptions.workerSrc = workerjs; //new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();
const PDFViewer: componentType = ({src}) => {
  const [loaded, setLoaded] = useState(false),
    [pdfSrc, setPdfSrc] = useState<string | null>(null);
  //console.log(getPdf(src));
  useEffect(() => {
    const fetchPDF = async () => {
      const response = await fetch(`/api${src}`);
      const blob = await response.blob();
      setPdfSrc(URL.createObjectURL(blob));
    };

    fetchPDF();
  }, []);

  function onDocumentLoadSuccess() {
    setLoaded(true);
  }

  return (
    <div className="h-full">
      <Skeleton isLoaded={loaded} className="h-full">
        <Document file={pdfSrc} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={1} />
        </Document>
      </Skeleton>
    </div>
  );
};
export default PDFViewer;
