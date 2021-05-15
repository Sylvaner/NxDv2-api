import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Render } from './interfaces/render.interface';
import { CreateRenderDTO } from './dto/render.dto';

@Injectable()
export class RenderService {
  constructor(@InjectModel('Render') private readonly renderModel: Model<Render>) { }

  async findAll(): Promise<Render[]> {
    const renders = await this.renderModel.find();
    return renders
  }

  async findById(renderId: string): Promise<Render> {
    const render = await this.renderModel.findById(renderId);
    return render;
  }

  async create(createRenderDto: CreateRenderDTO): Promise<Render> {
    const render = await new this.renderModel(createRenderDto);
    return await render.save();
  }

  async delete(renderId: string): Promise<Render> {
    const deletedRender = await this.renderModel.findByIdAndDelete(renderId);
    return deletedRender
  }

  async update(renderId: string, createRenderDto: CreateRenderDTO): Promise<Render> {
    const updatedRender = await this.renderModel.findByIdAndUpdate(renderId, createRenderDto);
    return updatedRender;
  }
}
