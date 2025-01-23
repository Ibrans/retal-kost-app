import { conn, DataTypes } from "./connection.js";

const Kost = conn.define('kost', {
    id_kost: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nama_kost: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    alamat: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    nomor_telepon: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    deskripsi: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName:"kost"
});

export default Kost;

conn.sync().then(() => {
    console.log("Tabel kost sudah tersinkronisasi");
}).catch(err => {
    console.log("Tabel kost tidak tersinkronisasi:", err);
});
