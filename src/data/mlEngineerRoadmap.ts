export interface MLEngineerRoadmapStage {
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
    level: 'Beginner' | 'Intermediate' | 'Production ML' | 'Advanced' | 'Portfolio-Level';
  }[];
  commonMistakes: string[];
  nextStepPreview: string;
}

export interface MLEngineerProjectProgression {
  id: string;
  stage: string;
  name: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Production ML' | 'Advanced' | 'Portfolio-Level';
  recommendedStack: string[];
  skillsLearned: string[];
  description: string;
  businessProblem: string;
  mlApproach: string;
  evaluationMetrics: string;
  apiAndDeployment: string;
  monitoringRequirements: string;
  githubReqs: string;
}

export interface MLEngineerToolkitCategory {
  category: string;
  coreItems: string[];
  advancedItems: string[];
}

export const ML_ENGINEER_ROADMAP_STAGES: MLEngineerRoadmapStage[] = [
  {
    id: 'programming-software-engineering',
    stageNumber: '01',
    title: 'Programming & Software Engineering',
    shortTitle: 'Software Engineering',
    tagline: 'Build the foundational engineering skills required to develop clean, testable, modular ML software systems.',
    iconName: 'Code2',
    goal: 'Become a strong software engineer before trying to build production machine learning systems.',
    whyItMatters:
      'ML Engineers do not just train models inside Jupyter notebooks; they build production software systems around models. Writing clean, modular, OOP-compliant code with error handling, logging, unit tests, and CI/CD is the primary differentiator between an analyst and an ML engineer.',
    learningOutcome: 'Write clean, testable, maintainable Python software following SOLID principles and industry testing standards.',
    recommendedApproach:
      'Treat ML pipelines as production software products: write modular Python packages with type hints, pytest suites, and logging from day one.',
    technologies: ['Python 3.12', 'pytest', 'Git & GitHub', 'Linux / Bash', 'SOLID Principles', 'Docker Basics'],
    topics: [
      {
        category: 'Advanced Python for Production Systems',
        items: [
          'OOP in Python: Classes, encapsulation, inheritance, composition over inheritance',
          'Data structures: Hash maps, stacks, queues, trees, graphs, heaps',
          'Time and space complexity: Big-O analysis of data transformation routines',
          'Type hints (mypy), dataclasses, Pydantic data modeling',
          'Iterators, generators, decorators, and context managers',
          'Asynchronous programming basics (asyncio) for non-blocking I/O',
        ],
      },
      {
        category: 'Software Engineering Best Practices',
        items: [
          'Clean code principles & SOLID design architecture',
          'Modular code structure (src/ layout, reusable packages)',
          'Structured logging (loguru, logging module) vs print statements',
          'Configuration management (YAML, .env, environment variables)',
          'Robust exception handling and custom domain errors',
        ],
      },
      {
        category: 'Developer Tooling & Testing',
        items: [
          'Linux shell commands, bash scripting, file permissions, SSH',
          'Git branching workflows (feature branches, PRs, semantic versioning)',
          'Automated testing: Unit tests, integration tests with pytest',
          'Test mocking, fixtures, and parameterized test suites',
          'Linters & formatters: ruff, black, flake8, pre-commit hooks',
        ],
      },
    ],
    keyConcepts: [
      'SOLID Principles in ML Pipelines',
      'Test-Driven Development (TDD) with pytest',
      'Structured Logging & Environment Configuration',
      'Big-O Algorithmic Efficiency in Data Processing',
      'Modular Python Package Architecture',
    ],
    practiceSuggestions: [
      'Refactor a 500-line messy Jupyter notebook into a clean, modular Python package with config.yaml and src/ modules.',
      'Write a 15-test pytest suite testing data preprocessing functions with edge cases (NULLs, invalid datatypes, empty inputs).',
      'Configure pre-commit hooks enforcing black formatting, ruff linting, and mypy type checking.',
    ],
    projectSuggestions: [
      {
        title: 'Production Python Package & Data Transformer',
        description: 'A modular, tested, typed Python package with structured logging, YAML configurations, CLI arguments, and 90%+ pytest coverage.',
        level: 'Beginner',
      },
    ],
    commonMistakes: [
      'Leaving all code inside messy Jupyter notebooks without modular Python scripts.',
      'Relying on print statements instead of structured logging with log levels (INFO, WARNING, ERROR).',
    ],
    nextStepPreview: 'Master the mathematical intuition of ML optimization in Stage 02: Mathematics & Statistics for ML.',
  },
  {
    id: 'mathematics-statistics-ml',
    stageNumber: '02',
    title: 'Mathematics & Statistics for ML',
    shortTitle: 'Math & Statistics',
    tagline: 'Linear algebra, multivariate calculus, gradient descent, probability distributions, and inferential hypothesis testing.',
    iconName: 'Matrix',
    goal: 'Understand the mathematical and statistical mechanisms behind machine learning algorithms and optimization.',
    whyItMatters:
      'Machine learning algorithms are mathematical functions operating on vector spaces. Linear algebra structures features, calculus computes gradients to update weights, probability quantifies uncertainty, and statistics validates whether model improvements are real.',
    learningOutcome: 'Understand the mathematical intuition behind matrix operations, loss surfaces, gradient descent, and statistical evaluation.',
    recommendedApproach:
      'Connect every mathematical concept directly to ML: Matrix → Features, Gradient → Optimization, Probability → Predictions, Statistics → Model evaluation.',
    technologies: ['Linear Algebra', 'Multivariate Calculus', 'Gradient Descent', 'Probability Distributions', 'Hypothesis Testing'],
    topics: [
      {
        category: 'Linear Algebra for ML Systems',
        items: [
          'Scalars, vectors, matrix multiplication, dot products, transpose, inverse',
          'Vector norms (L1 Manhattan norm, L2 Euclidean norm)',
          'Eigenvalues and Eigenvectors (PCA, dimensionality reduction, spectral decomposition)',
          'Linear transformations, projections, and matrix decomposition (SVD)',
        ],
      },
      {
        category: 'Multivariate Calculus & Optimization',
        items: [
          'Derivatives, partial derivatives, and Gradient vectors (∇f)',
          'The Chain Rule (Backpropagation foundation in neural networks)',
          'Loss functions: MSE, Binary Cross-Entropy, Categorical Cross-Entropy',
          'Gradient Descent algorithms: Batch GD, Stochastic GD (SGD), Adam optimizer',
          'Learning rates, momentum, saddle points, and local vs global minima',
        ],
      },
      {
        category: 'Probability & Inferential Statistics',
        items: [
          'Random variables, expected value, variance, covariance, correlation',
          'Probability distributions: Gaussian, Binomial, Poisson, Uniform',
          'Bayes Theorem & Maximum Likelihood Estimation (MLE)',
          'Central Limit Theorem, confidence intervals, hypothesis testing, p-values',
          'A/B testing, control/treatment groups, and statistical significance',
        ],
      },
    ],
    keyConcepts: [
      'Matrix Dot Product (X · W) in Linear Models & Tensors',
      'L1 (Lasso) vs L2 (Ridge) Norm Penalties',
      'The Chain Rule in Neural Network Backpropagation',
      'Gradient Descent Weight Updates: w := w - α * ∇Loss',
      'Hypothesis Testing & A/B Experiment Validation',
    ],
    practiceSuggestions: [
      'Implement Linear and Logistic Regression from scratch using pure NumPy and gradient descent.',
      'Write a Python script computing eigenvalues and eigenvectors to perform PCA dimensionality reduction manually.',
      'Simulate an A/B testing experiment in Python calculating sample sizes, p-values, and statistical power.',
    ],
    projectSuggestions: [
      {
        title: 'From-Scratch Mathematical Optimization & ML Engine',
        description: 'Build a pure NumPy mathematical engine implementing matrix transformations, gradient descent with momentum, and cross-entropy loss calculation.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Treating ML as a black box without understanding how gradients update weights during backpropagation.',
      'Confusing correlation with causation when designing predictive features.',
    ],
    nextStepPreview: 'Build reliable feature pipelines from relational databases in Stage 03: Data Engineering & Data Preparation.',
  },
  {
    id: 'data-engineering-preparation',
    stageNumber: '03',
    title: 'Data Engineering & Data Preparation',
    shortTitle: 'Data & SQL',
    tagline: 'Query relational warehouses with SQL, design ETL/ELT pipelines, process data with Pandas/PyArrow, and version datasets.',
    iconName: 'Database',
    goal: 'Learn how data reaches machine learning systems and how to prepare it reliably and reproducibly.',
    whyItMatters:
      'In production, ML models don’t read static CSV files; they ingest streaming events and query distributed data warehouses. ML engineers must build automated, robust data pipelines that extract, sanitize, and validate data without leaks.',
    learningOutcome: 'Write optimized SQL feature queries, build reproducible data pipelines, and implement automated data quality checks.',
    technologies: ['PostgreSQL', 'Advanced SQL (CTEs, Window Functions)', 'Pandas', 'PyArrow / Parquet', 'ETL / ELT', 'DVC Basics'],
    topics: [
      {
        category: 'Relational Databases & SQL for ML',
        items: [
          'Relational schemas, primary/foreign keys, indexing strategies',
          'Advanced multi-table JOINs, GROUP BY, HAVING, subqueries',
          'Common Table Expressions (CTEs) for clean modular feature pipelines',
          'Window functions: ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD for lagged features',
          'Date/time parsing, interval arithmetic, and temporal aggregation',
        ],
      },
      {
        category: 'Data Processing & Storage Formats',
        items: [
          'High-performance data manipulation with Pandas, NumPy, and PyArrow',
          'Columnar storage formats (Parquet, Feather) vs CSV (10x faster I/O)',
          'Handling large datasets that exceed RAM (chunking, memory optimization)',
          'Data Warehouses (Snowflake, BigQuery) vs Data Lakes (S3, GCS)',
        ],
      },
      {
        category: 'Data Cleaning, Pipelines & Validation',
        items: [
          'Missing value imputation, duplicate resolution, outlier sanitization',
          'Building automated ETL / ELT ingestion pipelines',
          'Data validation schemas (Great Expectations, Pydantic, Pandera)',
          'Dataset versioning and reproducibility with DVC (Data Version Control)',
        ],
      },
    ],
    keyConcepts: [
      'Time-Lagged Feature Extraction with SQL Window Functions',
      'Columnar Parquet Storage for High-Speed ML I/O',
      'Automated Data Validation (Great Expectations / Pandera)',
      'Data Versioning & Pipeline Reproducibility with DVC',
      'ETL vs ELT Data Architecture',
    ],
    practiceSuggestions: [
      'Write a multi-step SQL query using CTEs and window functions to generate 7-day, 14-day, and 30-day rolling activity features.',
      'Build a data ingestion pipeline that validates incoming data against a Pandera schema and raises alerts on anomalies.',
      'Convert a 2GB raw CSV dataset into optimized partitioned Parquet files and benchmark read speed improvements.',
    ],
    projectSuggestions: [
      {
        title: 'Automated Data Validation & Feature Pipeline',
        description: 'An automated pipeline querying a PostgreSQL warehouse, validating data constraints with Pandera, versioning datasets with DVC, and outputting optimized Parquet feature tables.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Hardcoding file paths and manual data cleaning steps inside interactive notebooks.',
      'Failing to validate incoming data schemas, allowing corrupted data to silently break production inference.',
    ],
    nextStepPreview: 'Master classical machine learning algorithms in Stage 04: Machine Learning Fundamentals.',
  },
  {
    id: 'ml-fundamentals',
    stageNumber: '04',
    title: 'Machine Learning Fundamentals',
    shortTitle: 'ML Fundamentals',
    tagline: 'Supervised regression, classification, unsupervised clustering, Scikit-learn, and the bias-variance tradeoff.',
    iconName: 'Brain',
    goal: 'Master core machine learning algorithms and understand when to use them for real-world prediction problems.',
    whyItMatters:
      'Classical machine learning powers the vast majority of enterprise production systems. Understanding algorithmic mechanics, assumptions, loss formulations, and regularization ensures you select the right model for the problem.',
    learningOutcome: 'Select, train, validate, and evaluate supervised and unsupervised machine learning algorithms using Scikit-learn.',
    technologies: ['Scikit-learn', 'Linear / Logistic Regression', 'Decision Trees', 'Random Forest', 'SVM', 'K-Means', 'PCA'],
    topics: [
      {
        category: 'Supervised Learning — Regression',
        items: [
          'Linear Regression: Ordinary Least Squares math, assumptions & diagnostics',
          'Regularization: Ridge (L2 penalty), Lasso (L1 feature selection), ElasticNet',
          'Polynomial Regression for non-linear feature interactions',
        ],
      },
      {
        category: 'Supervised Learning — Classification',
        items: [
          'Logistic Regression: Sigmoid activation, log-odds, binary cross-entropy loss',
          'K-Nearest Neighbors (KNN) distance-based classification',
          'Naive Bayes probabilistic classification',
          'Support Vector Machines (SVM): Max-margin hyperplanes, kernel trick (RBF)',
          'Decision Trees: Information Gain, Entropy, Gini Impurity, tree pruning',
          'Random Forest: Bagging (Bootstrap Aggregation), feature subsampling, out-of-bag error',
        ],
      },
      {
        category: 'Unsupervised Learning',
        items: [
          'K-Means clustering: Centroid convergence, Elbow method, Silhouette score',
          'Hierarchical Agglomerative clustering & Dendrograms',
          'DBSCAN density-based clustering for spatial and noisy data',
          'Principal Component Analysis (PCA) for dimensionality reduction',
        ],
      },
      {
        category: 'Validation & Generalization Concepts',
        items: [
          'Train, validation, and test dataset splitting methodologies',
          'The Bias-Variance Tradeoff (Underfitting vs Overfitting)',
          'K-Fold and Stratified K-Fold Cross-Validation',
          'Hyperparameter search fundamentals',
        ],
      },
    ],
    keyConcepts: [
      'Bias-Variance Tradeoff (High Bias = Underfit, High Variance = Overfit)',
      'L1 (Lasso) vs L2 (Ridge) Regularization Penalties',
      'Bagging (Random Forest) to Reduce Variance',
      'Stratified K-Fold Cross-Validation for Generalization',
      'K-Means Clustering & Silhouette Evaluation',
    ],
    practiceSuggestions: [
      'Train 4 different classification algorithms on an imbalanced dataset and compare decision boundaries.',
      'Implement K-Fold Cross-Validation from scratch in Python to evaluate a Ridge Regression model.',
      'Perform PCA on a high-dimensional dataset (e.g. 64 features) and reduce it to 2 components for visual clustering.',
    ],
    projectSuggestions: [
      {
        title: 'Multi-Model Benchmark & Evaluation Engine',
        description: 'A modular Python pipeline comparing Logistic Regression, Random Forest, and SVM models across cross-validated metrics with automated hyperparameter tuning.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Evaluating models solely on training data, confusing memorization with true generalization.',
      'Using a complex non-linear model before establishing a solid, interpretable linear baseline.',
    ],
    nextStepPreview: 'Engineer features, optimize hyperparameters, and interpret models in Stage 05: Feature Engineering & Model Optimization.',
  },
  {
    id: 'feature-engineering-optimization',
    stageNumber: '05',
    title: 'Feature Engineering & Model Optimization',
    shortTitle: 'Feature Engineering',
    tagline: 'Transform raw data into high-signal features, build Scikit-learn Pipelines, tune hyperparameters, and explain models with SHAP.',
    iconName: 'Sliders',
    goal: 'Learn how to transform raw data into useful features and systematically optimize model performance without data leakage.',
    whyItMatters:
      'Better features beat better algorithms. A well-engineered feature pipeline with target encoding, interaction terms, and robust scaling will dramatically improve model accuracy. Understanding SHAP interpretability ensures your models are explainable.',
    learningOutcome: 'Build reproducible Scikit-learn Pipelines, prevent data leakage, tune models with Optuna, and explain predictions with SHAP.',
    technologies: ['Scikit-learn Pipelines', 'ColumnTransformer', 'Optuna', 'SHAP', 'Imbalanced-Learn (SMOTE)', 'PR-AUC'],
    topics: [
      {
        category: 'Feature Engineering Techniques',
        items: [
          'Numerical transformations: Log transform, Box-Cox, polynomial features',
          'Feature scaling: StandardScaler (Z-score), MinMaxScaler, RobustScaler',
          'Categorical encoding: One-Hot, Ordinal, Target Encoding, Frequency Encoding',
          'Handling class imbalance: SMOTE, Random Oversampling, class weights (class_weight="balanced")',
          'Feature selection: Mutual Information, Variance Threshold, Recursive Feature Elimination (RFE)',
        ],
      },
      {
        category: 'Reproducible Scikit-learn Pipelines',
        items: [
          'Scikit-learn Pipeline and ColumnTransformer architecture',
          'Preventing Data Leakage: Fitting transformations strictly on training folds',
          'Custom transformer classes inheriting BaseEstimator and TransformerMixin',
          'Saving and serializing complete preprocessing + model pipelines',
        ],
      },
      {
        category: 'Hyperparameter Tuning & Evaluation Metrics',
        items: [
          'GridSearchCV and RandomizedSearchCV',
          'Bayesian Hyperparameter Optimization with Optuna',
          'Classification metrics: Accuracy, Precision, Recall, F1, ROC-AUC, PR-AUC, Confusion Matrix',
          'Regression metrics: MAE, MSE, RMSE, R-squared',
          'Probability calibration (Platt scaling, Isotonic regression)',
        ],
      },
      {
        category: 'Model Interpretability & Explainability',
        items: [
          'Feature importance (MDI vs Permutation Importance)',
          'SHAP (SHapley Additive exPlanations) values: Summary plots, waterfall plots, force plots',
          'Partial Dependence Plots (PDP) for non-linear feature impact',
        ],
      },
    ],
    keyConcepts: [
      'The Golden Rule of Data Leakage (Fit on Train, Transform on Test)',
      'Scikit-learn Pipeline & ColumnTransformer Encapsulation',
      'Precision vs Recall Business Tradeoff (PR-AUC for Imbalanced Data)',
      'Bayesian Optimization with Optuna',
      'SHAP Value Explanations for Local & Global Interpretability',
    ],
    practiceSuggestions: [
      'Build an end-to-end Scikit-learn Pipeline with custom transformers that imputes, encodes, scales, and trains an XGBoost model.',
      'Optimize 6 hyperparameters of a Random Forest model using Optuna over 100 trials.',
      'Generate SHAP waterfall plots explaining individual customer loan risk predictions.',
    ],
    projectSuggestions: [
      {
        title: 'Explainable Fraud Detection Pipeline with Optuna & SHAP',
        description: 'An advanced pipeline for heavily imbalanced credit card fraud detection, using ColumnTransformer, SMOTE, Optuna hyperparameter optimization, and interactive SHAP explainability charts.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Fitting scalers or encoders on the entire dataset before splitting, contaminating test metrics.',
      'Relying on raw Accuracy for imbalanced classification where 99% accuracy can be completely useless.',
    ],
    nextStepPreview: 'Harness the power of neural networks in Stage 06: Deep Learning & Neural Architectures.',
  },
  {
    id: 'deep-learning-architectures',
    stageNumber: '06',
    title: 'Deep Learning & Neural Architectures',
    shortTitle: 'Deep Learning',
    tagline: 'PyTorch, neural network fundamentals, activation functions, backpropagation, CNNs, LSTMs, and Transformers.',
    iconName: 'Cpu',
    goal: 'Learn neural networks and modern deep learning frameworks for unstructured text, vision, and complex sequential data.',
    whyItMatters:
      'Deep learning unlocks state-of-the-art performance for unstructured data: computer vision, audio, text, and sequence modeling. ML engineers must understand tensor computation, backpropagation, GPU acceleration (CUDA), and training loops in PyTorch.',
    learningOutcome: 'Construct, train, regularize, and evaluate deep neural networks using PyTorch with GPU acceleration.',
    recommendedApproach:
      'Use deep learning when the problem and data justify it (unstructured data or complex sequences). For tabular business data, ensemble boosted trees remain the standard.',
    technologies: ['PyTorch', 'Torchvision', 'CUDA / GPU Acceleration', 'TensorBoard', 'Transformers Basics'],
    topics: [
      {
        category: 'Neural Network Foundations',
        items: [
          'The Artificial Neuron (Perceptron), weights, biases, and activation functions (ReLU, Sigmoid, Softmax, GELU)',
          'Multi-Layer Perceptron (MLP) architecture: Forward pass, loss calculation, backpropagation',
          'Optimizers: SGD with momentum, RMSprop, Adam, AdamW, learning rate schedulers',
          'Regularization: Dropout, Batch Normalization, Layer Normalization, Weight Decay (L2)',
          'Loss functions: Binary Cross-Entropy, Cross-Entropy Loss, Mean Squared Error',
        ],
      },
      {
        category: 'PyTorch Framework Mastery',
        items: [
          'PyTorch Tensors, shapes, broadcasting, autograd (automatic differentiation)',
          'Building models with torch.nn.Module, nn.Sequential, and custom forward() methods',
          'Data loading with torch.utils.data.Dataset and DataLoader (batching, shuffling)',
          'Writing explicit training and validation loops with zero_grad(), backward(), step()',
          'GPU acceleration: Moving tensors and models to CUDA devices (.to("cuda"))',
          'Model checkpointing (torch.save / torch.load), early stopping, and TensorBoard logging',
        ],
      },
      {
        category: 'Specialized Deep Learning Architectures',
        items: [
          'Convolutional Neural Networks (CNNs): Convolutions, pooling, feature maps (ResNet transfer learning)',
          'Recurrent Neural Networks (RNNs, LSTMs, GRUs) for sequential and time-series data',
          'Transformer fundamentals: Self-attention mechanism, Multi-Head Attention, positional encoding',
          'Using pre-trained models from Hugging Face Hub for fine-tuning',
        ],
      },
    ],
    keyConcepts: [
      'Autograd Engine & Backpropagation Dynamics',
      'PyTorch Dataset & DataLoader Pipeline',
      'Activation Functions (Why ReLU Solves Vanishing Gradients)',
      'Overfitting Prevention via Dropout and Early Stopping',
      'Self-Attention Mechanism in Transformers',
    ],
    practiceSuggestions: [
      'Write a custom PyTorch training loop from scratch with validation metrics, early stopping, and checkpoint saving.',
      'Fine-tune a pre-trained ResNet or MobileNet model on a custom image classification dataset using Transfer Learning.',
      'Build a text classification neural network using PyTorch and evaluate training loss curves in TensorBoard.',
    ],
    projectSuggestions: [
      {
        title: 'Deep Learning Image Classifier with Transfer Learning',
        description: 'A complete PyTorch application fine-tuning a pre-trained CNN on a custom dataset with data augmentation, learning rate scheduling, GPU training, and TensorBoard visualization.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Forgetting to call optimizer.zero_grad() inside the PyTorch training loop, causing gradients to accumulate across batches.',
      'Training large deep neural networks without a GPU, leading to days of wasted training time.',
    ],
    nextStepPreview: 'Turn trained models into fast, reliable REST APIs in Stage 07: ML Systems & Model Serving.',
  },
  {
    id: 'ml-systems-serving',
    stageNumber: '07',
    title: 'ML Systems & Model Serving',
    shortTitle: 'Model Serving',
    tagline: 'Model serialization, FastAPI REST APIs, real-time vs batch inference, Pydantic schemas, and low-latency serving.',
    iconName: 'Server',
    goal: 'Learn how to turn trained machine learning models into production software services with low latency and high availability.',
    whyItMatters:
      'A trained model artifact in a folder is useless until it can accept inputs from client applications and return predictions in real-time. ML Engineers build high-throughput, low-latency microservices with input validation and error handling.',
    learningOutcome: 'Serialize models, build production FastAPI prediction services, handle batch/online inference, and optimize latency.',
    technologies: ['FastAPI', 'Uvicorn', 'Pydantic', 'Joblib / ONNX', 'REST APIs', 'Swagger / OpenAPI'],
    topics: [
      {
        category: 'Model Serialization & Artifact Formats',
        items: [
          'Model serialization: Joblib, Pickle, ONNX (Open Neural Network Exchange)',
          'Exporting complete preprocessing + model pipeline artifacts',
          'Loading models efficiently at application startup (singleton pattern)',
          'Versioned artifact management and metadata tracking',
        ],
      },
      {
        category: 'FastAPI Microservice Development',
        items: [
          'Building high-performance async REST APIs with FastAPI and Uvicorn',
          'Pydantic request and response schemas for strict data validation',
          'Custom health check endpoints (/health, /ready, /metrics)',
          'Handling prediction errors, invalid input payloads, and graceful fallbacks',
          'Automatic interactive API documentation with Swagger UI (/docs)',
        ],
      },
      {
        category: 'Serving Architectures & Latency Optimization',
        items: [
          'Real-time online inference vs asynchronous batch inference',
          'Measuring and optimizing prediction latency (P50, P95, P99 latency)',
          'Batch prediction endpoints for vector inputs',
          'Worker concurrency with Uvicorn and Gunicorn workers',
          'Timeouts, retries, rate limiting, and memory leak prevention',
        ],
      },
    ],
    keyConcepts: [
      'Model Serialization with Joblib and ONNX',
      'Pydantic Request Validation to Prevent Bad Inferences',
      'Model Singleton Loading at Startup (Avoid Loading per Request)',
      'P95 & P99 Latency Benchmarking',
      'Online Real-Time vs Offline Batch Inference Architectures',
    ],
    practiceSuggestions: [
      'Build a FastAPI microservice that loads a serialized XGBoost model, validates incoming JSON with Pydantic, and returns predictions in < 15ms.',
      'Benchmark API throughput and latency using Apache Bench or Locust with 100 concurrent users.',
      'Export a Scikit-learn or PyTorch model to ONNX runtime and measure inference speedup compared to standard Python.',
    ],
    projectSuggestions: [
      {
        title: 'Production Real-Time ML Prediction Microservice',
        description: 'A production-grade FastAPI microservice serving a machine learning model with strict Pydantic validation, structured JSON logging, health checks, Swagger docs, and Locust load testing benchmarks.',
        level: 'Production ML',
      },
    ],
    commonMistakes: [
      'Loading the model file from disk inside the request handler function instead of during application startup.',
      'Failing to validate incoming JSON payloads with Pydantic, causing unhandled 500 server crashes on missing fields.',
    ],
    nextStepPreview: 'Automate tracking, testing, and lifecycle management in Stage 08: MLOps & ML Lifecycle Automation.',
  },
  {
    id: 'mlops-automation',
    stageNumber: '08',
    title: 'MLOps & ML Lifecycle Automation',
    shortTitle: 'MLOps & CI/CD',
    tagline: 'Experiment tracking with MLflow, model registries, automated CI/CD pipelines, data drift, and continuous monitoring.',
    iconName: 'GitBranch',
    goal: 'Learn how to manage, automate, track, test, and monitor machine learning systems throughout their entire operational lifecycle.',
    whyItMatters:
      'An ML system is never finished when a model is deployed. Real-world data distributions change over time (data drift), causing model accuracy to degrade. MLOps provides the automated infrastructure to track experiments, version models, and trigger retraining.',
    learningOutcome: 'Track experiments with MLflow, manage a Model Registry, implement CI/CD testing pipelines, and monitor production data drift.',
    technologies: ['MLflow', 'DVC', 'GitHub Actions CI/CD', 'Evidently AI (Drift Detection)', 'Model Registry'],
    topics: [
      {
        category: 'Experiment Tracking & Model Registry',
        items: [
          'Logging parameters, metrics, code versions, and artifacts with MLflow',
          'Comparing hyperparameter runs and selecting the best production candidate',
          'MLflow Model Registry: Transitioning models across Staging, Production, and Archived',
          'Dataset versioning and lineage tracking with DVC',
        ],
      },
      {
        category: 'Continuous Integration & Continuous Deployment (CI/CD)',
        items: [
          'CI/CD pipeline architecture for Machine Learning (GitHub Actions)',
          'Automated linting, type-checking, and pytest test execution on every commit',
          'Automated model training and regression benchmark testing',
          'Automated container building and staging deployment',
        ],
      },
      {
        category: 'Production Monitoring & Drift Detection',
        items: [
          'Data Drift: Input feature distribution shift (KS-test, Population Stability Index - PSI)',
          'Concept Drift: Target relationship degradation over time',
          'Monitoring prediction latency, error rates, and throughput',
          'Automated alerting and continuous retraining trigger pipelines',
        ],
      },
    ],
    keyConcepts: [
      'MLflow Experiment Tracking & Model Registry Governance',
      'Data Drift (Covariate Shift) vs Concept Drift',
      'Automated CI/CD Pipelines for ML (GitHub Actions)',
      'Reproducible Model Lineage with DVC',
      'Automated Model Retraining Triggers',
    ],
    practiceSuggestions: [
      'Log 25 hyperparameter tuning runs to MLflow, log the best model to the Model Registry, and transition it to "Production".',
      'Build a GitHub Actions CI/CD workflow that runs pytest and builds a Docker image on every pull request.',
      'Simulate data drift using Evidently AI by comparing a baseline dataset with drifted production data and generating a drift report.',
    ],
    projectSuggestions: [
      {
        title: 'End-to-End MLOps Pipeline with MLflow & CI/CD',
        description: 'A complete automated MLOps workflow tracking experiments in MLflow, managing a model registry, executing CI/CD tests via GitHub Actions, and detecting data drift with automated reports.',
        level: 'Production ML',
      },
    ],
    commonMistakes: [
      'Deploying models to production without automated monitoring for data drift or concept drift.',
      'Manually retraining models on laptops without version control, making experiments impossible to reproduce.',
    ],
    nextStepPreview: 'Scale ML workloads in the cloud and with containers in Stage 09: Cloud, Containers & Scalable ML.',
  },
  {
    id: 'cloud-containers-scaling',
    stageNumber: '09',
    title: 'Cloud, Containers & Scalable ML',
    shortTitle: 'Cloud & Scaling',
    tagline: 'Docker containerization, Docker Compose, cloud infrastructure (AWS/GCP/Azure), Kubernetes concepts, and scalable inference.',
    iconName: 'Cloud',
    goal: 'Understand how machine learning systems run reliably at scale across cloud infrastructure and containerized clusters.',
    whyItMatters:
      'Production ML systems run on cloud servers, not laptops. Understanding Docker packaging, cloud compute, object storage, managed databases, and scalable inference architectures enables you to deploy reliable enterprise ML systems.',
    learningOutcome: 'Containerize ML microservices with Docker, deploy to cloud infrastructure, and design scalable inference systems.',
    recommendedApproach:
      'Pick one cloud platform (AWS, GCP, or Azure) and master its core compute, storage, and IAM services rather than trying to learn all three simultaneously.',
    technologies: ['Docker', 'Dockerfile', 'Docker Compose', 'AWS (S3, EC2, ECS) / GCP', 'Kubernetes Concepts', 'Load Balancing'],
    topics: [
      {
        category: 'Docker Containerization for ML',
        items: [
          'Docker architecture: Images, containers, layers, Dockerfile, .dockerignore',
          'Multi-stage Docker builds for lightweight, secure Python images',
          'Containerizing a FastAPI ML service with all dependencies',
          'Docker Compose: Orchestrating API, database, and Redis cache containers locally',
        ],
      },
      {
        category: 'Cloud Fundamentals for ML Engineers',
        items: [
          'Cloud Compute (AWS EC2, ECS / GCP Compute Engine, Cloud Run)',
          'Cloud Object Storage (AWS S3, GCP Cloud Storage) for model artifacts and datasets',
          'Identity & Access Management (IAM): Roles, policies, least privilege security',
          'Serverless & Managed container services for cost-effective model serving',
        ],
      },
      {
        category: 'Scalability & System Architecture',
        items: [
          'Horizontal vs Vertical scaling of model serving instances',
          'Load balancers (Application Load Balancers) and reverse proxies (Nginx)',
          'Asynchronous task queues (Celery, Redis) for heavy batch inference workloads',
          'Introduction to Kubernetes concepts (Pods, Deployments, Services, Horizontal Pod Autoscaling)',
          'Feature stores overview (Feast) for low-latency feature serving',
        ],
      },
    ],
    keyConcepts: [
      'Multi-Stage Docker Container Packaging',
      'Docker Compose Multi-Container Orchestration',
      'Asynchronous Task Queuing with Redis for Heavy Predictions',
      'Horizontal Scaling & Load Balancing',
      'Kubernetes Core Concepts (Pods, Services, Deployments)',
    ],
    practiceSuggestions: [
      'Write a multi-stage Dockerfile that packages a FastAPI + PyTorch model into a slim < 500MB production image.',
      'Deploy your containerized ML service to AWS ECS or GCP Cloud Run and test live public endpoints.',
      'Set up a Docker Compose cluster running a FastAPI app, PostgreSQL database, and Redis cache.',
    ],
    projectSuggestions: [
      {
        title: 'Containerized Scalable ML Platform on Cloud',
        description: 'A containerized machine learning service packaged with Docker Compose, connected to an S3 bucket for model artifacts, and deployed to cloud infrastructure with load balancing and health checks.',
        level: 'Advanced',
      },
    ],
    commonMistakes: [
      'Creating bloated 4GB+ Docker images by not using .dockerignore and multi-stage builds.',
      'Hardcoding cloud API keys and database passwords directly into Dockerfiles or Git repositories.',
    ],
    nextStepPreview: 'Build your flagship portfolio and prepare for ML systems interviews in Stage 10: Production ML Projects & Job Ready.',
  },
  {
    id: 'production-projects-job-ready',
    stageNumber: '10',
    title: 'Production ML Projects & Job Ready',
    shortTitle: 'Portfolio & Job Ready',
    tagline: 'Build end-to-end production ML systems, document architectures on GitHub, and master ML System Design interviews.',
    iconName: 'Rocket',
    goal: 'Build portfolio projects that demonstrate both machine learning knowledge and production software engineering ability.',
    whyItMatters:
      'Hiring managers want to see that you can build reliable software systems around machine learning models, not just train models on Kaggle. A portfolio of 3-4 fully documented, containerized, and deployed systems guarantees senior interview callbacks.',
    learningOutcome: 'A complete, public portfolio with architecture diagrams, containerized deployments, and ML System Design interview readiness.',
    technologies: ['GitHub Portfolio', 'ML System Design', 'Technical Interview Prep', 'System Architecture Diagrams', 'STAR Method'],
    topics: [
      {
        category: 'The 5-Tier Project Progression Strategy',
        items: [
          'Project 1: Customer Churn Prediction REST API (Scikit-learn + FastAPI)',
          'Project 2: Real-Time Fraud Detection System (Imbalanced data + SQL + Pipelines)',
          'Project 3: End-to-End ML Prediction Microservice (FastAPI + Docker + MLflow)',
          'Project 4: Personalized Recommendation Engine (Collaborative filtering + Low-latency API)',
          'Project 5: Flagship Production Enterprise ML Platform (Full data pipeline, MLflow registry, Docker, Cloud deployment, Drift monitoring & Retraining)',
        ],
      },
      {
        category: 'Portfolio Presentation & Engineering Standards',
        items: [
          'Writing comprehensive GitHub READMEs with system architecture diagrams',
          'Production code standards: Modular src/ structure, requirements.txt, Dockerfile, docker-compose.yml',
          'Live public deployment links with Swagger documentation and interactive demo apps',
          'Documenting latency benchmarks, throughput numbers, and business value',
        ],
      },
      {
        category: 'ML Engineer Interview Preparation',
        items: [
          'Data Structures & Algorithms coding interviews (Python, Big-O, Hash Maps, Trees)',
          'Machine Learning theoretical depth (Bias-variance, regularization, gradient descent, metrics)',
          'ML System Design interviews (e.g. Design a Video Recommendation System, Real-Time Fraud Detector, Search Ranking Engine)',
          'Explaining production trade-offs (Latency vs Accuracy, Batch vs Real-time, Memory vs Compute)',
          'STAR behavioral interview framework for past engineering stories',
        ],
      },
    ],
    keyConcepts: [
      'End-to-End Production ML System Demonstration',
      'ML System Design Interview Framework (Requirements, Data, Model, Serving, Scaling, Monitoring)',
      'Latency vs Accuracy Trade-off Optimization',
      'System Architecture Diagram Documentation',
      'Communicating Engineering & Business Value',
    ],
    practiceSuggestions: [
      'Conduct a 45-minute mock ML System Design interview (e.g. "Design a Real-Time Ad Click-Through Rate Prediction System").',
      'Draw a complete system architecture diagram for your flagship project using Excalidraw or Mermaid.',
      'Solve 40+ medium LeetCode algorithms questions focusing on data structures and string/array manipulation.',
    ],
    projectSuggestions: [
      {
        title: 'Flagship Production Enterprise ML Platform',
        description: 'An enterprise-grade production ML platform featuring automated data ingestion, Scikit-learn pipelines, Optuna tuning, MLflow model registry, containerized FastAPI serving in Docker, and Evidently AI drift monitoring.',
        level: 'Portfolio-Level',
      },
    ],
    commonMistakes: [
      'Building toy portfolio projects that only exist as Jupyter notebooks without APIs, Dockerfiles, or tests.',
      'Failing to practice ML System Design interviews, which are the #1 evaluation criteria for senior ML Engineer roles.',
    ],
    nextStepPreview: 'You have the complete roadmap. Start with Stage 01, build real software systems, and engineer models for production!',
  },
];

export const ML_ENGINEER_PROJECT_PROGRESSION: MLEngineerProjectProgression[] = [
  {
    id: 'mle-proj-1',
    stage: 'Stage 07 — Beginner',
    name: 'Customer Churn Prediction REST API',
    difficulty: 'Beginner',
    recommendedStack: ['Python 3', 'Scikit-learn', 'FastAPI', 'Uvicorn', 'Pydantic', 'Joblib'],
    skillsLearned: ['Model serialization', 'FastAPI REST endpoint development', 'Pydantic input schema validation', 'Unit testing with pytest'],
    description: 'A modular Python microservice serving an XGBoost customer churn model with strict JSON input validation, health checks, and interactive Swagger UI.',
    businessProblem: 'Telecom provider needs an automated API for customer success teams to check real-time subscriber cancellation risk.',
    mlApproach: 'XGBoost classifier with Scikit-learn preprocessing ColumnTransformer and probability threshold tuning.',
    evaluationMetrics: 'F1-Score: 0.84, Recall: 0.88, ROC-AUC: 0.91, Inference Latency < 12ms',
    apiAndDeployment: 'FastAPI /predict endpoint with Pydantic schemas, Swagger docs (/docs), and local Uvicorn serving.',
    monitoringRequirements: 'Structured JSON logging of request payload, prediction output, and inference execution time.',
    githubReqs: 'Clean modular repo with src/, tests/ (pytest), requirements.txt, and documented curl examples in README.',
  },
  {
    id: 'mle-proj-2',
    stage: 'Stage 07 — Intermediate',
    name: 'Real-Time Fraud Detection System',
    difficulty: 'Intermediate',
    recommendedStack: ['PostgreSQL', 'Scikit-learn', 'LightGBM', 'Imbalanced-Learn (SMOTE)', 'FastAPI', 'Docker'],
    skillsLearned: ['Imbalanced classification', 'Time-lagged feature engineering', 'Cost-weighted loss optimization', 'Docker containerization'],
    description: 'A low-latency fraud detection system analyzing real-time financial transaction streams, flagging suspicious activities with cost-weighted thresholds.',
    businessProblem: 'Fintech platform processes 50,000 transactions daily and needs to intercept fraudulent charges with < 0.1% false positive rate.',
    mlApproach: 'LightGBM classifier trained with SMOTE oversampling and cost-matrix threshold optimization to minimize financial loss.',
    evaluationMetrics: 'Precision-Recall AUC (PR-AUC: 0.89), Precision: 0.92, Recall: 0.86, P95 Latency < 20ms',
    apiAndDeployment: 'Containerized FastAPI application in Docker with health checks and batch scoring endpoints.',
    monitoringRequirements: 'Track transaction volume, flagged fraud rate %, and latency percentiles.',
    githubReqs: 'Full repo with SQL feature extraction scripts, Dockerfile, pytest test suite, and performance benchmarks.',
  },
  {
    id: 'mle-proj-3',
    stage: 'Stage 08 — Production ML',
    name: 'Automated ML Prediction Pipeline with MLflow & CI/CD',
    difficulty: 'Production ML',
    recommendedStack: ['Python', 'XGBoost', 'MLflow', 'DVC', 'GitHub Actions', 'FastAPI', 'Docker'],
    skillsLearned: ['Experiment tracking', 'Model registry governance', 'CI/CD automation', 'Dataset versioning with DVC', 'Docker packaging'],
    description: 'An automated machine learning lifecycle system tracking experiments in MLflow, running CI/CD test suites on GitHub Actions, and deploying versioned model artifacts.',
    businessProblem: 'Enable data science teams to rapidly experiment, version models, and deploy production candidates without manual engineering handoffs.',
    mlApproach: 'Hyperparameter tuning with Bayesian optimization, logging all parameters, metrics, and serialized artifacts to MLflow.',
    evaluationMetrics: 'Cross-validated RMSE, R², training loss curves, and artifact reproducibility verification.',
    apiAndDeployment: 'Automated CI/CD workflow testing code on pull request, building Docker image, and registering model in MLflow.',
    monitoringRequirements: 'MLflow UI dashboard tracking all experiment runs and Model Registry stage transitions.',
    githubReqs: 'Comprehensive repository with .github/workflows/ci.yml, dvc.yaml, mlflow_train.py, and Dockerfile.',
  },
  {
    id: 'mle-proj-4',
    stage: 'Stage 08 — Advanced',
    name: 'High-Throughput Personalized Recommendation Engine',
    difficulty: 'Advanced',
    recommendedStack: ['PyTorch', 'FastAPI', 'Redis Caching', 'Vector Search (FAISS)', 'Docker Compose'],
    skillsLearned: ['Matrix factorization', 'Vector embeddings', 'Low-latency Redis caching', 'Asynchronous processing', 'Top-N ranking'],
    description: 'A two-stage recommendation system combining fast candidate generation via approximate nearest neighbors (FAISS) with neural collaborative filtering ranking.',
    businessProblem: 'E-commerce platform needs to serve personalized top-10 product recommendations to 1,000,000 active users in < 25ms.',
    mlApproach: 'Two-stage architecture: Candidate retrieval with FAISS vector search + Neural Collaborative Filtering ranking model.',
    evaluationMetrics: 'Hit Rate@10, Normalized Discounted Cumulative Gain (NDCG@10: 0.78), Cache Hit Ratio > 85%',
    apiAndDeployment: 'FastAPI microservice connected to Redis cache for precomputed recommendations and FAISS index in memory.',
    monitoringRequirements: 'Track Redis cache hit/miss ratio, recommendation diversity score, and endpoint response times.',
    githubReqs: 'Docker Compose cluster (API + Redis), benchmarking script with Locust, and system architecture diagram.',
  },
  {
    id: 'mle-proj-5',
    stage: 'Stage 10 — Portfolio Level',
    name: 'End-to-End Enterprise Production Machine Learning Platform',
    difficulty: 'Portfolio-Level',
    recommendedStack: ['PostgreSQL', 'Pandas', 'XGBoost', 'MLflow', 'FastAPI', 'Docker', 'AWS ECS / GCP', 'Evidently AI'],
    skillsLearned: ['Full-lifecycle ML systems engineering', 'Automated data pipelines', 'Model registry governance', 'Cloud deployment', 'Data drift monitoring & retraining'],
    description: 'A flagship enterprise-grade machine learning platform featuring automated SQL feature extraction, MLflow experiment tracking, containerized FastAPI microservices, and continuous data drift monitoring with automated retraining triggers.',
    businessProblem: 'Enterprise institution requires an automated, robust, compliant credit risk scoring platform with drift detection and zero-downtime deployments.',
    mlApproach: 'Scikit-learn Pipeline with ColumnTransformer, Optuna Bayesian optimization, XGBoost classifier, and SHAP explainability.',
    evaluationMetrics: 'ROC-AUC: 0.93, F1-Score: 0.88, P99 Latency < 35ms, Zero Data Leakage verification',
    apiAndDeployment: 'Multi-stage Docker container deployed to cloud infrastructure with load balancer, health checks, and Swagger docs.',
    monitoringRequirements: 'Continuous data drift tracking with Evidently AI, KS-test alerts on feature shifts, and automated retraining pipeline trigger.',
    githubReqs: 'Complete flagship GitHub repo with architecture diagram, Dockerfile, docker-compose.yml, CI/CD pipeline, and live API demo link.',
  },
];

export const ML_ENGINEER_TOOLKIT: MLEngineerToolkitCategory[] = [
  {
    category: 'PROGRAMMING & TESTING',
    coreItems: ['Python 3.12', 'pytest', 'Git & GitHub', 'Bash / Linux Shell'],
    advancedItems: ['mypy', 'ruff / black', 'asyncio', 'C++ basics'],
  },
  {
    category: 'DATA PROCESSING & SQL',
    coreItems: ['SQL (PostgreSQL)', 'NumPy', 'Pandas', 'Parquet / PyArrow'],
    advancedItems: ['Polars', 'DuckDB', 'dbt', 'Great Expectations'],
  },
  {
    category: 'MACHINE LEARNING',
    coreItems: ['Scikit-learn', 'XGBoost', 'LightGBM', 'Optuna'],
    advancedItems: ['CatBoost', 'Imbalanced-Learn', 'SHAP', 'LIME'],
  },
  {
    category: 'DEEP LEARNING',
    coreItems: ['PyTorch', 'Torchvision', 'CUDA / GPU'],
    advancedItems: ['TensorFlow / Keras', 'Hugging Face Transformers', 'ONNX'],
  },
  {
    category: 'MODEL SERVING & BACKEND',
    coreItems: ['FastAPI', 'Uvicorn', 'Pydantic', 'REST APIs'],
    advancedItems: ['Redis Caching', 'gRPC', 'Triton Inference Server', 'Celery'],
  },
  {
    category: 'MLOPS & LIFECYCLE',
    coreItems: ['MLflow', 'Docker', 'GitHub Actions CI/CD'],
    advancedItems: ['DVC', 'Evidently AI (Drift)', 'Weights & Biases', 'Feast (Feature Store)'],
  },
  {
    category: 'CLOUD & INFRASTRUCTURE',
    coreItems: ['Docker Compose', 'AWS (S3, EC2, ECS) or GCP', 'IAM Security'],
    advancedItems: ['Kubernetes (K8s)', 'Terraform basics', 'Prometheus & Grafana'],
  },
];

export const ML_ENGINEER_COMMON_MISTAKES = [
  {
    title: 'Focusing Only on ML Algorithms (Ignoring Software Engineering)',
    solution: 'Master clean code, OOP, modular Python packages, structured logging, and pytest suites. Models are only as good as the software around them.',
  },
  {
    title: 'Building Everything Inside Messy Jupyter Notebooks',
    solution: 'Use notebooks for initial experimentation, then immediately refactor your code into modular, typed Python scripts (src/) with configuration files.',
  },
  {
    title: 'Neglecting Automated Testing & Data Validation',
    solution: 'Write unit tests with pytest for all preprocessing functions and validate incoming inference schemas with Pydantic to prevent silent crashes.',
  },
  {
    title: 'Deploying Models Without Monitoring for Data Drift',
    solution: 'Set up automated drift monitoring (Evidently AI) to detect covariate shift and trigger retraining before model accuracy silently degrades.',
  },
  {
    title: 'Using Complex Deep Learning Unnecessarily',
    solution: 'Start with simple baseline models (Logistic Regression, Random Forest, XGBoost). Never deploy a complex neural net when a simpler model achieves identical results faster and cheaper.',
  },
  {
    title: 'Ignoring Model Inference Latency & Throughput',
    solution: 'Measure P95 and P99 latency percentiles. Load models once at application startup as singletons rather than reloading from disk on every HTTP request.',
  },
  {
    title: 'Learning Every Cloud Platform and Kubernetes Too Early',
    solution: 'Pick ONE cloud provider (AWS or GCP) and master Docker + Docker Compose first. Kubernetes is an advanced orchestrator you can learn later.',
  },
  {
    title: 'Building Projects That Never Reach Deployment',
    solution: 'Every portfolio project should include a working FastAPI REST API, a Dockerfile, and live documentation demonstrating end-to-end functionality.',
  },
];

export const ML_ENGINEER_FOUR_PILLARS = [
  {
    title: 'Software Engineering',
    subtitle: 'Modular Python, OOP design, SOLID principles, pytest test suites, CI/CD, and clean package architecture.',
    icon: 'Code2',
  },
  {
    title: 'Machine Learning Mastery',
    subtitle: 'Selecting, training, cross-validating, hyperparameter tuning, and interpreting supervised and deep learning models.',
    icon: 'Brain',
  },
  {
    title: 'MLOps & Automation',
    subtitle: 'Experiment tracking with MLflow, dataset versioning with DVC, CI/CD pipelines, and data drift monitoring.',
    icon: 'GitBranch',
  },
  {
    title: 'Systems & Scalability',
    subtitle: 'Low-latency FastAPI microservices, Docker containerization, cloud infrastructure, and ML System Design thinking.',
    icon: 'Server',
  },
];

export const ML_SYSTEM_ARCHITECTURE_STEPS = [
  { step: '1', title: 'Data Sources', desc: 'Raw databases, event streams & object stores' },
  { step: '2', title: 'Ingestion & Validation', desc: 'Automated ETL & schema validation (Pandera)' },
  { step: '3', title: 'Feature Engineering', desc: 'Reproducible Scikit-learn transformation pipelines' },
  { step: '4', title: 'Model Training', desc: 'Hyperparameter optimization with Optuna' },
  { step: '5', title: 'Experiment Tracking', desc: 'Log metrics, parameters & artifacts in MLflow' },
  { step: '6', title: 'Model Registry', desc: 'Version control & stage promotion (Staging/Prod)' },
  { step: '7', title: 'Model Serving API', desc: 'Low-latency FastAPI REST prediction endpoints' },
  { step: '8', title: 'Containerization', desc: 'Packaged in multi-stage Docker containers' },
  { step: '9', title: 'Cloud Deployment', desc: 'Deployed to scalable cloud compute with load balancers' },
  { step: '10', title: 'Drift Monitoring', desc: 'Detect feature drift & trigger automated retraining' },
];

export const ML_ENGINEER_THINKING_LADDER = [
  { step: '1', label: 'BUSINESS PROBLEM', question: 'What should the system predict, automate, or optimize in production?' },
  { step: '2', label: 'DATA RELIABILITY', question: 'Do we have reliable data pipelines and how will we validate schema consistency?' },
  { step: '3', label: 'TRAINING PIPELINE', question: 'How will training execute reproducibly and how are artifacts versioned?' },
  { step: '4', label: 'EVALUATION & METRICS', question: 'Does our mathematical metric align with the commercial cost of false positives vs false negatives?' },
  { step: '5', label: 'SERVING ARCHITECTURE', question: 'Will this model serve real-time online requests (< 20ms) or asynchronous batch scores?' },
  { step: '6', label: 'DEPLOYMENT & SCALING', question: 'How is the service containerized, deployed, load balanced, and scaled under traffic spikes?' },
  { step: '7', label: 'MONITORING & DRIFT', question: 'What happens when input data distributions shift and how will automated retraining trigger?' },
];

export const NOTEBOOK_VS_PRODUCTION_COMPARISON = [
  { aspect: 'Code Organization', notebook: 'Messy linear cells, global state, print statements', production: 'Modular Python packages, OOP, typed functions, structured logging' },
  { aspect: 'Data Ingestion', notebook: 'Manual pd.read_csv("data.csv") on local disk', production: 'Automated SQL queries, validated schemas, Parquet pipelines, DVC versioning' },
  { aspect: 'Preprocessing', notebook: 'Ad-hoc pandas operations with potential data leakage', production: 'Scikit-learn Pipelines & ColumnTransformers fitted strictly on training data' },
  { aspect: 'Model Artifacts', notebook: 'Model stored in memory; notebook lost upon restart', production: 'Serialized with Joblib/ONNX, registered in MLflow Model Registry' },
  { aspect: 'Inference', notebook: 'model.predict(X_test) inside interactive cell', production: 'FastAPI async REST endpoints with Pydantic validation (< 20ms latency)' },
  { aspect: 'Environment', notebook: 'Local machine conda environment with unpinned packages', production: 'Isolated, multi-stage Docker container with pinned dependencies' },
  { aspect: 'Monitoring', notebook: 'None; manually evaluate accuracy once', production: 'Continuous monitoring of P99 latency, error rates, and Evidently AI data drift' },
  { aspect: 'Lifecycle', notebook: 'Static one-off project that expires when data changes', production: 'Automated CI/CD testing, versioning, and automated retraining pipelines' },
];
