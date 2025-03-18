import { UploadButton } from "./UploadButton"
import UploadDropZone from "./UploadDropZone"

const UploadPage = () => {
    return (
    <div>
    <UploadButton
    endpoint="modelUploader"
    onClientUploadComplete={(file) => {
        console.log("uploaded", file);
        alert("Upload complete");
      }}
      onUploadAborted={() => {
        alert("Upload aborted");
      }}
      onUploadError={(error) => {
        console.error(error, error.cause);
        alert("Upload failed");
      }}
    />

    <UploadDropZone
    endpoint="modelUploader"
    />
    </div>
)}



export default UploadPage