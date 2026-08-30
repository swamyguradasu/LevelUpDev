export interface BIRoadmapStage {
  id: string;
  stageNumber: string;
  title: string;
  shortTitle: string;
  tagline: string;
  iconName: string;
  goal: string;
  whyItMatters: string;
  learningOutcome: string;
  recommendedApproach?: string;
  technologies: string[];
  topics: {
    category: string;
    items: string[];
  }[];
  keyConcepts: string[];
  practiceSuggestions: string[];
  projectSuggestions: {
    title: string;
    description: string;
    level: string;
  }[];
  commonMistakes: string[];
  nextStepPreview: string;
  visualIntuition?: {
    label: string;
    steps: string[];
  };
}

export interface BIProjectProgression {
  id: string;
  stage: string;
  name: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Portfolio-Level';
  businessProblem: string;
  description: string;
  dataset: string;
  dataSources: string;
  dataModel: string;
  kpis: string[];
  dashboardPages: string[];
  technologies: string[];
  businessInsights: string;
  githubReqs: string;
  skillsLearned: string[];
}

export interface BIWorkflowStage {
  id: string;
  stepNumber: string;
  stepName: string;
  whatHappens: string;
  whyItMatters: string;
  commonTools: string[];
  example: string;
  commonMistakes: string;
  output: string;
  icon: string;
}

export interface BISpecialization {
  title: string;
  description: string;
  coreTech: string[];
  focus: string;
  icon: string;
}

export interface BIToolkitCategory {
  category: string;
  coreItems: string[];
  specializedItems: string[];
}

export interface BICommonMistake {
  title: string;
  solution: string;
}

export interface BIDashboardChecklistCategory {
  category: string;
  items: {
    name: string;
    desc: string;
  }[];
}

export interface BIFourPillars {
  title: string;
  subtitle: string;
  icon: string;
}

