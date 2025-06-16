import { useState } from 'react';
import Dropzone from 'react-dropzone';
import ModelViewer from '../components/ModelViewer';
import PriceCalculator from '../components/PriceCalculator';
import { usePrintQuote } from '../hooks/usePrintQuote';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const { t } = useTranslation();
  const { analysis, updateVolume } = usePrintQuote();

  return (
    <div className="container mx-auto p-4 flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-4 text-center">{t('title')}</h1>
      <Dropzone onDrop={(accepted) => setFile(accepted[0])} multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className="border-dashed border-2 p-8 text-center cursor-pointer"
          >
            <input {...getInputProps()} />
            <p>{t('drop_file')}</p>
          </div>
        )}
      </Dropzone>
      {file && (
        <ModelViewer
          file={file}
          onAnalysis={({ volume }) => updateVolume(volume)}
        />
      )}
      <PriceCalculator volume={analysis.volume} />
    </div>
  );
}
