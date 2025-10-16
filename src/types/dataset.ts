export interface DatasetSummary {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  tags: string[];
  featured: boolean;
  code_path?: string;
}

export interface ForeignKey {
  column: string;
  references: string;
}

export interface TableInfo {
  name: string;
  description: string;
  num_rows: number;
  num_columns: number;
  primary_key: string | null;
  time_column: string | null;
  foreign_keys: ForeignKey[];
  sample_columns: string[];
  augmented?: boolean;
}

export interface TaskInfo {
  id: string;
  name: string;
  task_type: string;
  description: string;
  entity_table: string;
  target_col: string;
  metrics: string[];
  difficulty: string;
  train_size: number;
  val_size: number;
  test_size: number;
  positive_rate?: number;
  train_positive_rate?: number;
  val_positive_rate?: number;
  test_positive_rate?: number;
}

export interface TemporalCoverage {
  start: string;
  end: string;
  days: number;
}

export interface Relationship {
  from_table: string;
  from_column: string;
  to_table: string;
  to_column: string;
}

export interface DatasetDetail {
  id: string;
  name: string;
  category: string;
  description: string;
  source: string;
  download_url: string;
  code_path?: string;
  num_tables: number;
  total_rows: number;
  val_timestamp: string;
  test_timestamp: string;
  temporal_coverage: TemporalCoverage;
  tables: TableInfo[];
  tasks: TaskInfo[];
  statistics: Record<string, any>;
  relationships?: Relationship[];
}

export interface DatasetIndex {
  datasets: DatasetSummary[];
}
