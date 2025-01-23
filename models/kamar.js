 import { conn, DataTypes } from "./connection.js";

const Kamar = conn.define('kamar', {
    id_kamar: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nomor_kamar: {
        type: DataTypes.STRING(10),
        
    },
    tipe_kamar: {
        type: DataTypes.STRING(100),
        
    },
    harga_sewa: {
        type: DataTypes.DECIMAL(10, 2),
        
    },
    fasilitas: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    deskripsi: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: false,
    tableName:"kamar"
});

export default Kamar;

conn.sync().then(() => {
    console.log("Tabel kamar sudah tersinkronisasi");
}).catch(err => {
    console.log("Tabel kamar tidak tersinkronisasi:", err);
});

// const Kamar = conn.define('kamar', {
//      id_kamar: DataTypes.INTEGER,
//      nomor_kamar: DataTypes.STRING,
//      tipe_kamar: DataTypes.STRING,
//      harga_sewa: DataTypes.DECIMAL(10, 2),
//      fasilitas: DataTypes.TEXT,
//      deskripsi: DataTypes.TEXT,
     
// }, {
//      timestamps: false,
//      createdAt: false,
//      updatedAt: false
// });

// export default Kamar;

// conn.sync().then(() => {
//     console.log("Tabel kamar sudah tersinkronisasi");
// }).catch(err => {
//     console.log("Tabel kamar tidak tersinkronisasi:", err);
// });
