import Error400 from '../errors/Error400';
import SequelizeRepository from '../database/repositories/sequelizeRepository';
import { IServiceOptions } from './IServiceOptions';
import BusinessRepository from '../database/repositories/businessRepository';
import BusinessCategoryRepository from '../database/repositories/businessCategoryRepository';
import AddressRepository from '../database/repositories/addressRepository';
import UserRepository from '../database/repositories/userRepository';

export default class BusinessService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database,
    );

    try {
      data.category = await BusinessCategoryRepository.filterIdInTenant(data.category, { ...this.options, transaction });
      data.address = await AddressRepository.filterIdInTenant(data.address, { ...this.options, transaction });
      data.owner = await UserRepository.filterIdsInTenant(data.owner, { ...this.options, transaction });

      const record = await BusinessRepository.create(data, {
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
        'business',
      );

      throw error;
    }
  }

  async update(id, data) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database,
    );

    try {
      data.category = await BusinessCategoryRepository.filterIdInTenant(data.category, { ...this.options, transaction });
      data.address = await AddressRepository.filterIdInTenant(data.address, { ...this.options, transaction });
      data.owner = await UserRepository.filterIdsInTenant(data.owner, { ...this.options, transaction });

      const record = await BusinessRepository.update(
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
        'business',
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
        await BusinessRepository.destroy(id, {
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
    return BusinessRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return BusinessRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return BusinessRepository.findAndCountAll(
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
    const count = await BusinessRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
