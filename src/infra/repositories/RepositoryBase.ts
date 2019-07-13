import { getRepository, Repository } from 'typeorm';
import { IRepository } from '~/domain/IRepository';

export class RepositoryBase<Model, Entity> implements IRepository<Model, Entity> {
    database: Repository<Entity>
    constructor(private entity: any) {
        this.database = getRepository(entity)
    }

    async saveAll(models: Model[]): Promise<Entity[]> {
        const entities = models.map(model => new this.entity(model))
        return this.database.save(entities)
    }

    async save(user: Model): Promise<Entity> {
        return this.database.save(new this.entity(user))
    }

    async fetch(conditions: object): Promise<Entity | undefined> {
        return this.database.findOne(conditions)
    }

    async fetchAll(conditions?: object): Promise<Entity[]> {
        if (conditions) {
            return this.database.find(conditions)
        } else {
            return this.database.find()
        }
    }
}