import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/items.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Items') private readonly itemModel: Model<Item>) {}

  // find all items
  async findAll(): Promise<Item[]> {
    return await this.itemModel.find();
  }

  // find one
  async findOne(id: string): Promise<Item> {
    return await this.itemModel.findOne({ _id: id });
  }

  // create a new item
  async create(item: Item): Promise<Item> {
    const newItem = new this.itemModel(item);
    return await newItem.save();  
  }

  // delete an item
  async delete(id: string): Promise<Item> {
    return this.itemModel.findByIdAndRemove(id);
  }

  // update an item
  async update(id: string, item: Item): Promise<Item> {
    return this.itemModel.findByIdAndUpdate(id, item, { new: true });
  }
}
