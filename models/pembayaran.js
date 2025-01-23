import {conn, DataTypes} from "./connection.js";

const Pembayaran = conn.define('pembayaran',{
     id_pembayaran: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
     },
     tanggal_bayar: {
          type: DataTypes.DATE,
          allowNull: false,
     },
     jumlah_bayar: {
          type: DataTypes.DECIMAL(10,2),
          allowNull: false
     },
     metode_pembayaran: {
          type: DataTypes.ENUM('tunai', 'transfer'),
          allowNull: false,
          validate: {
               isIn: [['tunai', 'transfer']],
          },
     },
},{
     timestamps:false,
     tableName: 'pembayaran',
});

export default Pembayaran;

conn.sync().then(() => {
     console.log("Tabel pembayaran sudah tersinkronisasi");
}).catch((err) => {
     console.log("Gagal Sinkronisasi tabel kamar");
})