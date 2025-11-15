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
