import { BaseModel } from './base.model';

export class StoryModel extends BaseModel {
  storyName: string;
  creatorName: string;
  description: string;
}
