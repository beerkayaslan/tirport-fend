import { Modal } from 'antd';
import { useMemo } from 'react';

const PREVIEW_URL = import.meta.env.VITE_FILE_PREVIEW_URL;

export default function FilePreview({
  fileName,
  open: { previewOpen, setPreviewOpen }
}: {
  fileName: string;
  open: { previewOpen: boolean; setPreviewOpen: (open: boolean) => void };
}) {
  const handleClose = () => {
    setPreviewOpen(false);
  };

  const filePreview = useMemo(() => {
    if (!fileName) {
      return null;
    }
    const fileExtension = fileName.split('.').pop();

    if (fileExtension === 'pdf') {
      return <embed src={`${PREVIEW_URL}/${fileName}`} width="470px" height="500px" />;
    }

    return <img src={`${PREVIEW_URL}/${fileName}`} className="max-h-[400px] w-full object-contain" alt="selected file" />;
  }, [fileName]);

  return (
    <Modal open={previewOpen} onCancel={handleClose} footer={null}>
      {filePreview}
    </Modal>
  );
}
