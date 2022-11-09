const express = require('express');
const router = express.Router();
const LessonController = require('../Controllers/LessonController');
const authMiddleware = require('../middlewares/authenticate');
const loginMiddleware = require('../middlewares/login');

// Retornar os lessons de uma course
router.get('/:id', LessonController.index);

// Dá like numa lesson
router.post('/:id/like', loginMiddleware, LessonController.like);

// Dá unlike numa lesson
router.post('/:id/unlike', loginMiddleware, LessonController.unlike);

// Comenta em uma lesson
router.post('/:id/comment', loginMiddleware, LessonController.comment);

// Retornar comentários de uma lesson
router.get('/:id/comment', loginMiddleware, LessonController.indexComment);

// Deletar comentário de uma lesson
router.delete('/:id/comment', authMiddleware, LessonController.deleteComment);

// Deletar comentário de uma lesson
router.post('/:id/done', loginMiddleware, LessonController.markAsDone);

// Adicionar nova lesson
router.post('/', authMiddleware, LessonController.store);

// Atualizar uma lesson específica
router.put('/:id', authMiddleware, LessonController.update);

// Deletar uma lesson específica
router.delete('/:id', authMiddleware, LessonController.delete);

module.exports = router;
