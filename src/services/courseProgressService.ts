import Error400 from '../errors/Error400';
import SequelizeRepository from '../database/repositories/sequelizeRepository';
import { IServiceOptions } from './IServiceOptions';
import CourseProgressRepository from '../database/repositories/courseProgressRepository';
import StudentRepository from '../database/repositories/studentRepository';
import CourseRepository from '../database/repositories/courseRepository';
import LessonRepository from '../database/repositories/lessonRepository';

export default class CourseProgressService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database,
    );

    try {
      data.studentId = await StudentRepository.filterIdInTenant(data.studentId, { ...this.options, transaction });
      data.courseId = await CourseRepository.filterIdInTenant(data.courseId, { ...this.options, transaction });
      data.currentLesson = await LessonRepository.filterIdInTenant(data.currentLesson, { ...this.options, transaction });

      const record = await CourseProgressRepository.create(data, {
        ...this.options,
        transaction,
      });

      await SequelizeRepository.commitTransaction(
        transaction,
      );

      return record;
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );

      SequelizeRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'courseProgress',
      );

      throw error;
    }
  }

  async update(id, data) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database,
    );

    try {
      data.studentId = await StudentRepository.filterIdInTenant(data.studentId, { ...this.options, transaction });
      data.courseId = await CourseRepository.filterIdInTenant(data.courseId, { ...this.options, transaction });
      data.currentLesson = await LessonRepository.filterIdInTenant(data.currentLesson, { ...this.options, transaction });

      const record = await CourseProgressRepository.update(
        id,
        data,
        {
          ...this.options,
          transaction,
        },
      );

      await SequelizeRepository.commitTransaction(
        transaction,
      );

      return record;
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );

      SequelizeRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'courseProgress',
      );

      throw error;
    }
  }

  async destroyAll(ids) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database,
    );

    try {
      for (const id of ids) {
        await CourseProgressRepository.destroy(id, {
          ...this.options,
          transaction,
        });
      }

      await SequelizeRepository.commitTransaction(
        transaction,
      );
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );
      throw error;
    }
  }

  async findById(id) {
    return CourseProgressRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return CourseProgressRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return CourseProgressRepository.findAndCountAll(
      args,
      this.options,
    );
  }

  async import(data, importHash) {
    if (!importHash) {
      throw new Error400(
        this.options.language,
        'importer.errors.importHashRequired',
      );
    }

    if (await this._isImportHashExistent(importHash)) {
      throw new Error400(
        this.options.language,
        'importer.errors.importHashExistent',
      );
    }

    const dataToCreate = {
      ...data,
      importHash,
    };

    return this.create(dataToCreate);
  }

  async _isImportHashExistent(importHash) {
    const count = await CourseProgressRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
