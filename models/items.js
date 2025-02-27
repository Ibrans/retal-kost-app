import {
    conn,
    DataTypes
} from "./connection.js";


const Items = conn.define('items', {
    name: DataTypes.STRING,
    qty_stock: DataTypes.INTEGER,
    price: DataTypes.INTEGER
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

export default Items;

conn.sync().then(() => {
    console.log("tabel items sudah tersinkronisasi");
}).catch(err => {
    console.log("tabel items tidak tersinkronisasi");
});