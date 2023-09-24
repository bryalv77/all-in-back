import Error400 from '../errors/Error400';
import SequelizeRepository from '../database/repositories/sequelizeRepository';
import { IServiceOptions } from './IServiceOptions';
import MessageRepository from '../database/repositories/messageRepository';
import ConversationRepository from '../database/repositories/conversationRepository';
import UserRepository from '../database/repositories/userRepository';

export default class MessageService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database,
    );

    try {
      data.senderId = await UserRepository.filterIdInTenant(data.senderId, { ...this.options, transaction });
      data.recipientId = await UserRepository.filterIdInTenant(data.recipientId, { ...this.options, transaction });
      data.conversationId = await ConversationRepository.filterIdInTenant(data.conversationId, { ...this.options, transaction });

      const record = await MessageRepository.create(data, {
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
        'message',
      );

      throw error;
    }
  }

  async update(id, data) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database,
    );

    try {
      data.senderId = await UserRepository.filterIdInTenant(data.senderId, { ...this.options, transaction });
      data.recipientId = await UserRepository.filterIdInTenant(data.recipientId, { ...this.options, transaction });
      data.conversationId = await ConversationRepository.filterIdInTenant(data.conversationId, { ...this.options, transaction });

      const record = await MessageRepository.update(
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
        'message',
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
        await MessageRepository.destroy(id, {
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
    return MessageRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return MessageRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return MessageRepository.findAndCountAll(
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
    const count = await MessageRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
