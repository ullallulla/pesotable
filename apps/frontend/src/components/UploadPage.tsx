import { useAuth } from '@clerk/clerk-react';
import { UploadButton } from './UploadButton';
import UploadDropZone from './UploadDropZone';

const UploadPage = () => {
  const { getToken } = useAuth();

  const handleUpload = async () => {
    const token = await getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return headers;
  };

  return (
    <div>
      <UploadButton
        endpoint='modelUploader'
        onClientUploadComplete={(file) => {
          console.log('uploaded', file);
          alert('Upload complete');
        }}
        onUploadAborted={() => {
          alert('Upload aborted');
        }}
        onUploadError={(error) => {
          console.error(error, error.cause);
          alert('Upload failed');
        }}
      />
      <button onClick={handleUpload}>ASDASD</button>
      <UploadDropZone
        endpoint='modelUploader'
        headers={handleUpload}
        onUploadError={(error) => {
          console.error(error, error.cause);
          alert('Upload failed');
        }}
      />
    </div>
  );
};

export default UploadPage;
