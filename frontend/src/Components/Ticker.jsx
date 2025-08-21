import React from "react";

const Ticker = () => {
  const tickerStyle = {
    display: "inline-flex",
    gap: "5rem",
    animation: "scroll 20s linear infinite",
    alignItems: "center",
  };

  const brandColors = {
    SHEIN: "#000000",
    Zalando: "#e63946",
    "ORCA DECO": "#000000",
    DabaliXpress: "#f4a261",
    "K I A B I": "#264653",
  };

  const brandStyleBase = {
    fontWeight: "800",
    fontSize: "2.5rem",
    textShadow: "1px 1px 4px rgba(0,0,0,0.1)",
    cursor: "pointer",
    transition: "transform 0.3s ease, filter 0.3s ease",
    padding: "0.2rem 0.5rem",
    borderRadius: "6px",
    userSelect: "none",
  };

  return (
    <>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .brand:hover {
          transform: scale(1.3);
          filter: drop-shadow(2px 4px 4px rgba(0,0,0,0.3));
          z-index: 10;
          position: relative;
        }
      `}</style>

      <div
        className="overflow-hidden whitespace-nowrap py-4 -mx-[calc(50vw-50%)]"
        style={{
          background: "transparent",
          borderRadius: "14px",
          boxShadow: "0 3px 12px rgba(0,0,0,0.12)",
        }}
      >
        <div style={tickerStyle}>
          {["SHEIN", "Zalando", "ORCA DECO", "DabaliXpress", "K I A B I"].map(
            (brand, idx) => (
              <div
                key={`${brand}-${idx}`}
                className="brand"
                style={{
                  ...brandStyleBase,
                  color: brandColors[brand] || "#000",
                }}
                title={brand}
              >
                {brand}
              </div>
            )
          )}

          {/* Duplique pour la boucle fluide */}
          {["SHEIN", "Zalando", "ORCA DECO", "DabaliXpress", "K I A B I"].map(
            (brand, idx) => (
              <div
                key={`${brand}-dup-${idx}`}
                className="brand"
                style={{
                  ...brandStyleBase,
                  color: brandColors[brand] || "#000",
                }}
                title={brand}
              >
                {brand}
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Ticker;
