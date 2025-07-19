import Note from '../models/Note.js';

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getNotes controller: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({message: "Note not found"});
        res.status(200).json(note);
    } catch (error) {
        console.error("Error in getNoteById controller: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const createNotes = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newNote = new Note({title, content});
        await newNote.save();
        res.status(201).json({message: "Note created successfully", note: newNote});
    } catch (error) {
        console.error("Error in createNotes controller: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateNotes = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        );
        if (!updatedNote) return res.status(404).json({message: "Note not found"});
        res.status(200).json({message: "Note updated successfully", note: updatedNote});
    } catch (error) {
        console.error("Error in updateNotes controller: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteNotes = async (req, res) => {
    try {
        const { title, content } = req.body;
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) return res.status(404).json({message: "Note not found"});
        res.status(200).json({message: "Note deleted successfully"});
    } catch (error) {
        console.error("Error in deleteNotes controller: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}