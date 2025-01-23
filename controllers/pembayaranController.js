import Pembayaran from "../models/pembayaran.js";

// Mendapatkan semua pembayaran
export const getAllPembayaran = async (req, res) => {
    try {
        const pembayaran = await Pembayaran.findAll();
        res.status(200).json(pembayaran);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mendapatkan pembayaran berdasarkan ID
export const getPembayaranById = async (req, res) => {
    try {
        const { id } = req.params;
        const pembayaran = await Pembayaran.findByPk(id);
        if (!pembayaran) {
            return res.status(404).json({ message: "Pembayaran tidak ditemukan" });
        }
        res.status(200).json(pembayaran);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Menambahkan pembayaran baru
export const createPembayaran = async (req, res) => {
    try {
        const { tanggal_bayar, jumlah_bayar, metode_pembayaran } = req.body;
        const pembayaran = await Pembayaran.create({
            tanggal_bayar,
            jumlah_bayar,
            metode_pembayaran,
        });
        res.status(201).json(pembayaran);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Memperbarui pembayaran
export const updatePembayaran = async (req, res) => {
    try {
        const { id } = req.params;
        const { tanggal_bayar, jumlah_bayar, metode_pembayaran } = req.body;
        const pembayaran = await Pembayaran.findByPk(id);
        if (!pembayaran) {
            return res.status(404).json({ message: "Pembayaran tidak ditemukan" });
        }
        await pembayaran.update({
            tanggal_bayar,
            jumlah_bayar,
            metode_pembayaran,
        });
        res.status(200).json(pembayaran);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Menghapus pembayaran
export const deletePembayaran = async (req, res) => {
    try {
        const { id } = req.params;
        const pembayaran = await Pembayaran.findByPk(id);
        if (!pembayaran) {
            return res.status(404).json({ message: "Pembayaran tidak ditemukan" });
        }
        await pembayaran.destroy();
        res.status(200).json({ message: "Pembayaran berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
