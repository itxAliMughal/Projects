import { Upload } from "antd";

const { Dragger } = Upload;

function CustomDragger(props) {
  const { customRequestCallBack = () => {}, fileName, setFileName } = props;

  const customRequest = async (info) => {
    customRequestCallBack(info?.file);
    const convertBase64 = await toBase64(info?.file);
    console.log(convertBase64);
    setFileName({
      name: info?.file?.name,
      url: convertBase64,
    });
  };

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        return;
      }
      const reader = new FileReader();
      reader?.readAsDataURL(file);
      reader.onload = () => resolve(reader?.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const uploadProps = {
    name: "customFile",
    multiple: false,
    isImageUrl: true,
    maxCount: 1,
    showUploadList: false,
    accept: "*", //application/pdf
    customRequest: customRequest,
    onDrop: customRequest,
    ...props,
  };
  return (
    <Dragger {...uploadProps}>
      <p className="ant-upload-drag-icon"></p>
      <p className="ant-upload-text">
        {fileName?.name ?? "Drag & Drop to Upload File"}
      </p>

      <img
        src={fileName?.url}
        alt={fileName?.name}
        width={300}
        style={{ marginTop: "20px" }}
      />

      {props.children}
    </Dragger>
  );
}

export default CustomDragger;
