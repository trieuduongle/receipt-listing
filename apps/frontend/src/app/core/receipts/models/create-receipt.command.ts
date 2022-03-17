export interface MediaReceiptDto {
  fileName: string;
  keyName: string;
}

export interface CreateReceiptCommand {
  title: string;
  description: string;
  medias: MediaReceiptDto[];
}
