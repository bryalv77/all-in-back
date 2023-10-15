import Error400 from "../errors/Error400";
import SequelizeRepository from "../database/repositories/sequelizeRepository";
import { IServiceOptions } from "./IServiceOptions";
import OperationRepository from "../database/repositories/operationRepository";
import CategoryRepository from "../database/repositories/categoryRepository";
import BankRepository from "../database/repositories/bankRepository";
import UserRepository from "../database/repositories/userRepository";
const util = require("util");
const fs = require("fs");
const categories = [
  {
    id: "0931d0fa-1b1b-4fa9-8e46-8c2619b30ed7",
    fintonicId: "G0399",
  },
  {
    id: "0e0e7e2c-3444-43e1-a36c-fd655811fe3a",
    fintonicId: "G0301",
  },
  {
    id: "0e0e866c-7844-4546-97ff-f97fe472dd25",
    fintonicId: "G0304",
  },
  {
    id: "14f0787d-2484-4f24-9ccc-0e6004696b08",
    fintonicId: "G0706",
  },
  {
    id: "17c6f8fb-eacd-4f37-8ee4-b5230bea8b39",
    fintonicId: "G0300",
  },
  {
    id: "187c1193-712c-43d8-afcf-ed82c5b3d387",
    fintonicId: "G0303",
  },
  {
    id: "19ac1623-b3b5-424a-863b-84896f256212",
    fintonicId: "I0000",
  },
  {
    id: "2e1d84fc-7455-478d-ac7b-cc3f66ce7fac",
    fintonicId: "G0702",
  },
  {
    id: "32cdf0ea-ddbb-487b-a02e-c611af9d0939",
    fintonicId: "G0701",
  },
  {
    id: "46b7ccbe-df7c-48a6-a131-cadb07cd4bd5",
    fintonicId: "root",
  },
  {
    id: "4b1322c0-ddcb-4ed0-a50d-0351840e63ca",
    fintonicId: "G0398",
  },
  {
    id: "55d75dd9-96fc-4822-8ef5-c96cd21d88f9",
    fintonicId: "G0705",
  },
  {
    id: "57d9aeb6-5a9d-4da2-84ab-df11a0d3119f",
    fintonicId: "G0202",
  },
  {
    id: "6125a595-d742-4e4c-9225-b7db48d6208a",
    fintonicId: "G0200",
  },
  {
    id: "69b69e69-00f5-41a0-b0c2-0734f2fa0aa0",
    fintonicId: "G0798",
  },
  {
    id: "72ca9880-7daf-4bfd-95ef-0625310f96d5",
    fintonicId: "G0799",
  },
  {
    id: "73c4d7df-3940-4d45-9b88-b9242d5062b0",
    fintonicId: "G0302",
  },
  {
    id: "7c77c51d-f0a6-4405-a963-c90c1f3f4b05",
    fintonicId: "G0307",
  },
  {
    id: "8b0711e7-d218-4d35-8fa6-95aed8baa695",
    fintonicId: "G0306",
  },
  {
    id: "95d6f3c8-42fb-46ec-8cee-448e475ff209",
    fintonicId: "G0708",
  },
  {
    id: "9c629bae-7bd6-4fd6-99a2-f04c8710a0d3",
    fintonicId: "G0707",
  },
  {
    id: "a55af4c5-2486-4fd1-94a8-66b6d704a948",
    fintonicId: "G0703",
  },
  {
    id: "b4e0cdbf-b586-4467-95e1-f8af6ac41f37",
    fintonicId: "G0201",
  },
  {
    id: "ca83cf8f-a090-4c87-a48e-e3659405b97a",
    fintonicId: "G0700",
  },
  {
    id: "eaa9fa63-053c-4d8d-bce0-59faf7297a8d",
    fintonicId: "I0197",
  },
  {
    id: "f97f68ac-8411-48b8-a34c-1b70f65b08c8",
    fintonicId: "G0704",
  },
  {
    id: "fab2bdc5-f66a-47f4-8def-74b500f13d54",
    fintonicId: "G0305",
  },
  {
    id: "03b98e8c-e396-4d54-ad0b-bd7bf49c3118",
    fintonicId: "I0108",
  },
  {
    id: "0fd4a0b7-80c6-4920-9bc9-23893ac125d0",
    fintonicId: "I0199",
  },
  {
    id: "174997b4-41d7-47fe-be78-b5a7caa2d4ed",
    fintonicId: "I0103",
  },
  {
    id: "262b38b3-d6d7-496f-adec-ff0bba4fd1da",
    fintonicId: "G0204",
  },
  {
    id: "5a19ea8e-d185-46b3-9de6-fefdc7ae154b",
    fintonicId: "G0605",
  },
  {
    id: "60b7a23b-b064-41bf-9a92-7171a3d20f93",
    fintonicId: "G0600",
  },
  {
    id: "651fa5b5-9415-4517-8c47-47a440e29235",
    fintonicId: "G0604",
  },
  {
    id: "65eeecf9-d121-4448-8d77-32b48e27175a",
    fintonicId: "G0607",
  },
  {
    id: "65f0bb33-2aa4-4b79-98d7-7ad978fe7034",
    fintonicId: "G0608",
  },
  {
    id: "7ded9304-0b11-4b02-a335-e109ab9616bc",
    fintonicId: "G0299",
  },
  {
    id: "7f11747f-14e4-4072-a853-e3b0d96cd7e9",
    fintonicId: "I0198",
  },
  {
    id: "817dc8ad-e0df-45ff-91e9-937e063fcee5",
    fintonicId: "G0601",
  },
  {
    id: "84af5cfe-e6d3-4207-980b-7499f8abfe09",
    fintonicId: "G0205",
  },
  {
    id: "89210261-e968-4b8e-a291-7edbe748a414",
    fintonicId: "G0603",
  },
  {
    id: "96e6ae7f-a74b-475b-8cc6-e3f276e576b8",
    fintonicId: "G0606",
  },
  {
    id: "b733c60b-8c7b-4132-806e-179ca21d4b90",
    fintonicId: "G0602",
  },
  {
    id: "c34dbdc3-f940-4d10-bc19-bfeea2185ccf",
    fintonicId: "G0206",
  },
  {
    id: "efebe583-6bc8-4d29-a5d1-ac9dbf74f5a5",
    fintonicId: "G0203",
  },
  {
    id: "f63b50ac-5c0a-4e70-bf4e-81668b90b19e",
    fintonicId: "I0102",
  },
  {
    id: "f7a6e363-9b26-44a9-800c-97ebd84aaa15",
    fintonicId: "G0298",
  },
  {
    id: "ffc229ea-de69-4d55-8e19-0b92bdfc146f",
    fintonicId: "I0104",
  },
  {
    id: "29c21914-e529-423c-8fee-17785fc187ae",
    fintonicId: "G0503",
  },
  {
    id: "2b228afb-c134-4ad0-be39-c49de142503e",
    fintonicId: "G0108",
  },
  {
    id: "38431235-d374-47be-ae49-c77dfaab2df2",
    fintonicId: "G0505",
  },
  {
    id: "38562382-5f08-4bd5-83d1-d56ed29006e3",
    fintonicId: "N0102",
  },
  {
    id: "3a494fbe-c87a-43cb-8b62-f341b60cbd10",
    fintonicId: "G0698",
  },
  {
    id: "4d6fb9a3-6347-4770-80a2-58ee13f574fe",
    fintonicId: "G0105",
  },
  {
    id: "58e74488-528e-479e-839c-3e0b6f741234",
    fintonicId: "G0100",
  },
  {
    id: "62cf7c68-d3fc-4eea-b733-6770a345f982",
    fintonicId: "G0103",
  },
  {
    id: "6e586e41-08f5-4ef4-ac10-d2efc9b3a107",
    fintonicId: "G0107",
  },
  {
    id: "727bb410-042f-4c57-90c8-dd8be3fdae34",
    fintonicId: "I0106",
  },
  {
    id: "7785c78e-3288-4219-b1d1-4d43b3297af2",
    fintonicId: "N0103",
  },
  {
    id: "8016ee3c-fbd5-446a-9c75-a23c8eceb85b",
    fintonicId: "G0101",
  },
  {
    id: "935cf5db-8924-48de-8bfc-da0ab089f29b",
    fintonicId: "G0106",
  },
  {
    id: "96cc59a8-ab4f-4bd5-9233-59f401f670fc",
    fintonicId: "G0502",
  },
  {
    id: "974479b5-8351-4411-8093-736ee6d35186",
    fintonicId: "I0107",
  },
  {
    id: "99e14305-c0a9-4e72-a550-5da3dbc744a0",
    fintonicId: "G0506",
  },
  {
    id: "9b606724-4407-4093-90ac-ae0779e5ceb4",
    fintonicId: "G0104",
  },
  {
    id: "a5a9e20c-1fff-49f8-a638-86f22a7f7ee9",
    fintonicId: "G0507",
  },
  {
    id: "aaa8063b-693b-4625-9a6b-da40687f1fc4",
    fintonicId: "N0101",
  },
  {
    id: "b00c6ebf-1433-4f33-b43e-70a5eb55e24d",
    fintonicId: "I0101",
  },
  {
    id: "b09b52b2-273e-40e7-a3f2-789cd88ac7ec",
    fintonicId: "G0699",
  },
  {
    id: "ce91dea7-4e5e-4430-b646-18f286719f62",
    fintonicId: "G0501",
  },
  {
    id: "e040fc46-d37b-409e-8651-11ee3a80b373",
    fintonicId: "I0100",
  },
  {
    id: "ea9fac86-7423-4f5e-862d-27baf482bd84",
    fintonicId: "G0102",
  },
  {
    id: "f64758c3-7e45-4513-b20b-beb8247e735d",
    fintonicId: "G0500",
  },
  {
    id: "f8ab447f-5397-4293-9b1d-7cd5b5526b84",
    fintonicId: "G0504",
  },
  {
    id: "f9c8a511-26f1-46c9-b526-0523a968d68e",
    fintonicId: "I0105",
  },
  {
    id: "fa5aaf54-8275-455e-bbcb-984a9bfa4377",
    fintonicId: "N0100",
  },
  {
    id: "fc619124-03a2-4c1c-8ef4-b0ea5f3f51b0",
    fintonicId: "N0104",
  },
  {
    id: "08a5dc48-cd95-44c7-a76d-92cf1ffad538",
    fintonicId: "N0198",
  },
  {
    id: "0c9e554a-90b5-48c4-89bf-576fcf269718",
    fintonicId: "G0198",
  },
  {
    id: "14dbd62a-ad61-4de3-89b4-5cda5f957b0f",
    fintonicId: "G0508",
  },
  {
    id: "189cf5f6-bc38-416d-8d59-652d15bf5c7d",
    fintonicId: "G0000",
  },
  {
    id: "33b30cc7-c7fc-4626-a875-a03464664325",
    fintonicId: "N0000",
  },
  {
    id: "36708dde-d3ed-4107-942c-5ff9d72ca9e7",
    fintonicId: "G0400",
  },
  {
    id: "484a2260-b447-415f-a0cc-2dbd664f954f",
    fintonicId: "G0401",
  },
  {
    id: "4eb7e2bd-991d-402b-a4a6-894caf254ceb",
    fintonicId: "G0408",
  },
  {
    id: "5782f40d-1b8f-4fa1-9b74-7828eee4c401",
    fintonicId: "G0898",
  },
  {
    id: "591aa5c4-fb7b-4114-b6c0-a4d11154ae72",
    fintonicId: "G0801",
  },
  {
    id: "7d5e2678-7eb6-434b-be47-70b42ea56108",
    fintonicId: "G0407",
  },
  {
    id: "7df75459-99fe-4a0c-8527-d0f99858f601",
    fintonicId: "G0402",
  },
  {
    id: "85c490ab-86da-4c8e-961f-87d626400b97",
    fintonicId: "G0499",
  },
  {
    id: "880afeee-2a49-4f68-b9b1-6e579d8283de",
    fintonicId: "I9999",
  },
  {
    id: "904f20aa-3be5-42dd-bfc3-8edbfa58dc8e",
    fintonicId: "G0405",
  },
  {
    id: "94b869ed-8616-4911-a477-7dced7f31ec0",
    fintonicId: "G9999",
  },
  {
    id: "a70f2518-dfd0-4b96-ba32-a0456d974218",
    fintonicId: "N0199",
  },
  {
    id: "a7ac0a8b-c9e8-4f11-8609-098fa9dc6128",
    fintonicId: "G0897",
  },
  {
    id: "abbda432-fad1-4ad4-a8f8-b6995a12570c",
    fintonicId: "G0199",
  },
  {
    id: "b346b6ce-9170-4471-8b29-0d4f2eb3acae",
    fintonicId: "G0406",
  },
  {
    id: "bd179c6d-48fe-4582-a36d-8e6a90ecd1b2",
    fintonicId: "G0498",
  },
  {
    id: "c4c0fa93-7af7-4687-bbf1-e1d14f5f93b4",
    fintonicId: "I9000",
  },
  {
    id: "d474b7bd-f7a8-4e9d-9ec6-b0c9e9e02d99",
    fintonicId: "G0800",
  },
  {
    id: "d7dc5410-98a2-4f72-ab15-0280ceebfa75",
    fintonicId: "G9000",
  },
  {
    id: "d905befd-d841-4dde-acb9-882d9d70066d",
    fintonicId: "G0404",
  },
  {
    id: "e1680ce9-5451-4294-961f-bc1aeca7c483",
    fintonicId: "G0802",
  },
  {
    id: "e6fc2b43-7549-4a59-b665-eb4b86ee7f17",
    fintonicId: "G0598",
  },
  {
    id: "e9583014-c939-4801-a583-0ad5fbe5eb56",
    fintonicId: "G0599",
  },
  {
    id: "f1a0fb2a-1c94-4b29-be35-78e657d8646d",
    fintonicId: "G0403",
  },
  {
    id: "fa35696c-96b9-4ac3-b787-526ae5ef36bf",
    fintonicId: "G0899",
  },
];
const banks = [
  {
    id: "a5b5b28a-7758-4880-bae1-eca0147caec7",
    fintonicId: "PRV72400012100",
  },
  {
    id: "4c282008-1bee-4167-bc65-affc9802b75b",
    fintonicId: "0182",
  },
  {
    id: "f83e5cc0-cfb9-413a-b9ae-572f54a23330",
    fintonicId: "0073",
  },
];

