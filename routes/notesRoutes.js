import express from 'express';
import { AppDataSource } from '../database/db.js'; 
import { Note } from '../entities/noteEntity.js';

const router = express.Router();

// Middleware to check if user is authenticated

const requireAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({success: false, message: 'Authentication Required' });
}

// Get all notes for the authenticated user

router.get('/', requireAuth, async (req,res)=>{
    try{
        const noteRepository = AppDataSource.getRepository(Note);
        const notes = await noteRepository.find({
            where: {user : {id: req.user.id}},
            order: {updatedAt: 'DESC'}
        })
        res.json({
            success: true,
            notes
        })
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching notes'
        });
    }
})

// Get a specific note by ID

router.get('/:id', requireAuth, async (req, res) => {
    try {
        const noteRepository = AppDataSource.getRepository(Note);
        const note = await noteRepository.findOne({
            where: { 
                id: parseInt(req.params.id),
                user: { id: req.user.id }
            }
        });

        if (!note) {
            return res.status(404).json({
                success: false,
                message: 'Note not found'
            });
        }

        res.json({
            success: true,
            note
        });
    } catch (error) {
        console.error('Error fetching note:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching note'
        });
    }
});

// Create a new note

router.post('/', requireAuth, async(req, res)=>{
    try{
        const { title, content } = req.body;
        if(!title || title.trim() === ''){
            return res.status(400).json({
                success: false,
                message: 'Title is required'
            });
        }

        const noteRepository = AppDataSource.getRepository(Note);
        const note = noteRepository.create({
            title : title.trim(),
            content: content || '',
            user: { id: req.user.id}
            })
            await noteRepository.save(note);
            res.status(201).json({
                success: true,
                message: 'Note created successfully',
                note
            });
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating note'
        });
    }
})

// Update an existing note

router.put('/:id', requireAuth, async (req, res)=>{
    try{
        const { title, content} = req.body;
        const noteRepository = AppDataSource.getRepository(Note);
        const note = await noteRepository.findOne({
            where: { 
                id: parseInt(req.params.id),
                user: { id: req.user.id }
            }
        });
        if (!note) {
            return res.status(404).json({
                success: false,
                message: 'Note not found'
            });
        }
        if (title !== undefined) note.title = title.trim();
        if (content !== undefined) note.content = content;

        await noteRepository.save(note);
        res.json({
            success: true,
            message: 'Note updated successfully',
            note
        });
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating note'
        });
    }
})

//Delete a note

router.delete('/:id', requireAuth, async(req,res) =>{
    try{
        const noteRepository= AppDataSource.getRepository(Note);
        const note = await noteRepository.findOne({
            where:{
                id: parseInt(req.params.id),
                user: { id: req.user.id}
            }
        });
        if (!note) {
            return res.status(404).json({
                success: false,
                message: 'Note not found'
            });
        }

        await noteRepository.remove(note);
        res.json({
            success: true,
            message: 'Note deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting note'
        });
    }
});

export default router;