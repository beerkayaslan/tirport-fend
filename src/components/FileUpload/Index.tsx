import { Flex, message, Modal, Tooltip } from 'antd';
import { useMemo, useRef, useState } from 'react';

import { FileReviewIcon, UploadIcon } from '@/assets/icons';
import { useStoragePresignedUrlMutation } from '@/store/api/general/api';

import FilePreview from './FilePreview';

const MAX_FILE_SIZE = Number(import.meta.env.VITE_MAX_UPLOAD_FILE_SIZE) * 1024 * 1024; // MB to Byte
const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];

export default function Index({
  onDone,
  fileName,
  text
}: {
  onDone: (fileResponse: string) => void;
  fileName?: string | undefined | null;
  text: string;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const [uploadFile] = useStoragePresignedUrlMutation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      handleClose();
      return;
    }
    // file size control
    if (file.size > MAX_FILE_SIZE) {
      message.error(`Dosya boyutu en fazla ${MAX_FILE_SIZE}MB olabilir.`);
      handleClose();
      return;
    }

    // file type control
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      message.error('Dosya tipi desteklenmiyor.');
      handleClose();
      return;
    }

    setSelectedFile(file);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null);
    setLoading(false);
    setPreviewOpen(false);
    if (ref.current) {
      ref.current.value = '';
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setLoading(true);
      const myHeaders = new Headers();
      myHeaders.append('x-ms-version', ' 2015-02-21  ');
      myHeaders.append('x-ms-date', ' <date>  ');
      myHeaders.append('Content-Type', selectedFile.type);
      myHeaders.append('x-ms-blob-type', ' BlockBlob  ');
      myHeaders.append('x-ms-meta-m1', ' v1  ');
      myHeaders.append('x-ms-meta-m2', ' v2  ');
      myHeaders.append('x-ms-expiry-option', ' RelativeToNow');
      myHeaders.append('x-ms-expiry-time', ' 30000');
      const fileData = await uploadFile({ name: selectedFile.name }).unwrap();

      await fetch(fileData.preSignedUrl, {
        method: 'PUT',
        headers: myHeaders,
        body: selectedFile
      })
        .then(() => {
          message.success('Dosya Başarıyla Yüklendi.');
          handleClose();
          onDone(fileData.fileName);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          message.error('Dosya yüklenirken bir hata oluştu.');
          throw new Error('File upload failed');
        });
    }
  };

  const filePreview = useMemo(() => {
    if (!selectedFile) {
      return null;
    }

    if (selectedFile.type === 'application/pdf') {
      return <embed src={URL.createObjectURL(selectedFile)} width="470px" height="500px" />;
    }

    return <img src={URL.createObjectURL(selectedFile)} className="max-h-[400px] w-full object-contain" alt="selected file" />;
  }, [selectedFile]);

  return (
    <>
      <Flex align="center" justify="space-between" className="h-12 rounded border border-primary px-4">
        {text}
        <Flex align="center" gap={2}>
          {fileName && (
            <Tooltip title="İncele">
              <FileReviewIcon
                onClick={(e) => {
                  e.stopPropagation();
                  setPreviewOpen(true);
                }}
                className=" h-[46px] w-10 cursor-pointer py-2.5 transition hover:bg-gray-100"
              />
            </Tooltip>
          )}
          <Tooltip title="Yükle">
            <label>
              <UploadIcon className=" h-[46px] w-10 cursor-pointer py-3 transition hover:bg-gray-100" />
              <input type="file" onChange={handleFileChange} hidden accept=".png, .jpg, .jpeg, .pdf" ref={ref} />
            </label>
          </Tooltip>
        </Flex>
      </Flex>
      {selectedFile && (
        <Modal
          open={open}
          onOk={handleUpload}
          closable={false}
          confirmLoading={loading}
          cancelButtonProps={{
            onClick: handleClose,
            disabled: loading
          }}
        >
          {filePreview}
          <br />
          {selectedFile && <p>Seçili Dosya: {selectedFile.name}</p>}
        </Modal>
      )}
      {previewOpen && fileName && <FilePreview fileName={fileName} open={{ previewOpen, setPreviewOpen }} />}
    </>
  );
}
