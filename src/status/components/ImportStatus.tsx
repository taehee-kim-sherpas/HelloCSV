import Completed from './Completed';
import Failed from './Failed';
import Uploading from './Uploading';
import { useImporterState } from '@/importer/reducer';
import { CustomFileLoader, EnumLabelDict } from '@/types';

interface Props {
  onRetry: () => void;
  onBackToPreview: () => void;
  resetState: () => void;
  enumLabelDict: EnumLabelDict;
  customFileLoaders: CustomFileLoader[] | undefined;
}

export default function ImportStatus({
  onRetry,
  onBackToPreview,
  resetState,
  enumLabelDict,
  customFileLoaders,
}: Props) {
  const { mode } = useImporterState();

  return (
    <div className="h-full">
      {mode === 'submit' && <Uploading resetState={resetState} />}

      {mode === 'failed' && (
        <Failed
          onRetry={onRetry}
          onBackToPreview={onBackToPreview}
          enumLabelDict={enumLabelDict}
          customFileLoaders={customFileLoaders}
        />
      )}

      {mode === 'completed' && (
        <Completed
          resetState={resetState}
          enumLabelDict={enumLabelDict}
          customFileLoaders={customFileLoaders}
        />
      )}
    </div>
  );
}
