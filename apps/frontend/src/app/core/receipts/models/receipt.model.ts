import { ReceiptMediaModel } from './receipt-media.model';

export interface ReceiptModel {
  id: number;
  title: string;
  media: ReceiptMediaModel[];
}
