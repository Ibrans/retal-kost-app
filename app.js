import express from "express";
import Items from "./models/items.js";
import Users from "./models/users.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
import path from "path";
import { fileURLToPath } from 'url';

import { getPenyewas, addPenyewa, deletePenyewa, getPenyewaById, updatePenyewa } from './controllers/penyewaController.js';
import { getKamars, addKamar, deleteKamar, getKamarById, updateKamar } from "./controllers/kamarController.js";
import { getKosts, addKost, deleteKost, getKostById, updateKost } from "./controllers/kostController.js";
import { getAllPembayaran, createPembayaran, deletePembayaran, getPembayaranById, updatePembayaran } from "./controllers/pembayaranController.js";


dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
const hostname = "127.0.0.1";
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());



app.get('/login', (req, res) => {
    res.render("login", {
        msg: ""
    });
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    Users.findOne({ where: { username: username, password: password } })
    .then(result => {
        if (result) {
            const token = jwt.sign({ username: username }, JWT_SECRET, { expiresIn: "1h" });
            res.cookie("token", token, { httpOnly: true }); //simpan token di cookie
            res.redirect("/");
        } else {
            res.render("login", { msg: "username dan password salah" });
        }
    }).catch(err => {
        res.render("login", { msg: err });
    });
})

app.get('/logout', (req, res) => {
    res.clearCookie("token", { httpOnly: true });
    res.redirect("/");
})

const authToken = (req, res, next) => {
    const token = req.cookies?.token;
    console.log(token);
    if (!token) {
        return res.redirect("/login");
    }
    try {
        const decode = jwt.verify(token, JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        res.clearCookie("token", {
            httpOnly: true
        });
        return res.redirect("/login");
    }
};

app.get("/", authToken, (req, res) => {
    let hasil;
    Items.findAll()
        .then(result => {
            hasil = {"status": 200,"error": null,"response": result};
            const user = req.user; // cek apakah user telah login atau tidak
            res.render("index", {barang: hasil.response,user:user});
        })
        .catch(err => {
            hasil = {"status": 500,"error": err,"response": null};
            res.render("index", {barang: hasil.response,user: req.user});
        })
})


app.get("/tambah", authToken, (req, res) => {
    res.render("addData");
})


app.get("/edit/:id", authToken, (req, res) => {
    let hasil;
    const id = req.params.id;
    Items.findOne({
            where: {
                id: id
            }
        })
        .then(result => {
            hasil = { "status": 200, "error": null, "response": result };
            if (result != null) {
                res.render("editData", {
                    barang: hasil.response
                });
            } else {
                res.redirect("/");
            }
        })
        .catch(err => {
            res.redirect("/");
        })
})


app.post("/api/items", authToken, (req, res) => {
    const { name, qty_stock, price } = req.body;
    Items.create({
            name,
            qty_stock,
            price
        })
        .then(result => {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
        })
        .catch(err => {
            res.send(JSON.stringify({ "status": 500, "error": err, "response": null }));
        })
});


app.put("/api/items/:id", (req, res) => {
    const { name, qty_stock, price } = req.body;
    const id = req.params.id;
    Items.update({
            name, qty_stock, price
        }, {
            where: {
                id: id
            }
        })
        .then(result => {
            res.send(JSON.stringify({
                "status": 200,
                "error": null,
                "response": result
            }));
        })
        .catch(err => {
            res.send(JSON.stringify({
                "status": 500,
                "error": err,
                "response": null
            }));
        })
});


app.delete("/api/items/:id", authToken, (req, res) => {
    const id = req.params.id;
    Items.destroy({
            where: {
                id: id
            }
        })
        .then(result => {
            res.send(JSON.stringify({
                "status": 200,
                "error": null,
                "response": result
            }));
        })
        .catch(err => {
            res.send(JSON.stringify({
                "status": 500,
                "error": err,
                "response": null
            }));
        })
});



app.get('/penyewa', authToken, (req, res) => {
    res.render('penyewa', { title: 'Data Penyewa' });
});


app.get('/kost', authToken, (req, res) => {
    res.render('kost', { title: 'Data Kost' });
});

app.get('/pembayaran', authToken, (req, res) => {
    res.render('pembayaran', { title: 'Data Pembayaran' });
});

app.get("/api/penyewa", getPenyewas);
app.get("/api/penyewa/:id_penyewa", getPenyewaById);
app.post("/api/penyewa", addPenyewa);
app.put("/api/penyewa/:id_penyewa", updatePenyewa);
app.delete("/api/penyewa/:id_penyewa", deletePenyewa);

app.get('/api/kamar', getKamars); 
app.get('/api/kamar/:id', getKamarById);
app.post('/api/kamar', addKamar);
app.put('/api/kamar/:id', updateKamar);
app.delete('/api/kamar/:id', deleteKamar);

app.get('/api/kost', getKosts);
app.get('/api/kost/:id_kost', getKostById);
app.post('/api/kost', addKost);
app.put('/api/kost/:id_kost', updateKost);
app.delete('/api/kost/:id_kost', deleteKost);


// Endpoint untuk pembayaran
app.get('/api/pembayaran', getAllPembayaran);
app.get('/api/pembayaran/:id', getPembayaranById);
app.post('/api/pembayaran', createPembayaran);
app.put('/api/pembayaran/:id', updatePembayaran);
app.delete('/api/pembayaran/:id', deletePembayaran);

export default app;


app.listen(port, hostname, () => {
    console.log(`Server running at ${hostname}:${port}`);
});