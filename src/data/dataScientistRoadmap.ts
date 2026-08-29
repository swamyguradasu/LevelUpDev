export interface DataScientistRoadmapStage {
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
    level: 'Beginner' | 'Intermediate' | 'Machine Learning' | 'Advanced' | 'Portfolio-Level';
  }[];
  commonMistakes: string[];
  nextStepPreview: string;
}

export interface DataScientistProjectProgression {
  id: string;
  stage: string;
  name: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Machine Learning' | 'Advanced' | 'Portfolio-Level';
  recommendedStack: string[];
  skillsLearned: string[];
  description: string;
  businessProblem: string;
  modelsUsed: string[];
  evaluationMetrics: string;
  deploymentDetails: string;
  githubReqs: string;
}

export interface DataScientistSpecialization {
  title: string;
  description: string;
  coreTech: string[];
  focus: string;
  icon: string;
}

export interface DataScientistToolkitCategory {
  category: string;
  items: string[];
}

export const DATA_SCIENTIST_ROADMAP_STAGES: DataScientistRoadmapStage[] = [
  {
    id: 'ds-foundations',
    stageNumber: '01',
    title: 'Data Science Foundations',
    shortTitle: 'Foundations',
    tagline: 'Understand the end-to-end Data Science lifecycle, problem framing, and machine learning paradigms.',
    iconName: 'Brain',
    goal: 'Understand the Data Science lifecycle, the role of a Data Scientist, and how machine learning fits into the broader data science process.',
    whyItMatters:
      'Data Science is not merely importing a machine learning library and calling .fit(). It is a rigorous scientific process of understanding business challenges, framing them mathematically, discovering patterns in noisy data, and delivering actionable predictive intelligence.',
    learningOutcome: 'Understand the complete Data Science workflow before diving into individual technologies.',
    recommendedApproach:
      'Always start with the core business problem and understand whether it requires heuristic rules, statistical testing, or machine learning before writing any model code.',
    technologies: ['Data Science Lifecycle', 'Problem Framing', 'CRISP-DM', 'ML Taxonomy'],
    topics: [
      {
        category: 'The Data Science Landscape',
        items: [
          'What is Data Science & why organizations invest in it',
          'The daily responsibilities of a professional Data Scientist',
          'Data Scientist vs Data Analyst vs ML Engineer vs Data Engineer',
          'Structured vs Semi-structured vs Unstructured data',
          'When to use Machine Learning vs simple heuristics or SQL analysis',
        ],
      },
      {
        category: 'The End-to-End Data Science Lifecycle',
        items: [
          'Business Problem Definition & Objective Mapping',
          'Data Collection, Sourcing & Ingestion',
          'Data Understanding & Sanity Audits',
          'Data Cleaning & Anomaly Handling',
          'Exploratory Data Analysis (EDA) & Hypothesis Generation',
          'Feature Engineering & Target Transformation',
          'Model Training, Validation & Cross-Validation',
          'Model Evaluation & Business Metric Alignment',
          'Model Deployment, Continuous Monitoring & Retraining Iteration',
        ],
      },
      {
        category: 'Core Machine Learning Paradigms',
        items: [
          'Supervised Learning (Classification & Regression)',
          'Unsupervised Learning (Clustering, Dimensionality Reduction, Anomaly Detection)',
          'Semi-Supervised Learning fundamentals',
          'Reinforcement Learning conceptual overview (Agents, Rewards, Policies)',
        ],
      },
    ],
    keyConcepts: [
      'The 12-Step Data Science Lifecycle',
      'Supervised vs Unsupervised Learning',
      'Classification vs Regression vs Clustering',
      'Business Problem Framing into ML Formulations',
      'Data Scientist Role Boundaries',
    ],
    practiceSuggestions: [
      'Take 3 real company problems (e.g. Uber surge pricing, Spotify song recommendations, credit card fraud) and formulate them into ML problem types with inputs (X) and targets (y).',
      'Map out the entire data lifecycle for an automated customer loan approval system.',
      'Explain when a simple decision rule is preferred over a complex deep neural network.',
    ],
    projectSuggestions: [
      {
        title: 'Machine Learning Problem Formulation Proposal',
        description: 'Document an end-to-end Data Science project proposal defining target metrics, dataset requirements, candidate model architectures, and production success criteria.',
        level: 'Beginner',
      },
    ],
    commonMistakes: [
      'Jumping directly into building complex neural networks before understanding if the problem is even solvable with the available data.',
      'Confusing model evaluation accuracy with real business impact ($ value created or saved).',
    ],
    nextStepPreview: 'Master your primary computational language in Stage 02: Python for Data Science.',
  },
  {
    id: 'python-for-ds',
    stageNumber: '02',
    title: 'Python for Data Science',
    shortTitle: 'Python & Tools',
    tagline: 'Master Python 3, object-oriented concepts, NumPy arrays, Pandas DataFrames, and Jupyter environments.',
    iconName: 'Code2',
    goal: 'Become highly comfortable with Python because Python is the primary universal programming language throughout modern Data Science.',
    whyItMatters:
      'Python powers the entire data science ecosystem—from data wrangling in Pandas to high-performance tensor computing in PyTorch. Writing clean, modular, vectorized Python code is the prerequisite for all subsequent stages.',
    learningOutcome: 'Manipulate, clean, aggregate, reshape, and analyze complex multi-dimensional datasets programmatically using Python and Pandas.',
    technologies: ['Python 3.12', 'NumPy', 'Pandas', 'JupyterLab', 'Google Colab', 'VS Code'],
    topics: [
      {
        category: 'Core & Intermediate Python Programming',
        items: [
          'Data types (integers, floats, booleans, strings, lists, tuples, sets, dictionaries)',
          'Control flow, custom functions, *args, **kwargs, lambda functions',
          'List, set, and dictionary comprehensions for clean data transformation',
          'Exception handling (try / except / finally / raise)',
          'Object-Oriented Programming (OOP) fundamentals: Classes, methods, inheritance',
          'Iterators, generators (yield), decorators, and context managers (with statements)',
          'Type hints and virtual environment management (venv, conda, poetry)',
        ],
      },
      {
        category: 'NumPy for Numerical Computing',
        items: [
          'N-dimensional arrays (ndarray) vs native Python lists',
          'Array creation, shapes, datatypes, indexing, and slicing',
          'Broadcasting rules and vectorized arithmetic without slow Python loops',
          'Mathematical operations: dot products, matrix transposition, linear algebra (np.linalg)',
          'Random sampling, distributions, and reproducible seeds (np.random)',
        ],
      },
      {
        category: 'Pandas for Data Manipulation',
        items: [
          'Pandas Series and 2D DataFrames architecture',
          'Reading/writing CSV, Excel, Parquet, JSON, and SQL databases',
          'Indexing & selection: .loc[] (label-based) and .iloc[] (integer-based)',
          'Filtering with boolean masks and query() syntax',
          'Handling missing values: isna(), dropna(), fillna(), interpolate()',
          'Handling duplicates: duplicated(), drop_duplicates()',
          'Grouping & aggregations: groupby().agg() split-apply-combine workflow',
          'Merging (pd.merge), joining, and concatenating DataFrames',
          'Reshaping: pivot_table(), melt(), stack(), unstack()',
          'Date/Time series manipulation and period frequency resampling',
        ],
      },
    ],
    keyConcepts: [
      'NumPy Vectorization & Array Broadcasting',
      'Pandas DataFrame Split-Apply-Combine Pattern',
      '.loc[] vs .iloc[] Precision Indexing',
      'Memory Management (Data Types, Parquet vs CSV)',
      'Writing Modular, Reusable Python Functions',
    ],
    practiceSuggestions: [
      'Load a 1,000,000-row dataset into Pandas and optimize memory usage by downcasting integer and float data types.',
      'Implement an automated data validation script that checks for missing columns, unexpected NULLs, and invalid data ranges.',
      'Write vectorized NumPy functions to calculate Euclidean and Manhattan distances between sets of points.',
    ],
    projectSuggestions: [
      {
        title: 'Multi-Source Data Ingestion & Transformation Engine',
        description: 'A modular Python pipeline that loads CSV, JSON, and SQL database feeds, sanitizes missing fields, computes summary statistics, and outputs analysis-ready Parquet files.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Writing nested for-loops to iterate over Pandas rows instead of fast vectorized operations or .apply().',
      'Not setting random seeds (np.random.seed), making data experiments non-reproducible.',
    ],
    nextStepPreview: 'Unpack the mathematical engine behind all ML algorithms in Stage 03: Mathematics for Data Science.',
  },
  {
    id: 'mathematics-for-ds',
    stageNumber: '03',
    title: 'Mathematics for Data Science',
    shortTitle: 'Mathematics',
    tagline: 'Linear algebra, multivariate calculus, probability theory, and gradient-based optimization.',
    iconName: 'Matrix',
    goal: 'Learn the practical mathematics required to understand how machine learning and deep learning algorithms actually work.',
    whyItMatters:
      'Machine learning models are mathematical functions operating on multi-dimensional vector spaces. Linear algebra represents features, calculus computes gradients to update weights, and probability quantifies uncertainty.',
    learningOutcome: 'Understand the mathematical mechanics of loss functions, matrix transformations, eigenvalues, and gradient descent optimization.',
    recommendedApproach:
      'Focus on intuitive, applied mathematics connected directly to ML algorithms rather than memorizing dry theoretical proofs.',
    technologies: ['Linear Algebra', 'Multivariate Calculus', 'Matrix Operations', 'Gradient Descent', 'Optimization'],
    topics: [
      {
        category: 'Linear Algebra for Machine Learning',
        items: [
          'Scalars, vectors, vector spaces, norms (L1 norm, L2 norm / Euclidean distance)',
          'Matrices: Dimensions, row vectors, column vectors, identity matrices',
          'Matrix operations: Addition, scalar multiplication, dot product, matrix multiplication',
          'Matrix transpose, determinants, matrix inverse, and rank',
          'Linear transformations: Rotating, scaling, and projecting vector spaces',
          'Eigenvalues and Eigenvectors (Foundational to PCA Dimensionality Reduction)',
          'Singular Value Decomposition (SVD) concept & applications',
        ],
      },
      {
        category: 'Multivariate Calculus & Optimization',
        items: [
          'Functions, limits, continuous vs discrete functions',
          'Derivatives, slope, instantaneous rate of change',
          'Partial derivatives and the Gradient vector (∇f)',
          'The Chain Rule (The foundational calculus engine of Neural Network Backpropagation)',
          'Loss functions (Mean Squared Error, Binary Cross-Entropy)',
          'Gradient Descent optimization: Cost surfaces, learning rate (α), step updates',
          'Stochastic Gradient Descent (SGD) vs Batch vs Mini-Batch GD',
          'Local minima, global minima, saddle points, and vanishing gradients',
        ],
      },
      {
        category: 'Connecting Mathematics Directly to ML',
        items: [
          'Matrices → Features & Datasets (X is an N x D matrix)',
          'Dot Product → Cosine Similarity & Linear Regression prediction (y_pred = Xw + b)',
          'Gradients → Loss minimization during model training',
          'Eigenvectors → Principal Component Directions in PCA',
        ],
      },
    ],
    keyConcepts: [
      'Matrix Dot Product (X · W) in Neural Networks and Linear Models',
      'L1 vs L2 Norms (Lasso vs Ridge Regularization)',
      'The Chain Rule in Backpropagation',
      'Gradient Descent Weight Updates: w := w - α * ∇Loss',
      'Eigenvalues & PCA Variance Maximization',
    ],
    practiceSuggestions: [
      'Implement Linear Regression from scratch using pure NumPy and Gradient Descent without any ML libraries.',
      'Compute matrix dot products and transpose transformations by hand, then verify with NumPy.',
      'Calculate partial derivatives for a Mean Squared Error loss function with respect to weights and bias.',
    ],
    projectSuggestions: [
      {
        title: 'From-Scratch Gradient Descent Optimizer in NumPy',
        description: 'Build a custom mathematical optimization engine with learning rate schedulers, momentum, and cost-surface visualization plots.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Viewing mathematics as disconnected theory rather than the literal code that executes inside Scikit-learn and PyTorch.',
      'Setting learning rates too high (causing loss to diverge) or too low (causing optimization to stall).',
    ],
    nextStepPreview: 'Master empirical uncertainty and experiment design in Stage 04: Statistics & Experimentation.',
  },
  {
    id: 'statistics-experimentation',
    stageNumber: '04',
    title: 'Statistics & Experimentation',
    shortTitle: 'Statistics',
    tagline: 'Descriptive stats, probability distributions, Central Limit Theorem, hypothesis testing, and A/B testing.',
    iconName: 'LineChart',
    goal: 'Learn statistics deeply enough to reason correctly about noisy data, probability, uncertainty, and controlled experiments.',
    whyItMatters:
      'High model accuracy is meaningless if your dataset suffers from selection bias or data leakage. Statistics teaches you how to test assumptions, quantify confidence, and prove whether improvements are real or random noise.',
    learningOutcome: 'Formulate hypotheses, calculate p-values and confidence intervals, design A/B test experiments, and prevent statistical bias.',
    technologies: ['Hypothesis Testing', 'A/B Testing', 'Inferential Statistics', 'SciPy', 'Statsmodels'],
    topics: [
      {
        category: 'Descriptive Statistics & Summary Metrics',
        items: [
          'Measures of central tendency: Mean, Median, Mode (Median for skewed distributions)',
          'Measures of dispersion: Variance, Standard Deviation, Range, IQR',
          'Percentiles, Quartiles & Z-Score normalization',
          'Covariance and Pearson / Spearman correlation coefficients',
          'Correlation vs Causation & Confounding variables',
        ],
      },
      {
        category: 'Probability Theory & Distributions',
        items: [
          'Basic probability rules, Independent events, Conditional probability',
          'Bayes Theorem (P(A|B) = [P(B|A) * P(A)] / P(B))',
          'Random variables & Expected value',
          'Probability distributions: Normal (Gaussian), Binomial, Poisson, Uniform, Exponential',
          'The Central Limit Theorem (CLT) & why the normal distribution is universal',
        ],
      },
      {
        category: 'Inferential Statistics & Hypothesis Testing',
        items: [
          'Population vs Sample & Sampling Bias',
          'Confidence Intervals and Standard Error of the Mean',
          'Hypothesis Testing framework: Null Hypothesis (H0) vs Alternative Hypothesis (Ha)',
          'Test statistics (Z-test, Student t-test, Chi-Square test, ANOVA)',
          'p-values, Significance level (α = 0.05), and Critical value rejection regions',
          'Type I Errors (False Positives) vs Type II Errors (False Negatives)',
          'Statistical Power (1 - β) and Sample Size Determination',
        ],
      },
      {
        category: 'A/B Testing & Controlled Experimentation',
        items: [
          'Randomized Controlled Trials: Control group vs Treatment group',
          'A/B testing experimental design, minimum detectable effect (MDE)',
          'Statistical significance vs Practical business significance',
          'Common pitfalls: Peeking problem, multiple testing problem, seasonality bias',
        ],
      },
    ],
    keyConcepts: [
      'Central Limit Theorem (Sampling Distribution Normality)',
      'p-value Interpretation & Hypothesis Testing (p < 0.05)',
      'Type I (False Positive) vs Type II (False Negative) Errors',
      'Bayes Theorem for Conditional Probabilities',
      'A/B Testing Sample Size & Power Calculation',
    ],
    practiceSuggestions: [
      'Conduct a two-sample t-test in Python using `scipy.stats` to determine if a new algorithm significantly increased user engagement.',
      'Calculate the required sample size for an A/B test detecting a 2% conversion lift with 80% power.',
      'Demonstrate the Central Limit Theorem by taking 1,000 random samples from an exponential distribution and plotting the sample means.',
    ],
    projectSuggestions: [
      {
        title: 'End-to-End A/B Testing & Statistical Experimentation Suite',
        description: 'Simulate a multi-variant product experiment, evaluate sample sizes, check for sample ratio mismatch (SRM), compute p-values, and generate an executive report.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Stopping an A/B test early the moment a p-value drops below 0.05 (the peeking bias).',
      'Confusing statistical significance (a measurable difference) with business significance (a commercially meaningful difference).',
    ],
    nextStepPreview: 'Query enterprise data warehouses and extract features in Stage 05: SQL & Data Engineering Fundamentals.',
  },
  {
    id: 'sql-data-engineering',
    stageNumber: '05',
    title: 'SQL & Data Engineering Fundamentals',
    shortTitle: 'SQL & Data',
    tagline: 'Query relational databases, master multi-table joins, CTEs, window functions, and understand ETL pipelines.',
    iconName: 'Database',
    goal: 'Learn how to retrieve, manipulate, filter, and extract training features from relational databases at scale.',
    whyItMatters:
      'Real data does not come in clean CSV files on Kaggle. It lives in distributed relational databases and data warehouses. Data Scientists must write production-quality SQL to extract cohort features and build training datasets.',
    learningOutcome: 'Write optimized SQL queries with CTEs, window functions, and joins to extract ML feature datasets from relational warehouses.',
    technologies: ['PostgreSQL', 'MySQL', 'Snowflake / BigQuery', 'SQL CTEs & Window Functions', 'ETL / ELT'],
    topics: [
      {
        category: 'Relational Database Fundamentals & Filtering',
        items: [
          'Relational schema architecture, primary keys, foreign keys, constraints',
          'SELECT, WHERE, DISTINCT, ORDER BY, LIMIT / TOP',
          'Complex filtering: AND, OR, NOT, IN, BETWEEN, LIKE, IS NULL',
        ],
      },
      {
        category: 'Aggregations, Grouping & Multi-Table Joins',
        items: [
          'Aggregations: COUNT, SUM, AVG, MIN, MAX, standard deviation in SQL',
          'GROUP BY and HAVING (filtering aggregated metrics vs WHERE filtering rows)',
          'INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN',
          'Self-joins and multi-table joins across 4+ tables',
        ],
      },
      {
        category: 'Advanced SQL & Feature Extraction Queries',
        items: [
          'Common Table Expressions (CTEs with WITH clause) for modular feature pipelines',
          'Subqueries (Scalar, Correlated subqueries)',
          'CASE WHEN conditional statements for feature binning and categorical encoding',
          'Window functions: ROW_NUMBER(), RANK(), DENSE_RANK()',
          'Offset window functions: LAG(), LEAD() for time-lagged feature creation',
          'OVER(PARTITION BY ... ORDER BY ... ROWS BETWEEN ...)',
          'Date/Time transformations (DATE_TRUNC, EXTRACT, DATEDIFF)',
        ],
      },
      {
        category: 'Data Engineering & Pipeline Concepts',
        items: [
          'ETL (Extract-Transform-Load) vs ELT (Extract-Load-Transform)',
          'Data Warehouses (Snowflake, BigQuery, Redshift) vs Data Lakes (S3, GCS)',
          'Batch processing vs Streaming data processing',
          'Workflow orchestration concepts (Apache Airflow, Prefect, dbt)',
        ],
      },
    ],
    keyConcepts: [
      'Time-Lagged Feature Engineering with LAG() & LEAD()',
      'Modular Query Structuring with Common Table Expressions (CTEs)',
      'INNER vs LEFT JOIN Data Retention Mechanics',
      'Data Warehouse (OLAP) vs Transactional (OLTP) Systems',
      'ETL vs ELT Data Pipeline Architecture',
    ],
    practiceSuggestions: [
      'Write SQL queries using window functions to create 7-day and 30-day rolling average user activity features for a churn model.',
      'Extract a normalized training dataset from a 5-table relational e-commerce schema with customer lifetime orders, total spend, and days since last purchase.',
      'Solve 40+ medium-to-hard SQL problems on LeetCode and HackerRank.',
    ],
    projectSuggestions: [
      {
        title: 'Automated Feature Extraction SQL Pipeline',
        description: 'A comprehensive SQL suite that queries raw database logs and transforms them into an aggregated, ML-ready feature table with zero data leakage.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Introducing future data into SQL feature extraction queries (lookahead data leakage), creating an over-optimistic model.',
      'Using SELECT * in production queries, causing massive memory overhead and query throttling.',
    ],
    nextStepPreview: 'Sanitize messy data and uncover hidden patterns in Stage 06: Data Cleaning & Exploratory Data Analysis.',
  },
  {
    id: 'data-cleaning-eda',
    stageNumber: '06',
    title: 'Data Cleaning & Exploratory Data Analysis',
    shortTitle: 'Cleaning & EDA',
    tagline: 'Sanitize noisy datasets, discover statistical patterns, create visualizations, and engineer features.',
    iconName: 'Search',
    goal: 'Learn how to deeply inspect, clean, and understand a dataset before training any machine learning model.',
    whyItMatters:
      'Garbage in, garbage out. A flawed, uncleaned dataset with missing values, mislabeled categories, or undetected outliers will produce useless predictions regardless of how sophisticated the ML model is.',
    learningOutcome: 'Execute complete exploratory data analysis, detect anomalies, engineer predictive features, and prepare clean train/test splits.',
    recommendedApproach:
      'Always visualize distributions, check correlations, and audit missing data mechanisms before choosing an algorithm.',
    technologies: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Plotly', 'Data Profiling'],
    topics: [
      {
        category: 'Data Cleaning & Sanitization',
        items: [
          'Missing data mechanisms: Missing Completely at Random (MCAR), MAR, MNAR',
          'Imputation strategies: Mean, median, mode, KNN imputation, iterative imputation',
          'Duplicate record resolution and fuzzy matching',
          'Fixing incorrect data types, parsing messy date strings, text standardization',
          'Outlier detection: Z-scores, IQR method, Isolation Forests, and domain validation',
        ],
      },
      {
        category: 'Exploratory Data Analysis (EDA) Techniques',
        items: [
          'Univariate analysis: Histograms, KDE plots, Box plots for single variable distribution',
          'Bivariate analysis: Scatter plots, bar plots, cross-tabulations between features and target',
          'Multivariate analysis: Correlation matrices, pair plots, heatmap visualizations',
          'Distribution shape analysis: Skewness, kurtosis, log transformations',
          'Feature interaction & multicollinearity detection (Variance Inflation Factor - VIF)',
        ],
      },
      {
        category: 'Data Preprocessing for Modeling',
        items: [
          'Train / Validation / Test dataset splitting (e.g. 70/15/15 or 80/20)',
          'Stratified splitting for imbalanced classification targets',
          'Temporal time-series splitting (never shuffle time series data!)',
          'Preventing Data Leakage: Fitting scalers and encoders ONLY on training data',
          'Separating feature matrix (X) and target vector (y)',
        ],
      },
    ],
    keyConcepts: [
      'The Golden Rule of Data Leakage (Fit on Train, Transform on Test)',
      'Stratified K-Fold Splitting for Imbalanced Targets',
      'Outlier Handling: Truncation (Winsorization) vs Removal vs Tree Robustness',
      'Correlation Matrix & Multicollinearity (VIF)',
      'Log Transformation for Right-Skewed Data',
    ],
    practiceSuggestions: [
      'Take a raw, messy public dataset (e.g. housing or loan applications) and execute an end-to-end cleaning and EDA notebook with 10+ annotated insights.',
      'Demonstrate data leakage by fitting a StandardScaler before splitting vs after splitting, and observe the difference in test performance.',
      'Apply log and box-cox transformations to skewed monetary features and visualize the before/after distribution.',
    ],
    projectSuggestions: [
      {
        title: 'Comprehensive Exploratory Data Analysis Case Study',
        description: 'A deep-dive Jupyter notebook exploring consumer behavior across 500,000 records with statistical hypothesis testing, distribution plots, and feature engineering recommendations.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Fitting scalers or encoders on the entire dataset before splitting, contaminating test data.',
      'Randomly shuffling time-series data, leaking future trends into historical training samples.',
    ],
    nextStepPreview: 'Train, evaluate, and tune predictive algorithms in Stage 07: Machine Learning Mastery.',
  },
  {
    id: 'machine-learning',
    stageNumber: '07',
    title: 'Machine Learning Mastery',
    shortTitle: 'Machine Learning',
    tagline: 'Master Scikit-learn, regression, classification, clustering, bias-variance tradeoff, and cross-validation.',
    iconName: 'Cpu',
    goal: 'Learn the core machine learning algorithms used to solve real-world prediction, classification, and clustering problems.',
    whyItMatters:
      'Machine learning is the algorithmic core of Data Science. Mastering classical supervised and unsupervised algorithms enables you to solve 90% of commercial data science challenges with high accuracy, speed, and interpretability.',
    learningOutcome: 'Select, preprocess, train, validate, evaluate, and tune classical machine learning models using Scikit-learn.',
    technologies: ['Scikit-learn', 'Linear & Logistic Regression', 'Decision Trees', 'Random Forest', 'SVM', 'K-Means', 'PCA'],
    topics: [
      {
        category: 'Supervised Learning — Regression Algorithms',
        items: [
          'Linear Regression (Ordinary Least Squares math & assumptions)',
          'Polynomial Regression for non-linear relationships',
          'Regularized Regression: Ridge (L2 penalty) vs Lasso (L1 feature selection) vs ElasticNet',
          'Regression Evaluation: MAE, MSE, RMSE, R-squared (R²), Adjusted R²',
        ],
      },
      {
        category: 'Supervised Learning — Classification Algorithms',
        items: [
          'Logistic Regression (Sigmoid function, Log-Odds, Binary Cross-Entropy loss)',
          'K-Nearest Neighbors (KNN) distance-based classification',
          'Naive Bayes (Gaussian, Multinomial) probabilistic classification',
          'Support Vector Machines (SVM): Hyperplanes, margins, kernel trick (RBF, Polynomial)',
          'Decision Trees: Information Gain, Entropy, Gini Impurity, tree pruning',
          'Classification Evaluation: Confusion Matrix, Accuracy, Precision, Recall, F1-Score, ROC-AUC curve',
        ],
      },
      {
        category: 'Unsupervised Learning & Dimensionality Reduction',
        items: [
          'K-Means clustering (Elbow method, Silhouette score)',
          'Hierarchical Agglomerative clustering (Dendrograms)',
          'DBSCAN density-based clustering for spatial/noisy data',
          'Principal Component Analysis (PCA) for dimensionality reduction and visualization',
        ],
      },
      {
        category: 'Feature Engineering & Preprocessing Pipelines',
        items: [
          'Categorical Encoding: One-Hot Encoding, Ordinal Encoding, Target Encoding',
          'Feature Scaling: StandardScaler (Z-score), MinMaxScaler, RobustScaler',
          'Scikit-learn Pipeline and ColumnTransformer for clean, leak-free preprocessing',
          'Cross-Validation: K-Fold, Stratified K-Fold, TimeSeriesSplit',
          'The Bias-Variance Tradeoff: Diagnosing Underfitting vs Overfitting',
        ],
      },
    ],
    keyConcepts: [
      'Bias-Variance Tradeoff (High Bias = Underfitting, High Variance = Overfitting)',
      'Scikit-learn Pipeline & ColumnTransformer Architecture',
      'L1 (Lasso) vs L2 (Ridge) Regularization Mechanisms',
      'Precision vs Recall Tradeoff in Business Contexts',
      'K-Fold Cross-Validation for Generalization',
    ],
    practiceSuggestions: [
      'Build a complete Scikit-learn Pipeline with ColumnTransformer that imputes, encodes, scales, and trains a Logistic Regression model.',
      'Train a customer churn classification model and tune the decision threshold to maximize F1-Score on an imbalanced dataset.',
      'Use PCA to reduce a 50-feature dataset down to 2 principal components and plot the resulting clusters.',
    ],
    projectSuggestions: [
      {
        title: 'Customer Churn Prediction & Risk Classification Model',
        description: 'End-to-end supervised machine learning pipeline predicting customer churn probability, comparing 4 algorithms, tuning hyperparameters, and analyzing feature importances.',
        level: 'Machine Learning',
      },
    ],
    commonMistakes: [
      'Evaluating an imbalanced classification model using raw Accuracy instead of Precision, Recall, F1, and ROC-AUC.',
      'Not using Scikit-learn Pipelines, leading to preprocessing inconsistencies between training and test sets.',
    ],
    nextStepPreview: 'Explore high-performance gradient boosting and neural networks in Stage 08: Advanced ML & Deep Learning.',
  },
  {
    id: 'advanced-ml-deep-learning',
    stageNumber: '08',
    title: 'Advanced ML & Deep Learning',
    shortTitle: 'Advanced ML & DL',
    tagline: 'XGBoost, LightGBM, CatBoost, SHAP interpretability, PyTorch neural networks, and Transformer fundamentals.',
    iconName: 'Layers',
    goal: 'Learn state-of-the-art ensemble methods and deep learning architectures for complex unstructured and high-dimensional data.',
    whyItMatters:
      'Ensemble gradient boosting (XGBoost, LightGBM) dominates tabular Kaggle competitions and production models. Deep learning (PyTorch) unlocks capabilities across text, audio, images, and sequence modeling.',
    learningOutcome: 'Train optimized gradient boosted trees, interpret predictions with SHAP, and construct custom PyTorch neural networks.',
    recommendedApproach:
      'Deep Learning is a powerful specialization. Master gradient boosted trees for tabular business data first, then learn PyTorch when your problems require unstructured text or vision models.',
    technologies: ['XGBoost', 'LightGBM', 'CatBoost', 'Optuna', 'SHAP', 'PyTorch', 'TensorFlow'],
    topics: [
      {
        category: 'Ensemble Learning & Gradient Boosting',
        items: [
          'Ensemble theory: Bagging (Bootstrap Aggregating) vs Boosting vs Stacking',
          'Random Forests (Bagging of randomized decision trees)',
          'Gradient Boosting Machines (GBM) sequential residual learning',
          'XGBoost: Second-order gradients, regularization, histogram binning',
          'LightGBM: Leaf-wise tree growth, GOSS, categorical feature optimization',
          'CatBoost: Native categorical feature handling without one-hot encoding',
        ],
      },
      {
        category: 'Hyperparameter Tuning & Model Interpretability',
        items: [
          'GridSearchCV and RandomizedSearchCV',
          'Bayesian Hyperparameter Optimization with Optuna',
          'Model Explainability: Feature Importance (MDI vs Permutation Importance)',
          'SHAP (SHapley Additive exPlanations) values for global and local model interpretability',
          'Partial Dependence Plots (PDP) and Individual Conditional Expectation (ICE)',
        ],
      },
      {
        category: 'Deep Learning & Neural Network Foundations',
        items: [
          'The Artificial Neuron (Perceptron), weights, biases, and activation functions (ReLU, Sigmoid, Softmax, GELU)',
          'Multi-Layer Perceptron (MLP) architecture: Input, hidden, and output layers',
          'Forward propagation, Loss calculation, and Backpropagation with gradient descent',
          'Optimizers: SGD with momentum, RMSprop, Adam, AdamW',
          'Regularization in Deep Learning: Dropout, Batch Normalization, Weight Decay (L2)',
          'Training loops in PyTorch (Dataset, DataLoader, loss.backward(), optimizer.step())',
          'Intro to CNNs (Convolutions, Pooling), RNNs / LSTMs, and Transformer Attention mechanisms',
        ],
      },
    ],
    keyConcepts: [
      'Boosting (Sequential Residual Correction) vs Bagging (Parallel Voting)',
      'SHAP Value Explanations for Individual Predictions',
      'PyTorch Tensor Computation & Autograd Engine',
      'Activation Functions (Why ReLU solves Vanishing Gradients)',
      'Overfitting Prevention via Dropout and Early Stopping',
    ],
    practiceSuggestions: [
      'Train an XGBoost model on tabular data and optimize hyperparameters using Optuna over 50 trials.',
      'Generate SHAP waterfall and summary plots to explain to a non-technical manager why a specific customer was denied a loan.',
      'Build and train a custom 3-layer neural network in PyTorch on the MNIST or Fashion-MNIST dataset.',
    ],
    projectSuggestions: [
      {
        title: 'Explainable Credit Default Risk Predictor with XGBoost & SHAP',
        description: 'Production-ready ensemble gradient boosting model tuned with Optuna, delivering individual loan default risk probabilities with interactive SHAP force plots.',
        level: 'Advanced',
      },
    ],
    commonMistakes: [
      'Using a Deep Neural Network on a small tabular dataset where XGBoost or Random Forest would achieve higher accuracy in 1% of the training time.',
      'Deploying a "black-box" model to a regulated industry (finance/healthcare) without SHAP or interpretability auditing.',
    ],
    nextStepPreview: 'Deploy models into production microservices and manage lifecycle in Stage 09: Model Deployment & MLOps.',
  },
  {
    id: 'model-deployment-mlops',
    stageNumber: '09',
    title: 'Model Deployment, MLOps & Production',
    shortTitle: 'Deployment & MLOps',
    tagline: 'Move from Jupyter notebooks to production: FastAPI REST APIs, Streamlit UIs, Docker containers, and MLflow tracking.',
    iconName: 'Cloud',
    goal: 'Understand how machine learning models move from research notebooks into reliable, automated, scalable production systems.',
    whyItMatters:
      'A model sitting in a Jupyter notebook creates zero business value. Data Scientists must know how to serialize models, wrap them in REST APIs, containerize them in Docker, track experiments with MLflow, and monitor data drift in production.',
    learningOutcome: 'Serialize trained models, build FastAPI prediction microservices, containerize applications with Docker, and track experiments with MLflow.',
    technologies: ['FastAPI', 'Streamlit', 'Docker', 'MLflow', 'DVC', 'Joblib / ONNX', 'CI/CD'],
    topics: [
      {
        category: 'Model Serialization & API Serving',
        items: [
          'Model Serialization: Joblib, Pickle, ONNX (Open Neural Network Exchange)',
          'Difference between offline batch inference vs real-time online REST API serving',
          'FastAPI: Building high-performance Python REST APIs for model inference',
          'Pydantic data validation schemas for incoming prediction payloads',
          'Interactive rapid prototyping with Streamlit and Gradio',
        ],
      },
      {
        category: 'Containerization & Cloud Basics',
        items: [
          'Docker fundamentals: Dockerfile, images, containers, and volumes',
          'Creating lightweight, reproducible Docker containers for ML inference',
          'Docker Compose for multi-container services (App + Database + Cache)',
          'Cloud storage concepts (AWS S3, GCP Cloud Storage) for model artifacts',
        ],
      },
      {
        category: 'MLOps & Lifecycle Management',
        items: [
          'Experiment Tracking with MLflow (parameters, metrics, artifacts, runs)',
          'Model Registry: Staging, Production, and Archived model versioning',
          'Data Versioning with DVC (Data Version Control)',
          'Model Monitoring in Production: Data Drift (KS-test) vs Concept Drift',
          'Automated retraining pipelines and CI/CD for Machine Learning (GitHub Actions)',
        ],
      },
    ],
    keyConcepts: [
      'Real-Time API Inference vs Batch Scoring Jobs',
      'Pydantic Input Validation to Prevent Invalid Inferences',
      'Docker Containerization for Environment Reproducibility',
      'MLflow Experiment Tracking & Model Registry',
      'Data Drift vs Concept Drift Monitoring',
    ],
    practiceSuggestions: [
      'Wrap a trained Scikit-learn model in a FastAPI endpoint with Pydantic request validation and test it via Swagger UI (/docs).',
      'Write a multi-stage Dockerfile to containerize your FastAPI prediction service and run it locally.',
      'Log 20 hyperparameter experiment runs to MLflow, comparing validation metrics and registering the best model to Production stage.',
    ],
    projectSuggestions: [
      {
        title: 'Containerized Real-Time Model Inference Microservice',
        description: 'A complete production-ready FastAPI microservice packaged in Docker, accepting JSON features, executing model inference, logging latencies, and serving an interactive Streamlit UI.',
        level: 'Advanced',
      },
    ],
    commonMistakes: [
      'Assuming notebook code can be copy-pasted directly into production without error handling, schema validation, and logging.',
      'Failing to monitor for data drift after deployment, causing model accuracy to silently degrade over time.',
    ],
    nextStepPreview: 'Assemble your flagship portfolio and prepare for technical interviews in Stage 10: Real-World Projects & Job Readiness.',
  },
  {
    id: 'real-world-projects-jobs',
    stageNumber: '10',
    title: 'Real-World Projects & Job Readiness',
    shortTitle: 'Portfolio & Job Ready',
    tagline: 'Assemble a portfolio demonstrating end-to-end Data Science competence, live demos, and technical interview mastery.',
    iconName: 'Rocket',
    goal: 'Build standout portfolio projects that prove you can execute the complete Data Science lifecycle from raw data to deployed intelligence.',
    whyItMatters:
      'Hiring managers review dozens of resumes daily. A candidate with 3-4 comprehensive, documented, containerized projects with live demos and clear business value stands out above hundreds of applicants who only have course certificates.',
    learningOutcome: 'A complete, public Data Science portfolio with clean GitHub documentation, containerized deployments, and interview readiness.',
    technologies: ['GitHub Portfolio', 'Live Model Demos', 'Technical Interview Prep', 'STAR Method', 'System Design for ML'],
    topics: [
      {
        category: 'The 5-Tier Project Progression Matrix',
        items: [
          'Project 1: Exploratory Data Analysis & Statistical Insight Case Study',
          'Project 2: Supervised Customer Churn / Risk Classification Model',
          'Project 3: End-to-End Regression & Feature Engineering Pipeline',
          'Project 4: Personalized Recommendation System with Collaborative Filtering',
          'Project 5: Flagship Production Enterprise Data Science Platform (SQL + EDA + ML + FastAPI + Docker + MLflow + Streamlit UI)',
        ],
      },
      {
        category: 'Portfolio Presentation & Engineering Standards',
        items: [
          'Writing comprehensive GitHub READMEs with architecture diagrams, metrics, and business value',
          'Clean, PEP-8 compliant code organization (src/ modular structure, requirements.txt, Dockerfile)',
          'Deploying live interactive demo web apps (Streamlit Cloud, Render, Hugging Face Spaces)',
          'Creating executive slide decks summarizing model insights and financial impact',
        ],
      },
      {
        category: 'Data Science Interview Preparation',
        items: [
          'Live Python & SQL coding interviews (Pandas wrangling, SQL CTEs/window functions)',
          'Machine learning theory and mathematical intuition questions (Bias-variance, gradient descent, metric selection)',
          'Take-home data science assignments & presentation techniques',
          'Machine Learning System Design interviews (e.g. Design a Fraud Detection System or Recommendation Feed)',
          'STAR behavioral interview framework for past project stories',
        ],
      },
    ],
    keyConcepts: [
      'Full-Lifecycle Project Demonstration (Data to Production)',
      'Clean Modular Code Architecture (Separation of ETL, Training, Inference)',
      'ML System Design Interview Framework',
      'Communicating Business ROI to Executive Stakeholders',
      'Technical Communication Under Interview Pressure',
    ],
    practiceSuggestions: [
      'Conduct a 45-minute mock ML System Design interview (e.g. "Design a Real-Time Ride Fare Estimation Engine").',
      'Package your flagship project with a 3-minute video walkthrough explaining the business problem, architecture, and results.',
      'Solve 30+ classical ML interview theoretical questions (e.g. How does Random Forest reduce variance? Why do we use ReLU?).',
    ],
    projectSuggestions: [
      {
        title: 'Flagship Enterprise Production Data Science Platform',
        description: 'Complete end-to-end platform extracting data with SQL, exploring in Python, training ensemble models with Optuna, logging with MLflow, serving via FastAPI in Docker, with a live Streamlit dashboard.',
        level: 'Portfolio-Level',
      },
    ],
    commonMistakes: [
      'Listing generic toy datasets (Titanic, Iris, Boston Housing) on your resume that recruiters ignore.',
      'Focusing only on model code while neglecting documentation, unit tests, and deployment reproducibility.',
    ],
    nextStepPreview: 'You have the complete roadmap. Start with Stage 01, master your fundamentals, and turn data into intelligent decisions!',
  },
];

export const DATA_SCIENTIST_PROJECT_PROGRESSION: DataScientistProjectProgression[] = [
  {
    id: 'ds-proj-1',
    stage: 'Stage 06 — Beginner',
    name: 'Exploratory Data Analysis & Statistical Insight Case Study',
    difficulty: 'Beginner',
    recommendedStack: ['Python 3', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter Notebook'],
    skillsLearned: ['Data cleaning', 'Exploratory data analysis', 'Statistical hypothesis testing', 'Distribution analysis', 'Data visualization'],
    description: 'A deep investigative analysis over a large real-world dataset (e.g. Netflix streaming trends or e-commerce purchases) uncovering seasonal trends and cohort behaviors.',
    businessProblem: 'Identify which content genres and regional markets drive the highest viewer retention to optimize $50M in annual content acquisition budget.',
    modelsUsed: ['Descriptive Statistics', 'Z-Score Outlier Filters', 'Hypothesis Testing (t-tests, ANOVA)'],
    evaluationMetrics: 'Statistical significance (p < 0.05), Correlation coefficients, Variance explained',
    deploymentDetails: 'Interactive Jupyter Notebook with annotated markdown insights and PDF executive summary report.',
    githubReqs: 'Clean .ipynb notebook, requirements.txt, visualizations folder, and documented README with 5 key business findings.',
  },
  {
    id: 'ds-proj-2',
    stage: 'Stage 07 — Machine Learning',
    name: 'Customer Churn & Risk Prediction Engine',
    difficulty: 'Machine Learning',
    recommendedStack: ['Scikit-learn', 'Pandas', 'Logistic Regression', 'Random Forest', 'XGBoost', 'Imbalanced-Learn'],
    skillsLearned: ['Imbalanced classification', 'Feature engineering', 'SMOTE oversampling', 'Scikit-learn Pipelines', 'ROC-AUC optimization'],
    description: 'A supervised classification model predicting customer subscription cancellation probability with automated feature preprocessing and threshold tuning.',
    businessProblem: 'Telecom/SaaS provider is losing 18% of customers annually. Predict churn 30 days in advance to enable targeted proactive retention discounts.',
    modelsUsed: ['Logistic Regression (Baseline)', 'Random Forest', 'XGBoost Classifier'],
    evaluationMetrics: 'F1-Score, Recall (capturing 85%+ of churners), Precision, ROC-AUC (Target > 0.88)',
    deploymentDetails: 'Serialized Scikit-learn Pipeline with Joblib and batch scoring script.',
    githubReqs: 'Modular Python codebase with train.py, evaluate.py, confusion matrix plots, and feature importance chart.',
  },
  {
    id: 'ds-proj-3',
    stage: 'Stage 08 — Advanced ML',
    name: 'Real Estate Price Valuation & Feature Engineering Pipeline',
    difficulty: 'Intermediate',
    recommendedStack: ['XGBoost', 'LightGBM', 'Optuna', 'SHAP', 'Scikit-learn', 'GeoPandas'],
    skillsLearned: ['Advanced regression', 'Spatial feature engineering', 'Bayesian hyperparameter optimization', 'Model interpretability (SHAP)'],
    description: 'An advanced non-linear regression model predicting property sale prices using geospatial features, historical sales, and macro-economic indicators.',
    businessProblem: 'Property marketplace needs an automated valuation model (AVM) to generate instant, trustworthy price estimates for buyers and sellers.',
    modelsUsed: ['Ridge Regression', 'Random Forest Regressor', 'LightGBM Regressor (Optuna-Tuned)'],
    evaluationMetrics: 'Root Mean Squared Error (RMSE), Mean Absolute Percentage Error (MAPE < 5%), R²',
    deploymentDetails: 'Local SHAP dashboard explaining price drivers for individual properties.',
    githubReqs: 'Full repo with Optuna tuning script, SHAP summary force plots, and data dictionary.',
  },
  {
    id: 'ds-proj-4',
    stage: 'Stage 08 — Advanced ML',
    name: 'Personalized E-Commerce Recommendation System',
    difficulty: 'Advanced',
    recommendedStack: ['Python', 'Surprise / Implicit', 'PyTorch', 'Matrix Factorization', 'Cosine Similarity', 'FastAPI'],
    skillsLearned: ['Collaborative filtering', 'Content-based filtering', 'Matrix factorization (SVD)', 'Top-N ranking metrics', 'Embedding spaces'],
    description: 'A hybrid recommendation engine combining user-item collaborative filtering with product text embeddings to deliver personalized product suggestions.',
    businessProblem: 'Increase cross-selling revenue and Average Order Value (AOV) by providing tailored product recommendations on checkout pages.',
    modelsUsed: ['Singular Value Decomposition (SVD)', 'Item-Item Collaborative Filtering', 'Neural Collaborative Filtering (NCF)'],
    evaluationMetrics: 'Precision@K, Recall@K, Mean Average Precision (MAP@10), Normalized Discounted Cumulative Gain (NDCG@10)',
    deploymentDetails: 'FastAPI microservice endpoint returning Top-10 recommended product IDs for any user ID in < 50ms.',
    githubReqs: 'Full recommendation pipeline with cold-start fallback heuristics and benchmark comparison table.',
  },
  {
    id: 'ds-proj-5',
    stage: 'Stage 10 — Portfolio Level',
    name: 'End-to-End Production Enterprise Data Science Platform',
    difficulty: 'Portfolio-Level',
    recommendedStack: ['PostgreSQL', 'Python (Pandas/NumPy)', 'XGBoost / PyTorch', 'MLflow', 'FastAPI', 'Docker', 'Streamlit'],
    skillsLearned: ['Full lifecycle data science', 'SQL extraction', 'MLflow experiment tracking', 'FastAPI REST serving', 'Docker containerization', 'Streamlit UI'],
    description: 'A flagship enterprise-grade prediction platform pulling data from a SQL warehouse, training tuned ensemble models, logging artifacts with MLflow, serving real-time predictions via FastAPI in Docker, and monitored with a live Streamlit dashboard.',
    businessProblem: 'Enterprise financial institution requires an end-to-end automated Credit Default Risk Scoring engine with explainable AI compliance.',
    modelsUsed: ['XGBoost Classifier + SHAP TreeExplainer'],
    evaluationMetrics: 'ROC-AUC: 0.92, F1-Score: 0.86, Cost-Weighted Loss Minimization',
    deploymentDetails: 'Production-ready Docker container with FastAPI endpoints, Swagger docs, MLflow model registry, and live Streamlit user portal.',
    githubReqs: 'Comprehensive GitHub portfolio with system architecture diagram, Dockerfile, docker-compose.yml, CI/CD workflow, and live app link.',
  },
];

export const DATA_SCIENTIST_SPECIALIZATIONS: DataScientistSpecialization[] = [
  {
    title: 'Machine Learning Scientist',
    description: 'Develop predictive classification and regression models on tabular, relational, and business data to drive automation.',
    coreTech: ['Python', 'Scikit-learn', 'XGBoost', 'LightGBM', 'Feature Engineering'],
    focus: 'Predictive Models, Classification, Regression, Feature Pipelines',
    icon: 'Cpu',
  },
  {
    title: 'Deep Learning & AI Specialist',
    description: 'Architect complex multi-layer neural networks, convolutional vision models, and transformer architectures.',
    coreTech: ['PyTorch', 'TensorFlow', 'CUDA', 'Torchvision', 'Transformers'],
    focus: 'Neural Networks, Backpropagation, High-Performance Tensors',
    icon: 'Brain',
  },
  {
    title: 'Natural Language Processing (NLP)',
    description: 'Extract semantic meaning from text, build sentiment classifiers, embeddings, and fine-tune Large Language Models.',
    coreTech: ['Hugging Face', 'spaCy', 'BERT', 'LLMs', 'Vector Databases', 'LangChain'],
    focus: 'Text Classification, Embeddings, Language Models, Tokenization',
    icon: 'Search',
  },
  {
    title: 'Computer Vision Specialist',
    description: 'Process and analyze visual imagery: object detection, image classification, semantic segmentation, and video analysis.',
    coreTech: ['OpenCV', 'PyTorch', 'YOLO', 'ResNet', 'Vision Transformers (ViT)'],
    focus: 'Images, Object Detection, Classification, Segmentation',
    icon: 'Layers',
  },
  {
    title: 'Recommendation Systems Engineer',
    description: 'Build large-scale personalized recommendation engines, matrix factorization algorithms, and collaborative filtering systems.',
    coreTech: ['Surprise', 'Implicit', 'PyTorch', 'Vector Search (FAISS)', 'Ranking Metrics'],
    focus: 'Personalization, Ranking, Similarity, Collaborative Filtering',
    icon: 'Target',
  },
  {
    title: 'Time Series & Forecasting Analyst',
    description: 'Model sequential temporal trends, demand forecasting, stock predictions, seasonality, and real-time anomaly detection.',
    coreTech: ['Prophet', 'ARIMA / SARIMAX', 'Statsmodels', 'LSTM / GRU', 'Anomaly Detection'],
    focus: 'Forecasting, Temporal Trends, Seasonality, Anomaly Detection',
    icon: 'LineChart',
  },
  {
    title: 'Statistical Experimentation & Causal AI',
    description: 'Design rigorous A/B testing frameworks, evaluate randomized control trials, and model causal inference beyond simple correlation.',
    coreTech: ['A/B Testing', 'DoWhy', 'CausalML', 'Statsmodels', 'Bayesian Inference'],
    focus: 'A/B Testing, Causal Reasoning, Statistical Experiments, Uplift',
    icon: 'HelpCircle',
  },
];

export const DATA_SCIENTIST_TOOLKIT: DataScientistToolkitCategory[] = [
  {
    category: 'PROGRAMMING & QUERYING',
    items: ['Python 3.12', 'SQL (PostgreSQL, MySQL, BigQuery)', 'Bash / Shell'],
  },
  {
    category: 'DATA MANIPULATION',
    items: ['NumPy', 'Pandas', 'SciPy', 'Polars'],
  },
  {
    category: 'DATA VISUALIZATION',
    items: ['Matplotlib', 'Seaborn', 'Plotly', 'Bokeh'],
  },
  {
    category: 'MACHINE LEARNING',
    items: ['Scikit-learn', 'XGBoost', 'LightGBM', 'CatBoost', 'Optuna'],
  },
  {
    category: 'DEEP LEARNING & AI',
    items: ['PyTorch', 'TensorFlow', 'Keras', 'Hugging Face Transformers'],
  },
  {
    category: 'MODEL INTERPRETABILITY',
    items: ['SHAP', 'LIME', 'Partial Dependence Plots'],
  },
  {
    category: 'NOTEBOOKS & ENVIRONMENTS',
    items: ['JupyterLab', 'Google Colab', 'VS Code'],
  },
  {
    category: 'DEPLOYMENT & SERVING',
    items: ['FastAPI', 'Streamlit', 'Gradio', 'Docker', 'Docker Compose'],
  },
  {
    category: 'MLOPS & LIFECYCLE',
    items: ['MLflow', 'DVC', 'Git & GitHub', 'GitHub Actions CI/CD'],
  },
];

export const DATA_SCIENTIST_COMMON_MISTAKES = [
  {
    title: 'Jumping into Machine Learning Without Statistics',
    solution: 'Master distributions, p-values, variance, and hypothesis testing first so you can interpret model predictions honestly.',
  },
  {
    title: 'Focusing Solely on Model Accuracy on Imbalanced Data',
    solution: 'Use Precision, Recall, F1-Score, PR-AUC, and ROC-AUC. A 99% accuracy model that misses all 1% fraud cases is useless.',
  },
  {
    title: 'Ignoring Data Leakage During Preprocessing',
    solution: 'Always split your data into Train and Test BEFORE fitting scalers, encoders, or computing imputation statistics.',
  },
  {
    title: 'Using Complex Deep Learning Unnecessarily',
    solution: 'Start with simple baseline models (Logistic Regression, Random Forest, XGBoost). Never use a complex neural net when a simpler model achieves the same result faster and with full interpretability.',
  },
  {
    title: 'Neglecting Data Cleaning & Sanity Audits',
    solution: 'Inspect outliers, duplicate records, and missing mechanisms thoroughly. Garbage in always equals garbage out.',
  },
  {
    title: 'Copying Generic Toy Datasets (Titanic, Iris)',
    solution: 'Build portfolio projects using messy, realistic e-commerce, healthcare, or financial datasets with original problem framings.',
  },
  {
    title: 'Leaving Models in Jupyter Notebooks (No Deployment)',
    solution: 'Package at least 2 models into production FastAPI REST endpoints containerized with Docker to prove engineering competence.',
  },
  {
    title: 'Treating Deep Learning as Mandatory for Every Role',
    solution: '90% of industry data science positions operate on tabular business data where SQL and XGBoost are the primary tools.',
  },
];

export const DATA_SCIENTIST_FOUR_PILLARS = [
  {
    title: 'Technical Programming',
    subtitle: 'Modular Python, vectorized NumPy, Pandas manipulation, SQL feature extraction, and Scikit-learn pipelines.',
    icon: 'Code2',
  },
  {
    title: 'Mathematical & Statistical Reasoning',
    subtitle: 'Linear algebra transformations, multivariate calculus gradients, probability distributions, and A/B test validation.',
    icon: 'Brain',
  },
  {
    title: 'Machine Learning & Modeling',
    subtitle: 'Selecting, training, cross-validating, hyperparameter tuning, and interpreting supervised and unsupervised algorithms.',
    icon: 'Cpu',
  },
  {
    title: 'Production & Business Impact',
    subtitle: 'Translating business goals into ML metrics, deploying containerized APIs, and communicating ROI to leadership.',
    icon: 'Rocket',
  },
];

export const DATA_SCIENCE_WORKFLOW_STEPS = [
  { step: '1', title: 'Question', desc: 'Define business problem, target metric & objective' },
  { step: '2', title: 'Collect', desc: 'Query data warehouses via SQL & ingestion scripts' },
  { step: '3', title: 'Clean', desc: 'Sanitize missing values, duplicates, outliers & types' },
  { step: '4', title: 'EDA', desc: 'Explore distributions, correlations & generate hypotheses' },
  { step: '5', title: 'Engineer', desc: 'Create predictive features, scale & encode columns' },
  { step: '6', title: 'Train', desc: 'Train baseline & advanced candidate ML models' },
  { step: '7', title: 'Evaluate', desc: 'Assess metrics (F1, RMSE, ROC-AUC) on validation split' },
  { step: '8', title: 'Tune', desc: 'Optimize hyperparameters using Optuna cross-validation' },
  { step: '9', title: 'Deploy', desc: 'Wrap in FastAPI endpoint & containerize in Docker' },
  { step: '10', title: 'Monitor', desc: 'Track data drift, model latency & trigger retraining' },
];

export const DATA_SCIENTIST_THINKING_LADDER = [
  { step: '1', label: 'BUSINESS PROBLEM', question: 'What are we actually trying to predict, automate, or understand?' },
  { step: '2', label: 'DATA SUFFICIENCY', question: 'Do we have the right features, historical samples, and ground truth labels?' },
  { step: '3', label: 'DATA TRUSTWORTHINESS', question: 'Are there hidden biases, missing patterns, or data leakage risks?' },
  { step: '4', label: 'PATTERN DISCOVERY', question: 'What statistical relationships and feature interactions exist in the data?' },
  { step: '5', label: 'MODEL SELECTION', question: 'What is the simplest, most interpretable model that solves this problem?' },
  { step: '6', label: 'EVALUATION ALIGNMENT', question: 'Does our mathematical evaluation metric match the true business cost?' },
  { step: '7', label: 'PRODUCTION VIABILITY', question: 'Can this model be served in real-time, monitored for drift, and retrained reliably?' },
];

export const MODEL_EVALUATION_METRICS = [
  {
    category: 'REGRESSION METRICS',
    metrics: [
      { name: 'MAE (Mean Absolute Error)', desc: 'Average magnitude of errors in original units. Robust to outliers.' },
      { name: 'MSE (Mean Squared Error)', desc: 'Penalizes large errors heavily by squaring differences.' },
      { name: 'RMSE (Root Mean Squared Error)', desc: 'Square root of MSE; penalizes big errors while retaining original units.' },
      { name: 'R² (R-Squared)', desc: 'Proportion of variance explained by model (1.0 = perfect, 0 = baseline mean).' },
    ],
  },
  {
    category: 'CLASSIFICATION METRICS',
    metrics: [
      { name: 'Accuracy', desc: 'Correct / Total. Misleading for imbalanced data (e.g. 99% accuracy on 1% fraud).' },
      { name: 'Precision', desc: 'True Positives / Predicted Positives. Crucial when False Positives are expensive.' },
      { name: 'Recall (Sensitivity)', desc: 'True Positives / Actual Positives. Crucial when False Negatives are fatal (medical/fraud).' },
      { name: 'F1-Score', desc: 'Harmonic mean of Precision and Recall. Balances both trade-offs.' },
      { name: 'ROC-AUC', desc: 'Area Under Receiver Operating Characteristic curve. Measures ranking capability across all thresholds.' },
    ],
  },
  {
    category: 'CLUSTERING METRICS',
    metrics: [
      { name: 'Silhouette Score', desc: 'Measures how similar an object is to its own cluster compared to other clusters (-1 to +1).' },
      { name: 'Inertia / Davies-Bouldin', desc: 'Measures within-cluster sum of squared distances for elbow method.' },
    ],
  },
];