const readFile = util.promisify(fs.readFile);

export default class OperationService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database
    );

    try {
      data.categoryId = await CategoryRepository.filterIdInTenant(
        data.categoryId,
        { ...this.options, transaction }
      );
      data.bankId = await BankRepository.filterIdInTenant(data.bankId, {
        ...this.options,
        transaction,
      });
      data.userId = await UserRepository.filterIdInTenant(data.userId, {
        ...this.options,
        transaction,
      });

      const record = await OperationRepository.create(data, {
        ...this.options,
        transaction,
      });
      await SequelizeRepository.commitTransaction(transaction);
      return record;
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(transaction);

      SequelizeRepository.handleUniqueFieldError(
        error,
        this.options.language,
        "operation"
      );

      throw error;
    }
  }

  formatItem(item) {
    const { weightedCategories } = item.categorization;
    const categoryId = Object.keys(weightedCategories)[0];
    const bankId = item.bankId;
    const quantity = item.quantity / 100;
    const objectFormatted = {
      fintonicId: item.id,
      description: item.description,
      reference: item.reference,
      note: item.note,
      userDescription: item.userDescription,
      quantity,
      valueDate: item.valueDate,
      operationDate: item.operationDate,
      cleanNote: item.cleanNote,
      cleanUserDescription: item.cleanUserDescription,
      primaryDisplay: item.primaryDisplay,
      secondaryDisplay: item.secondaryDisplay,
      bankId,
      categoryId,
    };
    return objectFormatted;
  }

  async insertItem(item, index, bodyLength) {
    return new Promise(async (resolve, reject) => {
      const transaction = await SequelizeRepository.createTransaction(
        this.options.database
      );
      try {
        const objectFormatted = this.formatItem(item);
        objectFormatted.categoryId =
          categories.find((it) => it.fintonicId === objectFormatted.categoryId)
            ?.id || "";
        objectFormatted.bankId =
          banks.find((it) => it.fintonicId === objectFormatted.bankId)?.id ||
          "";
        const record = await OperationRepository.create(objectFormatted, {
          ...this.options,
          transaction,
        });
        await SequelizeRepository.commitTransaction(transaction);
        console.log(`Inserted ${index} of ${bodyLength}`);
        resolve(record);
      } catch (error) {
        console.log("error: ", error);
        await SequelizeRepository.rollbackTransaction(transaction);
        SequelizeRepository.handleUniqueFieldError(
          error,
          this.options.language,
          "operation"
        );
        reject(error);
        throw error;
      }
    });
  }

  insertElement(item, index, bodyLength) {
    return new Promise(async (resolve, reject) => {
      try {
        const resultado = await this.insertItem(item, index, bodyLength);
        resolve(resultado);
      } catch (error) {
        reject(error);
        throw error;
      }
    });
  }

  async insertJSON(body) {
    const bodyLength = body.length;
    return Promise.all(
      body.map((item, index) => this.insertElement(item, index, bodyLength))
    )
      .then((items) => {
        return items;
      })
      .catch((error) => {
        console.log("error: ", error);
        throw error;
      });
  }

  async migrateJSON() {
    try {
      const dataFs = await readFile("./expenses_4.json", "utf8");
      console.log("starting migration...");
      const records = await this.insertJSON(JSON.parse(dataFs));
      return records;
      // const outputJSON = JSON.stringify(formatedArray, null, 2);
      // fs.writeFile("./cleaned.json", outputJSON, "utf8", (err) => {
      //   if (err) {
      //     console.error("Error al escribir el archivo output.json:", err);
      //     return;
      //   }
      //   console.log("Archivo ./cleaned.json creado con éxito.");
      //   return formatedArray;
      // });
    } catch (error) {
      console.log("error: ", error);
      throw error;
    }
  }

  async update(id, data) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database
    );

    try {
      data.categoryId = await CategoryRepository.filterIdInTenant(
        data.categoryId,
        { ...this.options, transaction }
      );
      data.bankId = await BankRepository.filterIdInTenant(data.bankId, {
        ...this.options,
        transaction,
      });
      data.userId = await UserRepository.filterIdInTenant(data.userId, {
        ...this.options,
        transaction,
      });

      const record = await OperationRepository.update(id, data, {
        ...this.options,
        transaction,
      });

      await SequelizeRepository.commitTransaction(transaction);

      return record;
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(transaction);

      SequelizeRepository.handleUniqueFieldError(
        error,
        this.options.language,
        "operation"
      );

      throw error;
    }
  }

  async destroyAll(ids) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database
    );

    try {
      for (const id of ids) {
        await OperationRepository.destroy(id, {
          ...this.options,
          transaction,
        });
      }

      await SequelizeRepository.commitTransaction(transaction);
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(transaction);
      throw error;
    }
  }

  async findById(id) {
    return OperationRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return OperationRepository.findAllAutocomplete(search, limit, this.options);
  }

  async findAndCountAll(args) {
    return OperationRepository.findAndCountAll(args, this.options);
  }

  async import(data, importHash) {
    if (!importHash) {
      throw new Error400(
        this.options.language,
        "importer.errors.importHashRequired"
      );
    }

    if (await this._isImportHashExistent(importHash)) {
      throw new Error400(
        this.options.language,
        "importer.errors.importHashExistent"
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
      this.options
    );

    return count > 0;
  }
}
