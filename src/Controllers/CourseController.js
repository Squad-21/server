const LessonModel = require('../Models/Lesson');
const RelatedContentModel = require('../Models/RelatedContent');
const CourseModel = require('../Models/Course');
const LessonController = require('./LessonController');

class CourseController {
  async store(req, res) {
    try {
      const newCourse = await CourseModel.create(req.body);

      return res.status(201).json(newCourse);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: 'Erro ao criar curso.',
        error: e.message,
      });
    }
  }

  async index(req, res) {
    try {
      const courses = await CourseModel.find();

      return res.status(200).json(courses);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: 'Erro ao obter cursos.',
        error: e.message,
      });
    }
  }

  async show(req, res) {
    const { id } = req.params;

    try {
      let course = await CourseModel.findById(id);
      const relatedContents = await RelatedContentModel.find({ courses: { $in: id } });
      const lessons = await LessonModel.find({ course: id });

      if (!course) return res.status(404).json({ message: 'Curso não existe' });

      return res.status(200).json({
        course: course,
        lessons: lessons,
        related: relatedContents,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: 'Curso não existe.',
        error: e.message,
      });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    req.body.updatedAt = Date.now();

    try {
      await CourseModel.findByIdAndUpdate(id, req.body);

      return res.status(200).json({ message: 'Curso atualizado.' });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: 'Erro ao atualizar curso.',
        error: e.message,
      });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      const courseDeleted = await CourseModel.findByIdAndDelete(id);

      if (!courseDeleted) return res.status(404).json({ message: 'Curso não existe.' });

      return res.status(200).json({ message: `Curso "${id}" removido com sucesso.` });
    } catch (e) {
      return res.status(500).json({
        message: 'Erro ao remover curso.',
        error: e.message,
      });
    }
  }
}

module.exports = new CourseController();
