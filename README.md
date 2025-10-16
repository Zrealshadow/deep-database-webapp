# Deep Database Web App

A React + Vite portal for presenting the Deep Database project, including a searchable dataset repository, research modules, publications, and team profiles. All content is data-driven via JSON so the site can be updated without touching the TypeScript code.

## Key Features

- Dataset explorer with search, category filtering, featured badges, and optional source-code links.
- Rich dataset detail pages with overview metrics, configurable statistics, tabbed schema and task views, and an auto-generated ER diagram.
- Additional content pages for system modules, publications, and people, each populated from JSON in `public/`.
- Responsive Tailwind CSS layout with a reusable header/footer and mobile navigation.
- Lucide icon support across cards, hero sections, and visualization components.

## Tech Stack

- React 18 with TypeScript and React Router 6 for routing between Home, Dataset Repository, Module, Publications, and People pages.
- Vite for local development and builds.
- Tailwind CSS for utility-first styling.
- lucide-react for iconography.

## Local Development

Prerequisites: Node.js 18+ and npm.

```bash
# Install dependencies
npm install

# Start the dev server (http://localhost:5173)
npm run dev

# Type-check and build for production
npm run build

# Preview the production build
npm run preview

# Lint the source
npm run lint
```

## Data Sources

All runtime data is loaded via `fetch` from static JSON files served by Vite. Update these files to change site content.

### Dataset Catalog (`public/datasets/index.json`)

Each entry in the `datasets` array powers a card in the repository view.

```json
{
  "id": "olist",
  "name": "Olist Orders",
  "category": "E-commerce",
  "description": "Classification tasks over Brazilian e-commerce orders.",
  "icon": "ShoppingCart",
  "tags": ["classification", "temporal", "orders"],
  "featured": true,
  "code_path": "https://github.com/org/repo/tree/main/examples/olist"
}
```

- `icon` must match a named export from `lucide-react` (defaults to `Database` if omitted).
- Set `featured` to `true` to highlight a dataset at the top of the catalog.
- `code_path` is optional and surfaces a “View Implementation Code” link on the card.

### Dataset Profiles (`public/datasets/<dataset-id>.json`)

Dataset detail pages render from the matching profile file.

```json
{
  "id": "olist",
  "name": "Olist Orders",
  "category": "E-commerce",
  "description": "Detailed overview of Olist order data.",
  "source": "Kaggle",
  "download_url": "https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce",
  "code_path": "https://github.com/org/repo/tree/main/examples/olist",
  "num_tables": 9,
  "total_rows": 2000000,
  "val_timestamp": "2018-06-01",
  "test_timestamp": "2018-08-01",
  "temporal_coverage": {
    "start": "2016-09-01",
    "end": "2018-09-01",
    "days": 730
  },
  "tables": [
    {
      "name": "orders",
      "description": "Order-level records.",
      "num_rows": 99441,
      "num_columns": 10,
      "primary_key": "order_id",
      "time_column": "order_purchase_timestamp",
      "foreign_keys": [
        { "column": "customer_id", "references": "customers.customer_id" }
      ],
      "sample_columns": ["order_id", "customer_id", "order_status"],
      "augmented": true
    }
  ],
  "tasks": [
    {
      "id": "order_delivered_on_time",
      "name": "On-time Delivery",
      "task_type": "Binary Classification",
      "description": "Predict whether an order will be delivered on time.",
      "entity_table": "orders",
      "target_col": "delivered_on_time",
      "metrics": ["ROC-AUC", "F1"],
      "difficulty": "Medium",
      "train_size": 80000,
      "val_size": 10000,
      "test_size": 9000,
      "positive_rate": 0.42
    }
  ],
  "statistics": {
    "countries": 1,
    "delivery_late_rate": "12.3%",
    "top_categories": ["bed_bath_table", "health_beauty"]
  },
  "relationships": [
    {
      "from_table": "orders",
      "from_column": "customer_id",
      "to_table": "customers",
      "to_column": "customer_id"
    }
  ]
}
```

- `statistics` is displayed as label/value chips in the Overview tab.
- `relationships` is optional; if omitted, edges are built automatically from `foreign_keys`.
- The Schema tab includes the `SchemaGraph` list plus an auto-layout ER diagram (`ERDiagramSimple`).

### Publications (`public/publications.json`)

The Publications page groups entries by year and type.

```json
{
  "publications": [
    {
      "id": "paper-2024-gnn",
      "title": "Temporal Relational Learning with Embedding Fusion",
      "authors": ["A. Researcher", "B. Scientist"],
      "venue": "NeurIPS",
      "year": 2024,
      "type": "Conference",
      "pdf": "https://arxiv.org/abs/1234.5678",
      "code": "https://github.com/org/repo",
      "abstract": "Short summary of the contribution."
    }
  ]
}
```

Valid `type` values are `Conference`, `Journal`, `Workshop`, or `Preprint`.

### People Directory (`public/people.json`)

Team member cards are grouped by category.

```json
{
  "people": [
    {
      "id": "alice",
      "name": "Alice Smith",
      "role": "Assistant Professor",
      "category": "Faculty",
      "email": "alice@example.edu",
      "website": "https://alice.example.edu",
      "interests": ["Relational ML", "Temporal Modeling"],
      "bio": "Researches database-aware deep learning systems."
    }
  ]
}
```

Supported categories are `Faculty`, `Research Staff`, `PhD Student`, and `Alumni`. Optional fields (`email`, `website`, `interests`, `image`) are rendered when present.

## Project Structure

```
webapp/
├── public/
│   ├── datasets/            # Dataset catalog + per-dataset profiles
│   ├── people.json          # Team directory
│   └── publications.json    # Publication list
├── src/
│   ├── components/          # Header, footer, cards, schema visualizations
│   ├── pages/               # Route components (Home, DatasetList, DatasetDetail, Module, Publications, People)
│   ├── types/               # Shared TypeScript definitions
│   ├── utils/               # Data loaders for JSON content
│   ├── App.tsx              # Router configuration
│   └── main.tsx             # App bootstrap
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── vite.config.ts
```

## Customization Notes

- Tailwind theme tokens (colors, fonts, spacing) live in `tailwind.config.js`.
- To adjust navigation or branding, edit `src/components/Header.tsx` and `src/components/Footer.tsx`.
- The architecture diagram and explanatory copy are defined in `src/pages/Module.tsx`.
- Replace placeholder entries in `public/people.json` and `public/publications.json` with real content before publishing.

## License

This project is part of the Embedding Fusion research initiative.
