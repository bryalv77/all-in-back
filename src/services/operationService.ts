import Error400 from '../errors/Error400';
import SequelizeRepository from '../database/repositories/sequelizeRepository';
import { IServiceOptions } from './IServiceOptions';
import OperationRepository from '../database/repositories/operationRepository';
import CategoryRepository from '../database/repositories/categoryRepository';
import BankRepository from '../database/repositories/bankRepository';
import UserRepository from '../database/repositories/userRepository';

export default class OperationService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database,
    );

    try {
      data.categoryId = await CategoryRepository.filterIdInTenant(data.categoryId, { ...this.options, transaction });
      data.bankId = await BankRepository.filterIdInTenant(data.bankId, { ...this.options, transaction });
      data.userId = await UserRepository.filterIdInTenant(data.userId, { ...this.options, transaction });

      const record = await OperationRepository.create(data, {
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
        'operation',
      );

      throw error;
    }
  }

  async update(id, data) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database,
    );

    try {
      data.categoryId = await CategoryRepository.filterIdInTenant(data.categoryId, { ...this.options, transaction });
      data.bankId = await BankRepository.filterIdInTenant(data.bankId, { ...this.options, transaction });
      data.userId = await UserRepository.filterIdInTenant(data.userId, { ...this.options, transaction });

      const record = await OperationRepository.update(
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
        'operation',
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
        await OperationRepository.destroy(id, {
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
    return OperationRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return OperationRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return OperationRepository.findAndCountAll(
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
    const count = await OperationRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
