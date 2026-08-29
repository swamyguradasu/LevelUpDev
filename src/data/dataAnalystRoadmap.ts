export interface DataAnalystRoadmapStage {
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
}

export interface DataAnalystProjectProgression {
  id: string;
  stage: string;
  name: string;
  difficulty: 'Beginner' | 'Intermediate' | 'SQL Analytics' | 'BI Dashboard' | 'Portfolio-Level';
  recommendedStack: string[];
  skillsLearned: string[];
  description: string;
  questionsToAnswer: string[];
  expectedInsights: string[];
  dashboardReqs: string;
  githubReqs: string;
}

export interface AnalystSpecialization {
  title: string;
  description: string;
  coreTech: string[];
  focus: string;
  icon: string;
}

export interface AnalystToolkitCategory {
  category: string;
  items: string[];
}

export const DATA_ANALYST_ROADMAP_STAGES: DataAnalystRoadmapStage[] = [
  {
    id: 'analytics-foundations',
    stageNumber: '01',
    title: 'Data Analytics Foundations',
    shortTitle: 'Foundations',
    tagline: 'Understand the role of a Data Analyst and how raw numbers transform into actionable business decisions.',
    iconName: 'Database',
    goal: 'Understand the role of a Data Analyst and how data is transformed into useful business insights.',
    whyItMatters:
      'Data Analytics is not about running formulas in a vacuum; it is about solving real business problems. Understanding data types, KPIs, measures, and the complete analytical lifecycle prevents wasted effort and answers the right executive questions.',
    learningOutcome: 'Understand how analysts turn raw, unorganized data into actionable business insights.',
    recommendedApproach:
      'Always start with the business question before opening a spreadsheet or writing a single line of SQL.',
    technologies: ['Analytical Thinking', 'KPI Definition', 'Business Metrics', 'Data Lifecycle'],
    topics: [
      {
        category: 'The Data Analyst Role',
        items: [
          'What is Data Analytics & why companies rely on it',
          'What does a Data Analyst do daily',
          'Data Analyst vs Data Scientist vs Data Engineer',
          'Qualitative vs Quantitative data',
          'Categorical vs Numerical data (Discrete vs Continuous)',
          'Structured, Semi-structured & Unstructured data',
        ],
      },
      {
        category: 'The End-to-End Analytics Lifecycle',
        items: [
          'Business Question formulation',
          'Data Collection & Sourcing',
          'Data Cleaning & Validation',
          'Exploratory Data Analysis (EDA)',
          'Data Visualization & Dashboards',
          'Business Insights & Action Recommendations',
        ],
      },
      {
        category: 'Core Business Intelligence Concepts',
        items: [
          'KPIs (Key Performance Indicators) & OKRs',
          'Metrics vs Dimensions vs Measures',
          'Descriptive vs Diagnostic vs Predictive vs Prescriptive Analytics',
          'Formulating hypothesis-driven analytical questions',
        ],
      },
    ],
    keyConcepts: [
      'Dimensions vs Measures',
      'The 8-Step Analytical Lifecycle',
      'Discrete vs Continuous Data',
      'Hypothesis-Driven Analysis',
      'KPI Alignment with Business Goals',
    ],
    practiceSuggestions: [
      'Take a public business problem (e.g. Netflix subscriber churn) and write down 5 specific analytical questions to diagnose it.',
      'Classify 20 data attributes from an e-commerce order (order_id, price, timestamp, rating, customer_state) into categorical/numerical/discrete/continuous.',
      'Map out the metrics and KPIs needed to evaluate the success of a food delivery mobile app.',
    ],
    projectSuggestions: [
      {
        title: 'Business Analytics Case Study Outline',
        description: 'Document an end-to-end analytical proposal defining problem statements, required data sources, key metrics, and expected business decisions.',
        level: 'Beginner',
      },
    ],
    commonMistakes: [
      'Starting to code or build dashboards before defining what business problem you are actually solving.',
      'Confusing Data Analysts (insight generation & BI) with Data Engineers (data pipelines) or Data Scientists (machine learning models).',
    ],
    nextStepPreview: 'Build foundational spreadsheet mastery in Stage 02: Excel & Spreadsheets for Analytics.',
  },
  {
    id: 'excel-spreadsheets',
    stageNumber: '02',
    title: 'Excel & Spreadsheets for Analytics',
    shortTitle: 'Excel & Sheets',
    tagline: 'Master formulas, XLOOKUP, Pivot Tables, conditional formatting, and interactive spreadsheet dashboards.',
    iconName: 'Table',
    goal: 'Become highly comfortable working with spreadsheets because Excel remains an indispensable analytics tool.',
    whyItMatters:
      'Excel is the universal language of business. Executives, stakeholders, and finance teams communicate via spreadsheets. Mastering lookups, pivot tables, and dynamic charts lets you perform rapid ad-hoc analysis in minutes.',
    learningOutcome: 'Ability to clean, model, aggregate, and build interactive dashboards from moderate-sized datasets in Excel.',
    technologies: ['Microsoft Excel', 'Google Sheets', 'Pivot Tables', 'XLOOKUP', 'Power Query'],
    topics: [
      {
        category: 'Spreadsheet Fundamentals & Formatting',
        items: [
          'Workbooks, worksheets, cells, absolute vs relative referencing ($A$1)',
          'Data types (text, numbers, dates, currency, booleans)',
          'Sorting, multi-level sorting & custom filtering',
          'Conditional formatting for outliers, trends, and data bars',
          'Excel Tables (Ctrl+T) & structured referencing',
        ],
      },
      {
        category: 'Essential Mathematical & Logical Formulas',
        items: [
          'Basic aggregations: SUM, AVERAGE, COUNT, COUNTA, COUNTBLANK, MIN, MAX',
          'Conditional aggregations: SUMIFS, COUNTIFS, AVERAGEIFS',
          'Logical functions: IF, IFS, nested IFs, AND, OR, IFERROR',
        ],
      },
      {
        category: 'Lookup & Reference Functions',
        items: [
          'Modern XLOOKUP (exact match, wildcard, return arrays)',
          'Classic VLOOKUP & HLOOKUP with exact/approximate match',
          'INDEX and MATCH two-way lookups',
        ],
      },
      {
        category: 'Text, Date & Data Cleaning Functions',
        items: [
          'Text functions: LEFT, RIGHT, MID, LEN, TRIM, SUBSTITUTE, CONCAT, TEXTSPLIT',
          'Date functions: TODAY, DATE, YEAR, MONTH, DAY, DATEDIF, EOMONTH',
          'Data cleaning: Remove Duplicates, Find & Replace, Text to Columns, Data Validation lists',
        ],
      },
      {
        category: 'Pivot Tables, Pivot Charts & Dashboards',
        items: [
          'Pivot Tables: Rows, Columns, Values, and Filters',
          'Summarize values by Sum, Count, Average & % of Column Total',
          'Calculated fields in Pivot Tables',
          'Slicers and Timeline controls for dynamic multi-table filtering',
          'Building executive dashboard layouts with KPI cards and Pivot Charts',
        ],
      },
    ],
    keyConcepts: [
      'Absolute ($A$1) vs Relative (A1) Referencing',
      'XLOOKUP Exact Matching & Fallbacks',
      'Dynamic Pivot Tables & Slicers',
      'SUMIFS & COUNTIFS Multi-Condition Logic',
      'Text to Columns & Delimited Data Cleaning',
    ],
    practiceSuggestions: [
      'Build an interactive Sales Performance Dashboard with slicers by Region, Product Category, and Month.',
      'Analyze student test scores: calculate quartiles, grade distribution, and identify underperforming cohorts.',
      'Create a Personal Finance & Expense Tracker with automated categorization using SUMIFS.',
      'Clean a messy customer roster containing leading spaces, mixed date formats, and duplicate emails using Excel text formulas.',
    ],
    projectSuggestions: [
      {
        title: 'Executive Sales & Revenue Excel Dashboard',
        description: 'Clean, multi-tab workbook with Pivot Tables, XLOOKUP lookups, dynamic slicers, KPI scorecards, and regional revenue charts.',
        level: 'Beginner',
      },
    ],
    commonMistakes: [
      'Hardcoding calculated values directly into cells instead of using dynamic formulas.',
      'Failing to use TRIM and Clean on raw text imports, causing lookup formulas to fail silently.',
    ],
    nextStepPreview: 'Learn how to interpret numbers without falling for misleading metrics in Stage 03: Statistics for Data Analysis.',
  },
  {
    id: 'statistics-analytics',
    stageNumber: '03',
    title: 'Statistics for Data Analysis',
    shortTitle: 'Statistics',
    tagline: 'Learn descriptive statistics, probability distributions, hypothesis testing, and A/B testing principles.',
    iconName: 'LineChart',
    goal: 'Learn the statistics required to correctly interpret data and avoid misleading conclusions.',
    whyItMatters:
      'Averages can lie, correlations can be coincidental, and small sample sizes can fool you. Understanding statistical variance, confidence intervals, and hypothesis testing ensures your recommendations are grounded in truth.',
    learningOutcome: 'Ability to describe distributions, identify outliers, measure correlation vs causation, and evaluate A/B test experiments.',
    recommendedApproach:
      'Statistics is not about memorizing complex calculus formulas. It is about understanding what the numbers actually mean in a business context.',
    technologies: ['Descriptive Stats', 'Hypothesis Testing', 'A/B Testing', 'Normal Distribution', 'Correlation Analysis'],
    topics: [
      {
        category: 'Descriptive Statistics',
        items: [
          'Measures of Central Tendency: Mean, Median, Mode (When to use Median over Mean)',
          'Measures of Spread: Range, Variance, Standard Deviation',
          'Percentiles, Quartiles & Interquartile Range (IQR)',
          'Detecting outliers using 1.5 * IQR rule and Z-scores',
        ],
      },
      {
        category: 'Data Distributions & Probability',
        items: [
          'Normal distribution & The Empirical Rule (68-95-99.7)',
          'Skewed distributions (Positive / Right-skew vs Negative / Left-skew)',
          'Histograms & Box Plots for visual distribution analysis',
          'Basic Probability: Independent events, Conditional probability, Bayes Rule basics',
        ],
      },
      {
        category: 'Relationships & Statistical Significance',
        items: [
          'Pearson Correlation Coefficient (r from -1 to +1)',
          'Correlation vs Causation & Lurking Confounding Variables',
          'Covariance fundamentals',
          'Population vs Sample & Sampling Bias',
        ],
      },
      {
        category: 'Inferential Statistics & A/B Testing',
        items: [
          'Confidence Intervals & Margin of Error',
          'Hypothesis Testing: Null Hypothesis (H0) vs Alternative Hypothesis (Ha)',
          'p-values & Significance level (alpha = 0.05)',
          'Type I (False Positive) and Type II (False Negative) errors',
          'A/B Testing fundamentals for website conversions & pricing changes',
        ],
      },
    ],
    keyConcepts: [
      'Mean vs Median in Skewed Data (Income/Prices)',
      'Interquartile Range (IQR) Outlier Detection',
      'Correlation != Causation',
      'p-value & Statistical Significance (p < 0.05)',
      'A/B Testing Control vs Variant Comparison',
    ],
    practiceSuggestions: [
      'Analyze salary data: calculate mean vs median and explain why high earners skew the arithmetic average.',
      'Use box plots and IQR calculations to detect fraudulent credit card transactions.',
      'Evaluate an A/B test scenario: determine whether a 4% lift in website checkout conversion is statistically significant or random noise.',
    ],
    projectSuggestions: [
      {
        title: 'E-Commerce A/B Test Statistical Experiment Report',
        description: 'Evaluate conversion rates between two checkout designs, computing sample sizes, z-scores, p-values, and executive business recommendations.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Assuming correlation implies direct causation (e.g. ice cream sales and shark attacks both correlate with summer).',
      'Relying solely on the mean without checking standard deviation or distribution skewness.',
    ],
    nextStepPreview: 'Query enterprise relational databases with precision in Stage 04: SQL for Data Analysts.',
  },
  {
    id: 'sql-analytics',
    stageNumber: '04',
    title: 'SQL for Data Analysts',
    shortTitle: 'SQL',
    tagline: 'Master relational databases, complex multi-table JOINs, aggregations, CTEs, and advanced window functions.',
    iconName: 'Database',
    goal: 'Master SQL because SQL is the single most critical technical skill for Data Analysts.',
    whyItMatters:
      'Enterprise data lives in relational databases. Data analysts write SQL every single day to pull data, calculate cohort metrics, join disparate tables, and answer executive business questions directly from production warehouses.',
    learningOutcome: 'Ability to write complex, optimized SQL queries using CTEs, window functions, and multi-table joins to answer any business question.',
    technologies: ['PostgreSQL', 'MySQL', 'SQL Server / BigQuery', 'DBeaver / pgAdmin', 'LeetCode SQL'],
    topics: [
      {
        category: 'Relational Fundamentals & Basic Queries',
        items: [
          'Relational databases, tables, primary keys, foreign keys & relationships',
          'SELECT, FROM, WHERE, DISTINCT, ORDER BY (ASC/DESC), LIMIT / TOP',
          'Filtering: AND, OR, NOT, IN, BETWEEN, LIKE, IS NULL, IS NOT NULL',
        ],
      },
      {
        category: 'Aggregations & Grouping',
        items: [
          'Aggregate functions: COUNT, SUM, AVG, MIN, MAX',
          'GROUP BY single and multiple columns',
          'HAVING clause (filtering grouped data vs WHERE filtering rows)',
          'Aliasing columns and tables with AS',
        ],
      },
      {
        category: 'Multi-Table Joins',
        items: [
          'INNER JOIN (matching records in both tables)',
          'LEFT JOIN (all left records + matching right)',
          'RIGHT JOIN & FULL OUTER JOIN',
          'Self Joins & Cross Joins',
          'Joining across 3+ tables simultaneously',
        ],
      },
      {
        category: 'Advanced SQL & Analytical Functions',
        items: [
          'Subqueries (Scalar, Column, and Correlated subqueries)',
          'Common Table Expressions (CTEs with WITH clause) for readable modular queries',
          'CASE WHEN conditional logic for bucket categorization',
          'Window functions: ROW_NUMBER(), RANK(), DENSE_RANK()',
          'Value window functions: LAG(), LEAD(), FIRST_VALUE()',
          'PARTITION BY & ORDER BY inside OVER() clauses',
          'Date/Time functions (DATE_TRUNC, EXTRACT, DATEDIFF, NOW)',
          'String manipulation (CONCAT, SUBSTRING, TRIM, UPPER, LOWER)',
        ],
      },
    ],
    keyConcepts: [
      'WHERE (row filter) vs HAVING (group filter)',
      'INNER JOIN vs LEFT JOIN behavior on NULLs',
      'Common Table Expressions (WITH clause)',
      'Window Functions: RANK() vs DENSE_RANK()',
      'LAG() and LEAD() for Month-over-Month Growth',
    ],
    practiceSuggestions: [
      'Write queries to calculate Monthly Recurring Revenue (MRR) and Month-over-Month (MoM) growth using LAG().',
      'Calculate top 3 highest-spending customers per country using DENSE_RANK() and PARTITION BY.',
      'Identify churned users who placed an order in 2023 but zero orders in 2024 using a LEFT JOIN / NOT IN.',
      'Solve 50+ medium LeetCode/HackerRank SQL challenges.',
    ],
    projectSuggestions: [
      {
        title: 'Comprehensive SQL E-Commerce Business Analysis',
        description: 'A 20-query deep dive over a relational database calculating customer retention cohorts, product affinity, and regional revenue growth.',
        level: 'SQL Analytics',
      },
    ],
    commonMistakes: [
      'Using WHERE instead of HAVING to filter on aggregated metrics (e.g. WHERE COUNT(order_id) > 5).',
      'Accidentally causing Cartesian product explosions by omitting join conditions in multi-table queries.',
    ],
    nextStepPreview: 'Learn how to handle imperfect, messy real-world datasets in Stage 05: Data Cleaning & Preparation.',
  },
  {
    id: 'data-cleaning',
    stageNumber: '05',
    title: 'Data Cleaning & Preparation',
    shortTitle: 'Data Cleaning',
    tagline: 'Transform messy, inconsistent, duplicated, and incomplete raw data into reliable, analysis-ready datasets.',
    iconName: 'Filter',
    goal: 'Learn how to transform messy raw data into reliable analysis-ready datasets.',
    whyItMatters:
      'Real-world data is messy, dirty, and full of errors. Up to 70% of an analyst’s time is spent cleaning data. Garbage in equals garbage out—if your data cleaning is flawed, all subsequent analysis and executive charts will be wrong.',
    learningOutcome: 'Systematically inspect, sanitize, standardize, and validate raw datasets before analysis.',
    recommendedApproach:
      'Never blindly delete bad or missing data. First understand why it is missing or incorrect (random omission, system bug, or legitimate zero).',
    technologies: ['Excel / Power Query', 'SQL Cleaning', 'Python Pandas', 'Data Profiling'],
    topics: [
      {
        category: 'Identifying Data Quality Issues',
        items: [
          'Missing and NULL values (MCAR, MAR, MNAR mechanisms)',
          'Duplicate records (exact duplicates vs fuzzy duplicate profiles)',
          'Incorrect data types (e.g. numbers stored as strings, invalid dates)',
          'Inconsistent categorical values (e.g. "USA", "US", "United States", "u.s.a.")',
          'Invalid values & outliers (e.g. negative ages, dates in the future)',
          'Structural formatting issues & whitespace contamination',
        ],
      },
      {
        category: 'Data Preparation & Transformation Workflow',
        items: [
          'The 6-Step Workflow: Raw Data → Inspect → Clean → Transform → Validate → Analysis-Ready',
          'Imputation strategies (Mean/Median for numerical, Mode for categorical, or placeholder)',
          'Text cleaning & string standardization (trimming, regex, lowercasing)',
          'Standardizing date formats (ISO 8601 YYYY-MM-DD)',
          'Data Reshaping: Pivoting vs Unpivoting (Wide to Long format)',
        ],
      },
      {
        category: 'Validation & Quality Auditing',
        items: [
          'Asserting column constraints and unique identifiers',
          'Cross-referencing join integrity between tables',
          'Documenting data cleaning assumptions in a data dictionary',
        ],
      },
    ],
    keyConcepts: [
      'Garbage In, Garbage Out (GIGO)',
      'Data Imputation vs Row Deletion Rules',
      'String Standardization & Case Normalization',
      'Wide Format vs Long Format Reshaping',
      'Audit Trails & Data Dictionaries',
    ],
    practiceSuggestions: [
      'Take a messy CSV file with missing zip codes, misspelled country names, and mixed date formats, and clean it in both Excel and SQL.',
      'Standardize customer phone numbers from 10 different raw input formats into a single E.164 standard.',
      'Handle missing values in a real estate dataset without distorting median property prices.',
    ],
    projectSuggestions: [
      {
        title: 'Messy Real-World CSV Sanitization & Pipeline',
        description: 'Transform an uncleaned dataset of 100,000 raw customer records into a standardized, validated, and normalized dataset with an audit report.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Dropping rows with missing values indiscriminately, which introduces severe sampling bias.',
      'Modifying raw data in place without keeping the original immutable raw file backup.',
    ],
    nextStepPreview: 'Automate data transformation and exploration at scale in Stage 06: Python for Data Analysis.',
  },
  {
    id: 'python-data-analysis',
    stageNumber: '06',
    title: 'Python for Data Analysis',
    shortTitle: 'Python Analytics',
    tagline: 'Learn Python, NumPy, and Pandas specifically for manipulating, filtering, grouping, and exploring data.',
    iconName: 'Code2',
    goal: 'Learn Python specifically for analyzing, transforming, and exploring data at scale.',
    whyItMatters:
      'When datasets exceed Excel’s 1-million-row limit, or when workflows need automation and statistical exploration, Python with Pandas and NumPy is the global industry standard toolkit.',
    learningOutcome: 'Comfortably load, slice, filter, group, aggregate, and reshape large datasets using Pandas DataFrames in Jupyter Notebooks.',
    recommendedApproach:
      'Do NOT try to learn all of Python (like game development or async web servers). Focus squarely on Pandas, NumPy, and exploratory data analysis.',
    technologies: ['Python 3', 'Pandas', 'NumPy', 'Jupyter Notebook', 'Google Colab'],
    topics: [
      {
        category: 'Analytics-Focused Python Fundamentals',
        items: [
          'Variables, numbers, strings, lists, dictionaries, tuples',
          'Loops and list/dictionary comprehensions',
          'Writing custom reusable analysis functions',
          'Jupyter Notebook & Google Colab interactive workflows',
        ],
      },
      {
        category: 'NumPy for Numerical Computing',
        items: [
          'NumPy ndarrays vs native Python lists',
          'Vectorized operations (element-wise math without slow loops)',
          'Array indexing, slicing, filtering with boolean masks',
          'Statistical operations: np.mean, np.median, np.std, np.percentile',
        ],
      },
      {
        category: 'Pandas DataFrames & Manipulation',
        items: [
          'Pandas Series and 2D DataFrames',
          'Reading and writing CSV, Excel, and SQL tables (pd.read_csv, pd.read_sql)',
          'Inspecting data: df.head(), df.tail(), df.info(), df.describe(), df.shape',
          'Column selection, slicing with .loc[] and .iloc[]',
          'Filtering rows with multiple conditions (&, |)',
          'Handling missing data: df.isna(), df.dropna(), df.fillna()',
          'Handling duplicates: df.duplicated(), df.drop_duplicates()',
          'Data type conversion with .astype() and pd.to_datetime()',
        ],
      },
      {
        category: 'Grouping, Aggregation & Reshaping',
        items: [
          'groupby() operations with single and multiple aggregation metrics (agg)',
          'Merging and joining DataFrames (pd.merge with left/right/inner joins)',
          'Concatenating DataFrames (pd.concat)',
          'Pivot tables and cross-tabulation in Pandas (df.pivot_table, pd.crosstab)',
          'Applying custom transformations with .apply() and lambda functions',
        ],
      },
    ],
    keyConcepts: [
      'Pandas DataFrame Architecture',
      'Vectorized Operations vs Slow Python For-Loops',
      '.loc[] (Label-Based) vs .iloc[] (Index-Based) Slicing',
      'df.groupby() Split-Apply-Combine Pattern',
      'pd.to_datetime() Timestamp Parsing',
    ],
    practiceSuggestions: [
      'Load a 500,000-row e-commerce dataset into Pandas and compute revenue by category and country.',
      'Clean a messy dataset using Pandas: drop duplicates, impute missing values, parse timestamps, and create new engineered columns.',
      'Compute customer retention cohorts by grouping users by their signup month and calculating subsequent transaction activity.',
    ],
    projectSuggestions: [
      {
        title: 'Exploratory Customer Cohort Analysis with Pandas',
        description: 'Jupyter notebook analyzing customer buying habits, lifetime value, return rates, and churn patterns over a multi-year transaction log.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Using for-loops to iterate over DataFrame rows instead of fast vectorized Pandas operations.',
      'Confusing .loc (label indexing) with .iloc (integer position indexing).',
    ],
    nextStepPreview: 'Translate your findings into clear, impactful visual charts in Stage 07: Data Visualization & Storytelling.',
  },
  {
    id: 'data-visualization',
    stageNumber: '07',
    title: 'Data Visualization & Storytelling',
    shortTitle: 'Visualization',
    tagline: 'Learn visual hierarchy, data storytelling, chart selection principles, Matplotlib, Seaborn, and Plotly.',
    iconName: 'BarChart3',
    goal: 'Learn how to communicate data clearly and persuasively through effective visual storytelling.',
    whyItMatters:
      'Stakeholders do not read spreadsheets or raw code; they look at charts. A misleading or cluttered visual can cause disastrous business decisions, while a clean, well-annotated chart drives immediate executive action.',
    learningOutcome: 'Choose the optimal chart for any analytical question and build beautiful, clear visual graphics using Python and modern visualization tools.',
    technologies: ['Matplotlib', 'Seaborn', 'Plotly', 'Data Storytelling', 'Visual Hierarchy'],
    topics: [
      {
        category: 'Visualization Principles & Best Practices',
        items: [
          'Choosing the right chart for the question (Comparison, Trend, Distribution, Relationship, Composition)',
          'Visual hierarchy: Titles, subtitles, axis labels, legends, callout annotations',
          'Effective color theory: sequential, diverging, and categorical color palettes',
          'Avoiding misleading charts (truncated y-axes, 3D pie charts, dual-axis confusion)',
          'Decluttering charts (removing unnecessary gridlines and borders)',
          'Data storytelling: guiding the audience’s eye to the key insight',
        ],
      },
      {
        category: 'Chart Selection Matrix',
        items: [
          'Comparison over categories → Bar Chart / Column Chart',
          'Trends over time → Line Chart / Area Chart',
          'Frequency distribution → Histogram / Density KDE plot',
          'Spread & Outliers → Box Plot / Violin Plot',
          'Relationships & Correlations → Scatter Plot / Bubble Chart',
          'Part-to-whole Composition → Stacked Bar / Treemap / Donut Chart',
          'Multi-variable matrices → Heatmap with annotated values',
        ],
      },
      {
        category: 'Python Visualization Libraries',
        items: [
          'Matplotlib: Figure & Axes object architecture, custom styling, annotations',
          'Seaborn: Statistical plots (sns.barplot, sns.lineplot, sns.heatmap, sns.boxplot)',
          'Plotly: Interactive hoverable zoomable web charts',
        ],
      },
    ],
    keyConcepts: [
      'Chart Selection Mapping (Comparison vs Trend vs Distribution)',
      'Data-to-Ink Ratio (Decluttering)',
      'Direct Value Annotations vs Cluttered Legends',
      'Sequential vs Diverging Color Palettes',
      'Visual Storytelling to Drive Decisions',
    ],
    practiceSuggestions: [
      'Recreate a bad, misleading chart from the news and redesign it into an honest, crystal-clear visual.',
      'Plot a multi-series line chart in Matplotlib with customized callout annotations highlighting peak sales events.',
      'Generate an annotated correlation heatmap in Seaborn to explore feature relationships.',
    ],
    projectSuggestions: [
      {
        title: 'Exploratory Visual Data Storytelling Report',
        description: 'A curated visual narrative presentation with 8 publication-quality charts examining global climate or economic trends.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Using 3D charts or exploded pie charts with 10+ slices that obscure data comparison.',
      'Failing to label axes, units of measurement (e.g. $ vs Millions), and data source citations.',
    ],
    nextStepPreview: 'Build interactive executive BI dashboards in Stage 08: Power BI & Tableau Business Intelligence.',
  },
  {
    id: 'bi-dashboards',
    stageNumber: '08',
    title: 'Power BI, Tableau & Business Intelligence',
    shortTitle: 'BI & Dashboards',
    tagline: 'Learn Power BI, Power Query, star schema data modeling, DAX formulas, and executive dashboard design.',
    iconName: 'LayoutDashboard',
    goal: 'Learn how to build interactive dashboards that help business leaders make real-time decisions.',
    whyItMatters:
      'Power BI and Tableau are the primary tools used by corporate organizations for daily operational reporting. Analysts build automated, interactive dashboards that refresh continuously to empower non-technical decision-makers.',
    learningOutcome: 'Connect data sources, model star schemas, write custom DAX measures, and publish interactive executive BI dashboards.',
    recommendedApproach:
      'Focus on Microsoft Power BI as your primary tool, while understanding the core principles of Tableau and star schema dimensional data modeling.',
    technologies: ['Microsoft Power BI', 'Power Query (M)', 'DAX Formulas', 'Tableau', 'Star Schema Modeling'],
    topics: [
      {
        category: 'Power BI Data Ingestion & Transformation',
        items: [
          'Importing data from Excel, CSV, PostgreSQL, and Web sources',
          'Power Query Editor: Merging, Appending, Unpivoting, Data Type cleanup',
          'Creating automated refresh transformation pipelines',
        ],
      },
      {
        category: 'Dimensional Data Modeling',
        items: [
          'Fact tables (metrics/events) vs Dimension tables (attributes)',
          'Star Schema vs Snowflake Schema architectures',
          'Managing table relationships (1-to-Many, cardinality, cross-filter direction)',
          'Creating a dedicated Date / Calendar table',
        ],
      },
      {
        category: 'DAX (Data Analysis Expressions) Mastery',
        items: [
          'Calculated Columns vs Measures (When to use Measures to save memory)',
          'Basic DAX: SUM, AVERAGE, COUNT, DISTINCTCOUNT, DIVIDE (safe division)',
          'CALCULATE() and FILTER() for conditional measure evaluation',
          'Time Intelligence DAX: YTD, QTD, SamePeriodLastYear, DATEADD for MoM/YoY growth',
        ],
      },
      {
        category: 'Dashboard UX & Executive Design',
        items: [
          'Top-level KPI scorecard cards (Revenue, Margin, Volume, YoY %)',
          'Interactive slicers, dropdown filters, and hierarchical drill-down',
          'Tooltips and drill-through detail pages',
          'Designing for executive readability: clear visual hierarchy, consistent color themes',
          'Publishing reports to Power BI Service & scheduling data refreshes',
        ],
      },
    ],
    keyConcepts: [
      'Fact Tables vs Dimension Tables',
      'Star Schema 1-to-Many Relationships',
      'CALCULATE() Filter Context Modification in DAX',
      'Calculated Columns (Storage) vs Measures (Compute on Query)',
      'Executive Dashboard 4-Question Framework (What, Why, Where, Next)',
    ],
    practiceSuggestions: [
      'Build a Power BI Star Schema data model connecting a Fact Sales table to Dim Customer, Dim Product, and Dim Date.',
      'Write DAX measures for Total Revenue, Prior Year Revenue, and YoY Revenue Growth %.',
      'Design an interactive Executive Sales Dashboard answering: What happened, why did it happen, where did it happen, and what should we investigate next?',
    ],
    projectSuggestions: [
      {
        title: 'Executive Global Sales & Profitability BI Dashboard',
        description: 'Complete interactive Power BI report with star schema model, 15+ DAX measures, time-intelligence comparisons, and drill-through analysis.',
        level: 'BI Dashboard',
      },
    ],
    commonMistakes: [
      'Creating calculated columns for every aggregation instead of using memory-efficient DAX measures.',
      'Cramming 15 different colorful charts on one page creating cognitive overload instead of structured KPI cards.',
    ],
    nextStepPreview: 'Connect data analysis directly to commercial revenue strategies in Stage 09: Exploratory Data Analysis & Business Analytics.',
  },
  {
    id: 'eda-business-analytics',
    stageNumber: '09',
    title: 'EDA & Commercial Business Analytics',
    shortTitle: 'Business Analytics',
    tagline: 'Connect analytics directly to business strategy: cohort retention, customer churn, CAC, LTV, and commercial metrics.',
    iconName: 'Search',
    goal: 'Learn how to investigate data and convert analysis into meaningful commercial business recommendations.',
    whyItMatters:
      'Companies do not pay analysts just to describe what happened. They pay analysts to diagnose *why* it happened and prescribe concrete actions to increase revenue, lower customer churn, and improve operational profit margins.',
    learningOutcome: 'Execute deep exploratory analysis across marketing, sales, product, and finance, delivering actionable strategic recommendations.',
    technologies: ['Cohort Analysis', 'Customer Segmentation', 'CAC & LTV Modeling', 'Churn Analytics', 'Root Cause Analysis'],
    topics: [
      {
        category: 'Exploratory Data Analysis (EDA) Process',
        items: [
          'The 8-step EDA cycle: Understand → Clean → Explore → Find Patterns → Test Assumptions → Visualize → Insight → Action',
          'Univariate analysis (single variable distributions and summary statistics)',
          'Bivariate analysis (relationships between two variables)',
          'Multivariate analysis (cross-cutting interactions between 3+ features)',
          'Detecting anomalies, seasonal spikes, and behavioral shifts',
        ],
      },
      {
        category: 'Core Commercial Business Metrics',
        items: [
          'Revenue, Gross Margin, Net Profit, Average Order Value (AOV)',
          'Customer Acquisition Cost (CAC) & Customer Lifetime Value (LTV)',
          'LTV to CAC Ratio (Target > 3:1 healthy benchmark)',
          'Conversion rate, Funnel drop-off analysis, Cart abandonment',
          'Customer Retention Rate & Churn Rate calculations',
          'Cohort analysis for tracking subscriber retention over time',
          'RFM (Recency, Frequency, Monetary) customer segmentation',
        ],
      },
      {
        category: 'Commercial Domains & Case Studies',
        items: [
          'Sales Analytics: Pipeline conversion, quota attainment, regional velocity',
          'Marketing Analytics: Campaign ROI, ROAS, channel attribution modeling',
          'Product Analytics: Daily Active Users (DAU), Monthly Active Users (MAU), stickiness',
          'Root-cause diagnostic frameworks (5 Whys, Fishbone diagram)',
        ],
      },
    ],
    keyConcepts: [
      'Cohort Retention Triangle Matrices',
      'RFM (Recency, Frequency, Monetary) Segmentation',
      'LTV:CAC Unit Economics',
      'Funnel Drop-Off Diagnostic Analysis',
      'Root-Cause Diagnostic Thinking',
    ],
    practiceSuggestions: [
      'Perform a Customer Churn Diagnostic: analyze why users in a subscription SaaS product cancel after month 2.',
      'Build an RFM Customer Segmentation model grouping customers into Champions, Loyal, At-Risk, and Lost.',
      'Analyze an e-commerce checkout funnel to identify which step causes the highest drop-off rate.',
    ],
    projectSuggestions: [
      {
        title: 'Subscription SaaS Churn & Retention Diagnostic Case Study',
        description: 'Complete commercial investigation analyzing customer drop-off cohorts, calculating LTV/CAC, and recommending 3 revenue-saving initiatives.',
        level: 'Advanced',
      },
    ],
    commonMistakes: [
      'Stopping at describing descriptive metrics ("Sales dropped 10%") without investigating root causes and recommending solutions.',
      'Analyzing vanity metrics (page views) instead of core commercial value metrics (conversion, retention, LTV).',
    ],
    nextStepPreview: 'Build your flagship portfolio projects to get hired in Stage 10: Real-World Projects & Job Readiness.',
  },
  {
    id: 'real-world-portfolio',
    stageNumber: '10',
    title: 'Real-World Projects & Job Readiness',
    shortTitle: 'Portfolio & Job Ready',
    tagline: 'Combine SQL, Python, Power BI, and business storytelling into a standout portfolio that lands interviews.',
    iconName: 'Briefcase',
    goal: 'Build a standout portfolio that proves you can solve real business problems using data.',
    whyItMatters:
      'Certificates do not get you hired; proven projects do. A portfolio of 3-4 deep, business-oriented projects showcasing clean SQL queries, Python analysis, interactive Power BI dashboards, and executive recommendations guarantees interview calls.',
    learningOutcome: 'A complete, public portfolio with documented GitHub repos, live interactive BI dashboards, and interview readiness.',
    technologies: ['Portfolio Website', 'GitHub Documentation', 'Power BI Service', 'LinkedIn & Resume', 'STAR Interview Method'],
    topics: [
      {
        category: 'The 5-Tier Project Portfolio Strategy',
        items: [
          'Project 1: Excel Interactive Sales Dashboard',
          'Project 2: Relational E-Commerce SQL Analytics',
          'Project 3: Python Customer Cohort & EDA Investigation',
          'Project 4: Power BI Executive Business Intelligence Report',
          'Project 5: Flagship End-to-End Enterprise Analytics Platform (SQL + Python + Power BI + Business Recommendations)',
        ],
      },
      {
        category: 'Portfolio Presentation & Documentation Standards',
        items: [
          'Writing comprehensive project READMEs with business background, questions, methodology, and findings',
          'Including executive summary slides and dashboard GIF walkthroughs',
          'Publishing interactive Power BI reports to the web',
          'Structuring clean GitHub repositories with SQL scripts and Jupyter notebooks',
        ],
      },
      {
        category: 'Data Analyst Interview Mastery',
        items: [
          'Live SQL technical coding interviews (multi-table joins, CTEs, window functions)',
          'Take-home data analysis case study execution & presentation',
          'Explaining business insights under pressure to hiring managers',
          'STAR behavioral interview framework for past project stories',
          'Optimizing your Data Analyst resume & LinkedIn profile for recruiters',
        ],
      },
    ],
    keyConcepts: [
      'End-to-End Analytics Portfolio Architecture',
      'Action-Oriented Executive Presentation',
      'Live SQL Technical Problem Solving',
      'STAR Method Project Explanations',
      'Business Value Demonstration',
    ],
    practiceSuggestions: [
      'Write a 1-page executive summary for your top portfolio project explaining the business problem, findings, and $ impact.',
      'Practice live SQL whiteboard interviews under a 30-minute timer.',
      'Conduct peer mock interviews explaining dashboard insights to a non-technical stakeholder.',
    ],
    projectSuggestions: [
      {
        title: 'Flagship End-to-End Enterprise Business Intelligence Platform',
        description: 'Comprehensive project pulling data with SQL, cleaning in Python, modeling in Power BI, and presenting executive strategic recommendations.',
        level: 'Portfolio-Level',
      },
    ],
    commonMistakes: [
      'Copying generic tutorial datasets (like Titanic or Iris) that every other applicant has instead of analyzing realistic business datasets.',
      'Failing to link live dashboards or GitHub code on your resume.',
    ],
    nextStepPreview: 'You have the complete roadmap. Start with Stage 01, master your tools, and turn data into high-impact decisions!',
  },
];

export const DATA_ANALYST_PROJECT_PROGRESSION: DataAnalystProjectProgression[] = [
  {
    id: 'da-proj-1',
    stage: 'Stage 02 — Beginner',
    name: 'Executive Sales & Revenue Excel Dashboard',
    difficulty: 'Beginner',
    recommendedStack: ['Microsoft Excel / Google Sheets', 'Pivot Tables', 'XLOOKUP', 'Dynamic Slicers', 'KPI Cards'],
    skillsLearned: ['Data cleaning', 'Lookup formulas', 'Pivot table aggregations', 'Conditional formatting', 'Dashboard layout design'],
    description: 'An interactive multi-tab spreadsheet dashboard analyzing regional retail sales, product profitability, and sales representative quota attainment.',
    questionsToAnswer: [
      'Which product categories generate the highest profit margins?',
      'Which geographic sales regions are underperforming their quarterly targets?',
      'Who are the top 10 performing sales reps by gross revenue?',
    ],
    expectedInsights: [
      'Identified that 20% of products generated 75% of profits, while discounting in Region West reduced net margins by 12%.',
    ],
    dashboardReqs: 'Dynamic KPI scorecards, interactive slicers by region/category, clean color theme, and zero formula errors.',
    githubReqs: 'Clean Excel .xlsx workbook with documentation sheet and screenshots in README.',
  },
  {
    id: 'da-proj-2',
    stage: 'Stage 04 — SQL Analytics',
    name: 'E-Commerce Relational Database Business Analytics',
    difficulty: 'SQL Analytics',
    recommendedStack: ['PostgreSQL / MySQL', 'DBeaver', 'CTEs & Window Functions', 'Aggregations', 'GitHub'],
    skillsLearned: ['Multi-table joins', 'Window functions (RANK, LAG, LEAD)', 'Subqueries & CTEs', 'Cohort retention SQL', 'Query optimization'],
    description: 'A 20-query deep analytical investigation over a relational database containing customers, orders, order items, products, and payments.',
    questionsToAnswer: [
      'What is the Month-over-Month (MoM) revenue growth rate across categories?',
      'What is the 30-day, 60-day, and 90-day customer repeat purchase rate?',
      'Which products have the highest cart abandonment and return rates?',
    ],
    expectedInsights: [
      'Discovered customer retention dropped 35% after first purchase due to slow shipping times in specific zip codes.',
    ],
    dashboardReqs: 'N/A (Comprehensive SQL script repository with formatted queries and business answers).',
    githubReqs: 'Well-commented .sql files organized by business question with query output tables in README.',
  },
  {
    id: 'da-proj-3',
    stage: 'Stage 06 — Python Analytics',
    name: 'Customer Segmentation & Exploratory Data Analysis',
    difficulty: 'Intermediate',
    recommendedStack: ['Python 3', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter Notebook'],
    skillsLearned: ['Data cleaning at scale', 'Exploratory data analysis', 'RFM segmentation', 'Statistical correlation', 'Data visualization'],
    description: 'A comprehensive exploratory data analysis over 250,000 customer transactions, cleaning raw data, engineering metrics, and performing RFM segmentation.',
    questionsToAnswer: [
      'How are customers segmented by Recency, Frequency, and Monetary value?',
      'What customer demographic characteristics correlate with highest Lifetime Value?',
      'What seasonal purchasing patterns exist throughout the year?',
    ],
    expectedInsights: [
      'Segmented users into 4 distinct groups, revealing that the "Champions" cohort drove 62% of revenue despite making up only 14% of user base.',
    ],
    dashboardReqs: 'Clean Jupyter Notebook with annotated Markdown headers, statistical summaries, and publication-ready charts.',
    githubReqs: 'Jupyter notebook (.ipynb), cleaned dataset samples, requirements.txt, and visual summary in README.',
  },
  {
    id: 'da-proj-4',
    stage: 'Stage 08 — BI Dashboard',
    name: 'Executive Business Intelligence & Profitability Dashboard',
    difficulty: 'BI Dashboard',
    recommendedStack: ['Microsoft Power BI', 'Power Query', 'DAX Measures', 'Star Schema', 'Power BI Service'],
    skillsLearned: ['Dimensional modeling', 'Star schema relationships', 'Complex DAX formulas (CALCULATE, Time Intelligence)', 'Drill-through reporting'],
    description: 'An interactive, executive-grade Power BI dashboard providing real-time visibility into company-wide KPIs, profit margins, regional trends, and forecast vs actuals.',
    questionsToAnswer: [
      'What is our Year-to-Date (YTD) revenue and YoY growth percentage?',
      'Where are our biggest supply chain and shipping bottleneck locations?',
      'Which customer segments are driving the highest product returns?',
    ],
    expectedInsights: [
      'Enabled executive team to pinpoint a 14% margin loss in specific supplier items and re-allocate marketing budget to top-performing products.',
    ],
    dashboardReqs: '3-page interactive report (Executive Overview, Regional Deep Dive, Product Matrix) with tooltips and drill-throughs.',
    githubReqs: 'Power BI .pbix file, public interactive web publish link, and PDF report export.',
  },
  {
    id: 'da-proj-5',
    stage: 'Stage 10 — Portfolio Level',
    name: 'End-to-End Enterprise Business Intelligence Platform',
    difficulty: 'Portfolio-Level',
    recommendedStack: ['PostgreSQL', 'Python (Pandas)', 'Power BI', 'Statistics', 'Executive Slide Deck'],
    skillsLearned: ['Full-lifecycle analytics', 'SQL extraction', 'Python data transformation', 'BI dashboard modeling', 'Executive stakeholder presentation'],
    description: 'A flagship portfolio project taking raw business data from a database, performing cleaning and cohort retention analysis in Python, modeling a star schema in Power BI, and writing a 5-page executive strategy brief.',
    questionsToAnswer: [
      'What root causes drove the 18% decline in Q3 subscription revenue?',
      'What is our predicted customer churn over the next 6 months without intervention?',
      'What 3 strategic initiatives should leadership implement immediately to recover revenue?',
    ],
    expectedInsights: [
      'Provided 3 actionable recommendations (onboarding simplification, pricing tier adjustment, and proactive email re-engagement) estimated to recover $450k ARR.',
    ],
    dashboardReqs: 'Full interactive multi-page Power BI dashboard + Python exploratory notebook + SQL pipeline scripts.',
    githubReqs: 'Comprehensive GitHub portfolio repo with architecture diagram, executive summary PDF, live dashboard link, and data dictionary.',
  },
];

export const DATA_ANALYST_SPECIALIZATIONS: AnalystSpecialization[] = [
  {
    title: 'Business Analyst',
    description: 'Bridge business requirements with data, optimize corporate workflows, define KPIs, and assist executive decision-making.',
    coreTech: ['Excel', 'SQL', 'Power BI', 'Process Mapping', 'KPI Definition'],
    focus: 'Business Processes, Requirements, Strategy, KPIs',
    icon: 'Briefcase',
  },
  {
    title: 'Product Analyst',
    description: 'Analyze user behavior, feature adoption, onboarding funnels, customer retention cohorts, and A/B test experiments.',
    coreTech: ['SQL', 'Python', 'Mixpanel / Amplitude', 'A/B Testing', 'Tableau'],
    focus: 'Product Metrics, User Behavior, Funnels, Retention',
    icon: 'Laptop',
  },
  {
    title: 'Marketing Analyst',
    description: 'Evaluate marketing campaign performance, customer acquisition costs (CAC), channel attribution, and ad spend return (ROAS).',
    coreTech: ['SQL', 'Google Analytics', 'Python', 'Power BI', 'Attribution Modeling'],
    focus: 'Campaigns, Conversion Rates, CAC, Attribution',
    icon: 'Target',
  },
  {
    title: 'Financial Analyst',
    description: 'Model corporate revenue, forecast cash flow, analyze operational cost structures, and evaluate investment profitability.',
    coreTech: ['Advanced Excel', 'Financial Modeling', 'SQL', 'Power BI', 'Forecasting'],
    focus: 'Revenue, Costs, Margins, Budgeting, Forecasts',
    icon: 'LineChart',
  },
  {
    title: 'BI & Reporting Analyst',
    description: 'Architect enterprise data models, design automated real-time dashboards, and maintain corporate reporting pipelines.',
    coreTech: ['Power BI', 'Tableau', 'DAX', 'SQL Data Warehouses', 'Star Schema'],
    focus: 'Dashboards, Reporting, Data Modeling, DAX',
    icon: 'LayoutDashboard',
  },
  {
    title: 'Operations Analyst',
    description: 'Optimize supply chains, monitor logistics performance, reduce operational waste, and improve resource efficiency.',
    coreTech: ['SQL', 'Excel', 'Python', 'Process Optimization', 'Power BI'],
    focus: 'Logistics, Efficiency, Supply Chain, Performance',
    icon: 'Cpu',
  },
];

export const DATA_ANALYST_TOOLKIT: AnalystToolkitCategory[] = [
  {
    category: 'SPREADSHEETS',
    items: ['Microsoft Excel', 'Google Sheets', 'Pivot Tables', 'XLOOKUP'],
  },
  {
    category: 'RELATIONAL DATABASES',
    items: ['PostgreSQL', 'MySQL', 'Microsoft SQL Server', 'Snowflake / BigQuery'],
  },
  {
    category: 'SQL TOOLS & QUERYING',
    items: ['SQL (CTEs & Window Functions)', 'DBeaver', 'pgAdmin'],
  },
  {
    category: 'PYTHON DATA STACK',
    items: ['Python 3', 'Pandas', 'NumPy', 'Jupyter Notebook', 'Google Colab'],
  },
  {
    category: 'DATA VISUALIZATION',
    items: ['Matplotlib', 'Seaborn', 'Plotly', 'Data Storytelling'],
  },
  {
    category: 'BUSINESS INTELLIGENCE',
    items: ['Microsoft Power BI', 'Tableau', 'Power Query (M)', 'DAX Formulas'],
  },
  {
    category: 'COLLABORATION & REPOS',
    items: ['Git', 'GitHub', 'Markdown Documentation', 'Portfolio Web Pages'],
  },
];

export const DATA_ANALYST_COMMON_MISTAKES = [
  {
    title: 'Learning Excel Without Hands-On Practice',
    solution: 'Build real-world sales and expense dashboards with Pivot Tables and lookups immediately instead of just watching videos.',
  },
  {
    title: 'Memorizing SQL Syntax Instead of Solving Business Questions',
    solution: 'Practice writing queries that solve real questions like Monthly Growth %, retention cohorts, and ranking top spenders.',
  },
  {
    title: 'Learning Python Without Understanding Data Analytics',
    solution: 'Focus on Pandas DataFrames, data cleaning, and statistical exploration rather than trying to learn software engineering or game dev.',
  },
  {
    title: 'Building Dashboards Without Defining Business Questions',
    solution: 'Always ask: "What decision will an executive make by looking at this chart?" before adding any visual element.',
  },
  {
    title: 'Using Too Many Confusing Charts (Clutter)',
    solution: 'Keep dashboards clean. Use 4-5 focused visuals with clear KPI scorecards rather than cramming 15 rainbow charts onto one screen.',
  },
  {
    title: 'Ignoring Statistics & Blindly Trusting Averages',
    solution: 'Always inspect the median, standard deviation, and distribution skewness before drawing conclusions from an average.',
  },
  {
    title: 'Neglecting Data Cleaning & Sanity Checks',
    solution: 'Never skip inspecting missing values, duplicate IDs, and invalid outliers. Garbage in equals garbage out.',
  },
  {
    title: 'Focusing Only on Tools (Missing Analytical Thinking)',
    solution: 'Tools just crunch data. Analytical thinking and business acumen create the actual commercial value for employers.',
  },
  {
    title: 'Copying Generic Tutorial Datasets on Portfolios',
    solution: 'Avoid the Titanic and Iris datasets. Analyze realistic business, e-commerce, healthcare, or financial datasets with original insights.',
  },
  {
    title: 'Reporting "What Happened" Without "What We Should Do"',
    solution: 'Always accompany charts with 2-3 concrete, actionable business recommendations for leadership.',
  },
];

export const DATA_ANALYST_FOUR_PILLARS = [
  {
    title: 'SQL & Data Extraction',
    subtitle: 'Mastery of multi-table joins, subqueries, CTEs, and window functions to query relational databases.',
    icon: 'Database',
  },
  {
    title: 'Analytical & Statistical Thinking',
    subtitle: 'Understanding distributions, variance, hypothesis testing, metrics, and finding root-cause drivers.',
    icon: 'Brain',
  },
  {
    title: 'Data Visualization & BI',
    subtitle: 'Building clean, intuitive, interactive Power BI / Tableau dashboards that communicate insights at a glance.',
    icon: 'LayoutDashboard',
  },
  {
    title: 'Business Communication',
    subtitle: 'Translating complex quantitative findings into clear, actionable commercial recommendations for leaders.',
    icon: 'Briefcase',
  },
];

export const DATA_ANALYSIS_WORKFLOW_STEPS = [
  { step: '1', title: 'Question', desc: 'Define the core business problem & objective' },
  { step: '2', title: 'Collect', desc: 'Extract relevant data via SQL from warehouses' },
  { step: '3', title: 'Clean', desc: 'Sanitize missing values, duplicates & datatypes' },
  { step: '4', title: 'Explore', desc: 'Analyze distributions, correlations & cohorts' },
  { step: '5', title: 'Analyze', desc: 'Perform statistical testing & root-cause checks' },
  { step: '6', title: 'Visualize', desc: 'Design clear charts & interactive BI dashboards' },
  { step: '7', title: 'Explain', desc: 'Synthesize findings into executive summaries' },
  { step: '8', title: 'Recommend', desc: 'Provide 2-3 concrete strategic initiatives' },
  { step: '9', title: 'Decide', desc: 'Stakeholders make data-backed commercial decisions' },
];

export const ANALYTICAL_THINKING_LADDER = [
  { step: '1', label: 'BUSINESS QUESTION', question: 'Formulate what challenge we are solving.' },
  { step: '2', label: 'WHAT HAPPENED?', question: 'Identify descriptive trends and historical metrics.' },
  { step: '3', label: 'WHY DID IT HAPPEN?', question: 'Diagnose root-cause factors, segments, and anomalies.' },
  { step: '4', label: 'WHAT PATTERNS EXIST?', question: 'Correlate customer behaviors and seasonal shifts.' },
  { step: '5', label: 'WHAT EVIDENCE SUPPORTS THIS?', question: 'Validate conclusions with statistical significance.' },
  { step: '6', label: 'WHAT SHOULD WE DO?', question: 'Prescribe actionable business recommendations.' },
  { step: '7', label: 'HOW WILL WE MEASURE SUCCESS?', question: 'Set concrete KPIs to track post-decision results.' },
];
