import type { Request, Response } from "express";
import * as noteService from "../services/note.service";

export const createNote = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const data = req.body;

    const note = await noteService.createNote(userId, data);

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Error creating note", error });
  }
};

export const getNotesByUserId = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const notes = await noteService.getNotesByUserId(userId);
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const noteId = req.params.noteId;
    if (!noteId)
      return res.status(400).json({ error: "Missing noteId parameter" });
    const data = req.body;

    //  First check if note exists
    const existing = await noteService.getNoteByNoteId(noteId, userId);
    if (!existing) return res.status(404).json({ error: "Note not found" });

    const updated = await noteService.updateNote(noteId, userId, data);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update note" });
  }
};
