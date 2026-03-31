import React from "react";

/**
 * QR Code Widget Component
 * Fixed QR code in bottom left corner
 */
export default function QRCodeWidget() {
  const [showQR, setShowQR] = React.useState(false);

  // Generate a simple text-based representation of QR code
  const QRPlaceholder = () => (
    <div className="bg-white p-4 rounded">
      <div className="inline-grid gap-1 p-2 bg-white border-2 border-slate-900">
        {Array(15)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex gap-1">
              {Array(15)
                .fill(0)
                .map((_, j) => (
                  <div
                    key={j}
                    className={`w-2 h-2 ${
                      Math.random() > 0.6 ? "bg-slate-900" : "bg-white"
                    }`}
                  ></div>
                ))}
            </div>
          ))}
      </div>
      <p className="text-xs text-center mt-2 text-slate-500">QR Code</p>
    </div>
  );

  return (
    <>
      {/* QR Button */}
      <button
        onClick={() => setShowQR(!showQR)}
        className="fixed bottom-4 left-4 w-12 h-12 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 flex items-center justify-center text-xl hover:scale-110 transition-transform z-40"
        title="عرض رمز الاستجابة السريعة"
      >
        📱
      </button>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed bottom-20 left-4 bg-white dark:bg-slate-800 rounded-lg shadow-2xl p-4 z-40">
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm font-bold text-slate-700 dark:text-white">
              اسح الرمز
            </p>
            <QRPlaceholder />
            <button
              onClick={() => setShowQR(false)}
              className="text-xs text-slate-500 hover:text-slate-700"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </>
  );
}
