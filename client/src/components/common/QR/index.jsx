import React from "react";
import QRCode from "react-qr-code";

const QRCodeComponent = ({ url }) => {
  return (
    <div>
      <h2 className=" font-bold text-xl">QR Kod</h2>
      <QRCode value={url} />
    </div>
  );
};

export default QRCodeComponent;
