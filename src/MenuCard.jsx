const MenuCard = ({ menu, onTambah }) => {
  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        padding: "20px",
        margin: "10px",
        borderRadius: "8px",
        width: "160px",
        textAlign: "center",
        backgroundColor: "#ffffff",
        transition: "transform 0.2s, border-color 0.2s",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.borderColor = "#3498db";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "#e0e0e0";
      }}
    >
      <h1
        style={{
          margin: "0 0 10px 0",
          fontSize: "48px",
        }}
      >
        {menu.emoji}
      </h1>
      <h3
        style={{
          marginBottom: "8px",
          color: "#2c3e50",
          fontSize: "16px",
          fontWeight: "600",
        }}
      >
        {menu.nama}
      </h3>
      <p
        style={{
          margin: "0 0 15px 0",
          color: "#27ae60",
          fontSize: "16px",
          fontWeight: "600",
        }}
      >
        Rp {menu.harga.toLocaleString('id-ID')}
      </p>

      <button
        style={{
          padding: "10px 16px",
          background: "#3498db",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "500",
          width: "100%",
          transition: "background-color 0.2s",
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = "#2980b9"}
        onMouseOut={(e) => e.target.style.backgroundColor = "#3498db"}
        onClick={() => onTambah(menu.nama, menu.harga)}
      >
        + Tambah
      </button>
    </div>
  );
};

export default MenuCard;
