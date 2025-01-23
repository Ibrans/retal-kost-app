import { conn, DataTypes } from "./connection.js";

const Penyewa = conn.define("penyewa", {
    id_penyewa: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nama: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    nomor_telepon: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    alamat: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    pekerjaan: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
}, {
    timestamps: false,
    tableName: "penyewa",
});

export default Penyewa;
