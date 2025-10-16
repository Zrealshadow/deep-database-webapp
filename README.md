# Embedding Fusion Dataset Browser

A modern, responsive web application for browsing and exploring relational datasets used in graph neural network research and embedding fusion experiments.

## Features

- **Dataset Catalog**: Browse all available datasets with filtering and search
- **Detailed Profiles**: View comprehensive information about each dataset including:
  - Dataset statistics and temporal coverage
  - Table schemas with foreign key relationships
  - Prediction tasks with metrics and difficulty ratings
  - Interactive schema relationship visualization
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Configuration-Based**: Easy to add new datasets by editing JSON configuration files

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173`

## Adding New Datasets

To add a new dataset, create two files:

### 1. Update `public/datasets/index.json`

Add your dataset summary to the `datasets` array:

```json
{
  "id": "your-dataset-id",
  "name": "Your Dataset Name",
  "category": "Category Name",
  "description": "Brief description of the dataset",
  "icon": "IconName",
  "tags": ["tag1", "tag2"],
  "featured": false
}
```

Available icons from lucide-react: Database, MessageSquare, ShoppingCart, Calendar, etc.

### 2. Create `public/datasets/your-dataset-id.json`

Create a detailed profile with this structure:

```json
{
  "id": "your-dataset-id",
  "name": "Your Dataset Name",
  "category": "Category Name",
  "description": "Detailed description",
  "source": "Data source",
  "download_url": "https://...",
  "num_tables": 5,
  "total_rows": 1000000,
  "val_timestamp": "2023-01-01",
  "test_timestamp": "2023-06-01",
  "temporal_coverage": {
    "start": "2020-01-01",
    "end": "2023-06-01",
    "days": 1247
  },
  "tables": [
    {
      "name": "table_name",
      "description": "Table description",
      "num_rows": 10000,
      "num_columns": 8,
      "primary_key": "id",
      "time_column": "created_at",
      "foreign_keys": [
        {
          "column": "user_id",
          "references": "users.id"
        }
      ],
      "sample_columns": ["id", "name", "created_at"]
    }
  ],
  "tasks": [
    {
      "id": "task-id",
      "name": "Task Name",
      "task_type": "Binary Classification",
      "description": "Task description",
      "entity_table": "table_name",
      "target_col": "target",
      "metrics": ["ROC-AUC", "F1-Score"],
      "difficulty": "Medium",
      "train_size": 10000,
      "val_size": 2000,
      "test_size": 2000
    }
  ],
  "statistics": {
    "custom_stat_1": "value",
    "custom_stat_2": ["item1", "item2"]
  }
}
```

## Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Project Structure

```
webapp/
├── public/
│   └── datasets/          # Dataset configuration JSON files
│       ├── index.json     # Dataset catalog
│       ├── stack.json     # Dataset profiles
│       ├── ratebeer.json
│       └── olist.json
├── src/
│   ├── components/        # Reusable components
│   │   ├── DatasetCard.tsx
│   │   ├── TableCard.tsx
│   │   ├── TaskCard.tsx
│   │   └── SchemaGraph.tsx
│   ├── pages/            # Page components
│   │   ├── DatasetList.tsx
│   │   └── DatasetDetail.tsx
│   ├── types/            # TypeScript types
│   │   └── dataset.ts
│   ├── utils/            # Utilities
│   │   └── datasetLoader.ts
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## Customization

### Styling

The app uses Tailwind CSS. Modify `tailwind.config.js` to customize colors, fonts, and other design tokens.

### Adding Features

The codebase is structured to be easily extensible:
- Add new components in `src/components/`
- Add new pages in `src/pages/`
- Update types in `src/types/dataset.ts`
- Add utility functions in `src/utils/`

## License

This project is part of the Embedding Fusion research project.
