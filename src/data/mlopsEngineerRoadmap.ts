export interface MLOpsRoadmapStage {
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

export interface MLOpsProjectProgression {
  id: string;
  stage: string;
  name: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Portfolio-Level';
  problem: string;
  description: string;
  architecture: string;
  technologies: string[];
  pipeline: string;
  infrastructure: string;
  monitoring: string;
  deployment: string;
  githubReqs: string;
  skillsLearned: string[];
}

export interface MLOpsLifecycleItem {
  id: string;
  stageName: string;
  whatHappens: string;
  whyItMatters: string;
  commonTools: string[];
  example: string;
  productionConsiderations: string;
  icon: string;
}

export interface MLOpsSpecialization {
  title: string;
  description: string;
  coreTech: string[];
  focus: string;
  icon: string;
}

export interface MLOpsToolkitCategory {
  category: string;
  coreItems: string[];
  advancedItems: string[];
}

export interface MLOpsCommonMistake {
  title: string;
  solution: string;
}

export interface MLOpsChecklistCategory {
  category: string;
  items: {
    name: string;
    desc: string;
  }[];
}

export interface MLOpsFourPillars {
  title: string;
  subtitle: string;
  icon: string;
}

export const MLOPS_ROADMAP_STAGES: MLOpsRoadmapStage[] = [
  {
    id: 'python-software-engineering',
    stageNumber: '01',
    title: 'Python & Software Engineering',
    shortTitle: 'Python & Software Eng',
    tagline: 'Build the software engineering foundation required to create reliable, modular, and maintainable ML systems.',
    iconName: 'Terminal',
    goal: 'Build the software engineering foundation required to create reliable and maintainable ML systems.',
    whyItMatters:
      'A machine learning script in a messy Jupyter notebook cannot be automated, tested, or scaled. Production MLOps requires strict typing, modular package design, robust exception handling, structured logging, and automated test suites.',
    learningOutcome: 'Write production-quality Python code and manage ML projects using professional software engineering practices.',
    recommendedApproach:
      'Adopt a strict production project layout (src/ layout, tests, configs). Never leave credentials in code; manage configuration via environment variables and Pydantic Settings, and write automated tests using pytest.',
    technologies: ['Python 3.12', 'Pydantic v2', 'pytest', 'Git & GitHub', 'Ruff / Black', 'Poetry / uv'],
    visualIntuition: {
      label: 'Production MLOps Project Structure',
      steps: [
        'src/ (Modular pipeline & model logic)',
        'tests/ (Unit, integration, and data tests)',
        'configs/ (YAML & JSON hyperparameter configs)',
        'scripts/ (Training & deployment runners)',
        'models/ (Serialized model binaries)',
        'data/ (Raw, intermediate & processed data)',
        'Dockerfile & pyproject.toml (Reproducible env)',
      ],
    },
    topics: [
      {
        category: 'Core Python & Object-Oriented Design',
        items: [
          'Variables, data structures (lists, dicts, sets, tuples, comprehensions)',
          'Object-Oriented Programming (OOP): Custom classes, inheritance, encapsulation, dataclasses',
          'Modular architecture: Packages, modules, __init__.py, and clean import paths',
          'Type hints with mypy and runtime data validation using Pydantic v2',
          'Virtual environments (venv, uv, poetry) and reproducible dependency locking',
          'Robust exception handling with custom domain exceptions and logging handlers',
        ],
      },
      {
        category: 'Advanced Python for ML Workflows',
        items: [
          'Generators and iterators (yield) for streaming large datasets without RAM overflow',
          'Decorators for timing, caching (lru_cache), and retry mechanisms',
          'Context managers (__enter__ / __exit__) for resource and connection management',
          'Asynchronous programming basics (async / await) for non-blocking I/O and REST APIs',
        ],
      },
      {
        category: 'Software Engineering Best Practices',
        items: [
          'Clean code principles (DRY, SOLID, separation of concerns)',
          'Configuration management (.env files, pydantic-settings, YAML/JSON configs)',
          'Structured logging (structlog, loguru) vs unstructured print statements',
          'Automated testing with pytest: Unit tests, integration tests, mocking fixtures',
          'Code quality tooling: ruff (linter), black (formatter), pre-commit hooks',
        ],
      },
      {
        category: 'Git & Version Control Workflows',
        items: [
          'Git fundamentals: Init, stage, commit, branch, merge, rebase, stash',
          'GitHub workflows: Pull requests, branch protection rules, code reviews',
          'Semantic versioning (SemVer: MAJOR.MINOR.PATCH) for ML code and packages',
          'Managing .gitignore for ML (ignoring raw datasets, logs, credentials, and virtual environments)',
        ],
      },
    ],
    keyConcepts: [
      'Standard Production Project Layout (src/ layout)',
      'Strict Type Hints & Pydantic Data Validation',
      'Automated Testing with Pytest & Mocking',
      'Configuration Separation (.env & YAML configs)',
      'Git Feature Branch & PR Review Workflows',
    ],
    practiceSuggestions: [
      'Refactor a monolithic 500-line ML training notebook into a modular Python package with separate data loader, model trainer, and evaluation modules.',
      'Write a comprehensive pytest test suite testing data transformation functions with edge cases (empty inputs, nulls, out-of-range values).',
      'Set up pre-commit hooks with ruff, black, and mypy to automatically enforce code formatting and type safety before git commits.',
    ],
    projectSuggestions: [
      {
        title: 'Production Python ML Package Template',
        description: 'A modular, open-source Python boilerplate featuring strict typing, Pydantic configuration, structured JSON logging, pytest fixtures, and automated pre-commit linting.',
        level: 'Beginner',
      },
    ],
    commonMistakes: [
      'Keeping production ML code inside Jupyter notebooks without refactoring into testable Python modules.',
      'Hard-coding database passwords or API tokens directly into git repositories instead of using environment variables.',
      'Skipping unit tests, making pipeline refactoring error-prone and brittle.',
    ],
    nextStepPreview: 'Master Linux servers, remote terminal commands, and system fundamentals in Stage 02: Linux, Terminal & System Fundamentals.',
  },
  {
    id: 'linux-terminal-systems',
    stageNumber: '02',
    title: 'Linux, Terminal & System Fundamentals',
    shortTitle: 'Linux & Terminal',
    tagline: 'Become comfortable working with remote servers, cloud virtual machines, containers, and shell environments.',
    iconName: 'Server',
    goal: 'Become comfortable working with servers, cloud machines, containers, and production environments.',
    whyItMatters:
      'Almost all production ML systems, containers, GPU compute instances, and Kubernetes clusters run on Linux. An MLOps engineer must comfortably navigate server filesystems, manage processes, configure permissions, and debug network issues via the terminal.',
    learningOutcome: 'Operate Linux environments confidently and troubleshoot ML services running on remote machines.',
    recommendedApproach:
      'Use Linux (Ubuntu/Debian) or WSL2 daily. Practice inspecting server resource utilization (CPU, GPU, RAM, disk I/O), writing Bash automation scripts, and setting up secure SSH keys for remote cloud server access.',
    technologies: ['Ubuntu Linux', 'Bash', 'SSH', 'tmux / htop', 'curl / wget', 'systemd'],
    topics: [
      {
        category: 'Linux Operating System Fundamentals',
        items: [
          'Linux directory hierarchy (/etc, /var, /opt, /home, /tmp, /usr)',
          'File permissions and ownership (chmod, chown, user groups, read/write/execute)',
          'Process management: ps, top, htop, kill, pkill, background jobs (nohup, &)',
          'Environment variables: export, /etc/environment, ~/.bashrc, env',
          'Package management: apt, apt-get, yum, installing system build dependencies',
          'Managing system services with systemd (systemctl start, status, restart, journalctl)',
        ],
      },
      {
        category: 'Essential Terminal Commands',
        items: [
          'Navigation & File Ops: cd, ls -la, mkdir -p, cp -r, mv, rm -rf',
          'Searching & Text Processing: grep -rn, find, awk, sed, cut, sort, uniq',
          'File Viewing & Inspection: cat, less, tail -f (streaming logs), head',
          'Disk & Memory Inspection: df -h (disk space), free -m (RAM), du -sh',
          'Network Utilities: curl, wget, netstat, lsof -i (checking open ports), ping',
        ],
      },
      {
        category: 'Networking Fundamentals for MLOps',
        items: [
          'IP addresses (public vs private), CIDR blocks, localhost (127.0.0.1)',
          'Ports, sockets, TCP/IP fundamentals, DNS resolution',
          'HTTP / HTTPS protocols, request headers, status codes (200, 400, 404, 500)',
          'Firewalls (ufw, iptables) and security group port opening (e.g. 80, 443, 8000)',
          'Load balancing concepts (reverse proxies, round-robin routing)',
        ],
      },
      {
        category: 'Remote Systems & Shell Scripting',
        items: [
          'SSH: Generating SSH keypairs (ssh-keygen), authorized_keys, config file, SCP / rsync file transfer',
          'Terminal multiplexers: tmux and screen for persistent long-running training sessions',
          'Bash scripting: Variables, loops, conditionals, positional arguments, exit codes ($?)',
          'Writing automation scripts to set up ML environments and GPU drivers',
        ],
      },
    ],
    keyConcepts: [
      'Linux File Permissions & User Access Control',
      'Process Lifecycle & Resource Monitoring (htop/top)',
      'TCP/IP Networking, Ports & HTTP Protocols',
      'SSH Remote Authentication & Server Management',
      'Bash Scripting for Environment Automation',
    ],
    practiceSuggestions: [
      'Launch a remote Linux virtual machine (or local WSL2), set up passwordless SSH key authentication, and configure a firewall rule allowing port 8000.',
      'Write a Bash script that checks if an ML service process is running; if stopped, automatically restart the service and write a timestamped log to /var/log.',
      'Use grep, awk, and tail to extract 500 error messages from a 100,000-line server access log file.',
    ],
    projectSuggestions: [
      {
        title: 'Server Provisioning & Health Monitor Script',
        description: 'An automated Bash suite that provisions a fresh Ubuntu machine with Python, Docker, CUDA drivers, sets up swap space, and monitors disk/RAM thresholds with automated alert triggers.',
        level: 'Beginner',
      },
    ],
    commonMistakes: [
      'Running commands blindly as root (sudo) rather than configuring least-privilege user permissions.',
      'Leaving training jobs running in active terminal sessions that terminate when the SSH connection drops (use tmux or systemd).',
      'Ignoring file permissions when mounting host directories into containers, causing permission denied errors.',
    ],
    nextStepPreview: 'Understand the machine learning lifecycle and model evaluation in Stage 03: Machine Learning Fundamentals.',
  },
  {
    id: 'machine-learning-fundamentals',
    stageNumber: '03',
    title: 'Machine Learning Fundamentals',
    shortTitle: 'Machine Learning Basics',
    tagline: 'Understand the complete ML lifecycle so you can engineer systems around models rather than treating them as black boxes.',
    iconName: 'Brain',
    goal: 'Understand the ML lifecycle so you can build systems around models rather than treating models as black boxes.',
    whyItMatters:
      'An MLOps engineer does not need to invent new neural architectures, but they MUST deeply understand data preprocessing, training dynamics, overfitting, hyperparameter tuning, and evaluation metrics to automate and monitor pipelines effectively.',
    learningOutcome: 'Understand what happens before a model enters production.',
    recommendedApproach:
      'Master the standard ML Lifecycle: DATA → PREPROCESSING → TRAINING → VALIDATION → EVALUATION → MODEL ARTIFACT → DEPLOYMENT. Focus on Scikit-learn, evaluation metrics, and feature transformations.',
    technologies: ['Scikit-learn', 'NumPy', 'Pandas', 'Matplotlib / Seaborn', 'Joblib'],
    visualIntuition: {
      label: 'The Machine Learning Lifecycle',
      steps: [
        'DATA (Raw historical & transactional records)',
        'PREPROCESSING (Imputation, scaling, one-hot encoding)',
        'TRAINING (Supervised algorithm weight fitting)',
        'VALIDATION (K-Fold cross-validation & hyperparameter tuning)',
        'EVALUATION (Benchmarking on unseen test split)',
        'MODEL ARTIFACT (Serialized binary pipeline file .pkl / .joblib)',
        'DEPLOYMENT (Inference serving behind API endpoint)',
      ],
    },
    topics: [
      {
        category: 'Core Machine Learning Paradigms',
        items: [
          'Supervised learning: Regression (predicting continuous values) vs Classification (predicting discrete categories)',
          'Unsupervised learning: Clustering (K-Means), Dimensionality reduction (PCA)',
          'Algorithms: Linear Regression, Logistic Regression, Decision Trees, Random Forests, Gradient Boosting (XGBoost/LightGBM)',
          'Feature engineering: Missing value imputation, standard scaling, min-max normalization, categorical one-hot encoding',
        ],
      },
      {
        category: 'Data Splitting & Model Validation',
        items: [
          'Train, validation, and test dataset splits (preventing data leakage)',
          'Stratified K-Fold Cross-Validation for imbalanced datasets',
          'Overfitting vs Underfitting, Bias-Variance tradeoff',
          'Regularization techniques: L1 (Lasso) and L2 (Ridge) penalties',
          'Hyperparameter tuning: Grid Search, Random Search, Bayesian Optimization',
        ],
      },
      {
        category: 'Model Evaluation Metrics',
        items: [
          'Classification: Accuracy, Precision, Recall, F1-Score (Macro vs Micro), Confusion Matrix, ROC-AUC',
          'Regression: Mean Absolute Error (MAE), Mean Squared Error (MSE), Root Mean Squared Error (RMSE), R² score',
          'Business trade-offs: Minimizing False Positives (e.g. spam) vs False Negatives (e.g. fraud / cancer detection)',
        ],
      },
      {
        category: 'Model Serialization & Artifacts',
        items: [
          'Serializing models and preprocessors using Joblib and Pickle',
          'Scikit-learn Pipeline and ColumnTransformer for unified inference pipelines',
          'Model serialization formats: ONNX, PMML, TorchScript basics',
          'Model metadata: Tracking training parameters, feature names, and input schemas',
        ],
      },
    ],
    keyConcepts: [
      'Unified Scikit-learn Preprocessing & Estimator Pipelines',
      'Precision-Recall Trade-off & ROC-AUC',
      'Stratified Cross-Validation & Data Leakage Prevention',
      'Overfitting Detection (Train vs Validation Loss)',
      'Model Serialization with Joblib / ONNX',
    ],
    practiceSuggestions: [
      'Build a complete Scikit-learn Pipeline combining SimpleImputer, StandardScaler, OneHotEncoder, and a Random Forest classifier.',
      'Train a classifier on an imbalanced fraud detection dataset, plot precision-recall curves, and tune the decision threshold.',
      'Serialize a trained pipeline into a .joblib artifact and write a standalone Python script to reload and run batch predictions.',
    ],
    projectSuggestions: [
      {
        title: 'End-to-End Predictive Model with Pipeline Serialization',
        description: 'A complete Scikit-learn classification workflow with automated feature encoding, stratified cross-validation, hyperparameter tuning, model serialization, and evaluation reports.',
        level: 'Beginner',
      },
    ],
    commonMistakes: [
      'Fitting scalers or imputers on the entire dataset before splitting into train/test sets, causing severe data leakage.',
      'Relying solely on Accuracy for imbalanced datasets (e.g. 99% accuracy on a dataset with 99% negative cases is useless).',
      'Saving model weights without saving the preprocessing transformer pipeline required to format raw incoming inference requests.',
    ],
    nextStepPreview: 'Expose serialized models behind high-performance web endpoints in Stage 04: APIs & Backend for ML.',
  },
  {
    id: 'apis-backend-ml',
    stageNumber: '04',
    title: 'APIs & Backend for ML',
    shortTitle: 'APIs & Backend for ML',
    tagline: 'Learn how trained machine learning models are exposed as scalable, production-ready REST web services.',
    iconName: 'Globe',
    goal: 'Learn how machine learning models become usable services.',
    whyItMatters:
      'A machine learning model locked in a Jupyter notebook provides zero business value. To integrate with web applications, mobile apps, or enterprise systems, models must be wrapped in high-throughput, low-latency, validated REST APIs.',
    learningOutcome: 'Expose machine learning models through production-ready APIs.',
    recommendedApproach:
      'Master FastAPI. Load your serialized ML model at startup (lifespan event), validate incoming JSON payloads strictly with Pydantic, and implement comprehensive error handling and automated OpenAPI documentation.',
    technologies: ['FastAPI', 'Uvicorn', 'Pydantic v2', 'PostgreSQL', 'Redis', 'pytest'],
    visualIntuition: {
      label: 'Model Inference API Request Flow',
      steps: [
        'CLIENT (Web app / mobile client sends JSON request)',
        'FASTAPI (Validates payload schema with Pydantic v2)',
        'PREPROCESSING (Transforms features via saved pipeline)',
        'MODEL INFERENCE (Executes model.predict() in memory)',
        'POST-PROCESSING (Formats prediction & confidence score)',
        'RESPONSE (Returns structured JSON response in <50ms)',
      ],
    },
    topics: [
      {
        category: 'HTTP & REST API Fundamentals',
        items: [
          'HTTP protocol: Request methods (GET, POST, PUT, DELETE), headers, query parameters, path parameters',
          'Status codes: 200 OK, 201 Created, 400 Bad Request, 422 Unprocessable Entity, 500 Internal Server Error',
          'JSON serialization and deserialization',
          'REST architectural constraints and stateless API design principles',
        ],
      },
      {
        category: 'FastAPI for Machine Learning',
        items: [
          'FastAPI application structure, Uvicorn ASGI server setup',
          'Pydantic request and response schemas (data validation, default values, examples)',
          'Lifespan events: Loading heavy ML models into memory once at application startup',
          'Dependency injection for database sessions and authentication tokens',
          'Interactive auto-generated documentation (Swagger UI / ReDoc)',
          'Custom error handlers, HTTPException, and validation error formatting',
        ],
      },
      {
        category: 'Databases & In-Memory Caching',
        items: [
          'Relational database basics: PostgreSQL, SQL tables, inserting prediction logs',
          'SQLAlchemy ORM and Alembic migrations basics',
          'Redis: In-memory key-value caching for frequent predictions and rate limiting',
          'Logging incoming predictions and features to a database for future drift analysis',
        ],
      },
      {
        category: 'Asynchronous & Batch Inference',
        items: [
          'Async vs Sync endpoints in FastAPI (async def vs def for CPU-bound model inference)',
          'FastAPI BackgroundTasks for asynchronous database logging without blocking inference responses',
          'Batch prediction endpoints: Ingesting arrays of records for vectorized model inference',
        ],
      },
    ],
    keyConcepts: [
      'FastAPI Lifespan Model In-Memory Loading',
      'Pydantic Schema Validation & Type Enforcement',
      'Stateless REST Microservice Architecture',
      'Background Task Asynchronous Logging',
      'Automated OpenAPI / Swagger Documentation',
    ],
    practiceSuggestions: [
      'Build a FastAPI service with a POST /predict endpoint that validates customer demographic data and returns a churn prediction.',
      'Implement a GET /health endpoint that checks if the model binary is loaded in RAM and returns server health status.',
      'Add a Redis caching layer to your FastAPI service that caches prediction results for identical feature inputs for 5 minutes.',
    ],
    projectSuggestions: [
      {
        title: 'Production ML Model Inference API with FastAPI',
        description: 'A robust, typed REST microservice featuring in-memory model caching, Pydantic v2 schemas, background prediction logging to PostgreSQL, and 95%+ test coverage with pytest.',
        level: 'Beginner',
      },
    ],
    commonMistakes: [
      'Reloading the model binary from disk on every single incoming API request, causing massive latency and disk I/O bottlenecks.',
      'Executing CPU-intensive model inference inside async def functions without threadpool offloading, blocking the ASGI event loop.',
      'Failing to validate incoming data types, causing unhandled 500 crashes when unexpected nulls or strings are passed.',
    ],
    nextStepPreview: 'Package your FastAPI service and all its dependencies into reproducible Docker containers in Stage 05: Docker & Containerization.',
  },
  {
    id: 'docker-containers',
    stageNumber: '05',
    title: 'Docker & Containerization',
    shortTitle: 'Docker & Containers',
    tagline: 'Package ML applications, code, models, and dependencies so they run consistently across all environments.',
    iconName: 'Layers',
    goal: 'Package ML applications so they run consistently across environments.',
    whyItMatters:
      '"It worked on my machine" is unacceptable in production. Docker eliminates environment discrepancies by packaging the operating system, Python runtime, CUDA drivers, library versions, model artifacts, and API code into a single immutable container image.',
    learningOutcome: 'Package ML applications into reproducible deployment environments.',
    recommendedApproach:
      'Write optimized Dockerfiles using official Python slim base images. Follow container security best practices: run as non-root user, use multi-stage builds to minimize image size, and use Docker Compose for multi-service local testing.',
    technologies: ['Docker', 'Docker Compose', 'Docker Hub / ECR', 'Multi-stage Builds', '.dockerignore'],
    visualIntuition: {
      label: 'The ML Container Composition',
      steps: [
        'BASE OS (python:3.12-slim / CUDA runtime)',
        'DEPENDENCIES (requirements.txt pinned packages)',
        'MODEL ARTIFACT (Serialized .joblib / .onnx binary)',
        'APPLICATION CODE (FastAPI routers & preprocessing)',
        'DOCKER IMAGE (Immutable, portable snapshot)',
        'DOCKER CONTAINER (Isolated, running runtime instance)',
      ],
    },
    topics: [
      {
        category: 'Docker Fundamentals',
        items: [
          'What is a container? Containers vs Virtual Machines (kernel sharing, isolation, lightness)',
          'Docker Engine architecture: Client, daemon, images, containers, registries',
          'Core Docker commands: docker build, run, ps, stop, rm, rmi, logs, exec -it, system prune',
          'Port mapping (-p 8000:8000), environment variables (-e), container names (--name)',
        ],
      },
      {
        category: 'Writing Production Dockerfiles for ML',
        items: [
          'Dockerfile instructions: FROM, WORKDIR, COPY, RUN, ENV, EXPOSE, ENTRYPOINT, CMD',
          'Choosing base images: python:3.12-slim vs alpine (wheel compatibility) vs nvidia/cuda for GPUs',
          'Layer caching optimization: Copying requirements.txt before copying source code to cache pip install',
          'Using .dockerignore to exclude .git, __pycache__, raw data files, and virtual environments',
          'Multi-stage builds to remove build tools and reduce production image size by 70%+',
          'Security: Creating and using a non-root user (USER appuser) instead of running as root',
        ],
      },
      {
        category: 'Volumes & Data Persistence',
        items: [
          'Container storage layer (ephemeral) vs persistent storage',
          'Docker named volumes for persistent database files (PostgreSQL / Redis)',
          'Bind mounts (-v $(pwd):/app) for rapid local development without image rebuilding',
        ],
      },
      {
        category: 'Multi-Container Orchestration with Docker Compose',
        items: [
          'docker-compose.yml syntax: Services, networks, volumes, environment variables',
          'Connecting an ML API container, a PostgreSQL database, and a Redis cache on an isolated bridge network',
          'Health checks (healthcheck directive) and dependency ordering (depends_on: condition: service_healthy)',
        ],
      },
    ],
    keyConcepts: [
      'Immutable Image Packaging for ML Workloads',
      'Docker Layer Caching & Build Optimization',
      'Multi-Stage Builds & Slim Base Images',
      'Non-Root Container Security Practices',
      'Multi-Service Orchestration via Docker Compose',
    ],
    practiceSuggestions: [
      'Write an optimized Dockerfile for your FastAPI ML model that builds in under 30 seconds with cached layers and weighs under 250MB.',
      'Create a docker-compose.yml file that launches your ML API, a PostgreSQL database for logging, and an Adminer UI on a single command.',
      'Debug a failing container using docker logs and attach an interactive shell with docker exec -it container_name /bin/bash.',
    ],
    projectSuggestions: [
      {
        title: 'Containerized Multi-Service ML Inference Platform',
        description: 'A fully containerized ML system featuring a slim, non-root FastAPI image, a persistent PostgreSQL logging container, Docker Compose orchestration, and automated health checks.',
        level: 'Beginner',
      },
    ],
    commonMistakes: [
      'Copying the entire source directory before running pip install, invalidating Docker layer caching on every minor code change.',
      'Baking sensitive credentials (API keys, database passwords) directly into Dockerfile layers.',
      'Using massive 2GB+ default Python images when python:3.12-slim achieves identical performance at 150MB.',
    ],
    nextStepPreview: 'Automate testing, container building, and deployment using Stage 06: CI/CD & Automation.',
  },
  {
    id: 'cicd-automation',
    stageNumber: '06',
    title: 'CI/CD & Automation',
    shortTitle: 'CI/CD & Automation',
    tagline: 'Automate testing, linting, Docker image building, model validation, and continuous deployment.',
    iconName: 'Workflow',
    goal: 'Automate testing, building, and deployment.',
    whyItMatters:
      'Manual testing and manual deployments lead to production downtime, configuration drift, and broken model versions. Continuous Integration and Continuous Deployment (CI/CD) guarantees that every code change is automatically linted, tested, packaged into a container, and safely deployed.',
    learningOutcome: 'Automate the software delivery lifecycle for ML applications.',
    recommendedApproach:
      'Master GitHub Actions. Create automated pipelines that trigger on pull requests to run unit tests and linters, and trigger on main branch merges to build Docker images and push them to container registries.',
    technologies: ['GitHub Actions', 'GitLab CI basics', 'Docker Hub / AWS ECR', 'cml (Continuous Machine Learning)', 'pre-commit'],
    visualIntuition: {
      label: 'The ML CI/CD Pipeline Flow',
      steps: [
        'GIT PUSH (Developer pushes branch or opens pull request)',
        'CONTINUOUS INTEGRATION (Runs ruff linting & pytest test suite)',
        'MODEL VALIDATION (Verifies model accuracy & schema contracts)',
        'CONTAINER BUILD (Builds Docker image & runs container test)',
        'REGISTRY PUSH (Tags & pushes image to Docker Hub / ECR)',
        'CONTINUOUS DEPLOYMENT (Deploys updated container to staging/prod)',
      ],
    },
    topics: [
      {
        category: 'CI/CD Concepts & Terminology',
        items: [
          'What is Continuous Integration (CI), Continuous Delivery (CD), and Continuous Deployment?',
          'The MLOps CI/CD difference: Validating code, data schemas, AND model performance metrics',
          'Pipeline triggers: on: push, on: pull_request, on: schedule (cron), workflow_dispatch',
          'Pipeline environments: Development, Staging, Production with manual approval gates',
        ],
      },
      {
        category: 'GitHub Actions Workflows for ML',
        items: [
          'GitHub Actions syntax (.github/workflows/*.yml): Workflows, jobs, steps, runners (ubuntu-latest)',
          'Using pre-built actions: actions/checkout, actions/setup-python, docker/build-push-action',
          'Secrets management: Storing and referencing repository secrets (${{ secrets.DOCKER_PASSWORD }})',
          'Matrix testing: Running pytest across multiple Python versions (3.10, 3.11, 3.12)',
          'Caching dependencies: actions/cache for pip packages to speed up pipeline execution by 80%',
        ],
      },
      {
        category: 'Automated Container Building & Registry Push',
        items: [
          'Automating Docker builds on git commit tags',
          'Authenticating and pushing images to container registries (Docker Hub, AWS ECR, GitHub Packages / GHCR)',
          'Tagging strategies: git commit SHA tags, semantic version tags (v1.2.0), latest tag',
          'Running security vulnerability scans on container images (Trivy, Snyk)',
        ],
      },
      {
        category: 'Automated Model Validation in CI',
        items: [
          'Continuous Machine Learning (CML): Generating automated evaluation markdown reports in PR comments',
          'Regression testing: Enforcing that new models meet minimum accuracy/F1 benchmarks before merge',
          'Data validation gates: Blocking pipeline execution if new incoming data schema has changed',
        ],
      },
    ],
    keyConcepts: [
      'Automated Pull Request Testing (Linting & Pytest)',
      'GitHub Secrets Management & Token Security',
      'Container Registry Image Pushing & Semantic Tagging',
      'Automated Model Metric Threshold Validation',
      'CI Dependency Caching for Sub-Minute Builds',
    ],
    practiceSuggestions: [
      'Create a GitHub Actions workflow that runs ruff and pytest on every pull request, blocking merges if any test fails.',
      'Build a workflow that automatically builds a multi-stage Docker image on main branch merges and pushes it to Docker Hub tagged with the commit SHA.',
      'Use CML (Continuous Machine Learning) to automatically post a confusion matrix plot and F1 evaluation report as a comment on pull requests.',
    ],
    projectSuggestions: [
      {
        title: 'Complete GitHub Actions CI/CD Pipeline for ML API',
        description: 'An automated CI/CD pipeline featuring code quality linting, pytest matrix runs, Docker image security scanning with Trivy, automated registry push, and PR metric reports.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Allowing direct commits to main branch without requiring automated CI status checks to pass.',
      'Hard-coding plain-text credentials in workflow YAML files instead of using GitHub Secrets.',
      'Tagging every Docker build as :latest only, eliminating the ability to roll back to a specific previous container version.',
    ],
    nextStepPreview: 'Systematically track hyperparameters, metrics, and model versions in Stage 07: Experiment Tracking & ML Lifecycle Management.',
  },
  {
    id: 'experiment-tracking-mlflow',
    stageNumber: '07',
    title: 'Experiment Tracking & ML Lifecycle',
    shortTitle: 'Experiment Tracking',
    tagline: 'Track experiments, datasets, parameters, metrics, code versions, and manage the model registry lifecycle.',
    iconName: 'FlaskConical',
    goal: 'Track experiments, datasets, parameters, metrics, and models.',
    whyItMatters:
      'Without experiment tracking, data science is chaotic: models are overwritten, hyperparameter configurations are lost, and results cannot be reproduced. Systematic lifecycle tracking ensures that every model can be traced back to its exact code, parameters, and dataset version.',
    learningOutcome: 'Track and manage machine learning experiments and model versions systematically.',
    recommendedApproach:
      'Master MLflow. Set up an MLflow tracking server with SQLite/PostgreSQL backend and S3/local artifact storage. Log parameters, metrics, and artifacts, and manage model transitions (Staging → Production) in the Model Registry.',
    technologies: ['MLflow', 'Weights & Biases (W&B)', 'DVC (Data Version Control)', 'SQLite / PostgreSQL', 'MinIO / S3'],
    visualIntuition: {
      label: 'The Model Registry Lifecycle Flow',
      steps: [
        'EXPERIMENT (Log runs, hyperparameters, metrics & artifacts)',
        'VALIDATE (Compare runs on test set & select best model)',
        'REGISTER (Register model artifact to MLflow Model Registry)',
        'STAGING (Deploy to staging environment for integration testing)',
        'APPROVE (Automated or manual stakeholder verification)',
        'PRODUCTION (Promote to Production stage for live API serving)',
      ],
    },
    topics: [
      {
        category: 'Experiment Tracking Fundamentals',
        items: [
          'Why experiment tracking is essential: Reproducibility, collaboration, auditability',
          'What to log: Parameters (learning rate, batch size), metrics (loss, F1 over epochs), code version (git commit)',
          'Artifact logging: Serialized model weights, confusion matrix plots, feature importance charts, dataset samples',
          'MLflow Tracking Architecture: Tracking URI, Backend store (PostgreSQL), Artifact store (S3/MinIO/local)',
        ],
      },
      {
        category: 'Using MLflow in Python',
        items: [
          'mlflow.set_experiment(), mlflow.start_run(), mlflow.log_params(), mlflow.log_metrics()',
          'Autologging with mlflow.autolog() for Scikit-learn, PyTorch, TensorFlow, and XGBoost',
          'Logging models using mlflow.sklearn.log_model() and mlflow.pyfunc custom model wrappers',
          'Querying runs programmatically via MLflow Client (mlflow.tracking.MlflowClient)',
        ],
      },
      {
        category: 'MLflow Model Registry',
        items: [
          'Registering models from experiment runs into the centralized Model Registry',
          'Model versioning: Managing v1, v2, v3 iterations of a model family',
          'Model stages / aliases: Staging, Production, Archived (or custom champion/challenger aliases)',
          'Loading production models for inference via URI: models:/model_name/Production or models:/model_name@champion',
          'Model approval workflows and metadata governance',
        ],
      },
      {
        category: 'Data & Model Version Control (DVC)',
        items: [
          'The problem of large datasets in Git (git repository bloat)',
          'DVC concepts: Tracking large data files with .dvc pointer files committed to Git',
          'DVC remote storage: Syncing datasets to S3, Google Cloud Storage, or Azure Blob Storage',
          'Data versioning: Tying exact data hashes to code versions for 100% reproducible training',
        ],
      },
    ],
    keyConcepts: [
      'Centralized Experiment Tracking & Run Comparison',
      'Model Registry Versioning & Stage Transitions',
      'MLflow Custom PyFunc Model Wrappers',
      'Artifact Storage (MinIO / S3) Architecture',
      'Data Versioning with DVC Pointer Files',
    ],
    practiceSuggestions: [
      'Train 5 different classification models with varied hyperparameters and log all parameters, metrics, and ROC plots to a local MLflow tracking server.',
      'Register the best-performing model into the MLflow Model Registry, transition it to "Staging", and load it inside a FastAPI endpoint using its registry URI.',
      'Track a 50MB CSV dataset using DVC, push the data to a local remote directory, and verify that git only tracks the lightweight .dvc metadata file.',
    ],
    projectSuggestions: [
      {
        title: 'Centralized MLflow Tracking & Model Registry System',
        description: 'An end-to-end experiment tracking setup featuring an MLflow tracking server backed by PostgreSQL, MinIO S3 artifact storage, automated model registration, and dynamic model loading in FastAPI.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Saving models as unversioned files named model_final_v2_new.pkl without tracking training hyperparameters or commit hashes.',
      'Committing multi-gigabyte training datasets directly into Git repositories instead of using DVC or cloud object storage.',
      'Hard-coding static model filepaths in inference services instead of resolving models dynamically from a Model Registry.',
    ],
    nextStepPreview: 'Automate multi-step data transformation and model training workflows in Stage 08: Data & ML Pipelines.',
  },
  {
    id: 'data-ml-pipelines',
    stageNumber: '08',
    title: 'Data & ML Pipelines',
    shortTitle: 'Data & ML Pipelines',
    tagline: 'Build automated, reproducible workflow pipelines that transform raw data into evaluated, registered models.',
    iconName: 'GitFork',
    goal: 'Build automated workflows that transform raw data into deployable models.',
    whyItMatters:
      'Real-world ML is not a single training script; it is a multi-step Directed Acyclic Graph (DAG) of data ingestion, validation, feature transformation, training, evaluation, and registration. Workflow orchestrators automate retries, handle dependencies, and execute scheduled retraining.',
    learningOutcome: 'Automate the ML lifecycle instead of manually running notebooks.',
    recommendedApproach:
      'Understand pipeline orchestration using modern tools like Apache Airflow or Prefect. Implement strict data quality checks using Great Expectations or Pydantic before allowing data into training steps.',
    technologies: ['Apache Airflow', 'Prefect', 'Great Expectations', 'DVC Pipelines', 'Pandas / Polars'],
    visualIntuition: {
      label: 'The Automated End-to-End ML Pipeline DAG',
      steps: [
        'RAW DATA INGESTION (Pull data from DB/S3/API)',
        'DATA VALIDATION (Schema & null checks with Great Expectations)',
        'FEATURE ENGINEERING (Transformations & scaling)',
        'MODEL TRAINING (Distributed or GPU training step)',
        'EVALUATION & BENCHMARKING (Compare against threshold)',
        'MODEL REGISTRATION (Push approved model to Model Registry)',
        'DEPLOYMENT TRIGGER (Trigger CI/CD redeployment)',
      ],
    },
    topics: [
      {
        category: 'Pipeline Architecture & Workflow Orchestration',
        items: [
          'What is a Directed Acyclic Graph (DAG)? Nodes (tasks), edges (dependencies), and topological sorting',
          'Pipeline concepts: Scheduling (cron), retries, exponential backoff, timeouts, alerting on failure',
          'Task isolation and state passing: Passing lightweight metadata (XComs / task returns) vs storing large data in object storage',
          'Orchestration tool comparison: Apache Airflow (industry standard) vs Prefect (Pythonic & modern) vs Kubeflow Pipelines',
        ],
      },
      {
        category: 'Building Pipelines with Airflow / Prefect',
        items: [
          'Airflow concepts: DAGs, Operators (PythonOperator, BashOperator), TaskFlow API (@task decorator)',
          'Airflow architecture: Webserver, Scheduler, Metadata Database, Executor (Celery / Kubernetes)',
          'Prefect concepts: Flows (@flow) and Tasks (@task), parameterization, local & cloud execution',
          'Modular pipeline design: Decoupling business logic from pipeline orchestration code',
        ],
      },
      {
        category: 'Data Validation & Quality Gates',
        items: [
          'The concept of Data Quality Gates: Why dirty data must never reach training models',
          'Data validation with Great Expectations: Defining expectation suites (expect column to exist, not null, between range)',
          'Schema validation: Checking for unexpected new columns or changed data types',
          'Distribution checks: Detecting missing values, extreme outliers, and categorical value drift',
        ],
      },
      {
        category: 'Automated Retraining Triggers',
        items: [
          'Scheduled retraining (e.g. weekly or monthly cron runs)',
          'Event-driven retraining: Triggering pipelines when new batch data lands in S3 bucket',
          'Metric-driven retraining: Triggering retraining when monitoring systems detect data drift',
          'Champion / Challenger evaluation: Automatically comparing new retrained model against current production model',
        ],
      },
    ],
    keyConcepts: [
      'Directed Acyclic Graphs (DAGs) & Task Dependency Execution',
      'Data Quality Gates with Great Expectations',
      'Airflow TaskFlow API & Prefect Workflow Orchestration',
      'Automated Retraining Triggers (Cron & Event-Driven)',
      'Champion vs Challenger Automated Evaluation',
    ],
    practiceSuggestions: [
      'Write a Great Expectations test suite that validates customer churn data (verifies no null IDs, valid tenure ranges, and valid contract categories).',
      'Create an Airflow DAG or Prefect Flow with 4 sequential tasks: ingest_data → validate_data → train_model → evaluate_and_register.',
      'Configure a failure alert in your pipeline that sends a Slack/email notification when data validation fails.',
    ],
    projectSuggestions: [
      {
        title: 'Automated Scheduled ML Retraining Pipeline',
        description: 'A complete Airflow/Prefect DAG that ingests weekly data, validates schemas via Great Expectations, trains an XGBoost model, logs metrics to MLflow, and registers the model if test F1 exceeds production.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Passing gigabyte-sized DataFrames directly between pipeline tasks through in-memory message queues instead of writing to cloud object storage.',
      'Training models on unvalidated raw data, causing silent model degradation when upstream database schemas change.',
      'Creating monolithic single-task pipelines instead of discrete, retryable, modular pipeline steps.',
    ],
    nextStepPreview: 'Understand how cloud providers host compute, storage, and networking in Stage 09: Cloud & ML Infrastructure.',
  },
  {
    id: 'cloud-infrastructure',
    stageNumber: '09',
    title: 'Cloud & ML Infrastructure',
    shortTitle: 'Cloud & Infrastructure',
    tagline: 'Understand the cloud compute, storage, networking, IAM security, and managed services used in production ML systems.',
    iconName: 'Cloud',
    goal: 'Understand the cloud infrastructure used to run machine learning systems.',
    whyItMatters:
      'Production ML systems run in the cloud. An MLOps engineer must understand cloud compute instances (CPUs and GPUs), object storage for massive datasets, container registries, Virtual Private Clouds (VPC), and Identity & Access Management (IAM) security.',
    learningOutcome: 'Understand how cloud infrastructure supports production ML systems.',
    recommendedApproach:
      'Focus on core cloud concepts first before memorizing provider-specific details. Understand how Compute, Storage, Registries, and IAM map across AWS, Google Cloud, and Microsoft Azure.',
    technologies: ['AWS (EC2, S3, ECR, ECS)', 'GCP (Compute Engine, Cloud Storage, Artifact Registry)', 'Azure', 'Terraform Basics'],
    visualIntuition: {
      label: 'Cloud MLOps Infrastructure Flow',
      steps: [
        'SOURCE CODE (Git repository with CI/CD trigger)',
        'CONTAINER REGISTRY (AWS ECR / GCP Artifact Registry)',
        'OBJECT STORAGE (AWS S3 / Google Cloud Storage for data & models)',
        'CLOUD COMPUTE (AWS EC2 / GCP Cloud Run / ECS Container Service)',
        'MODEL API (Public / Internal REST Endpoint with Load Balancer)',
        'CLOUD MONITORING (CloudWatch / Stackdriver for logs & metrics)',
      ],
    },
    topics: [
      {
        category: 'Core Cloud Computing Concepts',
        items: [
          'Cloud infrastructure primitives: Compute (VMs, serverless, containers), Storage, Networking, Databases',
          'Compute instances: CPU vs GPU instances (NVIDIA T4, A10G, H100), Spot/Preemptible instances for cost savings',
          'Cloud Object Storage: AWS S3, Google Cloud Storage, Azure Blob Storage (buckets, permissions, lifecycle policies)',
          'Container Registries: AWS ECR, GCP Artifact Registry, Azure Container Registry (ACR)',
        ],
      },
      {
        category: 'Cloud Provider Mapping',
        items: [
          'AWS: EC2 (Virtual Machines), S3 (Storage), ECR (Containers), ECS / EKS (Container runtime), CloudWatch (Logs)',
          'Google Cloud: Compute Engine, Cloud Storage, Artifact Registry, Cloud Run, Vertex AI',
          'Azure: Virtual Machines, Blob Storage, Azure Container Registry (ACR), Azure Kubernetes Service (AKS), Azure ML',
          'Managed ML Platforms: AWS SageMaker, GCP Vertex AI, Databricks (when to use managed vs custom containers)',
        ],
      },
      {
        category: 'Identity & Access Management (IAM) & Security',
        items: [
          'IAM fundamentals: Users, Groups, Roles, Policies, Service Accounts',
          'Least Privilege Principle: Granting services only the specific permissions needed (e.g. S3 read-only)',
          'Virtual Private Clouds (VPC): Subnets, security groups, route tables, private endpoints',
          'Secrets Management: AWS Secrets Manager, GCP Secret Manager, HashiCorp Vault',
        ],
      },
      {
        category: 'Infrastructure as Code (IaC) Basics',
        items: [
          'Why Infrastructure as Code matters: Eliminating manual cloud console clicking, disaster recovery, reproducibility',
          'Terraform fundamentals: Providers, resources, variables, state files (.tfstate)',
          'Provisioning an S3 bucket and an ECR repository using declarative Terraform code',
        ],
      },
    ],
    keyConcepts: [
      'Cloud Compute & GPU Instance Provisioning',
      'Object Storage Architecture (S3 / GCS Buckets)',
      'IAM Roles & Least Privilege Service Accounts',
      'Container Registry Storage & Lifecycle Rules',
      'Infrastructure as Code (IaC) with Terraform',
    ],
    practiceSuggestions: [
      'Create an AWS S3 bucket (or GCP bucket), upload a model artifact from Python using boto3 or google-cloud-storage, and configure IAM permissions.',
      'Build a Docker container locally and push it to AWS Elastic Container Registry (ECR) or GCP Artifact Registry using CLI credentials.',
      'Write a simple Terraform script that provisions an S3 storage bucket and an ECR container repository with automated tags.',
    ],
    projectSuggestions: [
      {
        title: 'Cloud-Deployed ML Service with Terraform & S3',
        description: 'An end-to-end cloud infrastructure project using Terraform to provision S3 storage, an ECR container registry, and deploy a containerized ML API to a cloud compute instance with IAM security.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Using root cloud credentials or hardcoding AWS access keys in code instead of attaching IAM roles to compute instances.',
      'Leaving high-cost GPU instances running 24/7 after training finishes without auto-shutdown or spot instance configurations.',
      'Configuring public write permissions on S3 buckets containing training data or proprietary model artifacts.',
    ],
    nextStepPreview: 'Deploy models using advanced serving strategies in Stage 10: Model Deployment & Serving.',
  },
  {
    id: 'model-deployment-serving',
    stageNumber: '10',
    title: 'Model Deployment & Serving',
    shortTitle: 'Model Deployment',
    tagline: 'Deploy machine learning models reliably using real-time, batch, streaming, and zero-downtime release strategies.',
    iconName: 'Rocket',
    goal: 'Deploy machine learning models reliably and efficiently.',
    whyItMatters:
      'Deploying a model is more than running a web server. Production systems require choosing between batch and real-time architectures, implementing zero-downtime deployment strategies (Canary, Blue/Green), optimizing inference latency, and handling high concurrent traffic.',
    learningOutcome: 'Deploy ML models as reliable production services.',
    recommendedApproach:
      'Master the trade-offs between Real-Time Online Inference (FastAPI, Triton) and Batch Inference. Implement Blue/Green and Canary release strategies to safely roll out new model versions without user disruption.',
    technologies: ['FastAPI', 'TorchServe / Triton Inference Server', 'Docker', 'NGINX / Load Balancers', 'Celery / Ray Serve'],
    visualIntuition: {
      label: 'Production Serving Architecture & Canary Release',
      steps: [
        'USER REQUEST (Incoming production web traffic)',
        'LOAD BALANCER (Traffic router & SSL termination)',
        'CANARY SPLIT (90% traffic to Model v1, 10% to Model v2)',
        'MODEL SERVER (High-concurrency optimized inference runtime)',
        'RESPONSE & METRICS (Low-latency output + performance telemetry)',
      ],
    },
    topics: [
      {
        category: 'Inference Patterns & Architectures',
        items: [
          'Online / Real-Time Inference: Low latency (<50ms), request-response REST/gRPC endpoints',
          'Batch Inference: High throughput, processing millions of records on a schedule (cron / Spark / SQL)',
          'Streaming Inference: Event-driven real-time scoring using message brokers (Kafka, RabbitMQ)',
          'Embedded / Edge Inference: Running lightweight models directly on client devices (ONNX, TFLite)',
        ],
      },
      {
        category: 'Zero-Downtime Deployment Strategies',
        items: [
          'Rolling Deployment: Gradually replacing old container instances with new ones',
          'Blue/Green Deployment: Running two identical environments (Blue=Live, Green=New), switching load balancer traffic instantly',
          'Canary Deployment: Routing a small percentage (5-10%) of live traffic to the new model, monitoring error rates before full rollout',
          'Shadow Deployment: Replicating live traffic to the new model in the background without returning its output to users',
        ],
      },
      {
        category: 'Dedicated Model Servers & Frameworks',
        items: [
          'FastAPI for custom Python ML pipelines',
          'Triton Inference Server (NVIDIA): Multi-model serving, dynamic batching, GPU concurrency, C++ performance',
          'TorchServe (PyTorch) and TF Serving (TensorFlow)',
          'Ray Serve: Distributed, scalable Python model serving for heavy workloads',
        ],
      },
      {
        category: 'Inference Latency & Throughput Optimization',
        items: [
          'Dynamic Batching: Combining concurrent individual requests into a single tensor batch to maximize GPU throughput',
          'Model Quantization (FP32 → FP16 → INT8) and pruning for 2-4x speedup with minimal accuracy loss',
          'ONNX Runtime and TensorRT acceleration',
          'Benchmarking tools: Locust, Apache Bench (wrk) for load testing and p95/p99 latency analysis',
        ],
      },
    ],
    keyConcepts: [
      'Batch vs Online vs Streaming Inference Trade-offs',
      'Blue/Green & Canary Zero-Downtime Deployment Strategies',
      'Dynamic Request Batching & Concurrency',
      'ONNX Runtime & INT8 Quantization Speedups',
      'P95 and P99 Tail Latency Benchmarking with Locust',
    ],
    practiceSuggestions: [
      'Configure an NGINX reverse proxy or load balancer that splits incoming traffic 90/10 between two Docker containers running Model V1 and Model V2.',
      'Convert a PyTorch or Scikit-learn model to ONNX format and benchmark inference latency vs native Python using Locust load testing.',
      'Implement a batch inference script that reads 50,000 records from a database, chunks inputs into batches of 1,000, and writes predictions back efficiently.',
    ],
    projectSuggestions: [
      {
        title: 'High-Throughput Model Serving System with Canary Deployment',
        description: 'A production model serving infrastructure featuring NGINX traffic splitting (Canary rollout), ONNX-optimized inference, automated latency benchmarking with Locust, and health-check failovers.',
        level: 'Advanced',
      },
    ],
    commonMistakes: [
      'Deploying new model versions with instant 100% hard cutovers without shadow or canary validation, causing catastrophic outages when edge-case bugs occur.',
      'Using real-time REST inference for workloads that only require nightly batch score updates, driving cloud costs unnecessarily high.',
      'Measuring only average latency while ignoring P99 tail latency, missing severe latency spikes experienced by users.',
    ],
    nextStepPreview: 'Detect model degradation and data drift in live production traffic in Stage 11: Monitoring, Observability & Model Drift.',
  },
  {
    id: 'monitoring-observability-drift',
    stageNumber: '11',
    title: 'Monitoring, Observability & Model Drift',
    shortTitle: 'Monitoring & Drift',
    tagline: 'Detect when production ML systems stop behaving correctly through telemetry, data drift, and concept drift monitoring.',
    iconName: 'Activity',
    goal: 'Detect when production ML systems stop behaving correctly.',
    whyItMatters:
      'Traditional software breaks with explicit 500 errors. Machine learning models fail SILENTLY: a model will happily return confident predictions even when input distributions change, customer behavior shifts, or sensors degrade. Continuous observability and drift detection are vital.',
    learningOutcome: 'Understand how to monitor both the infrastructure and the behavior of ML models.',
    recommendedApproach:
      'Implement three tiers of monitoring: System Health (CPU, RAM, latency via Prometheus/Grafana), Application Health (error rates, QPS), and Model Health (Data Drift & Prediction Drift via Evidently AI). Set up automated alerts.',
    technologies: ['Prometheus', 'Grafana', 'Evidently AI', 'Alibi Detect', 'CloudWatch / Datadog'],
    visualIntuition: {
      label: 'The Three Tiers of MLOps Monitoring',
      steps: [
        'TIER 1: SYSTEM HEALTH (CPU, GPU memory, RAM, disk I/O)',
        'TIER 2: APPLICATION HEALTH (QPS, p95 latency, 4xx/5xx HTTP error rates)',
        'TIER 3: MODEL HEALTH (Data drift, feature distribution shift, prediction drift)',
        'AUTOMATED ALERT (Prometheus Alertmanager triggers Slack / PagerDuty)',
        'INCIDENT REMEDIATION (Automated fallback model or retraining pipeline trigger)',
      ],
    },
    topics: [
      {
        category: 'The Three Tiers of Production Monitoring',
        items: [
          'System Monitoring: CPU usage, GPU utilization, memory leaks, disk space, network I/O',
          'Application Monitoring: Request counts, throughput (QPS), latency histograms (P50, P95, P99), HTTP error rates',
          'Model Monitoring: Prediction distribution over time, confidence scores, accuracy (when ground-truth labels arrive)',
        ],
      },
      {
        category: 'Understanding ML Drift Phenomena',
        items: [
          'Data Drift (Covariate Shift): Input feature distributions change P(X) while relationship P(Y|X) remains constant (e.g. users get younger)',
          'Concept Drift: The underlying relationship P(Y|X) changes (e.g. inflation changes spending habits; COVID changes travel patterns)',
          'Prior Probability Shift: The distribution of target labels P(Y) changes',
          'Feature Drift: A specific input column degrades (e.g. mobile OS update formats phone numbers differently)',
        ],
      },
      {
        category: 'Statistical Drift Detection Techniques',
        items: [
          'Kolmogorov-Smirnov (KS) test for numerical continuous feature distributions',
          'Population Stability Index (PSI) and Wasserstein Distance (Earth Mover\'s Distance)',
          'Chi-Square test for categorical feature distribution shifts',
          'Using Evidently AI to generate automated visual HTML drift reports and JSON metrics',
        ],
      },
      {
        category: 'Observability Infrastructure: Prometheus & Grafana',
        items: [
          'Prometheus architecture: Pull-based metrics scraping, Time-Series Database (TSDB), PromQL queries',
          'Instrumenting Python APIs: prometheus_client library (Counters, Gauges, Histograms)',
          'Building Grafana dashboards: Visualizing live throughput, p99 latency, and feature drift metrics',
          'Alerting rules: Setting up Prometheus Alertmanager to trigger Slack, PagerDuty, or Webhook alerts',
        ],
      },
    ],
    keyConcepts: [
      'Data Drift (Covariate Shift) vs Concept Drift',
      'Statistical Drift Testing (KS-Test, PSI, Wasserstein)',
      'Prometheus Metrics Instrumentation (Counters & Histograms)',
      'Grafana Live Production Dashboard Construction',
      'Automated Alerting with Prometheus Alertmanager',
    ],
    practiceSuggestions: [
      'Instrument a FastAPI prediction service with prometheus_client to track total predictions made and a latency histogram.',
      'Use Evidently AI to compare a baseline training dataset with simulated shifted production data and generate an automated data drift report.',
      'Configure a Grafana dashboard with live graphs showing API request volume, error rates, and average latency.',
    ],
    projectSuggestions: [
      {
        title: 'Production ML Monitoring & Drift Detection Dashboard',
        description: 'A full observability stack combining Prometheus metrics scraping, live Grafana dashboards, automated Evidently AI drift analysis, and Slack alert webhooks when feature drift exceeds statistical thresholds.',
        level: 'Advanced',
      },
    ],
    commonMistakes: [
      'Monitoring only server CPU/RAM while completely ignoring data drift, allowing degraded models to operate undetected for months.',
      'Setting overly sensitive statistical alert thresholds that spam engineers with false positive alarms every hour.',
      'Failing to log incoming inference feature payloads, making it impossible to diagnose why a model made anomalous predictions.',
    ],
    nextStepPreview: 'Scale containerized ML workloads and manage clusters in Stage 12: Kubernetes, Security & Production MLOps.',
  },
  {
    id: 'kubernetes-security-production',
    stageNumber: '12',
    title: 'Kubernetes, Security & Production MLOps',
    shortTitle: 'Kubernetes & Scale',
    tagline: 'Orchestrate large-scale ML systems, manage GPU clusters, implement security hardening, and operate enterprise ML platforms.',
    iconName: 'Shield',
    goal: 'Understand advanced infrastructure concepts required for large-scale ML systems.',
    whyItMatters:
      'Enterprise ML runs at massive scale on distributed Kubernetes clusters. An advanced MLOps engineer understands container orchestration, Horizontal Pod Autoscaling (HPA), GPU scheduling, secrets management, feature stores, and cost optimization.',
    learningOutcome: 'Understand how production ML platforms operate at scale.',
    recommendedApproach:
      'Learn Kubernetes core primitives (Pods, Deployments, Services, ConfigMaps) using Minikube or K3s locally. Understand how Kubernetes manages high availability, autoscaling, and rolling updates for ML microservices.',
    technologies: ['Kubernetes (K8s)', 'Helm', 'KEDA (Event-driven Autoscaling)', 'Feast (Feature Store)', 'HashiCorp Vault'],
    visualIntuition: {
      label: 'Kubernetes ML Cluster Architecture',
      steps: [
        'INGRESS CONTROLLER (Routes external HTTPS traffic)',
        'SERVICE (Stable internal IP & round-robin load balancer)',
        'DEPLOYMENT & REPLICAS (3-10 Pods running containerized ML API)',
        'AUTOSCALER (HPA scales Pod count dynamically based on traffic/CPU)',
        'GPU NODE POOL (Dedicated worker nodes for heavy model inference)',
        'CONFIGMAPS & SECRETS (Externalized configuration & credentials)',
      ],
    },
    topics: [
      {
        category: 'Kubernetes Core Concepts for ML',
        items: [
          'Why Kubernetes for MLOps? High availability, self-healing, declarative orchestration, multi-cloud portability',
          'Kubernetes primitives: Pods (smallest unit), Deployments (replica management), Services (networking/load balancing)',
          'ConfigMaps and Secrets: Injecting configurations and encrypted credentials into running pods',
          'Namespaces: Isolating dev, staging, and production workloads on a shared cluster',
          'Horizontal Pod Autoscaling (HPA): Automatically scaling pod replicas based on CPU, memory, or custom metrics',
        ],
      },
      {
        category: 'ML Workloads on Kubernetes',
        items: [
          'Resource Requests and Limits: Defining minimum and maximum CPU/RAM allocations to prevent node out-of-memory crashes',
          'GPU Scheduling: Node selectors, taints, tolerations, and nvidia.com/gpu resource limits',
          'Running Batch Training Jobs: Kubernetes Jobs and CronJobs for scheduled retraining',
          'Kubernetes Package Management with Helm charts (packaging deployments, services, and values.yaml)',
        ],
      },
      {
        category: 'Enterprise MLOps Security & Governance',
        items: [
          'Secrets Management: HashiCorp Vault, cloud secret providers, avoiding plain text in environment configs',
          'Container Security: Scanning images for CVE vulnerabilities, rootless containers, read-only root filesystems',
          'Network Policies: Restricting pod-to-pod network traffic (zero-trust security model)',
          'Role-Based Access Control (RBAC): Defining least-privilege cluster permissions for service accounts',
        ],
      },
      {
        category: 'Advanced MLOps Platforms & Feature Stores',
        items: [
          'Feature Stores (Feast / Hopsworks): Serving consistent features for offline training and online low-latency inference',
          'Model Governance & Compliance: Audit trails, model lineage, data privacy (GDPR / HIPAA)',
          'Cloud Cost Optimization: Cluster autoscaling, spot/preemptible GPU node pools, resource right-sizing',
        ],
      },
    ],
    keyConcepts: [
      'Kubernetes Deployments, Services & Ingress Routing',
      'Horizontal Pod Autoscaler (HPA) & Resource Limits',
      'GPU Node Scheduling & Taints/Tolerations',
      'Feature Stores (Feast) for Train/Serve Consistency',
      'Enterprise RBAC & Zero-Trust Network Policies',
    ],
    practiceSuggestions: [
      'Deploy a containerized FastAPI ML model to a local Minikube/Kind cluster with a Deployment manifest (3 replicas) and a NodePort Service.',
      'Configure a Horizontal Pod Autoscaler (HPA) that automatically scales your model deployment from 2 to 10 pods when CPU usage exceeds 70%.',
      'Write a Helm chart that packages your ML deployment with customizable values.yaml for dev and production environments.',
    ],
    projectSuggestions: [
      {
        title: 'Production Kubernetes ML Deployment with Autoscaling',
        description: 'An enterprise Kubernetes deployment featuring a custom Helm chart, Horizontal Pod Autoscaler (HPA), resource limits, health/readiness probes, and Prometheus metrics scraping.',
        level: 'Portfolio-Level',
      },
    ],
    commonMistakes: [
      'Omitting CPU and Memory resource limits on Kubernetes pods, allowing a single runaway inference request to crash the entire worker node.',
      'Jumping into Kubernetes complexity before mastering basic Docker containerization and single-server deployments.',
      'Using unversioned container image tags (:latest) in Kubernetes manifests, breaking rollback capabilities and causing unpredictable pod restarts.',
    ],
    nextStepPreview: 'You have mastered the complete MLOps engineering curriculum! Build your flagship portfolio project and prepare for engineering interviews.',
  },
];

export const MLOPS_PROJECT_PROGRESSION: MLOpsProjectProgression[] = [
  {
    id: 'containerized-ml-api',
    stage: 'Project 01 — Beginner',
    name: 'Containerized ML Inference API',
    difficulty: 'Beginner',
    problem: 'A machine learning model trained in a notebook cannot be reliably accessed by web applications or downstream software services.',
    description: 'A production-grade REST microservice built with FastAPI and Scikit-learn, containerized inside an optimized, non-root Docker image with input validation and automated tests.',
    architecture: 'Client Request → Pydantic Schema Validation → In-Memory Model Prediction → JSON Response',
    technologies: ['Python 3.12', 'Scikit-learn', 'FastAPI', 'Uvicorn', 'Pydantic v2', 'Docker', 'pytest'],
    pipeline: 'Dataset Preprocessing → Scikit-learn Pipeline Training → Model Serialization (.joblib) → FastAPI In-Memory Serving',
    infrastructure: 'Local Docker Engine / Single Virtual Machine (AWS EC2 / GCP Compute Engine)',
    monitoring: 'HTTP status codes, structured JSON error logging, and GET /health readiness endpoint',
    deployment: 'Docker container exposed on port 8000 with environment variable configuration',
    githubReqs: 'Clean src/ layout, Dockerfile, requirements.txt, comprehensive pytest unit tests, README with curl examples.',
    skillsLearned: ['FastAPI', 'Pydantic Validation', 'Docker Containerization', 'Unit Testing', 'Model Serialization'],
  },
  {
    id: 'ml-experiment-tracking-platform',
    stage: 'Project 02 — Intermediate',
    name: 'ML Experiment Tracking & Model Registry',
    difficulty: 'Intermediate',
    problem: 'Data science teams lose track of model hyperparameters, metrics, and dataset versions, leading to unreproducible models.',
    description: 'A centralized experiment tracking and model governance platform powered by MLflow and PostgreSQL that tracks model iterations, compares runs, and manages stage promotions.',
    architecture: 'Training Script → MLflow Client → PostgreSQL (Metadata) + MinIO / S3 (Artifacts) → MLflow Model Registry → Staging / Production',
    technologies: ['Python', 'MLflow', 'PostgreSQL', 'MinIO (S3 compatible)', 'Scikit-learn', 'Docker Compose'],
    pipeline: 'Hyperparameter Search → Automated Run Logging (Params, Metrics, Artifacts) → Best Model Selection → Registry Promotion',
    infrastructure: 'Docker Compose cluster running MLflow tracking server, PostgreSQL database, and MinIO storage',
    monitoring: 'MLflow UI experiment comparison charts, training loss curves, ROC-AUC comparisons',
    deployment: 'Containerized MLflow tracking server accessible via web UI and Python SDK',
    githubReqs: 'Docker Compose file, training scripts with MLflow logging, model promotion script, reproduction documentation.',
    skillsLearned: ['MLflow', 'Experiment Tracking', 'Model Registry', 'S3 Artifact Storage', 'Reproducibility'],
  },
  {
    id: 'automated-ml-training-pipeline',
    stage: 'Project 03 — Intermediate',
    name: 'Automated ML Training & Retraining Pipeline',
    difficulty: 'Intermediate',
    problem: 'Retraining models manually on new data is slow, error-prone, and leaves models vulnerable to unvalidated corrupt data.',
    description: 'An automated workflow DAG orchestrated with Prefect/Airflow that ingests raw data, enforces data quality suites with Great Expectations, trains models, and registers approved models.',
    architecture: 'Raw Data Source → Data Validation Gate (Great Expectations) → Feature Pipeline → Model Training → Evaluation → Model Registry',
    technologies: ['Apache Airflow / Prefect', 'Great Expectations', 'Scikit-learn', 'MLflow', 'Pandas', 'PostgreSQL'],
    pipeline: 'Ingest Task → Validation Task → Preprocess Task → Train Task → Benchmark Task → Register Task',
    infrastructure: 'Airflow / Prefect workflow orchestrator with worker queues and PostgreSQL metadata backend',
    monitoring: 'Pipeline execution logs, DAG task failure retries, Slack failure alert webhooks',
    deployment: 'Automated scheduled DAG (cron) and event-driven webhook execution',
    githubReqs: 'DAG definition files, Great Expectations expectation suites, modular task modules, test fixtures.',
    skillsLearned: ['Airflow / Prefect DAGs', 'Data Quality Gates', 'Automated Retraining', 'Workflow Orchestration'],
  },
  {
    id: 'cicd-ml-deployment-system',
    stage: 'Project 04 — Advanced',
    name: 'End-to-End CI/CD ML Deployment System',
    difficulty: 'Advanced',
    problem: 'Deploying model and API updates manually causes configuration drift, missed tests, and deployment downtime.',
    description: 'A fully automated Continuous Integration & Continuous Deployment pipeline using GitHub Actions that tests code, scans containers, builds Docker images, and deploys to a cloud registry.',
    architecture: 'Git Push → GitHub Actions CI (Linting + Pytest) → Model Regression Test → Docker Build & Trivy Scan → Push to ECR → Cloud Deploy',
    technologies: ['GitHub Actions', 'Docker', 'AWS ECR', 'AWS ECS / Cloud Run', 'Trivy Security', 'CML (Continuous ML)'],
    pipeline: 'Code Quality Gate → Unit Tests → Model Metric Gate → Docker Build → Security Vulnerability Scan → Production Registry Push',
    infrastructure: 'GitHub Actions runners, AWS Elastic Container Registry (ECR), Cloud compute instance',
    monitoring: 'CI/CD pipeline build status, automated pull request metric reports with CML',
    deployment: 'Automated Continuous Deployment on main branch merges with semantic version tagging',
    githubReqs: 'GitHub Actions workflow YAMLs, CML configuration, Dockerfile, automated test suite, branch protection rules.',
    skillsLearned: ['GitHub Actions', 'CI/CD Automation', 'Container Security Scanning', 'Cloud Registry Push', 'Semantic Tagging'],
  },
  {
    id: 'ml-monitoring-drift-system',
    stage: 'Project 05 — Advanced',
    name: 'Production ML Monitoring & Drift Detection System',
    difficulty: 'Advanced',
    problem: 'Models in production degrade silently as real-world input distributions drift, with no errors appearing in standard server logs.',
    description: 'A complete telemetry and statistical drift detection stack combining Prometheus metrics, live Grafana dashboards, and Evidently AI to detect feature and concept drift in real time.',
    architecture: 'FastAPI Prediction Service → Prometheus Metrics Exporter → Grafana Dashboard + Evidently AI Drift Analyzer → Slack Alert Webhook',
    technologies: ['FastAPI', 'Prometheus', 'Grafana', 'Evidently AI', 'Docker Compose', 'Python'],
    pipeline: 'Inference Request → Metric Counter/Histogram Update → Prediction Logging → Scheduled Drift Statistical Test (KS / PSI) → Alerting',
    infrastructure: 'Prometheus TSDB, Grafana visualization server, Alertmanager, Docker Compose cluster',
    monitoring: 'P95/P99 latency graphs, QPS throughput, Kolmogorov-Smirnov feature drift p-values, Slack drift alerts',
    deployment: 'Multi-container observability stack deployed alongside the production model inference API',
    githubReqs: 'Prometheus config, Grafana dashboard JSON exports, Evidently drift script, alerting rules.',
    skillsLearned: ['Prometheus & Grafana', 'Statistical Drift Testing (KS/PSI)', 'Evidently AI', 'Telemetry Instrumentation', 'Alerting'],
  },
  {
    id: 'production-mlops-platform',
    stage: 'Project 06 — Portfolio Level',
    name: 'Enterprise Production MLOps Platform',
    difficulty: 'Portfolio-Level',
    problem: 'Enterprises require a complete, unified MLOps platform connecting data validation, automated training, model registries, CI/CD, autoscaling serving, and observability.',
    description: 'A flagship production MLOps platform integrating Airflow data pipelines, MLflow model registry, GitHub Actions CI/CD, Kubernetes autoscaling deployment, and Prometheus/Grafana drift monitoring.',
    architecture: 'Data Pipeline (Airflow) → Validation (Great Expectations) → Experiment Tracking & Registry (MLflow) → CI/CD (GitHub Actions) → Kubernetes (HPA + Ingress) → Monitoring (Prometheus + Grafana + Evidently) → Automated Retraining Trigger',
    technologies: ['Kubernetes (K8s)', 'Helm', 'Apache Airflow', 'MLflow', 'FastAPI', 'Docker', 'Prometheus', 'Grafana', 'GitHub Actions', 'Terraform'],
    pipeline: 'Raw Ingestion → Quality Gate → Distributed Training → Model Registration → Automated CI/CD → Kubernetes Rolling Deploy → Live Telemetry & Drift Detection → Closed-Loop Retraining',
    infrastructure: 'Kubernetes cluster (EKS/GKE/Minikube), Terraform IaC, Helm charts, Ingress controller, Prometheus & Grafana',
    monitoring: 'Full 3-tier telemetry: Cluster resource usage (CPU/RAM/GPU), API latency & throughput, feature drift metrics, automated Slack alerts',
    deployment: 'Helm-managed Kubernetes Deployment with Horizontal Pod Autoscaler (HPA), Canary traffic splitting, and zero-downtime rolling updates',
    githubReqs: 'Comprehensive architecture diagrams, Terraform scripts, Helm chart, CI/CD workflows, Airflow DAGs, full documentation.',
    skillsLearned: ['Enterprise MLOps Architecture', 'Kubernetes Autoscaling', 'Terraform IaC', 'Closed-Loop Retraining', 'Full-Stack Observability'],
  },
];

export const MLOPS_LIFECYCLE_MAP: MLOpsLifecycleItem[] = [
  {
    id: 'data-ingestion',
    stageName: '01. Data Ingestion & Storage',
    whatHappens: 'Raw transactional, event, or sensory data is collected from production databases, APIs, or data lakes into centralized object storage.',
    whyItMatters: 'Ensures data accessibility, historical archiving, and reproducible training baselines without impacting live transactional databases.',
    commonTools: ['AWS S3', 'Google Cloud Storage', 'PostgreSQL', 'Snowflake', 'Apache Kafka'],
    example: 'Streaming daily customer purchase logs from an e-commerce database into an S3 data bucket.',
    productionConsiderations: 'Data partitioning, encryption at rest, lifecycle retention rules, and access control.',
    icon: 'Database',
  },
  {
    id: 'data-validation',
    stageName: '02. Data Validation & Quality',
    whatHappens: 'Automated quality suites inspect incoming datasets for missing values, schema alterations, data type mismatches, and anomalous outliers.',
    whyItMatters: 'Prevents silent model corruption caused by dirty data and upstream schema modifications before model training begins.',
    commonTools: ['Great Expectations', 'Pydantic', 'Pandas Profiling', 'Deequ'],
    example: 'Validating that customer income column has no nulls and age values fall strictly between 18 and 100.',
    productionConsiderations: 'Blocking downstream pipelines when critical data quality checks fail and sending alert notifications.',
    icon: 'ShieldCheck',
  },
  {
    id: 'feature-engineering',
    stageName: '03. Feature Engineering & Store',
    whatHappens: 'Raw data is transformed into numerical features, normalized, encoded, and indexed for fast retrieval during training and real-time serving.',
    whyItMatters: 'Guarantees that the exact same feature transformation logic is applied during offline batch training and online low-latency inference.',
    commonTools: ['Scikit-learn Pipelines', 'Feast (Feature Store)', 'Polars', 'dbt'],
    example: 'Computing 30-day average user transaction amounts and caching them for sub-10ms lookup during fraud inference.',
    productionConsiderations: 'Preventing train-serve feature skew and maintaining feature versioning.',
    icon: 'Layers',
  },
  {
    id: 'experiment-tracking',
    stageName: '04. Experiment Tracking',
    whatHappens: 'Data scientists run multiple model training iterations, logging hyperparameters, loss curves, evaluation metrics, and model binaries.',
    whyItMatters: 'Ensures every experiment is 100% reproducible and enables systematic comparison of models across iterations.',
    commonTools: ['MLflow', 'Weights & Biases (W&B)', 'Neptune.ai', 'Comet ML'],
    example: 'Comparing 20 XGBoost runs with varying learning rates and tree depths to identify the optimal configuration.',
    productionConsiderations: 'Centralized metadata databases (PostgreSQL) and cloud artifact stores (S3/GCS).',
    icon: 'FlaskConical',
  },
  {
    id: 'model-evaluation',
    stageName: '05. Model Evaluation & Benchmarking',
    whatHappens: 'Candidate models are evaluated on isolated holdout test datasets against predefined business metrics and baseline champion models.',
    whyItMatters: 'Ensures only models that genuinely outperform the current production champion are allowed into deployment staging.',
    commonTools: ['Scikit-learn', 'PyTest', 'CML', 'Evidently AI'],
    example: 'Enforcing that a new fraud detection model must achieve at least 92% Recall without dropping Precision below 85%.',
    productionConsiderations: 'Automated metric gates in CI/CD pipelines that block underperforming model merges.',
    icon: 'BarChart3',
  },
  {
    id: 'model-registry',
    stageName: '06. Model Registry & Governance',
    whatHappens: 'Validated models are stored in a centralized registry with version numbers, metadata, lineage tags, and stage assignments.',
    whyItMatters: 'Establishes clear ownership, compliance audit trails, and enables dynamic loading of production model artifacts.',
    commonTools: ['MLflow Model Registry', 'AWS SageMaker Model Registry', 'DVC'],
    example: 'Promoting model churn_predictor from version 3 (Staging) to version 4 (Production Champion).',
    productionConsiderations: 'Approval workflows, cryptographic model artifact signing, and stage transition permissions.',
    icon: 'Layers3',
  },
  {
    id: 'ci-cd-packaging',
    stageName: '07. CI/CD & Container Packaging',
    whatHappens: 'Code, dependencies, model binaries, and API routers are automatically tested, packaged into Docker containers, and pushed to a registry.',
    whyItMatters: 'Eliminates environment discrepancies and provides an immutable, tested artifact ready for automated deployment.',
    commonTools: ['GitHub Actions', 'Docker', 'AWS ECR / GCP Artifact Registry', 'Trivy'],
    example: 'Building an optimized python:3.12-slim container image on git merge and tagging it with the commit SHA.',
    productionConsiderations: 'Vulnerability scanning, multi-stage builds, non-root user permissions, and dependency locking.',
    icon: 'Workflow',
  },
  {
    id: 'model-serving',
    stageName: '08. Model Serving & Deployment',
    whatHappens: 'The containerized model is deployed to cloud compute or Kubernetes clusters behind load balancers with zero-downtime rollout strategies.',
    whyItMatters: 'Exposes the model to live user traffic with high availability, low latency, and safe rollback capabilities.',
    commonTools: ['FastAPI', 'Kubernetes (K8s)', 'Triton Inference Server', 'AWS ECS', 'NGINX'],
    example: 'Deploying a 3-replica Kubernetes deployment with Canary routing sending 10% of live traffic to the new model.',
    productionConsiderations: 'Health checks, Horizontal Pod Autoscaling (HPA), memory limits, and p99 latency optimization.',
    icon: 'Rocket',
  },
  {
    id: 'monitoring-drift',
    stageName: '09. Telemetry & Drift Monitoring',
    whatHappens: 'Production traffic, latency, error rates, and feature distributions are monitored continuously in real time.',
    whyItMatters: 'Detects silent model degradation, data drift, and infrastructure bottlenecks before they harm business operations.',
    commonTools: ['Prometheus', 'Grafana', 'Evidently AI', 'CloudWatch', 'PagerDuty'],
    example: 'Grafana alerting engineers when the p-value of a Kolmogorov-Smirnov drift test drops below 0.05.',
    productionConsiderations: 'Low-overhead metric scraping, actionable alert thresholds, and automated prediction logging.',
    icon: 'Activity',
  },
  {
    id: 'retraining-loop',
    stageName: '10. Closed-Loop Retraining',
    whatHappens: 'When drift is detected or new validated data accumulates, automated pipelines trigger retraining, evaluation, and redeployment.',
    whyItMatters: 'Keeps models continuously accurate and aligned with shifting real-world conditions without manual engineering intervention.',
    commonTools: ['Apache Airflow', 'Prefect', 'GitHub Actions Webhooks', 'Kubeflow'],
    example: 'Triggering an automated Airflow retraining DAG when Evidently flags statistically significant data drift.',
    productionConsiderations: 'Automated champion-vs-challenger verification before replacing the live model.',
    icon: 'Cpu',
  },
];

export const MLOPS_TOOLKIT: MLOpsToolkitCategory[] = [
  {
    category: 'Programming & Scripting',
    coreItems: ['Python 3.12', 'Bash / Shell Scripting', 'SQL'],
    advancedItems: ['Rust / C++ (High Performance)', 'Go (K8s Operators)', 'TypeScript Basics'],
  },
  {
    category: 'Version Control & Collaboration',
    coreItems: ['Git', 'GitHub / GitLab', 'Semantic Versioning (SemVer)'],
    advancedItems: ['Git Submodules', 'Monorepo Tooling (Nx / Turborepo)'],
  },
  {
    category: 'Machine Learning Frameworks',
    coreItems: ['Scikit-learn', 'PyTorch', 'NumPy / Pandas'],
    advancedItems: ['XGBoost / LightGBM', 'TensorFlow / Keras', 'ONNX Runtime'],
  },
  {
    category: 'APIs & Serving Frameworks',
    coreItems: ['FastAPI', 'Uvicorn', 'Pydantic v2', 'REST APIs'],
    advancedItems: ['Triton Inference Server', 'TorchServe', 'gRPC Protocol Buffers', 'Ray Serve'],
  },
  {
    category: 'Containers & Local Orchestration',
    coreItems: ['Docker', 'Docker Compose', 'Multi-Stage Dockerfiles'],
    advancedItems: ['Podman', 'Containerd', 'Distroless Images'],
  },
  {
    category: 'CI/CD & Automation',
    coreItems: ['GitHub Actions', 'Automated Pytest Suites', 'Pre-Commit Hooks'],
    advancedItems: ['GitLab CI/CD', 'Argo CD (GitOps)', 'Jenkins', 'CML (Continuous ML)'],
  },
  {
    category: 'Experiment Tracking & Model Registry',
    coreItems: ['MLflow', 'DVC (Data Version Control)'],
    advancedItems: ['Weights & Biases (W&B)', 'Neptune.ai', 'Comet ML'],
  },
  {
    category: 'Data & ML Pipeline Orchestration',
    coreItems: ['Apache Airflow', 'Prefect'],
    advancedItems: ['Kubeflow Pipelines (KFP)', 'Dagster', 'Mage.ai'],
  },
  {
    category: 'Data Validation & Quality',
    coreItems: ['Great Expectations', 'Pydantic Validation'],
    advancedItems: ['Deequ (AWS Spark)', 'Pandera', 'Soda Core'],
  },
  {
    category: 'Cloud Infrastructure & Storage',
    coreItems: ['AWS (S3, EC2, ECR)', 'Google Cloud (GCS, Compute Engine)', 'Azure'],
    advancedItems: ['AWS SageMaker', 'GCP Vertex AI', 'Databricks', 'MinIO (Local S3)'],
  },
  {
    category: 'Container Orchestration & Scale',
    coreItems: ['Kubernetes (K8s)', 'Helm Charts'],
    advancedItems: ['KEDA (Event-Driven Autoscaling)', 'Knative', 'Istio Service Mesh'],
  },
  {
    category: 'Monitoring, Drift & Observability',
    coreItems: ['Prometheus', 'Grafana', 'Evidently AI'],
    advancedItems: ['Alibi Detect', 'OpenTelemetry', 'Datadog / New Relic', 'Sentry'],
  },
  {
    category: 'Infrastructure as Code (IaC) & Security',
    coreItems: ['Terraform Basics', 'Cloud IAM Roles', 'Environment Secrets'],
    advancedItems: ['HashiCorp Vault', 'Trivy Container Scanner', 'Terragrunt'],
  },
  {
    category: 'Feature Stores & Governance',
    coreItems: ['Feast Basics', 'Model Metadata Tracking'],
    advancedItems: ['Hopsworks', 'Tecton', 'AWS SageMaker Feature Store'],
  },
];

export const MLOPS_SPECIALIZATIONS: MLOpsSpecialization[] = [
  {
    title: 'ML Platform Engineer',
    description: 'Designs and maintains the internal self-service ML platform enabling data scientists to train, track, register, and deploy models seamlessly.',
    coreTech: ['Kubernetes', 'MLflow', 'FastAPI', 'Helm', 'Docker', 'Terraform'],
    focus: 'Developer experience, internal ML platforms, standardized templates, and scalable infrastructure.',
    icon: 'Cpu',
  },
  {
    title: 'ML Infrastructure & Cloud Engineer',
    description: 'Focuses on provisioning scalable cloud compute, GPU clusters, high-speed networking, storage architectures, and Infrastructure as Code.',
    coreTech: ['AWS / GCP / Azure', 'Terraform', 'Kubernetes', 'NVIDIA CUDA', 'VPC Networking'],
    focus: 'Cloud architecture, GPU orchestration, networking security, and cloud cost optimization.',
    icon: 'Cloud',
  },
  {
    title: 'ML Pipeline & DataOps Engineer',
    description: 'Specializes in building robust data ingestion, automated validation gates, feature stores, and end-to-end retraining DAGs.',
    coreTech: ['Apache Airflow', 'Prefect', 'Great Expectations', 'Feast', 'SQL', 'dbt'],
    focus: 'Data pipelines, data quality gates, feature stores, and automated retraining workflows.',
    icon: 'Workflow',
  },
  {
    title: 'Model Serving & Inference Engineer',
    description: 'Optimizes model inference latency, high-throughput serving, model quantization, dynamic batching, and zero-downtime deployment strategies.',
    coreTech: ['Triton Inference Server', 'FastAPI', 'ONNX Runtime', 'TensorRT', 'NGINX', 'Ray Serve'],
    focus: 'Inference latency, p99 optimization, Canary/Blue-Green deployments, and dynamic batching.',
    icon: 'Rocket',
  },
  {
    title: 'ML Reliability & Observability Engineer',
    description: 'Ensures production ML systems remain healthy through telemetry instrumentation, data drift detection, automated alerting, and incident response.',
    coreTech: ['Prometheus', 'Grafana', 'Evidently AI', 'PagerDuty', 'Alibi Detect', 'Loguru'],
    focus: 'System health, application telemetry, statistical drift monitoring, and SLO/SLA management.',
    icon: 'Activity',
  },
  {
    title: 'LLMOps & GenAI Platform Engineer',
    description: 'Applies MLOps principles to Large Language Models: managing prompt versioning, vector database infrastructure, RAG pipelines, fine-tuning, and LLM evaluation.',
    coreTech: ['vLLM', 'LangSmith / DeepEval', 'Vector DBs (Qdrant/Pinecone)', 'PEFT / LoRA', 'Ollama'],
    focus: 'LLM deployment, RAG pipelines, token cost tracking, prompt versioning, and LLM evaluation.',
    icon: 'Sparkles',
  },
];

export const MLOPS_THINKING_LADDER = [
  { step: '01', label: 'Production Goal', question: 'How will this model reach production and deliver business value?' },
  { step: '02', label: 'Reproducibility', question: 'How can we reproduce the exact dataset, code version, and training run?' },
  { step: '03', label: 'Data & Model Versioning', question: 'How are data files, hyperparameter configs, and model artifacts versioned?' },
  { step: '04', label: 'Automated Testing', question: 'How will we automate unit tests, data schema validation, and model metric gates?' },
  { step: '05', label: 'Safe Deployment', question: 'What deployment strategy (Canary, Blue/Green, Rolling) guarantees zero downtime?' },
  { step: '06', label: 'Service Monitoring', question: 'How will we track CPU, GPU, RAM, QPS, and p99 latency in real time?' },
  { step: '07', label: 'Drift Detection', question: 'How will we detect when incoming production data or predictions drift statistically?' },
  { step: '08', label: 'Automated Retraining', question: 'What trigger initiates model retraining, and how do we validate the new model?' },
  { step: '09', label: 'Rollback & Failover', question: 'How do we instantly roll back to the previous stable model version if an issue occurs?' },
  { step: '10', label: 'Scale & Cost', question: 'How will the infrastructure autoscale under load, and what is our monthly cloud compute cost?' },
];

export const MLOPS_COMMON_MISTAKES: MLOpsCommonMistake[] = [
  {
    title: 'Deploying models without monitoring',
    solution: 'Implement 3-tier monitoring (System, Application, and Data Drift via Evidently/Prometheus) from day one.',
  },
  {
    title: 'Learning only Docker without understanding the ML lifecycle',
    solution: 'Understand data validation, training dynamics, experiment tracking, and evaluation metrics before containerizing.',
  },
  {
    title: 'Ignoring data validation and quality gates',
    solution: 'Use Great Expectations or Pydantic to validate schemas, nulls, and distributions before training or inference.',
  },
  {
    title: 'Jumping to Kubernetes before understanding simple containers',
    solution: 'Master single-container Dockerfiles and Docker Compose before introducing Kubernetes orchestration complexity.',
  },
  {
    title: 'Hard-coding secrets and credentials in repositories',
    solution: 'Always use environment variables, .env files (git-ignored), and cloud Secret Managers.',
  },
  {
    title: 'Unversioned model artifacts and missing lineage',
    solution: 'Use an MLflow Model Registry or DVC to track exact dataset hashes, commit SHAs, and version numbers.',
  },
  {
    title: 'Allowing manual deployments without CI/CD',
    solution: 'Automate linting, testing, Docker image building, and deployment using GitHub Actions or GitLab CI.',
  },
  {
    title: 'Using :latest image tags in production deployments',
    solution: 'Tag Docker images with git commit SHAs or semantic version numbers (v1.2.0) to enable instant rollbacks.',
  },
  {
    title: 'Ignoring cloud infrastructure costs',
    solution: 'Use spot/preemptible instances for training, configure cluster auto-shutdown, and size inference containers appropriately.',
  },
  {
    title: 'Measuring only average latency instead of P99 tail latency',
    solution: 'Benchmark latency histograms and monitor 95th and 99th percentiles using Prometheus and Locust load tests.',
  },
  {
    title: 'Training models directly on live transactional databases',
    solution: 'Extract data to centralized object storage (S3/GCS) or data lakes to prevent impacting production workloads.',
  },
  {
    title: 'Omitting resource limits in Kubernetes pod manifests',
    solution: 'Always set explicit CPU and Memory requests and limits to prevent node-level out-of-memory crashes.',
  },
];

export const MLOPS_CHECKLIST: MLOpsChecklistCategory[] = [
  {
    category: 'Code & Software Engineering',
    items: [
      { name: 'Version Controlled', desc: 'Code is tracked in Git with clean branching and pull request reviews.' },
      { name: 'Automated Tests', desc: 'Unit and integration test suite running with pytest achieving >85% coverage.' },
      { name: 'Strict Linting & Typing', desc: 'Code passes ruff, black formatting, and mypy type checking.' },
      { name: 'Modular Layout', desc: 'Code organized in standard src/ package layout, separated from notebooks.' },
    ],
  },
  {
    category: 'Data & Feature Engineering',
    items: [
      { name: 'Data Validation Gates', desc: 'Incoming datasets validated with Great Expectations before pipeline execution.' },
      { name: 'Data Versioning', desc: 'Training data versions tracked with DVC or immutable S3 bucket versions.' },
      { name: 'Train-Serve Symmetry', desc: 'Feature transformations packaged in reusable pipelines avoiding feature skew.' },
      { name: 'Reproducible Datasets', desc: 'Exact training/test splits can be recreated from historical records.' },
    ],
  },
  {
    category: 'Model & Experiment Tracking',
    items: [
      { name: 'Logged Hyperparameters', desc: 'All parameters, metrics, and loss curves logged to MLflow or W&B.' },
      { name: 'Model Registry', desc: 'Model binaries registered with clear semantic versions and stage tags.' },
      { name: 'Champion Verification', desc: 'Candidate model rigorously evaluated against current production champion.' },
      { name: 'Artifact Lineage', desc: 'Model binary can be traced back to exact git commit and data version.' },
    ],
  },
  {
    category: 'Containerization & CI/CD',
    items: [
      { name: 'Optimized Dockerfile', desc: 'Uses slim base image, layer caching, and runs as a non-root user.' },
      { name: 'Automated CI/CD', desc: 'GitHub Actions pipeline tests code, builds image, and scans vulnerabilities.' },
      { name: 'Immutable Tagging', desc: 'Container images tagged with git commit SHAs, never overwritten :latest.' },
      { name: 'Automated Security Scan', desc: 'Trivy / Snyk scans confirm zero high-severity CVE vulnerabilities.' },
    ],
  },
  {
    category: 'Deployment & Infrastructure',
    items: [
      { name: 'Zero-Downtime Rollout', desc: 'Canary or Blue/Green deployment strategy configured for safe updates.' },
      { name: 'Health & Readiness Probes', desc: 'FastAPI /health endpoints configured for orchestrator health checks.' },
      { name: 'Resource Limits', desc: 'Explicit CPU and memory requests/limits defined in container manifests.' },
      { name: 'Instant Rollback', desc: 'Documented, automated rollback path back to previous stable container.' },
    ],
  },
  {
    category: 'Monitoring, Drift & Security',
    items: [
      { name: 'Live Telemetry', desc: 'Prometheus scraping request counts, error rates, and p99 latency histograms.' },
      { name: 'Data Drift Detection', desc: 'Evidently AI generating statistical drift tests (KS-test / PSI) on live data.' },
      { name: 'Actionable Alerts', desc: 'Prometheus Alertmanager configured to trigger Slack/PagerDuty on anomalies.' },
      { name: 'Least Privilege IAM', desc: 'Services run with minimal IAM permissions and zero hard-coded credentials.' },
    ],
  },
];

export const MLOPS_FOUR_PILLARS: MLOpsFourPillars[] = [
  {
    title: 'Machine Learning',
    subtitle: 'Deep understanding of data preprocessing, model training dynamics, validation splits, and evaluation metrics.',
    icon: 'Brain',
  },
  {
    title: 'Software Engineering',
    subtitle: 'Modular Python packages, strict type hints, Pydantic validation, async FastAPI services, and automated pytest suites.',
    icon: 'Terminal',
  },
  {
    title: 'Cloud & Infrastructure',
    subtitle: 'Linux servers, Docker containerization, Kubernetes orchestration, cloud storage, and Infrastructure as Code.',
    icon: 'Cloud',
  },
  {
    title: 'Automation & Observability',
    subtitle: 'GitHub Actions CI/CD, Airflow pipelines, MLflow experiment tracking, Prometheus telemetry, and drift detection.',
    icon: 'Activity',
  },
];

export const PRODUCTION_ARCHITECTURE_STEPS = [
  { step: '01', title: 'Data Source', desc: 'Transactional databases, event streams, and cloud data lakes' },
  { step: '02', title: 'Data Pipeline', desc: 'Airflow / Prefect automated data extraction and batch ingestion' },
  { step: '03', title: 'Data Validation', desc: 'Great Expectations schema validation and quality gates' },
  { step: '04', title: 'Feature Store', desc: 'Feast consistent feature engineering for training & inference' },
  { step: '05', title: 'Training Pipeline', desc: 'Automated model training on GPU / compute instances' },
  { step: '06', title: 'Experiment Tracking', desc: 'MLflow parameter, metric, and artifact run logging' },
  { step: '07', title: 'Model Registry', desc: 'Versioned, approved model artifacts in central registry' },
  { step: '08', title: 'CI/CD Pipeline', desc: 'GitHub Actions testing, security scanning, and container building' },
  { step: '09', title: 'Container Registry', desc: 'Immutable Docker image storage (AWS ECR / GCP Artifacts)' },
  { step: '10', title: 'Cloud / Kubernetes', desc: 'Autoscaling container runtime with ingress load balancing' },
  { step: '11', title: 'Model Serving', desc: 'FastAPI / Triton high-concurrency low-latency REST endpoints' },
  { step: '12', title: 'Users & Apps', desc: 'Web applications, mobile clients, and enterprise consumers' },
  { step: '13', title: 'Live Monitoring', desc: 'Prometheus telemetry & Grafana latency/error dashboards' },
  { step: '14', title: 'Drift Detection', desc: 'Evidently AI statistical data drift and concept drift analysis' },
  { step: '15', title: 'Retraining Trigger', desc: 'Closed-loop trigger retraining pipeline on statistical drift' },
];
