import { default as QR } from "react-qr-code";
import { useState } from "react";

export const QRCode = ({ room }: { room: string }) => {
  const [hide, setHide] = useState(false);
  return (
    <div className="flex flex-col items-center space-y-2">
      <QR
        height={100}
        width={100}
        value={`${window.location.origin}/add/${room}`}
      />
      <div>Scan to join room</div>

      {!hide && (
        <QR
          height={100}
          width={100}
          value={`${window.location.origin}/consume/${room}`}
        />
      )}
      {!hide ? (
        <div
          onClick={() => setHide(true)}
          className="text-orange cursor-pointer"
        >
          Hide Consumer QR
        </div>
      ) : (
        <div
          onClick={() => setHide(false)}
          className="text-orange cursor-pointer"
        >
          Show Consumer QR
        </div>
      )}
    </div>
  );
};
