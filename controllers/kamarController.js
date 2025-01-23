import Kamar from "../models/kamar.js";

export const getKamars = async (req, res) => {
    try {
        const kamars = await Kamar.findAll();
        res.status(200).json(kamars);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching kamar',
            error
        });
    }
};

export const getKamarById = async (req, res) => {
    const { id_kamar } = req.params;
    try {
        const kamar = await Kamar.findByPk(id_kamar);
        if (!kamar) {
            return res.status(404).json({
                message: 'Kamar not found'
            });
        }
        res.status(200).json(kamar);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching kamar',
            error
        });
    }
};

export const addKamar = async (req, res) => {
    const { nomor_kamar, tipe_kamar, harga_sewa, fasilitas, deskripsi } = req.body;
    try {
        const kamar = await Kamar.create({
            nomor_kamar,
            tipe_kamar,
            harga_sewa,
            fasilitas,
            deskripsi
        });
        res.status(201).json(kamar);
    } catch (error) {
        res.status(500).json({
            message: 'Error adding kamar',
            error
        });
    }
};

export const updateKamar = async (req, res) => {
    const { id_kamar } = req.params;
    const { nomor_kamar, tipe_kamar, harga_sewa, fasilitas, deskripsi } = req.body;
    try {
        const kamar = await Kamar.findByPk(id_kamar);
        if (!kamar) {
            return res.status(404).json({
                message: 'Kamar not found'
            });
        }
        kamar.nomor_kamar = nomor_kamar || kamar.nomor_kamar;
        kamar.tipe_kamar = tipe_kamar || kamar.tipe_kamar;
        kamar.harga_sewa = harga_sewa || kamar.harga_sewa;
        kamar.fasilitas = fasilitas || kamar.fasilitas;
        kamar.deskripsi = deskripsi || kamar.deskripsi;
        await kamar.save();
        res.status(200).json(kamar);
    } catch (error) {
        res.status(500).json({
            message: 'Error updating kamar',
            error
        });
    }
};

export const deleteKamar = async (req, res) => {
    const { id_kamar } = req.params;
    try {
        const kamar = await Kamar.findByPk(id_kamar);
        if (!kamar) {
            return res.status(404).json({
                message: 'Kamar not found'
            });
        }
        await kamar.destroy();
        res.status(200).json({
            message: 'Kamar deleted'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting kamar',
            error
        });
    }
};
