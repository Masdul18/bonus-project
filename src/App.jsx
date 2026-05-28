import { useState, useEffect } from "react";
import "./App.css";
import MenuCard from "./MenuCard";

const daftarMenu = [
  { id: 1, nama: "Nasi Goreng", harga: 15000, emoji: "🍚" },
  { id: 2, nama: "Mie Ayam", harga: 13000, emoji: "🍜" },
  { id: 3, nama: "Es Teh Manis", harga: 5000, emoji: "🍹" },
  { id: 4, nama: "Cilok Kuah", harga: 8000, emoji: "🥘" },
];

function App() {
  const [pesanan, setPesanan] = useState(() => {
    const savedPesanan = localStorage.getItem('pesanan');
    return savedPesanan ? JSON.parse(savedPesanan) : [];
  });
  
  const [totalHarga, setTotalHarga] = useState(() => {
    const savedTotal = localStorage.getItem('totalHarga');
    return savedTotal ? JSON.parse(savedTotal) : 0;
  });

  // Simpan pesanan ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem('pesanan', JSON.stringify(pesanan));
  }, [pesanan]);

  // Simpan total harga ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem('totalHarga', JSON.stringify(totalHarga));
  }, [totalHarga]);
  
  const hadleTambahPesanan = (namaMenu, hargaMenu) => {
    const pesananBaru = {
      id: Date.now(),
      nama: namaMenu,
      harga: hargaMenu,
    };
    setPesanan([...pesanan, pesananBaru]);
    setTotalHarga(totalHarga + hargaMenu);
  };

  const handleHapusPesanan = (id, harga) => {
    setPesanan(pesanan.filter((item) => item.id !== id));
    setTotalHarga(totalHarga - harga);
  };

  const handleResetPesanan = () => {
    setPesanan([]);
    setTotalHarga(0);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "50px",
          padding: "20px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ flex: 1 }}>
          <h2 style={{ 
            color: "#2c3e50",
            marginBottom: "20px",
            fontSize: "24px"
          }}>
            Menu Kantin 🍽️
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {daftarMenu.map((menu) => (
              <MenuCard
              key={menu.id}
              menu={menu}
              onTambah={hadleTambahPesanan}
              />
            ))}
          </div>
        </div>

      <div 
      style={{ 
        width: "320px",
        borderLeft: "1px solid #e0e0e0",
        paddingLeft: "30px",
        }}>
          <h2 style={{ 
            color: "#2c3e50",
            marginBottom: "20px",
            fontSize: "24px"
          }}>
            Keranjang 🛒
          </h2>

          {pesanan.length === 0 ? (
            <p
            style={{ 
              color: "#95a5a6",
              fontStyle: "italic",
              textAlign: "center",
              padding: "20px 0"
            }}
            >
              Keranjang masih kosong, ayo jajan!
            </p>
          ) : (
            <>
              <ul style={{
                listStyle: "none",
                padding: 0,
                margin: 0
              }}>
                {pesanan.map((item) => (
                  <li 
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px",
                      marginBottom: "8px",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "6px",
                      border: "1px solid #e9ecef"
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ 
                        fontWeight: "500",
                        color: "#2c3e50",
                        marginBottom: "4px"
                      }}>
                        {item.nama}
                      </div>
                      <div style={{ 
                        fontSize: "14px",
                        color: "#27ae60",
                        fontWeight: "500"
                      }}>
                        Rp {item.harga.toLocaleString('id-ID')}
                      </div>
                    </div>
                    <button
                      onClick={() => handleHapusPesanan(item.id, item.harga)}
                      style={{
                        backgroundColor: "#e74c3c",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        padding: "6px 12px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "500",
                        transition: "background-color 0.2s"
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = "#c0392b"}
                      onMouseOut={(e) => e.target.style.backgroundColor = "#e74c3c"}
                    >
                      Hapus
                    </button>
                  </li>
                ))}
              </ul>

              <button
                onClick={handleResetPesanan}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "12px",
                  backgroundColor: "#95a5a6",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "background-color 0.2s"
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#7f8c8d"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#95a5a6"}
              >
                Reset Semua Pesanan
              </button>
            </>
          )}

          <hr style={{ 
            margin: "20px 0",
            border: "none",
            borderTop: "1px solid #e0e0e0"
          }}/>

          <div style={{
            backgroundColor: "#fff3cd",
            padding: "15px",
            borderRadius: "6px",
            border: "1px solid #ffc107"
          }}>
            <div style={{ 
              fontSize: "14px",
              color: "#856404",
              marginBottom: "4px"
            }}>
              Total Bayar
            </div>
            <div style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "#d35400"
            }}>
              Rp {totalHarga.toLocaleString('id-ID')}
            </div>
          </div>
      </div>



      </div>
    </>
  );
}

export default App;