export const BI_ROADMAP_STAGES: BIRoadmapStage[] = [
  {
    id: 'business-data-fundamentals',
    stageNumber: '01',
    title: 'Business & Data Fundamentals',
    shortTitle: 'Business Fundamentals',
    tagline: 'Understand how businesses operate, how metrics connect to financial performance, and how to frame analytical questions.',
    iconName: 'Briefcase',
    goal: 'Understand how business data connects to real-world decisions.',
    whyItMatters:
      'A BI Analyst is not just a chart builder; they are a strategic business partner. If you do not understand gross margin, customer acquisition cost (CAC), churn rate, or operating cash flow, your dashboards will fail to answer the questions executives care about.',
    learningOutcome: 'Understand business problems before jumping into dashboards.',
    recommendedApproach:
      'Study business models (SaaS, E-Commerce, Retail, Manufacturing). Learn the 5 core analytical questions: What happened? Why did it happen? What changed? Where did it change? What action should management take?',
    technologies: ['Business Models', 'Financial Statements', 'Unit Economics', 'KPI Frameworks'],
    visualIntuition: {
      label: 'The Business Decision Flow',
      steps: [
        'BUSINESS GOAL (Increase quarterly profit margin by 4%)',
        'DATA SIGNAL (South region sales dropped 14% despite high marketing spend)',
        'DIAGNOSTIC ANALYSIS (High product return rate on Category B items)',
        'EXECUTIVE INSIGHT (Supplier defect caused spike in customer refunds)',
        'BUSINESS ACTION (Halt Category B supplier contract & redirect budget)',
      ],
    },
    topics: [
      {
        category: 'Core Business Financial Concepts',
        items: [
          'Top-Line Revenue (Gross Sales, Net Sales, Discounts, Returns, Allowances)',
          'Cost Structure: Cost of Goods Sold (COGS), Fixed Costs, Variable Costs, OPEX (Operating Expenses)',
          'Profitability Metrics: Gross Profit, Operating Profit (EBITDA), Net Profit, and Profit Margins',
          'Cash Flow & Working Capital: Accounts Receivable, Accounts Payable, Inventory Turnover',
        ],
      },
      {
        category: 'Unit Economics & Customer Growth Metrics',
        items: [
          'Customer Acquisition Cost (CAC) and CAC Payback Period across marketing channels',
          'Customer Lifetime Value (LTV / CLV) and LTV:CAC healthy ratio benchmarks (3:1+)',
          'Retention & Churn: User churn rate, Revenue churn rate (MRR Churn), Net Revenue Retention (NRR)',
          'Average Order Value (AOV), Purchase Frequency, and Conversion Rate funnels',
        ],
      },
      {
        category: 'Data Structures for Business Intelligence',
        items: [
          'Rows (Records/Transactions) vs Columns (Fields/Attributes)',
          'Dimensions (Qualitative context: Customer, Region, Product, Date) vs Measures (Quantitative numbers: Revenue, Units)',
          'Metrics (Calculated values) vs Key Performance Indicators (Target-bound metrics determining strategic health)',
          'Time Series Analysis: Year-over-Year (YoY), Month-over-Month (MoM), and Quarter-to-Date (QTD) comparisons',
        ],
      },
      {
        category: 'Analytical Thinking & Problem Framing',
        items: [
          'The 5 Business Questions: What happened? Why did it happen? What changed? Where did it change? What should we do?',
          'Hypothesis-driven analysis: Formulating testable business assumptions before querying data',
          'Root Cause Analysis: Using the "5 Whys" methodology to drill down past superficial symptoms',
          'Translating ambiguous executive questions ("Why are sales down?") into concrete data queries',
        ],
      },
    ],
    keyConcepts: [
      'Dimensions (Context) vs Measures (Numerical Quantities)',
      'LTV : CAC Unit Economics & Payback Period',
      'Gross Profit vs Net Profit Margin Drivers',
      'Cohort Retention & Churn Rate Mechanics',
      'Hypothesis-Driven Root Cause Problem Solving',
    ],
    practiceSuggestions: [
      'Take an e-commerce quarterly financial statement and calculate Gross Margin, Operating Margin, and Net Margin.',
      'Calculate CAC and LTV for a subscription company with 5,000 users, $50/month subscription, 4% monthly churn, and $120,000 ad spend.',
      'Write an executive problem brief identifying why a retail chain with rising revenue suffered a 20% drop in net profit.',
    ],
    projectSuggestions: [
      {
        title: 'Executive Sales & Profit Driver Diagnostic Brief',
        description: 'A structured business teardown analyzing a fictional multi-regional company’s sales ledger, identifying unit economics leakages, calculating CAC/LTV metrics, and proposing 3 data-backed executive actions.',
        level: 'Beginner',
      },
    ],
    commonMistakes: [
      'Starting to design charts in Power BI before understanding the underlying business problem and decision goals.',
      'Confusing Gross Revenue with Net Profit, leading to misleading executive performance assessments.',
      'Presenting raw data numbers without business context (e.g. reporting "$1M in sales" without stating targets or growth rates).',
    ],
    nextStepPreview: 'Master spreadsheet data manipulation, lookup formulas, and pivot tables in Stage 02: Excel for Business Analysis.',
  },
  {
    id: 'excel-business-analysis',
    stageNumber: '02',
    title: 'Excel for Business Analysis & Financial Modeling',
    shortTitle: 'Excel for Business Analysis',
    tagline: 'Master Excel spreadsheets, dynamic lookup formulas, advanced Pivot Tables, conditional formatting, and analytical modeling.',
    iconName: 'FileSpreadsheet',
    goal: 'Become highly comfortable using Excel for business data analysis.',
    whyItMatters:
      'Excel is the most ubiquitous analytical tool in corporate environments. Executives, finance teams, and operations departments rely on Excel for quick ad-hoc analysis, budget forecasting, and prototyping dashboards before scaling into Power BI.',
    learningOutcome: 'Use Excel confidently for business analysis and reporting.',
    recommendedApproach:
      'Master modern dynamic array formulas (XLOOKUP, FILTER, UNIQUE, SORT), nested IFS, SUMIFS/COUNTIFS, Pivot Tables with calculated fields, and interactive slicers for exploratory analysis.',
    technologies: ['Microsoft Excel 365', 'Google Sheets', 'Pivot Tables', 'Power Query in Excel', 'Dynamic Arrays'],
    visualIntuition: {
      label: 'Excel Analytical Modeling Workflow',
      steps: [
        'RAW DATA TAB (Transactional rows formatted as an official Excel Table Ctrl+T)',
        'DATA CLEANING (Remove duplicates, TRIM text, text-to-columns, date parse)',
        'CALCULATION ENGINE (XLOOKUP dimensional attributes, SUMIFS aggregations)',
        'PIVOT TABLE & SLICERS (Summarize revenue by region, product, & time period)',
        'EXECUTIVE SUMMARY TAB (Clean KPI cards, dynamic charts, conditional alerts)',
      ],
    },
    topics: [
      {
        category: 'Excel Fundamentals & Data Hygiene',
        items: [
          'Worksheet structure, cell referencing ($A$1 absolute vs A1 relative vs $A1 mixed)',
          'Excel Tables (Ctrl+T): Structured references, dynamic expansion, auto-calculated columns',
          'Data validation rules, drop-down lists, and input error alerts',
          'Sorting, multi-level filtering, and custom number formatting ($#,##0;($#,##0);"-")',
        ],
      },
      {
        category: 'Core Business Formulas & Lookups',
        items: [
          'Modern Lookups: XLOOKUP (exact, approximate, wildcard, multi-condition) vs INDEX / MATCH and legacy VLOOKUP',
          'Conditional Aggregations: SUMIFS, COUNTIFS, AVERAGEIFS with multiple criteria (dates, text, wildcards)',
          'Logical Functions: IF, IFS, nested IFs, AND, OR, NOT, IFERROR, ISBLANK',
          'Date & Time functions: EOMONTH, EDATE, YEAR, MONTH, DATEDIF, WORKDAY for billing schedules',
          'Text cleanup formulas: TRIM, CLEAN, UPPER, LOWER, PROPER, CONCAT / TEXTJOIN, LEFT, RIGHT, MID, SUBSTITUTE',
        ],
      },
      {
        category: 'Pivot Tables & Dynamic Aggregation',
        items: [
          'Building Pivot Tables: Rows, Columns, Values, and Filter areas',
          'Summarize values by: SUM, COUNT, AVERAGE, % of Grand Total, % of Column Total, Difference From previous period',
          'Grouping dates by Year, Quarter, Month, and numerical data into custom price buckets',
          'Calculated Fields and Calculated Items inside Pivot Tables',
          'Connecting interactive Slicers and Timelines across multiple Pivot Tables',
        ],
      },
      {
        category: 'Modern Dynamic Arrays & Financial Modeling',
        items: [
          'Dynamic Array Formulas: FILTER, UNIQUE, SORT, SORTBY, SEQUENCE, TRANSPOSE',
          'Conditional Formatting: Data bars, color scales, icon sets, custom formula-based highlighting',
          'Sensitivity analysis: What-If Analysis, Data Tables, Goal Seek, Scenario Manager',
          'Building clean financial summary tabs with KPI summary cards and dynamic charts',
        ],
      },
    ],
    keyConcepts: [
      'Structured Table References & Absolute vs Relative Cell Locking',
      'XLOOKUP Multi-Criteria Exact & Range Matching',
      'Pivot Tables with % of Total & Period-over-Period Delta',
      'Dynamic Array Formulas (FILTER, UNIQUE, SORT)',
      'Multi-Pivot Slicer Synchronization for Interactive Reporting',
    ],
    practiceSuggestions: [
      'Take a 50,000-row transaction spreadsheet, convert it to an official Excel Table, and write XLOOKUP formulas to pull customer names and product categories from master lookup tabs.',
      'Build a multi-level Pivot Table summarizing sales by Region and Product Category, adding a calculated field for Profit Margin % and connecting Year/Quarter slicers.',
      'Use dynamic array formulas (UNIQUE and FILTER) to automatically generate a live summary table of top 10 underperforming sales reps.',
    ],
    projectSuggestions: [
      {
        title: 'Executive Sales & Margin Analysis Workbook',
        description: 'A professional multi-tab Excel financial workbook featuring cleaned transactional tables, automated XLOOKUP lookups, synchronized Pivot Tables, dynamic monthly variance charts, and interactive slicers.',
        level: 'Beginner',
      },
    ],
    commonMistakes: [
      'Using legacy VLOOKUP with hardcoded column index numbers that silently break whenever new columns are inserted.',
      'Failing to convert raw data ranges into official Excel Tables (Ctrl+T), causing Pivot Tables to miss newly added rows on refresh.',
      'Over-relying on manual copy-pasting and formatting rather than writing automated formulas and conditional rules.',
    ],
    nextStepPreview: 'Extract, filter, aggregate, and query database tables directly using Stage 03: SQL for BI Analysis.',
  },
  {
    id: 'sql-bi-analysis',
    stageNumber: '03',
    title: 'SQL for Business Intelligence Analysis',
    shortTitle: 'SQL for BI Analysis',
    tagline: 'Learn SQL querying, multi-table joins, subqueries, Common Table Expressions (CTEs), and analytical window functions.',
    iconName: 'Database',
    goal: 'Learn SQL well enough to retrieve and analyze business data directly from databases.',
    whyItMatters:
      'Enterprise business data lives in relational databases and cloud warehouses. A BI Analyst must write robust SQL queries to extract raw data, join customer and order tables, calculate cohort retention, and prepare clean datasets for Power BI semantic models.',
    learningOutcome: 'Extract business insights directly from relational databases.',
    recommendedApproach:
      'Focus on business querying patterns: Customer segmentation, month-over-month revenue growth, cohort retention matrices, customer lifetime value, and query optimization using CTEs and Window Functions.',
    technologies: ['PostgreSQL', 'MySQL', 'Microsoft SQL Server (T-SQL)', 'DBeaver / DataGrip', 'DuckDB'],
    visualIntuition: {
      label: 'SQL Analytical Aggregation Pipeline',
      steps: [
        'RAW TRANSACTIONS TABLE (Millions of raw customer purchases & line items)',
        'INNER / LEFT JOINS (Enriches orders with product catalog & customer details)',
        'WHERE & DATE FILTERING (Restricts query to relevant fiscal calendar range)',
        'COMMON TABLE EXPRESSIONS (CTEs) (Calculates customer order sequence & recency)',
        'WINDOW FUNCTIONS (ROW_NUMBER, LAG, LEAD compute MoM revenue growth %)',
      ],
    },
    topics: [
      {
        category: 'SQL Query Fundamentals & Filtering',
        items: [
          'Core Query Clauses: SELECT, FROM, WHERE, ORDER BY, DISTINCT, LIMIT / TOP',
          'Comparison & Logical Operators: =, !=, <>, >, <, BETWEEN, IN, LIKE, ILIKE, IS NULL, IS NOT NULL',
          'Conditional Logic: CASE WHEN ... THEN ... ELSE ... END for customer segmentation & tier classification',
          'Date Functions: DATE_TRUNC, EXTRACT, DATEADD, DATEDIFF, CURRENT_DATE, interval arithmetic',
          'Text Functions: CONCAT, SUBSTRING, COALESCE, NULLIF, UPPER, LOWER, TRIM',
        ],
      },
      {
        category: 'Aggregations & Multi-Table Joins',
        items: [
          'Aggregation Functions: COUNT, COUNT(DISTINCT), SUM, AVG, MIN, MAX',
          'Grouping & Filtering Aggregates: GROUP BY and HAVING (filtering post-aggregation)',
          'Join Mechanics: INNER JOIN, LEFT OUTER JOIN (keeping unmatched records), RIGHT JOIN, FULL OUTER JOIN',
          'Self-Joins (employee-manager hierarchies) and Cross-Joins (generating matrix combinations)',
          'Join Best Practices: Avoiding accidental Cartesian products and duplicate rows on one-to-many joins',
        ],
      },
      {
        category: 'Advanced Analytical SQL & Window Functions',
        items: [
          'Common Table Expressions (CTEs): WITH cte_name AS (...) for readable, modular query structuring',
          'Subqueries: Scalar subqueries, correlated subqueries, and EXISTS / NOT EXISTS clauses',
          'Window Function Mechanics: OVER (PARTITION BY ... ORDER BY ... ROWS BETWEEN ...)',
          'Ranking Window Functions: ROW_NUMBER() (deduplication), RANK(), DENSE_RANK(), NTILE(4) (quartiles)',
          'Value Window Functions: LAG() and LEAD() for Month-over-Month (MoM) and Year-over-Year (YoY) growth calculations',
          'Cumulative Calculations: Running totals and 7-day moving averages across time series',
        ],
      },
      {
        category: 'Business Analytics SQL Patterns',
        items: [
          'Cohort Retention Matrix: Tracking user signup cohorts and repeat transaction activity month by month',
          'RFM Segmentation: Recency, Frequency, and Monetary scoring queries to segment VIP vs at-risk customers',
          'Customer Churn Calculation: Identifying active users who had zero transactions in the last 90 days',
          'Market Basket Analysis: Finding product pairs most frequently purchased together in single order IDs',
        ],
      },
    ],
    keyConcepts: [
      'Window Functions (PARTITION BY & LAG/LEAD for MoM Analysis)',
      'Common Table Expressions (CTEs) for Modular Business Queries',
      'Cohort Retention Analysis & RFM Customer Segmentation in SQL',
      'Handling NULLs with COALESCE & Safe Division (NULLIF)',
      'INNER vs LEFT JOIN Data Retention & Deduplication',
    ],
    practiceSuggestions: [
      'Write a SQL query using LAG() to calculate Month-over-Month revenue growth percentage for each product category over the past 24 months.',
      'Build a cohort retention SQL query that groups customers by their first purchase month and tracks what % return in months 1, 2, 3, 6, and 12.',
      'Use ROW_NUMBER() inside a CTE to find the top 3 highest-spending customers in every sales territory.',
    ],
    projectSuggestions: [
      {
        title: 'E-Commerce SQL Business Intelligence Query Suite',
        description: 'A comprehensive SQL analytics project querying a multi-table relational database to compute monthly revenue trends, customer lifetime value, RFM segments, product return rates, and cohort retention tables.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Using WHERE instead of HAVING to filter on aggregated metrics (e.g. WHERE SUM(sales) > 1000 causes a SQL syntax error).',
      'Dividing by zero without using NULLIF(denominator, 0), crashing queries when transactions have 0 quantity.',
      'Accidentally creating duplicate rows in aggregation queries due to joining on non-unique foreign keys without prior grouping.',
    ],
    nextStepPreview: 'Clean, reshape, and prepare messy raw data for reporting in Stage 04: Data Cleaning & Transformation.',
  },
  {
    id: 'data-cleaning-transformation',
    stageNumber: '04',
    title: 'Data Cleaning & Transformation with Power Query',
    shortTitle: 'Data Cleaning & Power Query',
    tagline: 'Transform messy, unstandardized business datasets into clean, structured analytical tables using Power Query and ETL best practices.',
    iconName: 'Filter',
    goal: 'Turn messy business data into clean, reliable analytical data.',
    whyItMatters:
      'Real-world business data is full of missing values, inconsistent date formats, duplicate records, and trailing spaces. If your data is dirty, your KPIs will be wrong and business trust will be destroyed. Power Query automates data cleaning into repeatable, refreshable pipelines.',
    learningOutcome: 'Build repeatable data preparation workflows.',
    recommendedApproach:
      'Adopt the "Clean Once, Refresh Automatically" philosophy. Use Power Query Editor (in Excel or Power BI) to apply transformation steps: pivoting, unpivoting, merging, appending, and type enforcement.',
    technologies: ['Power Query Editor', 'Power Query (M Language)', 'Excel', 'Power BI Desktop', 'CSV/JSON/SQL Sources'],
    visualIntuition: {
      label: 'Power Query Automated ETL Workflow',
      steps: [
        'RAW DATA SOURCE (Messy CSVs, Excel sheets, SQL tables, SharePoint)',
        'POWER QUERY EXTRACTION (Loads data with source step & parameterization)',
        'DATA RESHAPING (Promote headers, unpivot monthly columns, trim text)',
        'DATA TYPE ENFORCEMENT (Assign strict Currency, Whole Number, Date types)',
        'AUTOMATED REFRESH (Saves repeatable M-script; re-runs automatically daily)',
      ],
    },
    topics: [
      {
        category: 'Data Quality Dimensions & Common Anomalies',
        items: [
          'Identifying Data Quality Issues: Missing values (NULLs), duplicates, trailing whitespace, trailing special characters',
          'Inconsistent naming: "USA", "United States", "US", "u.s.a" standardized into a single unified category',
          'Data type mismatches: Text stored in numeric columns, currency symbols blocking mathematical operations',
          'Invalid date formats and mixed European (DD/MM/YYYY) vs US (MM/DD/YYYY) timestamps',
        ],
      },
      {
        category: 'Power Query Fundamentals & Applied Transformations',
        items: [
          'The Power Query Interface: Applied Steps pane, Formula bar, Advanced Editor',
          'Core Column Operations: Split column (by delimiter, character count), Merge columns, Extract text',
          'Data Type Enforcement: Date, Time, Text, Whole Number, Decimal Number, True/False Boolean',
          'Filtering & Deduplication: Remove empty rows, Remove duplicate rows based on composite keys, Keep top rows',
          'Replacing values, Fill Down / Fill Up for merged spreadsheet cell hierarchy handling',
        ],
      },
      {
        category: 'Advanced Reshaping: Pivoting & Unpivoting',
        items: [
          'Unpivoting Columns: Converting wide spreadsheet matrices (months as columns) into tall, normalized analytical rows (critical for BI modeling)',
          'Pivoting Columns: Creating summary matrix columns from key-value attribute tables',
          'Group By operations: Pre-aggregating high-volume transactional logs to reduce report file size',
          'Custom Columns & Conditional Columns: Writing IF-THEN-ELSE conditional classification rules',
        ],
      },
      {
        category: 'Combining Data Sources & The M Language',
        items: [
          'Append Queries (UNION ALL): Combining 12 monthly CSV files into a single unified yearly sales table',
          'Merge Queries (JOINs): Inner Join, Left Outer Join, Right Outer Join, Full Outer Join inside Power Query',
          'Folder Data Connector: Automatically ingesting and combining all new files dropped into a designated SharePoint/local folder',
          'Introduction to Power Query M Language: Inspecting source code, modifying parameters, and creating custom functions',
          'Query Folding: Ensuring Power Query pushes transformation steps back to the SQL database engine for ultra-fast processing',
        ],
      },
    ],
    keyConcepts: [
      'Unpivoting Wide Spreadsheet Formats into Tall Analytical Tables',
      'The "Applied Steps" Repeatable Transformation Pipeline',
      'Folder Connector for Automated Multi-File Batch Ingestion',
      'Query Folding Mechanics for Database Processing Acceleration',
      'Strict Data Type Assignment (Date/Currency/Whole Number)',
    ],
    practiceSuggestions: [
      'Take a messy multi-year budget spreadsheet formatted in wide matrix style (months across columns) and use Power Query to unpivot it into a clean 3-column table (Category, Date, Amount).',
      'Set up a Power Query folder connector that automatically ingests, standardizes, and appends weekly sales CSV files without any manual copy-pasting.',
      'Use Merge Queries to join a customer address table with an order table, clean missing postal codes, and remove trailing whitespace using TRIM and CLEAN.',
    ],
    projectSuggestions: [
      {
        title: 'Automated Multi-Source Sales Data Cleaning Pipeline',
        description: 'A fully automated Power Query workflow that extracts messy sales files from multiple regional folders, handles missing data, unpivots financial schedules, standardizes country categories, and outputs clean analytical tables.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Leaving datasets in wide format (e.g. Jan, Feb, Mar as separate columns) instead of unpivoting them into a single Date column, making DAX time intelligence impossible.',
      'Performing manual edits directly in source Excel files instead of applying transformation steps in Power Query.',
      'Breaking Query Folding by inserting non-foldable steps early in the query, forcing Power BI to download millions of raw rows locally.',
    ],
    nextStepPreview: 'Structure clean tables into high-performance Star Schemas in Stage 05: Data Modeling for BI.',
  },
  {
    id: 'data-modeling-bi',
    stageNumber: '05',
    title: 'Data Modeling for Business Intelligence (Star Schema)',
    shortTitle: 'Data Modeling for BI',
    tagline: 'Learn how to design scalable Star Schemas, manage Fact and Dimension tables, define granularity, and build robust relationships.',
    iconName: 'Layers',
    goal: 'Learn how to structure data so dashboards remain accurate, fast, and scalable.',
    whyItMatters:
      'Data modeling is the single most important skill in Power BI. A good data model makes writing DAX effortless and reports lightning-fast. A poor data model (e.g. one massive flat table or circular relationships) creates slow dashboards, wrong numbers, and complex DAX nightmares.',
    learningOutcome: 'Build reliable analytical models instead of connecting dashboards directly to messy raw data.',
    recommendedApproach:
      'Master Kimball Star Schema modeling. Always separate Fact tables (numerical metrics/transactions) from Dimension tables (descriptive attributes). Build 1-to-Many relationships with Single Cross-Filter direction.',
    technologies: ['Kimball Dimensional Modeling', 'Power BI Model View', 'Star Schema', 'Date Tables', 'DAX Studio'],
    visualIntuition: {
      label: 'The Power BI Star Schema Architecture',
      steps: [
        'DIM_CUSTOMER (1) ──┐ (1-to-many relationship)',
        'DIM_PRODUCT  (1) ──┼──> FACT_SALES (*) (Central fact table with grain = order line item)',
        'DIM_DATE     (1) ──┤',
        'DIM_STORE    (1) ──┘',
      ],
    },
    topics: [
      {
        category: 'The Star Schema & Dimensional Modeling Core',
        items: [
          'What is a Star Schema? Central Fact tables surrounded by descriptive Dimension tables (simple, intuitive, blazing fast)',
          'Fact Tables: High-row-count numerical tables containing quantitative measures (Revenue, Quantity, Cost) and foreign keys',
          'Dimension Tables: Lower-row-count context tables containing descriptive filtering attributes (Customer Name, Product Category, Region)',
          'Star Schema vs Snowflake Schema: Why denormalized Star Schemas are preferred in Power BI for performance and simple DAX',
          'Why avoid the "One Big Flat Table" (OBT) anti-pattern: Redundant memory usage, slow performance, and messy field lists',
        ],
      },
      {
        category: 'Relationships & Filter Propagation',
        items: [
          'Cardinality Types: One-to-Many (1:* - the golden standard), Many-to-One (*:1), One-to-One (1:1), Many-to-Many (*:*)',
          'Cross-Filter Direction: Single direction (filters flow from Dimension to Fact table) vs Both / Bi-directional filtering',
          'Dangers of Bi-directional Relationships: Ambiguous filter paths, circular dependencies, and severe performance degradation',
          'Active vs Inactive Relationships: Managing multiple date relationships (Order Date vs Ship Date) using USERELATIONSHIP in DAX',
        ],
      },
      {
        category: 'Defining Table Grain & Key Strategy',
        items: [
          'Defining the Grain: The exact level of detail represented by a single row in the Fact table (e.g. one row per order line item)',
          'Primary Keys (unique identifiers in Dimension tables) and Foreign Keys (linking fields in Fact tables)',
          'Surrogate Keys vs Natural Business Keys: Creating unique integer/UUID keys for dimensions',
          'Conformed Dimensions: Shared dimension tables connected to multiple Fact tables (e.g. Dim_Date filtering both Fact_Sales and Fact_Budget)',
        ],
      },
      {
        category: 'The Dedicated Date Dimension (Calendar Table)',
        items: [
          'Why a dedicated Date Table is mandatory: Required for all Power BI DAX Time Intelligence calculations',
          'Date Table Requirements: Contiguous dates, no gaps, covers all historical and target future dates, marked as official Date Table',
          'Standard Calendar Fields: Date, Year, Quarter, Month Name, Month Number, Week Number, Day of Week, Fiscal Year, Fiscal Quarter',
          'Sorting Month Name by Month Number: Fixing alphabetical sorting bugs (April appearing before January)',
        ],
      },
    ],
    keyConcepts: [
      'Kimball Star Schema (Central Fact Table Surrounded by Dimensions)',
      'One-to-Many (1:*) Relationships with Single Cross-Filter Direction',
      'Mandatory Dedicated Date Table for Time Intelligence Calculations',
      'Fact Table Granularity (Defining the Level of Detail per Row)',
      'Active vs Inactive Relationships & USERELATIONSHIP',
    ],
    practiceSuggestions: [
      'Take 3 disconnected tables (Orders, Customers, Products) and build a Star Schema in Power BI Model View with 1-to-many relationships.',
      'Generate a comprehensive Date Table in Power BI using DAX (CALENDARAUTO), mark it as Date Table, and configure Month Name sort-by-column.',
      'Resolve an inactive relationship scenario where a Fact table has both Order_Date and Ship_Date by modeling inactive relationships.',
    ],
    projectSuggestions: [
      {
        title: 'Enterprise E-Commerce Star Schema Data Model',
        description: 'A fully structured Power BI data model connecting Fact_Sales, Fact_Returns, and Fact_Inventory with conformed Dim_Customer, Dim_Product, Dim_Store, and Dim_Date tables, eliminating bi-directional cross-filtering.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Building reports on a single massive 100-column flat table, causing massive memory bloat and sluggish dashboard performance.',
      'Enabling Bi-directional cross-filtering on every relationship, creating ambiguous filter loops and unpredictable calculation totals.',
      'Failing to sort "Month Name" by "Month Number", causing charts to order months alphabetically (April, August, December...).',
    ],
    nextStepPreview: 'Create professional interactive reports and visualizations in Stage 06: Power BI Fundamentals.',
  },
  {
    id: 'power-bi-fundamentals',
    stageNumber: '06',
    title: 'Power BI Fundamentals & Interactive Visuals',
    shortTitle: 'Power BI Fundamentals',
    tagline: 'Learn how to build interactive reports, choose the right visuals, configure slicers, and master report layout aesthetics.',
    iconName: 'BarChart3',
    goal: 'Learn how to build professional interactive BI dashboards.',
    whyItMatters:
      'Power BI is the global market leader in Business Intelligence. Knowing how to import data, configure charts, format visual hierarchy, implement drill-throughs, and design responsive user interfaces is essential for every BI professional.',
    learningOutcome: 'Create professional interactive BI reports.',
    recommendedApproach:
      'Master the core visual types (Bar, Column, Line, Cards, Matrix, Slicers). Focus on visual hierarchy: Top KPIs at the top, trends in the middle, and detailed breakdown tables at the bottom.',
    technologies: ['Power BI Desktop', 'Power BI Service', 'Visual Canvas', 'Slicers & Filters', 'Themes & Templates'],
    visualIntuition: {
      label: 'Power BI Canvas Design Hierarchy',
      steps: [
        'EXECUTIVE HEADER (Dashboard title, company branding, last refresh timestamp)',
        'PRIMARY KPI CARDS (Big bold numbers: Total Revenue, Gross Profit, Total Orders, YoY Growth)',
        'TREND VISUALS (Line charts showing monthly revenue trajectory vs target budget)',
        'CATEGORICAL BREAKDOWNS (Bar charts slicing revenue by region & product category)',
        'INTERACTIVE DETAIL MATRIX (Customer & SKU drill-down with conditional formatting)',
      ],
    },
    topics: [
      {
        category: 'Power BI Architecture & Workspace Navigation',
        items: [
          'The 3 Power BI Views: Report View (Canvas & Visuals), Table View (Data preview), Model View (Star Schema relationships)',
          'Power BI Ecosystem: Power BI Desktop (development authoring) vs Power BI Service (cloud sharing & workspace governance)',
          'Connecting to Data Sources: Excel, CSV, SQL Server, PostgreSQL, Web APIs, SharePoint folders',
          'Import Mode (blazing fast in-memory VertiPaq engine) vs DirectQuery (live database querying for massive datasets)',
        ],
      },
      {
        category: 'Core Visual Types & Appropriate Usage',
        items: [
          'Card & New Card Visuals: Displaying primary executive KPIs (Total Revenue, Margin %, Order Count)',
          'Bar & Column Charts: Categorical comparisons (Clustered Bar, Stacked Column, 100% Stacked Bar)',
          'Line & Area Charts: Continuous time series trends, seasonal fluctuations, and historical comparisons',
          'Table & Matrix Visuals: Detailed operational numbers, conditional formatting heatmaps, subtotal hierarchies',
          'Donut & Pie Charts: Composition of whole (best limited to 3–4 slices maximum to prevent visual clutter)',
          'Scatter Plots & Bubble Charts: Exploring correlations between two numeric measures (e.g. Sales vs Profit Margin)',
        ],
      },
      {
        category: 'Interactivity & User Experience (UX)',
        items: [
          'Slicers & Filter Pane: Dropdown, list, relative date slicers, and page-level vs report-level filters',
          'Cross-Filtering & Cross-Highlighting: Controlling visual interactions (Edit Interactions settings)',
          'Drill-Down and Drill-Up: Exploring hierarchies (Year → Quarter → Month → Day; Category → Subcategory)',
          'Drill-Through Pages: Right-clicking a customer on Page 1 to jump to a dedicated Customer Profile detail page',
          'Custom Tooltip Pages: Hovering over a chart bar to reveal a mini breakdown chart in a floating pop-up card',
          'Bookmarks & Selection Pane: Creating dynamic toggles, slide-out filter drawers, and page resets',
        ],
      },
      {
        category: 'Report Design, Layout & Accessibility',
        items: [
          'Visual Hierarchy: Z-pattern and F-pattern layout guidelines for executive scanning',
          'Color Strategy: Using intentional corporate color palettes, avoiding rainbow charts, using color for meaning (Green=Good, Red=Alert)',
          'Typography & Spacing: Consistent font sizing, card padding, alignment, and whitespace',
          'Mobile Layout View: Designing responsive, thumb-friendly vertical layouts for executive smartphones',
        ],
      },
    ],
    keyConcepts: [
      'Power BI 3 Views (Report, Table, Model) & Import vs DirectQuery',
      'KPI Cards, Bar Charts, Line Trends & Matrix Visuals',
      'Drill-Through Pages & Custom Floating Hover Tooltips',
      'Bookmarks & Selection Pane for Dynamic Interactive UI',
      'Visual Hierarchy (Z-Pattern Layout & Purposeful Color Palettes)',
    ],
    practiceSuggestions: [
      'Build a multi-visual sales report in Power BI Desktop featuring 4 KPI cards at the top, a monthly revenue line chart, and a regional sales bar chart.',
      'Create a custom hover Tooltip page that displays a top-5 product breakdown whenever a user hovers over a region on the main bar chart.',
      'Configure a dedicated Drill-Through page so users can right-click any product category and immediately see SKU-level inventory and return rates.',
    ],
    projectSuggestions: [
      {
        title: 'Interactive Executive Sales Performance Dashboard',
        description: 'A multi-visual, beautifully formatted Power BI report featuring executive KPI cards, monthly revenue vs budget line trends, drill-through customer profiling, custom hover tooltips, and bookmark-based filter drawers.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Cramming 20+ cluttered charts onto a single page without visual hierarchy, overwhelming business stakeholders.',
      'Overusing 3D charts, pie charts with 15 slices, or rainbow color palettes that distract from the data insights.',
      'Forgetting to configure "Edit Interactions", causing unintended chart cross-filtering that confuses dashboard users.',
    ],
    nextStepPreview: 'Master Data Analysis Expressions to build custom business metrics in Stage 07: DAX & Analytical Calculations.',
  },
  {
    id: 'dax-analytical-calculations',
    stageNumber: '07',
    title: 'DAX & Analytical Calculations (Filter Context Mastery)',
    shortTitle: 'DAX & Calculations',
    tagline: 'Master Data Analysis Expressions (DAX), understand Row vs Filter Context, and build powerful Time Intelligence metrics.',
    iconName: 'Calculator',
    goal: 'Learn DAX to create powerful business calculations and analytical metrics.',
    whyItMatters:
      'DAX (Data Analysis Expressions) is the formula engine of Power BI. Simple drag-and-drop visuals only get you so far. To calculate Year-to-Date revenue, profit margins, moving averages, custom ranking, and dynamic targets, you must master DAX and its core engine: Filter Context.',
    learningOutcome: 'Build advanced analytical measures inside Power BI.',
    recommendedApproach:
      'Do not just memorize formulas. Deeply understand the difference between Calculated Columns (calculated at data refresh per row) and Measures (calculated dynamically on visual interaction). Master CALCULATE, FILTER, ALL, and Time Intelligence functions.',
    technologies: ['DAX', 'CALCULATE', 'Time Intelligence', 'DAX Studio', 'Power BI Desktop'],
    visualIntuition: {
      label: 'The DAX Filter Context Evaluation Engine',
      steps: [
        'VISUAL CELL INTERACTION (User clicks "South Region" & "2024" slicer)',
        'INITIAL FILTER CONTEXT (Region = South, Year = 2024 applied to data model)',
        'CALCULATE MODIFICATION (CALCULATE alters filter context e.g. REMOVEFILTERS or ALL)',
        'FILTER PROPAGATION (Filters flow down 1-to-many relationships to Fact table)',
        'MATHEMATICAL AGGREGATION (SUMX / DIVIDE calculates final dynamic numerical metric)',
      ],
    },
    topics: [
      {
        category: 'Calculated Columns vs Measures',
        items: [
          'Calculated Columns: Computed row-by-row during data refresh, stored in RAM, increases file size (Row Context)',
          'Measures: Computed dynamically on-the-fly based on visual slicers and filter context, zero storage cost (Golden Rule: Always prefer Measures)',
          'Implicit Measures (drag-and-drop sums) vs Explicit Measures (written DAX formulas - best practice)',
          'Organizing measures into dedicated Measure Tables (_AllMeasures) with display folders',
        ],
      },
      {
        category: 'Core DAX Aggregation & Scalar Functions',
        items: [
          'Basic Aggregations: SUM, COUNT, COUNTROWS, DISTINCTCOUNT, MIN, MAX, AVERAGE',
          'Iterator Functions (X-functions): SUMX, AVERAGEX, COUNTX (iterating row-by-row before aggregating)',
          'Safe Division: DIVIDE(Numerator, Denominator, AlternateResult) preventing divide-by-zero crashes',
          'Logical & Information Functions: IF, SWITCH(TRUE(), ...), ISBLANK, SELECTEDVALUE, COALESCE',
          'Relationship Functions: RELATED (pulling column from 1-side of relationship) and RELATEDTABLE',
        ],
      },
      {
        category: 'The King of DAX: CALCULATE & Filter Context',
        items: [
          'What is Filter Context? The set of all active filters applied to the data model from slicers, rows, columns, and report filters',
          'The CALCULATE Function: The only function capable of modifying, overriding, or adding to the active filter context',
          'Filter Modifiers: ALL (removes all filters), ALLEXCEPT, REMOVEFILTERS, KEEPFILTERS',
          'Calculating % of Total: DIVIDE([Total Sales], CALCULATE([Total Sales], ALL(Dim_Product)))',
          'Context Transition: How row context transforms into filter context inside CALCULATE',
        ],
      },
      {
        category: 'Time Intelligence & Advanced Business Metrics',
        items: [
          'Year-to-Date (YTD) & Month-to-Date (MTD): TOTALYTD([Total Sales], Dim_Date[Date]), DATESYTD',
          'Period-over-Period Comparisons: SAMEPERIODLASTYEAR, DATEADD(Dim_Date[Date], -1, MONTH), DATEADD(..., -1, YEAR)',
          'YoY Growth Calculation: [Total Sales] - [Sales Last Year], and YoY Growth % using DIVIDE',
          'Moving Averages: 7-day and 30-day rolling averages using DATESINPERIOD',
          'Ranking: RANKX(ALL(Dim_Customer), [Total Sales], , DESC, Dense)',
        ],
      },
    ],
    keyConcepts: [
      'Measures (Dynamic In-Memory) vs Calculated Columns (Row Storage)',
      'The CALCULATE Function & Filter Context Modification',
      'Removing Filter Context with ALL & REMOVEFILTERS for % of Total',
      'Time Intelligence (TOTALYTD, SAMEPERIODLASTYEAR, DATEADD)',
      'Iterating Tables with SUMX & Safe Division with DIVIDE',
    ],
    practiceSuggestions: [
      'Write DAX measures for [Total Revenue], [Total Cost], [Gross Profit], and [Gross Margin %] using DIVIDE.',
      'Create a [% of Category Sales] measure using CALCULATE and ALLSELECTED to compute market share dynamically.',
      'Build a complete Time Intelligence suite: [Sales YTD], [Sales SPLY (Same Period Last Year)], [YoY Sales Growth $], and [YoY Sales Growth %].',
    ],
    projectSuggestions: [
      {
        title: 'Enterprise Reusable DAX Business Calculation Library',
        description: 'A modular, well-documented DAX metric repository featuring 25+ essential measures covering Sales, Profitability, Growth Rates, Cumulative Moving Averages, Customer Ranking, and Time Intelligence.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Creating Calculated Columns for metrics like Profit Margin % instead of writing DAX Measures, resulting in incorrect average-of-averages aggregations.',
      'Writing [Sales] / [Target] using the slash operator instead of DIVIDE(), causing ugly errors when dividing by zero.',
      'Attempting to use Time Intelligence functions without a properly marked dedicated Date Dimension table.',
    ],
    nextStepPreview: 'Master visual storytelling, decluttering, and executive presentation in Stage 08: Data Visualization & Dashboard Design.',
  },
  {
    id: 'data-visualization-design',
    stageNumber: '08',
    title: 'Data Visualization, UX & Executive Dashboard Design',
    shortTitle: 'Data Visualization & Design',
    tagline: 'Learn data storytelling, visual hierarchy, decluttering principles, cognitive load reduction, and executive UX wireframing.',
    iconName: 'Presentation',
    goal: 'Learn how to communicate information visually and make dashboards easy to understand.',
    whyItMatters:
      'A dashboard with accurate data is useless if business executives cannot interpret it in 5 seconds. Great BI Analysts apply human psychology, Gestalt design principles, and visual hierarchy so decision-makers instantly see what changed, why it changed, and what action to take.',
    learningOutcome: 'Create dashboards that communicate clearly instead of overwhelming users.',
    recommendedApproach:
      'Follow the "Dashboard Anatomy" structure: Header → Primary KPIs → Trends → Categorical Breakdowns → Detailed Tables → Actionable Insights Panel. Eliminate chart junk and use color purposefully.',
    technologies: ['Data Storytelling', 'Figma / Wireframing', 'Power BI Canvas', 'Color Theory', 'Executive Reporting'],
    visualIntuition: {
      label: 'The 6-Section Executive Dashboard Anatomy',
      steps: [
        '1. HEADER (Title, department scope, currency, last refresh date & time)',
        '2. KPI SUMMARY BANNER (Top 4 metrics with actuals, targets, & variance indicators)',
        '3. PRIMARY TREND (Historical monthly trajectory with forecast / benchmark lines)',
        '4. CATEGORICAL BREAKDOWN (Regional, product, or channel slice-and-dice bar charts)',
        '5. OPERATIONAL DETAIL TABLE (Top/bottom performers with conditional data bars)',
        '6. ACTIONABLE INSIGHT PANEL (Written bullet points summarizing findings & recommendations)',
      ],
    },
    topics: [
      {
        category: 'Chart Selection Rules & Visual Matching',
        items: [
          'Comparing Categories: Horizontal Bar Charts (long labels) or Vertical Column Charts',
          'Showing Trends Over Time: Line Charts or Area Charts with continuous time axes',
          'Showing Part-to-Whole Composition: 100% Stacked Bar or Waterfall Charts (avoid pie charts with >3 slices)',
          'Showing Relationships & Correlations: Scatter Plots with trendlines and bubble sizes',
          'Displaying Critical Single Numbers: Big Number KPI Cards with sparklines and variance badges',
          'Showing Geographic Distribution: Filled Maps or Bubble Maps (use only when geographic location impacts decision)',
        ],
      },
      {
        category: 'Cognitive Load Reduction & Decluttering',
        items: [
          'The Data-to-Ink Ratio (Edward Tufte principle): Maximizing meaningful data ink while removing useless visual clutter',
          'Eliminating Chart Junk: Removing heavy gridlines, 3D effects, redundant legends, and unnecessary borders',
          'Direct Data Labeling: Placing labels directly on lines/bars instead of forcing users to look back and forth at legends',
          'Preventing Misleading Visuals: Always starting bar chart axes at zero; avoiding truncated or dual axes that distort scale',
        ],
      },
      {
        category: 'Visual Hierarchy & Gestalt Psychology',
        items: [
          'Gestalt Principles in BI: Proximity (grouping related cards), Similarity (same colors for same metrics), Enclosure (containers/cards)',
          'Reading Patterns: Designing for Z-pattern and F-pattern scanning (placing the most critical KPI in the top-left corner)',
          'Container & Card Layouts: Using subtle container borders and soft shadows to visually separate analytical modules',
          'Typography Hierarchy: Strict 3-level font hierarchy (KPI Big Number, Section Header, Body Label)',
        ],
      },
      {
        category: 'Color Meaning & Accessibility',
        items: [
          'The 60-30-10 Color Rule: 60% neutral background (light/dark slate), 30% secondary structural color, 10% high-contrast accent color',
          'Semantic Color Usage: Green (positive/target met), Red (negative/alert), Amber (warning/near target), Blue/Gray (neutral data)',
          'Colorblind Accessibility: Testing palettes for Deuteranopia and Protanopia (avoiding red-green only contrasts without icons)',
        ],
      },
    ],
    keyConcepts: [
      'Chart Selection Rules (Comparison, Trend, Composition, Distribution)',
      'Data-to-Ink Ratio & Decluttering Chart Junk',
      'The 6-Section Executive Dashboard Anatomy',
      'Semantic Color Strategy (Green/Red Alert Accents with 60-30-10 Rule)',
      'Colorblind Accessibility & Direct Data Labeling',
    ],
    practiceSuggestions: [
      'Take a cluttered dashboard with 8 colorful 3D pie charts and redesign it into a clean executive layout using only bar charts, a trend line, and 4 KPI cards.',
      'Apply the 60-30-10 color rule to a Power BI theme, ensuring high contrast and zero reliance on red-green color contrasts alone.',
      'Wireframe a 1-page executive dashboard layout in Figma or on paper following the 6-section dashboard anatomy.',
    ],
    projectSuggestions: [
      {
        title: 'Executive Dashboard UI/UX Redesign & Transformation',
        description: 'A before-and-after dashboard redesign project taking a chaotic, cluttered multi-colored legacy report and transforming it into a high-impact, decluttered executive dashboard built with strict visual hierarchy and accessibility standards.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Using multiple pie and donut charts on a single dashboard, making it impossible for humans to accurately compare slice angles.',
      'Truncating the Y-axis on bar charts to start at non-zero numbers, visually exaggerating minor percentage variations and misleading executives.',
      'Using random rainbow colors across charts instead of a consistent, intentional corporate color palette.',
    ],
    nextStepPreview: 'Define domain metrics and business indicators in Stage 09: Business KPIs & Domain Analytics.',
  },
  {
    id: 'business-kpis-domain-analytics',
    stageNumber: '09',
    title: 'Business KPIs & Domain Analytics',
    shortTitle: 'Business KPIs & Domains',
    tagline: 'Master domain-specific KPI frameworks across Sales, Marketing, Finance, Customer Retention, Operations, HR, and Product analytics.',
    iconName: 'Target',
    goal: 'Understand how BI Analysts measure business performance.',
    whyItMatters:
      'Different departments speak different languages. The marketing team cares about ROAS and MQLs; the finance team cares about EBITDA and working capital; the customer team cares about churn and CSAT. A senior BI Analyst translates domain goals into quantifiable metric trees.',
    learningOutcome: 'Translate business goals into measurable KPIs.',
    recommendedApproach:
      'Build a comprehensive KPI Dictionary. For every metric, document: Metric Name, Business Definition, Mathematical Formula, Target Benchmark, Data Source, and Actionable Executive Decision Trigger.',
    technologies: ['Sales Analytics', 'Marketing Analytics', 'Financial KPIs', 'Customer Analytics', 'Operations KPIs'],
    visualIntuition: {
      label: 'The Anatomy of a Production KPI',
      steps: [
        'METRIC NAME: Monthly Recurring Revenue (MRR) Churn Rate',
        'ACTUAL VALUE: 4.8% (Current month performance)',
        'TARGET BENCHMARK: < 2.5% (Company strategic threshold)',
        'VARIANCE & TREND: +2.3% above threshold (Negative trajectory ⚠️)',
        'BUSINESS CONTEXT: High churn concentrated in Enterprise tier after price hike',
        'DECISION TRIGGER: Alert Customer Success team to launch targeted retention campaign',
      ],
    },
    topics: [
      {
        category: 'Sales & Revenue Analytics',
        items: [
          'Top-Line Revenue: Gross Sales, Net Revenue, Monthly Recurring Revenue (MRR), Annual Recurring Revenue (ARR)',
          'Sales Productivity: Average Order Value (AOV), Sales Quota Attainment %, Win Rate, Sales Velocity',
          'Pipeline Analytics: Deal Stage Conversion Rates, Pipeline Coverage Ratio, Sales Cycle Length (Days to Close)',
        ],
      },
      {
        category: 'Marketing & Growth Analytics',
        items: [
          'Funnel Conversion: Impressions → Clicks (CTR) → Leads (MQL) → Opportunities (SQL) → Closed Customers',
          'Acquisition Costs: Customer Acquisition Cost (CAC), Cost Per Lead (CPL), Cost Per Acquisition (CPA)',
          'Return on Investment: Return on Ad Spend (ROAS = Revenue / Ad Spend), Marketing ROI %',
        ],
      },
      {
        category: 'Customer Retention & Unit Economics',
        items: [
          'Retention & Churn: Customer Churn Rate %, Revenue Churn %, Net Revenue Retention (NRR > 100% = expansion)',
          'Customer Lifetime Value (LTV / CLV) and LTV:CAC ratio benchmarks (3:1 to 5:1)',
          'Satisfaction & Engagement: Net Promoter Score (NPS), Customer Satisfaction Score (CSAT), Repeat Purchase Rate',
        ],
      },
      {
        category: 'Finance, Operations & Supply Chain KPIs',
        items: [
          'Financial Margins: Gross Margin %, Operating Margin (EBITDA %), Net Profit Margin %',
          'Operations & Fulfillment: Order Fulfillment Cycle Time, On-Time Delivery Rate (OTD %), Return Rate %',
          'Inventory Management: Inventory Turnover Ratio, Days Sales of Inventory (DSI), Stockout Rate',
        ],
      },
    ],
    keyConcepts: [
      'Customer Acquisition Cost (CAC) & LTV:CAC Ratio Analysis',
      'Net Revenue Retention (NRR) & Churn Rate Formulas',
      'Marketing Conversion Funnels & Return on Ad Spend (ROAS)',
      'Sales Pipeline Coverage & Win Rate Calculation',
      'The Comprehensive KPI Dictionary Architecture',
    ],
    practiceSuggestions: [
      'Create an Excel or Notion KPI Dictionary documenting 20 core business metrics with formulas, definitions, and decision triggers.',
      'Calculate Net Revenue Retention (NRR) for a SaaS company starting with $1M ARR, adding $200k expansion, losing $50k churn, and $20k contraction.',
      'Design a marketing campaign performance scorecard tracking CPL, CAC, and ROAS across Google Ads, Facebook Ads, and LinkedIn Ads.',
    ],
    projectSuggestions: [
      {
        title: 'Enterprise Multi-Department KPI Master Framework & Dictionary',
        description: 'A comprehensive business intelligence KPI dictionary and dashboard framework mapping out 30+ standardized metrics across Sales, Marketing, Customer Success, and Operations with exact DAX formulas and executive decision triggers.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Tracking vanity metrics (like raw page views or social followers) that look impressive but have zero connection to revenue or business health.',
      'Reporting a metric without a target, benchmark, or historical comparison (e.g. reporting "$400k revenue" without indicating whether that beats the $500k target).',
      'Allowing different departments to use conflicting definitions for the same metric (e.g. Sales defining "Customer" differently than Finance).',
    ],
    nextStepPreview: 'Scale into enterprise deployments, security, and workspaces in Stage 10: Advanced Power BI & Service Administration.',
  },
  {
    id: 'advanced-power-bi',
    stageNumber: '10',
    title: 'Advanced Power BI & Service Administration',
    shortTitle: 'Advanced Power BI',
    tagline: 'Master Power BI Service workspaces, Row-Level Security (RLS), incremental refresh, performance optimization, and parameters.',
    iconName: 'Cloud',
    goal: 'Move from basic dashboards to scalable professional BI solutions.',
    whyItMatters:
      'In corporate environments, dashboards must be secured, automated, and shared across hundreds of employees. BI Analysts must master Power BI Service, configure Row-Level Security so regional managers only see their own data, set up automated daily data refreshes, and optimize slow models.',
    learningOutcome: 'Build BI solutions that are closer to real workplace environments.',
    recommendedApproach:
      'Deploy models to Power BI Service. Implement dynamic Row-Level Security (USERPRINCIPALNAME), configure scheduled gateway refreshes, and profile slow measures using DAX Studio and Performance Analyzer.',
    technologies: ['Power BI Service', 'Row-Level Security (RLS)', 'Performance Analyzer', 'DAX Studio', 'Power BI Gateways'],
    visualIntuition: {
      label: 'Power BI Service Enterprise Architecture',
      steps: [
        'POWER BI DESKTOP (Author semantic data model & define RLS security roles)',
        'PUBLISH TO SERVICE (Publishes to dedicated Development / Production Workspaces)',
        'ON-PREMISES GATEWAY (Securely connects cloud Service to corporate databases)',
        'SCHEDULED REFRESH (Automates daily data updates at 6:00 AM UTC)',
        'ROW-LEVEL SECURITY (Filters data dynamically based on user email login)',
        'POWER BI APPS (Packages curated reports for executive end-user consumption)',
      ],
    },
    topics: [
      {
        category: 'Power BI Service Architecture & Collaboration',
        items: [
          'Power BI Service Navigation: Personal My Workspace vs Shared Collaborative Workspaces (Admin, Member, Contributor, Viewer roles)',
          'Semantic Models (formerly Datasets) vs Reports vs Dashboards (tile pinning)',
          'Power BI Apps: Packaging and distributing curated collections of reports to business consumers without giving direct workspace edit access',
          'Deployment Pipelines: Development → Test → Production lifecycle management',
        ],
      },
      {
        category: 'Data Refresh Automation & Gateways',
        items: [
          'Configuring Scheduled Refresh in Power BI Service (Pro = 8x/day; Premium = 48x/day)',
          'On-Premises Data Gateways: Standard Gateway (multi-user enterprise) vs Personal Gateway',
          'Incremental Refresh: Refreshing only the most recent days/months of data rather than reloading historical millions of rows',
          'Monitoring refresh history, debugging credential errors, and configuring email failure notifications',
        ],
      },
      {
        category: 'Row-Level Security (RLS) & Governance',
        items: [
          'Static Row-Level Security: Creating fixed security roles (e.g. "East Region Manager" with Region = "East")',
          'Dynamic Row-Level Security: Using USERPRINCIPALNAME() and security mapping tables to dynamically restrict data to logged-in user email',
          'Testing RLS security in Power BI Desktop ("View as Role") and Power BI Service',
          'Data Loss Prevention (DLP) sensitivity labels and export restrictions',
        ],
      },
      {
        category: 'Performance Optimization & Diagnostic Tools',
        items: [
          'Using Power BI Performance Analyzer to inspect visual display times, DAX query times, and visual render latency',
          'Optimizing Data Models with DAX Studio and VertiPaq Analyzer: Removing high-cardinality unused columns and reducing memory footprint',
          'What-If Parameters and Field Parameters: Allowing users to dynamically toggle chart axes and metrics without duplicating pages',
        ],
      },
    ],
    keyConcepts: [
      'Power BI Service Workspaces, Permissions & Apps Distribution',
      'Dynamic Row-Level Security (RLS) with USERPRINCIPALNAME()',
      'Scheduled Refresh Automation & On-Premises Data Gateways',
      'Incremental Refresh Policies for Large-Scale Datasets',
      'Performance Profiling with DAX Studio & Performance Analyzer',
    ],
    practiceSuggestions: [
      'Implement Dynamic Row-Level Security in Power BI Desktop using a UserSecurity mapping table and test it using "View As".',
      'Publish a report to Power BI Service, configure scheduled daily refresh, and test sharing the report via a packaged Power BI App.',
      'Use Performance Analyzer in Power BI Desktop to find the slowest visual on a page and optimize the underlying DAX measure.',
    ],
    projectSuggestions: [
      {
        title: 'Enterprise Multi-Tier Power BI Solution with Dynamic RLS',
        description: 'A complete corporate Power BI deployment featuring dynamic Row-Level Security filtering by logged-in regional director emails, automated daily gateway refresh schedules, Field Parameters for dynamic axis toggling, and Power BI App packaging.',
        level: 'Advanced',
      },
    ],
    commonMistakes: [
      'Granting business consumers direct Contributor or Admin permissions to development workspaces instead of publishing a clean, read-only Power BI App.',
      'Failing to test Row-Level Security before publishing, accidentally exposing confidential salary or executive financial data to unauthorized staff.',
      'Leaving high-cardinality timestamp or UUID columns in the data model, bloating memory usage and slowing down report refreshes.',
    ],
    nextStepPreview: 'Understand modern data ecosystems and enterprise pipelines in Stage 11: BI Architecture, Automation & Data Ecosystem.',
  },
  {
    id: 'bi-architecture-automation',
    stageNumber: '11',
    title: 'BI Architecture, Automation & Data Ecosystem',
    shortTitle: 'BI Architecture & Ecosystem',
    tagline: 'Understand where BI fits in the modern enterprise data stack: Data Warehouses, semantic layers, dbt, and Power Automate alerts.',
    iconName: 'Workflow',
    goal: 'Understand where BI fits inside a modern organization’s data ecosystem.',
    whyItMatters:
      'BI does not exist in a silo. Modern BI Analysts work alongside Data Engineers and Analytics Engineers. You must understand how raw data moves from production databases into cloud data warehouses (Snowflake, BigQuery), how semantic models are maintained, and how to automate alerts using Power Automate.',
    learningOutcome: 'Understand how BI operates as part of an organization’s broader data platform.',
    recommendedApproach:
      'Map out the Modern Data Stack (MDS). Understand the flow: Data Sources → Ingestion/ELT → Cloud Data Warehouse → Semantic Model → Power BI → Business Users. Learn to trigger automated alerts when KPIs breach thresholds.',
    technologies: ['Modern BI Architecture', 'Snowflake', 'BigQuery', 'Power Automate', 'dbt Semantic Layer concepts'],
    visualIntuition: {
      label: 'The Modern BI Architecture Stack',
      steps: [
        'DATA SOURCES (PostgreSQL, CRM, ERP, Google Ads, Stripe)',
        'DATA WAREHOUSE / LAKEHOUSE (Snowflake / BigQuery / Databricks)',
        'TRANSFORMATION & MODELING (dbt models / Star Schemas in warehouse)',
        'CENTRALIZED SEMANTIC MODEL (Golden Dataset in Power BI Service)',
        'CONSUMPTION LAYER (Power BI Reports, Paginated Reports, Excel PivotTables)',
        'ACTION AUTOMATION (Power Automate triggers Slack alerts on KPI drops)',
      ],
    },
    topics: [
      {
        category: 'The Modern BI Architecture Stack',
        items: [
          'End-to-End Architecture: Sources → Ingestion → Cloud Data Warehouse → Transformation → Semantic Layer → Power BI → Users',
          'Cloud Data Warehouses in BI: Snowflake, Google BigQuery, Amazon Redshift, Databricks Lakehouse',
          'The Concept of the "Golden Semantic Model": Centralizing business logic in one reusable dataset to create a Single Source of Truth',
          'Thin Reports: Building multiple separate Power BI reports that all connect live to a single centralized Semantic Model',
        ],
      },
      {
        category: 'Business Intelligence Governance & Standards',
        items: [
          'BI Governance: Standardized naming conventions, metric certified badges, dataset endorsement (Promoted vs Certified)',
          'Data Lineage & Impact Analysis: Tracing which downstream dashboards break if a database table column is modified',
          'Version Control concepts for BI: Power BI Project files (.pbip) and Git integration with Azure DevOps / GitHub',
          'Documenting data dictionaries and maintaining semantic measure definitions in shared company wikis',
        ],
      },
      {
        category: 'Workflow Automation with Power Automate',
        items: [
          'Data-Driven Alerts: Setting threshold alerts on Power BI KPI cards (e.g. alert if Daily Revenue < $50,000)',
          'Power Automate Flows: Triggering automated Slack/Teams messages, emails, or Jira tickets when an alert fires',
          'Automated Export & Distribution: Generating and emailing daily PDF/Excel executive summaries automatically',
        ],
      },
    ],
    keyConcepts: [
      'The Modern Data Stack Architecture for Business Intelligence',
      'Centralized "Golden Semantic Model" & Thin Reports Pattern',
      'Dataset Endorsement (Certified vs Promoted Datasets)',
      'Data-Driven Alerts & Power Automate Workflow Triggers',
      'Data Lineage & Git Version Control with Power BI (.pbip)',
    ],
    practiceSuggestions: [
      'Create a centralized "Golden Dataset" in Power BI Desktop with full Star Schema relationships and DAX measures, publish it, and build two separate "Thin Reports" connecting live to it.',
      'Configure a data-driven alert on a Power BI KPI card that triggers an email alert whenever profit margin drops below 15%.',
      'Document a complete end-to-end data lineage diagram tracing data from a source SQL table through a data warehouse into a Power BI executive visual.',
    ],
    projectSuggestions: [
      {
        title: 'Enterprise Modern BI Architecture & Automated Alerting Platform',
        description: 'An architectural design and implementation featuring a centralized Golden Semantic Model, multiple thin departmental reports, automated threshold alerts triggering Power Automate notifications, and Git-versioned .pbip project files.',
        level: 'Advanced',
      },
    ],
    commonMistakes: [
      'Building separate siloed data models inside every single report, causing different departments to show conflicting revenue numbers.',
      'Failing to establish a Single Source of Truth for core KPIs, leading to endless executive debates over whose dashboard is "correct".',
      'Ignoring data lineage, modifying database schemas without checking which critical executive dashboards will break.',
    ],
    nextStepPreview: 'Master executive business storytelling, stakeholder management, and portfolio delivery in Stage 12: Advanced BI & Production Analytics.',
  },
  {
    id: 'advanced-bi-production-analytics',
    stageNumber: '12',
    title: 'Advanced BI, Production Analytics & Business Storytelling',
    shortTitle: 'Advanced BI & Storytelling',
    tagline: 'Master executive communication, cohort analysis, Pareto 80/20 diagnostics, stakeholder requirement gathering, and portfolio delivery.',
    iconName: 'TrendingUp',
    goal: 'Develop the skills required to work as a professional BI Analyst in real organizations.',
    whyItMatters:
      'The greatest technical dashboard in the world is useless if you cannot convince executives to take action. Senior BI Analysts excel at requirement gathering, executive presentations, translating complex numbers into clear business narratives, and driving measurable operational change.',
    learningOutcome: 'Think like a BI professional who supports real business decisions rather than someone who only creates charts.',
    recommendedApproach:
      'Practice executive business storytelling. Structure presentations: The Executive Summary (Headline) → The Evidence (Data & Drivers) → The Root Cause (Diagnostic Analysis) → The Recommended Strategic Action.',
    technologies: ['Executive Storytelling', 'Cohort Analysis', 'Pareto 80/20 Analysis', 'Stakeholder Management', 'Portfolio Delivery'],
    visualIntuition: {
      label: 'The Executive Storytelling Framework',
      steps: [
        '1. THE HEADLINE: Q3 Net Profit fell by 14% ($420k deficit vs budget)',
        '2. THE CORE DRIVER: South Region Category B sales suffered a 38% drop',
        '3. THE ROOT CAUSE: Supplier defect caused a 4.2x spike in customer product returns',
        '4. THE STRATEGIC RECOMMENDATION: Terminate vendor contract, refund affected VIPs, & reallocate $150k marketing budget',
      ],
    },
    topics: [
      {
        category: 'Advanced Diagnostic Analytics Techniques',
        items: [
          'Pareto 80/20 Analysis: Identifying the 20% of products or customers generating 80% of revenue or 80% of returns',
          'Cohort Analysis & Retention Heatmaps: Tracking customer group behavior over time to measure true product-market fit',
          'Funnel & Conversion Drop-Off Analysis: Pinpointing exact stages where potential buyers abandon shopping carts',
          'Variance Analysis (Bridge / Waterfall Charts): Decomposing the exact dollar factors explaining profit budget variances (Price vs Volume vs Cost)',
        ],
      },
      {
        category: 'Executive Business Storytelling & Presentations',
        items: [
          'The Minto Pyramid Principle: Starting with the bottom-line conclusion first, followed by supporting arguments and data evidence',
          'Creating 1-Page Executive Briefings: Summarizing complex 10-page reports into 3 high-impact bullet points for C-level executives',
          'Transforming Insights into Actions: Every analytical finding must be paired with a concrete business recommendation',
          'Handling tough stakeholder questions and explaining data uncertainties transparently',
        ],
      },
      {
        category: 'Stakeholder Management & Agile BI Delivery',
        items: [
          'Requirement Gathering Interviews: Asking "What decision will you make with this data?" instead of "What charts do you want?"',
          'Building Rapid Wireframe Prototypes in Figma/Excel to align on business metrics before building full models',
          'Managing Dashboard Scope Creep and prioritizing high-impact business requests using MoSCoW prioritization',
          'Post-Launch Monitoring: Tracking dashboard adoption, user engagement, and gathering ongoing feedback for continuous improvements',
        ],
      },
      {
        category: 'Flagship BI Portfolio & Career Launch',
        items: [
          'Building a Standout BI Portfolio: Hosting interactive Power BI reports via web publish or video walkthroughs',
          'Writing Compelling GitHub / Notion Case Studies: Documenting Business Problem, Data Model ERD, DAX Measures, Insights, and Actions',
          'Technical & Behavioral Interview Prep: SQL live-coding tests, DAX filter context explanations, and case study presentations',
        ],
      },
    ],
    keyConcepts: [
      'The Minto Pyramid Principle (Bottom-Line Conclusion First)',
      'Pareto 80/20 Analysis & Waterfall Variance Decomposition',
      'Stakeholder Requirement Gathering ("What Decision Will You Make?")',
      'Translating Complex Data Insights into Actionable Recommendations',
      'Documenting End-to-End Business Case Studies for Portfolios',
    ],
    practiceSuggestions: [
      'Write a 1-page C-suite executive memo explaining why quarterly customer acquisition cost (CAC) increased 35%, concluding with 2 concrete recommendations.',
      'Build a Pareto 80/20 DAX calculation in Power BI that dynamically classifies products into "Top 80% Drivers" vs "Bottom 20% Drivers".',
      'Conduct a mock stakeholder requirement interview with a colleague, defining project scope and metrics before touching Power BI.',
    ],
    projectSuggestions: [
      {
        title: 'Flagship Enterprise Business Intelligence Platform & Executive Brief',
        description: 'A portfolio-defining business intelligence project combining an end-to-end Power BI data model, DAX metrics library, executive dashboard with RLS, written C-suite executive briefing memo, and complete GitHub case study documentation.',
        level: 'Portfolio-Level',
      },
    ],
    commonMistakes: [
      'Presenting raw data and technical query mechanics to executives instead of answering "What does this mean for the business?"',
      'Building dashboards based on unvalidated requests without asking what specific decision the stakeholder intends to make.',
      'Failing to provide concrete actionable recommendations alongside identified problem insights.',
    ],
    nextStepPreview: 'You have completed the entire BI Analyst learning roadmap! Build your flagship portfolio project and launch your career.',
  },
];

export const BI_PROJECT_PROGRESSION: BIProjectProgression[] = [
  {
    id: 'excel-sales-dashboard',
    stage: 'Project 01 — Beginner',
    name: 'Excel Multi-Tab Sales & Profitability Dashboard',
    difficulty: 'Beginner',
    businessProblem: 'Management lacks visibility into regional product performance and needs an automated spreadsheet tool to analyze monthly revenue, gross margins, and top sales representatives.',
    description: 'An interactive multi-tab Excel financial workbook featuring cleaned transactional records, automated XLOOKUP lookups, synchronized Pivot Tables, dynamic monthly variance charts, and interactive slicers.',
    dataset: '50,000+ row retail transactional sales dataset across 4 geographical regions and 8 product categories.',
    dataSources: 'Raw CSV sales exports and master product/customer lookup tables.',
    dataModel: 'Cleaned transactional table linked via XLOOKUP formulas to master dimensional lookup tabs.',
    kpis: ['Total Revenue', 'Gross Profit', 'Profit Margin %', 'Total Units Sold', 'Average Order Value (AOV)'],
    dashboardPages: ['Executive Summary', 'Regional Analysis', 'Product Performance', 'Sales Rep Leaderboard'],
    technologies: ['Microsoft Excel 365', 'Pivot Tables & Charts', 'XLOOKUP / SUMIFS', 'Dynamic Arrays', 'Slicers'],
    businessInsights: 'Identified that while the West region drove 42% of volume, its profit margin was 8% lower due to excessive promotional discounting.',
    githubReqs: 'Clean Excel workbook (.xlsx), PDF executive summary report, formula documentation, and screenshot walkthrough.',
    skillsLearned: ['Excel Modeling', 'XLOOKUP Formulas', 'Pivot Tables', 'Conditional Formatting', 'Financial KPIs'],
  },
  {
    id: 'sql-business-intelligence',
    stage: 'Project 02 — Beginner / Intermediate',
    name: 'E-Commerce SQL Business Intelligence & Customer Analytics',
    difficulty: 'Intermediate',
    businessProblem: 'Leadership needs to extract deep business insights from raw relational databases: customer cohort retention, RFM segmentation, and product return rate drivers.',
    description: 'A comprehensive SQL analytics suite querying a multi-table relational database to compute monthly revenue trends, customer lifetime value, RFM customer tiers, and cohort retention heatmaps.',
    dataset: 'Relational e-commerce database containing Orders, Order_Items, Customers, Products, Payments, and Reviews.',
    dataSources: 'PostgreSQL relational database with 500,000+ transactional records.',
    dataModel: 'Relational 3NF operational schema transformed into analytical CTE views.',
    kpis: ['Monthly Revenue Growth %', 'Cohort Retention Rate', 'Customer Lifetime Value (LTV)', 'RFM Customer Score', 'Return Rate %'],
    dashboardPages: ['Revenue Queries', 'Cohort Retention Matrix', 'RFM Customer Segmentation', 'Product Returns'],
    technologies: ['PostgreSQL', 'SQL Window Functions', 'CTEs & Subqueries', 'DBeaver', 'DuckDB'],
    businessInsights: 'Discovered that customers acquired in Q1 had a 38% higher 6-month retention rate than Q3 customers, driven by onboarding discounts.',
    githubReqs: 'Organized .sql query files with inline comments, ER diagram image, sample output CSVs, and markdown analytical findings writeup.',
    skillsLearned: ['Analytical SQL', 'Window Functions', 'Cohort Retention', 'RFM Segmentation', 'Data Extraction'],
  },
  {
    id: 'power-bi-sales-dashboard',
    stage: 'Project 03 — Intermediate',
    name: 'Interactive Power BI Executive Sales & Profitability Report',
    difficulty: 'Intermediate',
    businessProblem: 'Executive leadership needs an automated, interactive Power BI dashboard replacing manual weekly spreadsheet reporting.',
    description: 'A modern Power BI dashboard built on a Kimball Star Schema featuring custom DAX measures, KPI cards, monthly revenue vs target trend lines, drill-through customer profiling, and custom hover tooltips.',
    dataset: '2-year historical multi-channel retail sales dataset with 200,000+ line items and monthly target budgets.',
    dataSources: 'PostgreSQL database tables and Excel monthly budget target schedules.',
    dataModel: 'Star Schema with Fact_Sales connected to Dim_Customer, Dim_Product, Dim_Store, and Dim_Date.',
    kpis: ['Total Revenue', 'Gross Profit Margin %', 'Revenue vs Target Variance %', 'Total Orders', 'YoY Growth %'],
    dashboardPages: ['Executive Overview', 'Product Profitability', 'Regional Slicing', 'Customer Drill-Through'],
    technologies: ['Power BI Desktop', 'Power Query', 'DAX Measures', 'Star Schema', 'Interactive Tooltips'],
    businessInsights: 'Revealed that Category B products accounted for 64% of all product returns, erasing profitability in the Southern sales territory.',
    githubReqs: 'Power BI template (.pbit / .pbix), data model ERD diagram, DAX measure reference guide, and high-res dashboard screenshots.',
    skillsLearned: ['Power BI Canvas Design', 'Star Schema Modeling', 'Core DAX Measures', 'Drill-Through Pages', 'Visual Hierarchy'],
  },
  {
    id: 'customer-analytics-dashboard',
    stage: 'Project 04 — Intermediate',
    name: 'Customer Retention, Churn & Lifetime Value Analytics',
    difficulty: 'Intermediate',
    businessProblem: 'Subscription business is experiencing rising customer churn and needs visibility into cohort retention, churn predictors, and customer lifetime value (LTV).',
    description: 'A dedicated customer intelligence dashboard tracking subscriber cohorts, monthly recurring revenue (MRR) movements, customer health scores, and churn risk segments in Power BI.',
    dataset: 'SaaS subscription database tracking 25,000+ subscribers, monthly billing events, support tickets, and churn flags.',
    dataSources: 'Stripe subscription exports and Zendesk customer support ticket logs.',
    dataModel: 'Star Schema with Fact_Subscriptions and Fact_SupportTickets linked to Dim_User and Dim_Plan.',
    kpis: ['Monthly Recurring Revenue (MRR)', 'Net Revenue Retention (NRR)', 'Customer Churn Rate %', 'Average LTV', 'CAC Payback'],
    dashboardPages: ['MRR Watermark & Growth', 'Cohort Retention Heatmap', 'Churn Risk Predictors', 'Customer Health Scorecard'],
    technologies: ['Power BI', 'Advanced DAX', 'Cohort Analysis', 'Power Query M', 'Matrix Formatting'],
    businessInsights: 'Found that users submitting 3+ support tickets in their first 30 days had a 72% likelihood of churn within 90 days.',
    githubReqs: 'Power BI file, cohort matrix walkthrough, DAX formula breakdown, and executive summary recommendations.',
    skillsLearned: ['SaaS Unit Economics', 'Cohort Matrix in DAX', 'Churn Analysis', 'Net Revenue Retention (NRR)', 'Customer Segmentation'],
  },
  {
    id: 'enterprise-power-bi-service',
    stage: 'Project 05 — Advanced',
    name: 'Enterprise Multi-Department BI Solution with Dynamic RLS',
    difficulty: 'Advanced',
    businessProblem: 'Corporate enterprise requires a secured Power BI deployment where 15 regional sales directors access a single dashboard but only view data for their assigned territories.',
    description: 'A production Power BI solution featuring dynamic Row-Level Security (RLS) based on user login emails, Field Parameters for dynamic axis toggling, automated daily gateway refresh, and Power BI App packaging.',
    dataset: 'Enterprise global sales and supply chain dataset with 1,000,000+ rows across North America, Europe, and Asia-Pacific.',
    dataSources: 'Enterprise SQL Server database connected via On-Premises Data Gateway.',
    dataModel: 'Multi-fact Star Schema (Fact_Sales, Fact_Budget, Fact_Inventory) with conformed dimensions and UserSecurity table.',
    kpis: ['Regional Quota Attainment %', 'Operating Margin %', 'Inventory Stockout Rate %', 'On-Time Delivery %'],
    dashboardPages: ['Regional Director Portal', 'Global Financial Summary', 'Inventory Health', 'Security Role Simulator'],
    technologies: ['Power BI Service', 'Dynamic Row-Level Security (RLS)', 'Field Parameters', 'Data Gateway', 'DAX Studio'],
    businessInsights: 'Streamlined corporate reporting from 15 separate regional files into 1 centralized, secure Power BI App, saving 20+ hours of weekly manual reporting.',
    githubReqs: 'Architecture blueprint, RLS DAX security formulas, Power BI App governance guide, and Performance Analyzer benchmark report.',
    skillsLearned: ['Power BI Service Administration', 'Dynamic RLS Security', 'Data Gateway Configuration', 'Field Parameters', 'Enterprise Governance'],
  },
  {
    id: 'end-to-end-bi-platform',
    stage: 'Project 06 — Portfolio Level',
    name: 'End-to-End Business Intelligence Platform & Executive Brief',
    difficulty: 'Portfolio-Level',
    businessProblem: 'Executive board requires a complete analytical platform connecting raw business data, automated pipelines, centralized semantic models, and written C-level strategic decision memos.',
    description: 'A flagship modern BI platform featuring automated SQL/Power Query data preparation, a robust Star Schema model, a 30+ DAX measure library, an executive dashboard with RLS, and a written 1-page C-suite decision briefing memo.',
    dataset: 'Omnichannel retail enterprise dataset combining in-store POS transactions, e-commerce orders, digital marketing spend, and inventory logs.',
    dataSources: 'PostgreSQL database, Google Ads API exports, and ERP inventory tables.',
    dataModel: 'Comprehensive Star Schema with conformed Customer, Product, Marketing Channel, Store, and Calendar dimensions.',
    kpis: ['Net Profit Margin %', 'Customer Lifetime Value (LTV)', 'Return on Ad Spend (ROAS)', 'Net Revenue Retention (NRR)', 'Inventory Turns'],
    dashboardPages: ['Executive C-Suite Briefing', 'Omnichannel Sales Engine', 'Marketing ROI & Attribution', 'Supply Chain & Inventory', 'Customer Lifetime Value'],
    technologies: ['SQL', 'Power Query ETL', 'Power BI Desktop & Service', 'DAX Studio', 'Executive Storytelling', 'GitHub'],
    businessInsights: 'Delivered 3 transformative executive recommendations: reallocate $250k from underperforming Facebook ad campaigns to Google Search, renegotiate terms with top 2 suppliers, and launch VIP retention loyalty program.',
    githubReqs: 'Complete GitHub repository with .pbix file, SQL DDL scripts, DAX metric dictionary, 1-page executive PDF briefing memo, and live video walkthrough link.',
    skillsLearned: ['Full-Stack Business Intelligence', 'C-Suite Executive Storytelling', 'Advanced DAX & Star Modeling', 'Modern Data Stack Governance', 'Portfolio-Grade Presentation'],
  },
];

export const BI_WORKFLOW_STAGES: BIWorkflowStage[] = [
  {
    id: 'business-question',
    stepNumber: '01',
    stepName: 'Business Question',
    whatHappens: 'Stakeholders or executives pose a strategic business challenge (e.g. "Why did quarterly profitability drop in the South region?").',
    whyItMatters: 'Every successful BI project begins with a clear decision to be made, not a tool or a chart.',
    commonTools: ['Stakeholder Interviews', 'Project Scoping Brief', 'Figma Wireframing'],
    example: 'Management needs to know which product lines to discount vs discontinue next quarter.',
    commonMistakes: 'Jumping directly into building charts before understanding what business decision needs to be made.',
    output: 'Documented Business Problem Brief with defined audience & target decisions.',
    icon: 'Briefcase',
  },
  {
    id: 'data-sources-identification',
    stepNumber: '02',
    stepName: 'Data Sources',
    whatHappens: 'Identify where the relevant business data lives across databases, ERPs, CRMs, APIs, and spreadsheets.',
    whyItMatters: 'Ensures all required dimensions (Customer, Product, Date) and measures (Revenue, Cost) are accessible.',
    commonTools: ['PostgreSQL', 'SQL Server', 'Stripe', 'Salesforce / HubSpot', 'Excel'],
    example: 'Connecting to production order database and pulling marketing ad spend exports.',
    commonMistakes: 'Assuming all required data is in a single clean spreadsheet.',
    output: 'Data Source Inventory & connection credentials.',
    icon: 'Database',
  },
  {
    id: 'data-extraction-cleaning',
    stepNumber: '03',
    stepName: 'Data Cleaning & ETL',
    whatHappens: 'Extract raw tables, remove duplicates, handle missing values, standardize text categories, and enforce data types.',
    whyItMatters: 'Dirty data leads to wrong KPIs, broken calculations, and lost executive trust.',
    commonTools: ['Power Query', 'SQL Queries', 'Python / Pandas'],
    example: 'Unpivoting monthly budget columns and standardizing country names into ISO codes.',
    commonMistakes: 'Manually editing Excel cells instead of creating automated, repeatable Power Query steps.',
    output: 'Clean, normalized staging tables ready for modeling.',
    icon: 'Filter',
  },
  {
    id: 'data-modeling-star',
    stepNumber: '04',
    stepName: 'Data Modeling',
    whatHappens: 'Structure clean tables into a Kimball Star Schema: Central Fact tables connected to Dimension tables with 1-to-many relationships.',
    whyItMatters: 'The foundation of Power BI performance. Good models make DAX simple; bad models make DAX impossible.',
    commonTools: ['Power BI Model View', 'Kimball Methodology', 'Date Tables'],
    example: 'Connecting Fact_Sales to Dim_Customer, Dim_Product, Dim_Store, and Dim_Date.',
    commonMistakes: 'Building dashboards on one massive 100-column flat table or using bi-directional cross-filtering everywhere.',
    output: 'High-performance Star Schema with active 1-to-many relationships.',
    icon: 'Layers',
  },
  {
    id: 'dax-calculations',
    stepNumber: '05',
    stepName: 'DAX Metrics & KPIs',
    whatHappens: 'Write explicit DAX measures for core business calculations, Year-over-Year growth, and time intelligence.',
    whyItMatters: 'Measures compute dynamically based on slicers and filter context with zero extra file storage cost.',
    commonTools: ['DAX', 'CALCULATE', 'DIVIDE', 'DAX Studio'],
    example: 'Writing [YoY Sales Growth %] and [Net Profit Margin %] measures.',
    commonMistakes: 'Creating Calculated Columns for aggregated ratios instead of writing dynamic DAX Measures.',
    output: 'Centralized, reusable DAX Measure library.',
    icon: 'Calculator',
  },
  {
    id: 'dashboard-visualization',
    stepNumber: '06',
    stepName: 'Dashboard Design & UX',
    whatHappens: 'Design intuitive, decluttered report pages following the 6-section dashboard anatomy and visual hierarchy.',
    whyItMatters: 'Allows decision-makers to scan top KPIs in 5 seconds and drill into root causes intuitively.',
    commonTools: ['Power BI Visuals', 'Cards', 'Line Trends', 'Matrix Tables', 'Tooltips'],
    example: 'Building an executive summary page with KPI cards, monthly trends, and regional breakdowns.',
    commonMistakes: 'Using 3D charts, colorful pie charts with 15 slices, or cramming 20 charts onto one page.',
    output: 'Interactive, polished Power BI report canvas.',
    icon: 'Presentation',
  },
  {
    id: 'insight-generation',
    stepNumber: '07',
    stepName: 'Insight Discovery',
    whatHappens: 'Analyze the dashboard data to discover unexpected trends, correlations, outliers, and root causes.',
    whyItMatters: 'Charts only show data; business value comes from interpreting what the numbers mean.',
    commonTools: ['Pareto 80/20 Analysis', 'Drill-Through', 'Decomposition Tree'],
    example: 'Discovering that 80% of product returns came from a single defective supplier batch.',
    commonMistakes: 'Stopping at descriptive observations ("Sales are down") without uncovering the root cause ("Why are sales down?").',
    output: 'Documented analytical findings and root-cause evidence.',
    icon: 'TrendingUp',
  },
  {
    id: 'business-decision-action',
    stepNumber: '08',
    stepName: 'Decision & Action',
    whatHappens: 'Present findings to leadership with concrete, prioritized strategic recommendations.',
    whyItMatters: 'The ultimate purpose of Business Intelligence: driving measurable, data-backed operational change.',
    commonTools: ['Executive Summary Memo', 'Stakeholder Presentation', 'Power Automate Alerts'],
    example: 'Reallocating $150,000 in marketing budget from low-ROI social ads to high-intent search ads.',
    commonMistakes: 'Presenting technical query mechanics instead of business recommendations.',
    output: 'Executive action taken, improving business profitability.',
    icon: 'CheckCircle2',
  },
];

export const BI_SPECIALIZATIONS: BISpecialization[] = [
  {
    title: 'Power BI Analyst / Developer',
    description: 'Specializes in the Microsoft BI ecosystem: advanced DAX formulas, Power Query M, Star Schema data modeling, Power BI Service administration, and executive reporting.',
    coreTech: ['Power BI Desktop', 'DAX', 'Power Query (M)', 'Power BI Service', 'SQL'],
    focus: 'Enterprise dashboard design, semantic modeling, DAX performance tuning, and executive visualization.',
    icon: 'BarChart3',
  },
  {
    title: 'Tableau Business Intelligence Analyst',
    description: 'Focuses on Tableau visual analytics, Level of Detail (LOD) expressions, Tableau Server/Cloud governance, and exploratory visual storytelling.',
    coreTech: ['Tableau Desktop', 'Tableau Prep', 'LOD Expressions', 'SQL', 'Tableau Server'],
    focus: 'Exploratory data visualization, Tableau calculation engines, and interactive visual storyboards.',
    icon: 'Presentation',
  },
  {
    title: 'Analytics Engineer',
    description: 'Bridges the gap between data engineering and business intelligence: writes modular SQL/dbt transformations, maintains semantic layers, and models cloud warehouses.',
    coreTech: ['SQL', 'dbt (Data Build Tool)', 'Snowflake / BigQuery', 'Git', 'Semantic Layers'],
    focus: 'Data modeling, version-controlled transformations, data testing, and warehouse data marts.',
    icon: 'Workflow',
  },
  {
    title: 'Enterprise BI Solutions Architect',
    description: 'Architects organization-wide BI platforms, centralized semantic models, Row-Level Security frameworks, data gateway topologies, and BI governance.',
    coreTech: ['Power BI Architecture', 'Azure Synapse', 'Fabric / Lakehouse', 'Governance', 'Security'],
    focus: 'Enterprise data architecture, platform scalability, data governance, and tenant administration.',
    icon: 'Layers',
  },
  {
    title: 'Financial & Operations BI Analyst',
    description: 'Embedded directly within Finance, Supply Chain, or Operations departments to build budgeting models, variance decomposition, and inventory turnover dashboards.',
    coreTech: ['Excel Financial Modeling', 'Power BI', 'SQL', 'Variance Analysis', 'ERP Systems (SAP/NetSuite)'],
    focus: 'P&L analysis, operational efficiency, cost reduction, and working capital optimization.',
    icon: 'Briefcase',
  },
  {
    title: 'Growth & Marketing BI Analyst',
    description: 'Analyzes digital acquisition funnels, campaign return on ad spend (ROAS), customer lifetime value, cohort retention, and multi-touch attribution.',
    coreTech: ['SQL', 'Power BI / Looker', 'Google Analytics 4', 'Ad Platforms', 'Cohort Analysis'],
    focus: 'Marketing ROI, customer acquisition cost (CAC), churn mitigation, and funnel optimization.',
    icon: 'TrendingUp',
  },
];

export const BI_TOOLKIT: BIToolkitCategory[] = [
  {
    category: 'Spreadsheets & Financial Modeling',
    coreItems: ['Microsoft Excel 365', 'Pivot Tables & Pivot Charts', 'XLOOKUP & Dynamic Arrays'],
    specializedItems: ['Google Sheets', 'VBA / Macros Basics', 'Financial Sensitivity Modeling'],
  },
  {
    category: 'Relational Databases & SQL',
    coreItems: ['SQL (ANSI Standard)', 'PostgreSQL / MySQL', 'Window Functions & CTEs'],
    specializedItems: ['Microsoft SQL Server (T-SQL)', 'DuckDB', 'DBeaver / DataGrip'],
  },
  {
    category: 'Business Intelligence Platforms',
    coreItems: ['Power BI Desktop', 'Power BI Service (Workspaces/Apps)', 'DAX Formula Language'],
    specializedItems: ['Tableau Desktop', 'Looker / Looker Studio', 'Microsoft Fabric Basics'],
  },
  {
    category: 'Data Cleaning & Transformation',
    coreItems: ['Power Query Editor', 'Power Query M Language', 'Unpivoting & Reshaping'],
    specializedItems: ['dbt (Data Build Tool)', 'SQL Transformations', 'Python (Pandas Basics)'],
  },
  {
    category: 'Cloud Warehouses & Semantic Layers',
    coreItems: ['Snowflake Concepts', 'Google BigQuery Concepts', 'Star Schema Modeling'],
    specializedItems: ['Databricks Delta Lake', 'Azure Synapse', 'dbt Semantic Layer'],
  },
  {
    category: 'Automation, Governance & Optimization',
    coreItems: ['Row-Level Security (RLS)', 'Scheduled Gateways', 'Performance Analyzer'],
    specializedItems: ['Power Automate Alerts', 'DAX Studio', 'Tabular Editor'],
  },
];

export const BI_THINKING_LADDER = [
  { step: '01', label: 'Business Decision', question: 'What strategic decision or executive action needs to be made?' },
  { step: '02', label: 'Key Metric (KPI)', question: 'What specific measurable metric accurately tracks this business goal?' },
  { step: '03', label: 'Data Source', question: 'Where is the data stored and how frequently is it refreshed?' },
  { step: '04', label: 'Data Quality Check', question: 'Can we trust this data, and are there missing values or duplicate records?' },
  { step: '05', label: 'Analytical Model', question: 'How should tables be modeled into a Star Schema with correct granularity?' },
  { step: '06', label: 'DAX Calculation', question: 'What dynamic DAX measure or time-intelligence formula is required?' },
  { step: '07', label: 'Visual Hierarchy', question: 'What chart type and canvas layout communicates this insight in 5 seconds?' },
  { step: '08', label: 'Variance & Trend', question: 'What changed compared to targets, previous months, or benchmark periods?' },
  { step: '09', label: 'Root Cause Diagnostic', question: 'Why did the numbers change, and what underlying driver caused the shift?' },
  { step: '10', label: 'Strategic Action', question: 'What concrete operational recommendation should leadership execute?' },
];

export const BI_COMMON_MISTAKES: BICommonMistake[] = [
  {
    title: 'Learning Power BI without learning SQL and Relational Databases',
    solution: 'Master SQL fundamentals (Joins, Aggregations, CTEs, Window Functions) alongside Power BI; enterprise BI workflows rely heavily on SQL.',
  },
  {
    title: 'Creating dashboards that look visually fancy but answer no business questions',
    solution: 'Start every project by interviewing stakeholders and defining the exact business decision the dashboard must empower.',
  },
  {
    title: 'Building reports on a single massive 100-column flat table',
    solution: 'Always model data into a Kimball Star Schema with separate Fact and Dimension tables for lightning-fast performance and clean DAX.',
  },
  {
    title: 'Creating Calculated Columns when DAX Measures should be used',
    solution: 'Write dynamic DAX Measures for aggregations and ratios (e.g. Margin %) so calculations compute dynamically based on active filter context.',
  },
  {
    title: 'Memorizing DAX formulas without understanding Filter Context',
    solution: 'Study how CALCULATE, ALL, and slicers modify the underlying filter context before copying complex formulas.',
  },
  {
    title: 'Overusing pie charts, 3D graphics, and rainbow color palettes',
    solution: 'Use clean bar charts, line trends, and apply the 60-30-10 color rule with semantic colors (Green=Positive, Red=Alert).',
  },
  {
    title: 'Dividing numbers using the slash (/) operator instead of DIVIDE()',
    solution: 'Always use DIVIDE(Numerator, Denominator, 0) to prevent divide-by-zero errors when handling nulls or zeros.',
  },
  {
    title: 'Failing to create a dedicated, contiguous Date Dimension table',
    solution: 'Always generate a complete Date Table and mark it as Date Table in Power BI for DAX Time Intelligence calculations.',
  },
  {
    title: 'Enabling Bi-Directional cross-filtering on every relationship',
    solution: 'Keep relationships as Single Cross-Filter direction (1-to-many) to prevent ambiguous filter loops and performance bottlenecks.',
  },
  {
    title: 'Presenting data observations without actionable recommendations',
    solution: 'Always pair every finding ("Revenue fell 12%") with a root cause ("due to Category B supplier defect") and a proposed action.',
  },
  {
    title: 'Allowing different departments to use conflicting KPI definitions',
    solution: 'Establish a centralized KPI Dictionary and publish Certified Semantic Models to enforce a Single Source of Truth.',
  },
  {
    title: 'Failing to test Row-Level Security (RLS) before publishing to executives',
    solution: 'Use "View as Role" in Power BI Desktop and test security access across representative user email logins.',
  },
];

export const BI_DASHBOARD_CHECKLIST: BIDashboardChecklistCategory[] = [
  {
    category: 'Business Alignment & Purpose',
    items: [
      { name: 'Defined Business Goal', desc: 'The dashboard answers a specific strategic question and empowers executive action.' },
      { name: 'Target Benchmarks Included', desc: 'All primary KPI cards show actuals, target goals, and variance percentages.' },
      { name: 'Clear Audience Focus', desc: 'Layout tailored specifically for executive C-suite, departmental leads, or operational managers.' },
      { name: 'Actionable Insights Panel', desc: 'Written key takeaways and recommendations highlight what actions management should take.' },
    ],
  },
  {
    category: 'Data Quality & Modeling',
    items: [
      { name: 'Star Schema Architecture', desc: 'Fact and Dimension tables cleanly separated with 1-to-many single-direction relationships.' },
      { name: 'Dedicated Date Dimension', desc: 'Contiguous calendar table marked as official Date Table with proper month sorting.' },
      { name: 'Explicit DAX Measures', desc: 'All calculations written as explicit DAX measures using DIVIDE() and proper context modifiers.' },
      { name: 'Automated Refresh Validated', desc: 'Scheduled gateway refreshes tested and email failure notifications configured.' },
    ],
  },
  {
    category: 'Visual Design & User Experience',
    items: [
      { name: '6-Section Hierarchy', desc: 'Header → Top KPIs → Trend Lines → Breakdowns → Detail Table → Insights panel.' },
      { name: 'Decluttered Canvas', desc: 'Zero chart junk, 3D effects, or redundant legends; data labels placed cleanly.' },
      { name: 'Semantic Color Palette', desc: '60-30-10 rule applied with green/red reserved strictly for performance indicators.' },
      { name: 'Interactive Slicers & Tooltips', desc: 'Custom hover tooltips, drill-through pages, and synchronized slicers configured.' },
    ],
  },
  {
    category: 'Governance & Security',
    items: [
      { name: 'Row-Level Security (RLS)', desc: 'Security roles configured and verified so users only see their authorized departmental data.' },
      { name: 'Certified Semantic Model', desc: 'Centralized golden dataset endorsed to prevent conflicting metric definitions.' },
      { name: 'Documentation & Dictionary', desc: 'KPI calculations, data sources, and refresh schedules documented in a shared dictionary.' },
      { name: 'Performance Optimized', desc: 'Performance Analyzer verified with all visual render times under 1.5 seconds.' },
    ],
  },
];

export const BI_FOUR_PILLARS: BIFourPillars[] = [
  {
    title: 'SQL & Data Modeling Mastery',
    subtitle: 'Deep proficiency in relational SQL querying, data cleaning with Power Query, and Kimball Star Schema data modeling.',
    icon: 'Database',
  },
  {
    title: 'Power BI & Advanced DAX',
    subtitle: 'Expertise in building high-performance semantic models, complex DAX calculations, filter context, and interactive reporting.',
    icon: 'BarChart3',
  },
  {
    title: 'Business Acumen & KPI Strategy',
    subtitle: 'Understanding financial statements, unit economics (CAC/LTV), customer churn, and translating goals into actionable metrics.',
    icon: 'Briefcase',
  },
  {
    title: 'Executive Storytelling & Communication',
    subtitle: 'Translating complex data into clear visual narratives, structuring 1-page executive memos, and driving operational action.',
    icon: 'Presentation',
  },
];
