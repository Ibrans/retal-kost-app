import Penyewa from "../models/penyewa.js";

export const getPenyewas = async (req, res) => {
    try {
        const penyewas = await Penyewa.findAll();
        res.status(200).json(penyewas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching penyewas", error });
    }
};

export const getPenyewaById = async (req, res) => {
    const { id_penyewa } = req.params;
    try {
        const penyewa = await Penyewa.findByPk(id_penyewa);
        if (!penyewa) {
            return res.status(404).json({ message: "Penyewa not found" });
        }
        res.status(200).json(penyewa);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching penyewa", error });
    }
};

export const addPenyewa = async (req, res) => {
    const { nama, nomor_telepon, email, alamat, pekerjaan } = req.body;
    try {
        const penyewa = await Penyewa.create({ nama, nomor_telepon, email, alamat, pekerjaan });
        res.status(201).json(penyewa);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding penyewa", error });
    }
};

export const updatePenyewa = async (req, res) => {
    const { id_penyewa } = req.params;
    const { nama, nomor_telepon, email, alamat, pekerjaan } = req.body;
    try {
        const penyewa = await Penyewa.findByPk(id_penyewa);
        if (!penyewa) {
            return res.status(404).json({ message: "Penyewa not found" });
        }
        await penyewa.update({ nama, nomor_telepon, email, alamat, pekerjaan });
        res.status(200).json(penyewa);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating penyewa", error });
    }
};

export const deletePenyewa = async (req, res) => {
    const { id_penyewa } = req.params;
    try {
        const penyewa = await Penyewa.findByPk(id_penyewa);
        if (!penyewa) {
            return res.status(404).json({ message: "Penyewa not found" });
        }
        await penyewa.destroy();
        res.status(200).json({ message: "Penyewa deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting penyewa", error });
    }
};
