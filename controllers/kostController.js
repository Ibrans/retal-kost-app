import Kost from "../models/kost.js";

export const getKosts = async (req, res) => {
    try {
        const kosts = await Kost.findAll();
        res.status(200).json(kosts);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching kosts',
            error
        });
    }
};

export const getKostById = async (req, res) => {
    const { id_kost } = req.params;
    try {
        const kost = await Kost.findByPk(id_kost);
        if (!kost) {
            return res.status(404).json({
                message: 'Kost not found'
            });
        }
        res.status(200).json(kost);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching kost',
            error
        });
    }
};

export const addKost = async (req, res) => {
    const { nama_kost, alamat, nomor_telepon, email, deskripsi } = req.body;
    try {
        const kost = await Kost.create({
            nama_kost,
            alamat,
            nomor_telepon,
            email,
            deskripsi
        });
        res.status(201).json(kost);
    } catch (error) {
        res.status(500).json({
            message: 'Error adding kost',
            error
        });
    }
};

export const updateKost = async (req, res) => {
    const { id_kost } = req.params;
    const { nama_kost, alamat, nomor_telepon, email, deskripsi } = req.body;
    try {
        const kost = await Kost.findByPk(id_kost);
        if (!kost) {
            return res.status(404).json({
                message: 'Kost not found'
            });
        }
        kost.nama_kost = nama_kost || kost.nama_kost;
        kost.alamat = alamat || kost.alamat;
        kost.nomor_telepon = nomor_telepon || kost.nomor_telepon;
        kost.email = email || kost.email;
        kost.deskripsi = deskripsi || kost.deskripsi;
        await kost.save();
        res.status(200).json(kost);
    } catch (error) {
        res.status(500).json({
            message: 'Error updating kost',
            error
        });
    }
};

export const deleteKost = async (req, res) => {
    const { id_kost } = req.params;
    try {
        const kost = await Kost.findByPk(id_kost);
        if (!kost) {
            return res.status(404).json({
                message: 'Kost not found'
            });
        }
        await kost.destroy();
        res.status(200).json({
            message: 'Kost deleted'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting kost',
            error
        });
    }
};
