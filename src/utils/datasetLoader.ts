import { DatasetIndex, DatasetDetail } from '../types/dataset';

export async function loadDatasetIndex(): Promise<DatasetIndex> {
  const response = await fetch('/datasets/index.json');
  if (!response.ok) {
    throw new Error('Failed to load dataset index');
  }
  return response.json();
}

export async function loadDatasetDetail(datasetId: string): Promise<DatasetDetail> {
  const response = await fetch(`/datasets/${datasetId}.json`);
  if (!response.ok) {
    throw new Error(`Failed to load dataset: ${datasetId}`);
  }
  return response.json();
}
