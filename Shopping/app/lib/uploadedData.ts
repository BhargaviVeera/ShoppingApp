// app/lib/uploadedData.ts
export type UploadedItem = {
  id: number;
  uri: string;
  description?: string;
  category: string;
};

let uploadedItems: UploadedItem[] = [];

export const addUploadedItem = (item: UploadedItem) => {
  uploadedItems.push(item);
};

export const getUploadedItems = () => uploadedItems;
