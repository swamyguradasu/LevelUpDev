import { PlacementCategory } from './placementPrepData';

// =========================================================================
// 14 — SYSTEM DESIGN BASICS (BEGINNER / FRESHER ORIENTED)
// =========================================================================
export const SYSTEM_DESIGN_CATEGORY: PlacementCategory = {
  id: 'system-design-basics',
  cardNumber: '14',
  title: 'System Design Basics (Fresher Track)',
  shortTitle: 'System Design',
  tagline: 'High-level architecture, scalability, load balancers, caching, REST API design, and end-to-end system design walk-throughs.',
  phaseId: 'development',
  phaseName: 'Development',
  iconName: 'Boxes',
  badge: 'Fresher-Friendly',
  estimatedHours: '20 Hours',
  importance: 'High',
  description: 'A beginner-friendly system design track designed for freshers. Learn how clients talk to servers and databases, scaling fundamentals, caching, API pagination, and step-by-step design for canonical applications (URL Shortener, Chat, LMS).',
  targetMNCs: ['Amazon', 'Microsoft', 'Flipkart', 'Adobe', 'TCS Digital', 'Infosys DSE'],
  levels: [
    {
      id: 'level-1-architecture-basics',
      levelNumber: '01',
      title: 'Architecture Basics',
      shortDescription: 'Client, Server, Database, API, Request/Response lifecycles, and Authentication vs Authorization.',
      estimatedHours: '5 Hours',
      concepts: [
        {
          id: 'client-server-db-auth',
          title: 'Core 3-Tier Web Architecture',
          tagline: 'Client (UI), Application Server (Business Logic), Database (Storage), APIs, and security tokens.',
          description: 'Understand the multi-tier request lifecycle: browser request → load balancer → app server → SQL/NoSQL database.',
          topics: [
            {
              id: 'client-server-db-api-lifecycle',
              title: 'Client, Server, Database & Request/Response Flow',
              summary: 'Client initiates HTTP request, Server processes business logic and queries DB, DB returns rows, Server sends JSON response.',
              whatYouWillLearn: 'The end-to-end request path and how stateful vs stateless servers interact with databases.',
              concept: 'In a 3-tier architecture, the presentation layer (Client) never speaks directly to the database; it sends requests through an API gateway/app server to enforce business validation and security.',
              whyItMatters: 'The universal baseline framework for all system design discussions.',
              keyTakeaways: [
                'Keep application servers stateless: store session states in Redis or JWTs to allow horizontal scaling.',
                'Database operations should always use connection pools and indexed foreign keys.',
              ],
            },
            {
              id: 'auth-jwt-sessions-roles',
              title: 'Authentication, Authorization & Security',
              summary: 'Authentication (identifying user via passwords/OAuth) vs Authorization (verifying permissions via RBAC).',
              whatYouWillLearn: 'How JWT tokens and session cookies protect private backend API endpoints.',
              concept: 'Authentication verifies "Who is the user?"; Authorization verifies "What resource can this user edit/delete?". Role-Based Access Control (RBAC) maps user roles (Student, Instructor, Admin) to API permissions.',
              whyItMatters: 'Required in every system design problem when discussing user management and API access.',
              keyTakeaways: [
                'Passwords must ALWAYS be hashed with salt (bcrypt/Argon2) before database insertion.',
                'JWTs are digitally signed; the server verifies the signature without an expensive DB lookup.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'level-2-scalability',
      levelNumber: '02',
      title: 'Scalability & Performance',
      shortDescription: 'Vertical vs Horizontal scaling, Load Balancing, Caching (Redis), Database Indexing, and Replication.',
      estimatedHours: '5 Hours',
      concepts: [
        {
          id: 'scaling-caching-replication',
          title: 'Scaling Strategies, Caching & Replication',
          tagline: 'Vertical (Scale-up) vs Horizontal (Scale-out), Round-Robin Load Balancers, Redis cache-aside, Read Replicas.',
          description: 'Techniques to scale web applications from 1,000 to 1,000,000 users without downtime.',
          topics: [
            {
              id: 'vertical-horizontal-load-balancing',
              title: 'Vertical vs Horizontal Scaling & Load Balancing',
              summary: 'Vertical scaling upgrades CPU/RAM on one machine; Horizontal scaling adds multiple commodity server instances with a Load Balancer.',
              whatYouWillLearn: 'Load balancing algorithms (Round Robin, Least Connections, IP Hash) and health checks.',
              concept: 'Vertical scaling has hardware limits and introduces a Single Point of Failure (SPOF). Horizontal scaling distributes traffic across N servers behind a Reverse Proxy / Load Balancer (Nginx/HAProxy).',
              whyItMatters: 'Every system design interview requires explaining how your architecture handles 10x traffic surges.',
              keyTakeaways: [
                'Horizontal scaling requires stateless application servers.',
                'Load Balancers perform health checks every few seconds and route traffic away from unhealthy server instances.',
              ],
            },
            {
              id: 'caching-indexing-replication',
              title: 'Caching (Redis), DB Indexing & Read Replicas',
              summary: 'Cache-Aside pattern using in-memory Redis/Memcached; B-Tree indexes; Primary-Replica DB replication.',
              whatYouWillLearn: 'Reducing database read loads by 90% via in-memory caching and routing read queries to secondary replicas.',
              concept: 'Memory (Redis) is 1000x faster than disk. In the Cache-Aside pattern: Server checks Redis first; on cache hit, returns data in 1ms; on cache miss, queries DB, populates Redis with TTL (Time-To-Live), and returns.',
              whyItMatters: 'Essential for scaling read-heavy systems (e.g. social feeds, product catalogs).',
              keyTakeaways: [
                'Always set an expiration TTL on cache keys to prevent stale data accumulation.',
                'Read-heavy databases use 1 Primary (Write) + N Replicas (Read) architecture.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'level-3-api-design',
      levelNumber: '03',
      title: 'API Design Best Practices',
      shortDescription: 'RESTful endpoints, HTTP verbs, status codes, payload validation, pagination, and rate limiting.',
      estimatedHours: '4 Hours',
      concepts: [
        {
          id: 'rest-api-design-rules',
          title: 'REST API Design & Pagination',
          tagline: 'Resource nouns, HTTP verbs, Offset vs Cursor pagination, rate limiting (429), input sanitization.',
          description: 'Design clean, predictable, and resilient APIs that external clients love to consume.',
          topics: [
            {
              id: 'rest-endpoints-pagination-validation',
              title: 'REST Endpoints, HTTP Methods, Status Codes & Pagination',
              summary: 'REST conventions: `/api/v1/students/{id}/courses`; Cursor vs Offset pagination; 200, 201, 400, 401, 403, 404, 429.',
              whatYouWillLearn: 'Designing CRUD API schemas, handling query parameters (`?limit=20&cursor=xyz`), and input validation.',
              concept: 'APIs should use nouns for resources and HTTP verbs for actions (`GET /books`, `POST /books`, `DELETE /books/{id}`). Pagination prevents sending 100,000 rows in one response.',
              whyItMatters: 'Writing out API request/response signatures is the second mandatory step in system design interviews.',
              keyTakeaways: [
                'Offset pagination (`LIMIT 20 OFFSET 100000`) is slow on large datasets; Cursor pagination (`WHERE id > last_id LIMIT 20`) is $O(1)$ fast.',
                'Return 201 Created on POST, 204 No Content on DELETE, and 400 Bad Request on schema validation failure.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'level-4-simple-system-design',
      levelNumber: '04',
      title: 'Simple System Design Case Studies',
      shortDescription: 'URL Shortener, Student Management System, LMS, Chat App, Online Bookstore, and File Storage.',
      estimatedHours: '6 Hours',
      concepts: [
        {
          id: 'case-studies-practice',
          title: 'Canonical Fresher System Design Problems',
          tagline: 'Requirements → Components → API → Database → Data Flow → Scaling for 6 core applications.',
          description: 'Apply the 6-step framework to design real-world applications frequently tested in fresher interviews.',
          topics: [
            {
              id: 'design-url-shortener',
              title: 'System Design: TinyURL / URL Shortener',
              summary: 'Requirements (shorten URL, redirect, 301 vs 302), Base62 encoding, Database schema, Redis cache.',
              whatYouWillLearn: 'Designing a URL shortener: 7-character Base62 string ($62^7 \\approx 3.5$ trillion URLs), schema `{id, short_code, original_url, created_at}`, and 301 Permanent vs 302 Temporary redirects.',
              concept: 'Convert auto-incrementing integer ID into Base62 string (a-z, A-Z, 0-9). Cache hot redirects in Redis to achieve sub-5ms response times.',
              whyItMatters: 'The quintessential entry-level system design question asked at Amazon and Microsoft.',
              keyTakeaways: [
                '301 Redirect caches redirect in client browser; 302 Redirect forces client to hit server every time (for analytics tracking).',
                'Base62 encoding avoids special characters in URL strings.',
              ],
            },
            {
              id: 'design-chat-lms-bookstore',
              title: 'System Design: Chat App, LMS & Online Bookstore',
              summary: 'WebSockets for bi-directional chat; Relational schema for LMS & Bookstore; Payment webhook lifecycle.',
              whatYouWillLearn: 'Designing real-time messaging with WebSockets vs HTTP polling, and relational ER modeling for e-commerce and course management.',
              concept: 'Real-time chat requires persistent full-duplex WebSocket connections so server can push messages instantly. E-commerce requires ACID transactions during checkout to prevent overselling inventory.',
              whyItMatters: 'Covers the full spectrum of CRUD and real-time design questions asked in campus interviews.',
              keyTakeaways: [
                'HTTP polling wastes bandwidth; WebSockets maintain a single persistent TCP socket for low-latency push events.',
                'Use database transactions (`BEGIN ... COMMIT`) during inventory deduction to prevent race conditions.',
              ],
            },
          ],
        },
      ],
    },
  ],
};

// =========================================================================
// 15 — AIML / AI SPECIALIZATION (FOR AIML STUDENTS)
// =========================================================================
export const AIML_SPECIALIZATION_CATEGORY: PlacementCategory = {
  id: 'aiml-specialization',
  cardNumber: '15',
  title: 'AIML / AI Specialization',
  shortTitle: 'AIML Specialization',
  tagline: 'Math for ML, NumPy, Pandas, Supervised/Unsupervised ML, Neural Networks, CNN/RNN/Transformers, GenAI, RAG, and AI Interview Defense.',
  phaseId: 'specialization',
  phaseName: 'Specialization',
  iconName: 'Sparkles',
  badge: 'AIML Track',
  estimatedHours: '60 Hours',
  importance: 'Critical',
  description: 'Comprehensive specialization track for AIML and Data Science roles. Covers Linear Algebra & Statistics, Python data science libraries (NumPy, Pandas, Matplotlib), classical ML algorithms, Deep Learning backpropagation, Transformers, Generative AI (RAG, Vector DBs), and ML interview defense.',
  targetMNCs: ['Amazon', 'Google', 'Microsoft', 'Tiger Analytics', 'Fractal', 'Mu Sigma', 'TCS Digital AI', 'Infosys AI'],
  levels: [
    // Level 1: Mathematics for ML
    {
      id: 'level-1-math-for-ml',
      levelNumber: '01',
      title: 'Mathematics for Machine Learning',
      shortDescription: 'Linear Algebra (Vectors, Matrices, Dot Product), Statistics (Distributions, Variance), and Probability (Bayes Theorem).',
      estimatedHours: '8 Hours',
      concepts: [
        {
          id: 'linear-algebra-stats-prob',
          title: 'Linear Algebra, Statistics & Probability',
          tagline: 'Vector dot products, matrix multiplications, eigenvalues, mean/variance, Normal distribution, and Bayes theorem.',
          description: 'Master the mathematical foundations that power machine learning cost functions and optimization algorithms.',
          topics: [
            {
              id: 'linear-algebra-vectors-matrices',
              title: 'Linear Algebra: Vectors, Matrices & Dot Products',
              summary: 'Vector spaces, dot products (cosine similarity), matrix multiplication dimensions, rank, and projections.',
              whatYouWillLearn: 'Why dot products represent directional projection and geometric similarity between embeddings.',
              concept: 'ML features are represented as high-dimensional vectors. The dot product $A \\cdot B = ||A|| ||B|| \\cos(\\theta)$ measures alignment and similarity.',
              whyItMatters: 'Underpins linear models, neural network layer weights ($W X + b$), and Transformer attention ($Q K^T$).',
              keyTakeaways: [
                'Matrix multiplication $(M \\times K) \\times (K \\times N) = (M \\times N)$ is the primary compute kernel of all neural networks.',
                'Cosine similarity normalizes dot product by vector magnitudes to measure angle independent of length.',
              ],
            },
            {
              id: 'statistics-variance-distributions',
              title: 'Statistics & Probability: Distributions & Bayes Theorem',
              summary: 'Mean, Median, Mode, Variance, Standard Deviation, Normal (Gaussian) distribution, Conditional Probability, Bayes Theorem.',
              whatYouWillLearn: 'Calculating standard deviation $\\sigma = \\sqrt{\\frac{1}{N}\\sum (x - \\mu)^2}$ and applying Bayes Theorem $P(A|B) = \\frac{P(B|A)P(A)}{P(B)}$.',
              concept: 'Variance measures dispersion/spread around the mean. Bayes Theorem updates the probability of a hypothesis as new evidence arrives.',
              whyItMatters: 'Foundational for Naive Bayes classification, hypothesis testing, and anomaly detection.',
              keyTakeaways: [
                '68-95-99.7 Rule: in a standard normal distribution, 95% of data falls within 2 standard deviations ($\pm 2\\sigma$).',
                'Median is robust to extreme outliers; Mean is heavily skewed by outliers.',
              ],
            },
          ],
        },
      ],
    },

    // Level 2: Python for Data Science
    {
      id: 'level-2-python-data-science',
      levelNumber: '02',
      title: 'Python for Data Science',
      shortDescription: 'NumPy arrays, vectorization, broadcasting, Pandas DataFrames, missing data handling, and Matplotlib visualizations.',
      estimatedHours: '8 Hours',
      concepts: [
        {
          id: 'numpy-pandas-matplotlib',
          title: 'NumPy, Pandas & Data Visualization',
          tagline: 'Vectorized C-speed computations, DataFrame filtering/grouping, data cleaning, and Matplotlib charts.',
          description: 'Manipulate, clean, and visualize structured tabular datasets in Python.',
          topics: [
            {
              id: 'numpy-arrays-broadcasting-vectorization',
              title: 'NumPy: N-Dimensional Arrays & Vectorization',
              summary: 'Fast C-array memory buffers, element-wise vectorized arithmetic, slicing, and broadcasting rules.',
              whatYouWillLearn: 'Why NumPy vectorization is 50-100x faster than standard Python `for` loops.',
              concept: 'NumPy arrays store contiguous memory blocks of a single data type (e.g. float64). Vectorized operations execute in compiled C code using SIMD CPU instructions without Python interpreter overhead.',
              whyItMatters: 'The bedrock library for all numerical computation in Python.',
              keyTakeaways: [
                'Broadcasting allows arithmetic operations between arrays of different shapes if trailing dimensions match or equal 1.',
                'Avoid Python loops over numeric arrays: use vectorized methods (`np.dot`, `np.sum`).',
              ],
            },
            {
              id: 'pandas-dataframes-cleaning-viz',
              title: 'Pandas DataFrames, Data Cleaning & Visualization',
              summary: 'Loading CSVs, `loc`/`iloc`, `groupby`, `fillna()`, `dropna()`, outlier detection, Matplotlib/Seaborn plots.',
              whatYouWillLearn: 'End-to-end Exploratory Data Analysis (EDA): inspecting distributions, cleaning missing values, and generating correlation heatmaps.',
              concept: 'Pandas DataFrames represent 2D labeled tabular data. Data cleaning handles missing values (imputation via median/mode), removes duplicates, and encodes categorical columns.',
              whyItMatters: 'Evaluated in 100% of live Data Science and AIML coding tests.',
              keyTakeaways: [
                '`df.groupby("dept")["salary"].mean()` computes categorical group statistics in a single line.',
                'Never blindly drop missing rows; analyze missingness mechanism (MCAR vs MAR) and impute appropriately.',
              ],
            },
          ],
        },
      ],
    },

    // Level 3: Machine Learning
    {
      id: 'level-3-machine-learning',
      levelNumber: '03',
      title: 'Classical Machine Learning',
      shortDescription: 'Regression (Linear, Multiple), Classification (Logistic, Decision Trees, Random Forest, KNN), and Clustering (K-Means).',
      estimatedHours: '10 Hours',
      concepts: [
        {
          id: 'supervised-unsupervised-ml',
          title: 'Supervised & Unsupervised Algorithms',
          tagline: 'Linear Regression, Logistic Regression, Decision Trees (Gini/Entropy), Random Forest ensemble, K-Means clustering.',
          description: 'Master canonical supervised and unsupervised learning algorithms from mathematical formulation to scikit-learn implementation.',
          topics: [
            {
              id: 'linear-logistic-regression',
              title: 'Linear & Logistic Regression',
              summary: 'Linear regression OLS / Gradient Descent; Logistic regression Sigmoid activation function $\\sigma(z) = \\frac{1}{1 + e^{-z}}$.',
              whatYouWillLearn: 'Deriving the hypothesis function, log-loss (binary cross-entropy), and interpreting model coefficients / feature weights.',
              concept: 'Linear Regression predicts a continuous target by minimizing Mean Squared Error (MSE). Logistic Regression passes a linear combination through the Sigmoid function to output class probabilities between 0 and 1.',
              whyItMatters: 'The most commonly tested algorithm in baseline ML interviews.',
              keyTakeaways: [
                'Logistic regression decision boundary is linear ($w^T x + b = 0$).',
                'Coefficients indicate feature importance when input features are standardized ($z$-score).',
              ],
            },
            {
              id: 'trees-forests-kmeans',
              title: 'Decision Trees, Random Forests & K-Means Clustering',
              summary: 'Tree splitting via Gini Impurity and Information Gain; Bagging ensemble in Random Forest; K-Means centroid updates.',
              whatYouWillLearn: 'Why Random Forests reduce variance and prevent overfitting compared to individual deep decision trees.',
              concept: 'Decision Trees recursively partition feature space into pure leaf nodes. Random Forest builds an ensemble of $B$ trees using Bootstrap Aggregation (bagging) and random feature subsets. K-Means iteratively reassigns points to the nearest centroid.',
              whyItMatters: 'Top industry workhorse models for tabular and structured business data.',
              keyTakeaways: [
                'Random Forest reduces variance without increasing bias by averaging predictions from uncorrelated trees.',
                'K-Means requires specifying $K$ in advance (use the Elbow Method with WCSS / Inertia to pick optimal $K$).',
              ],
            },
          ],
        },
      ],
    },

    // Level 4: ML Concepts & Best Practices
    {
      id: 'level-4-ml-concepts',
      levelNumber: '04',
      title: 'ML Concepts & Model Validation',
      shortDescription: 'Train/Val/Test splits, Overfitting, Underfitting, Bias-Variance Tradeoff, Feature Engineering, and Regularization (L1/L2).',
      estimatedHours: '8 Hours',
      concepts: [
        {
          id: 'bias-variance-regularization',
          title: 'Bias-Variance Tradeoff & Regularization',
          tagline: 'High Bias (Underfitting), High Variance (Overfitting), K-Fold Cross Validation, L1 Lasso (sparsity), L2 Ridge.',
          description: 'Diagnose model errors and apply regularization techniques to ensure strong generalization on unseen test data.',
          topics: [
            {
              id: 'overfitting-bias-variance-regularization',
              title: 'Bias-Variance Tradeoff, Cross-Validation & L1/L2 Regularization',
              summary: 'High bias = underfitting (oversimplified model); High variance = overfitting (memorizing training noise); Lasso ($L_1$) vs Ridge ($L_2$).',
              whatYouWillLearn: 'Techniques to prevent overfitting: Cross-Validation, adding training data, pruning trees, and adding penalty terms to the loss function.',
              concept: 'Total Error = $\\text{Bias}^2 + \\text{Variance} + \\text{Irreducible Noise}$. L1 Regularization adds $\\lambda \\sum |w|$ (forces non-essential weights to exactly 0 for feature selection); L2 Regularization adds $\\lambda \\sum w^2$ (shrinks weights close to 0).',
              whyItMatters: 'The #1 conceptual question asked in every ML interview without exception.',
              keyTakeaways: [
                'K-Fold Cross-Validation splits data into K folds, training on K-1 and evaluating on 1, averaging performance to prevent split bias.',
                'Data Leakage: never fit transformers/scalers on the test set; always fit ONLY on training data.',
              ],
            },
          ],
        },
      ],
    },

    // Level 5: ML Evaluation Metrics
    {
      id: 'level-5-ml-evaluation',
      levelNumber: '05',
      title: 'Model Evaluation Metrics',
      shortDescription: 'Regression metrics (MAE, MSE, RMSE, R²), Classification metrics (Accuracy, Precision, Recall, F1, Confusion Matrix, ROC-AUC).',
      estimatedHours: '6 Hours',
      concepts: [
        {
          id: 'evaluation-metrics-concept',
          title: 'Evaluation Metrics for Regression & Classification',
          tagline: 'Confusion matrix (TP, FP, TN, FN), Precision vs Recall tradeoff, F1 score, ROC-AUC curve, R-squared.',
          description: 'Select the correct metric for imbalanced datasets and domain-specific cost functions.',
          topics: [
            {
              id: 'precision-recall-f1-roc-auc',
              title: 'Confusion Matrix, Precision, Recall, F1 Score & ROC-AUC',
              summary: 'Precision = $TP / (TP + FP)$ (low false alarms); Recall = $TP / (TP + FN)$ (catch all positive cases); F1 = harmonic mean; ROC-AUC.',
              whatYouWillLearn: 'Why Accuracy is misleading on imbalanced datasets (e.g. 99% accuracy on 1% fraud rate) and when to prioritize Recall over Precision.',
              concept: 'In medical diagnosis or fraud detection, False Negatives are catastrophic, so we optimize for Recall. In spam filtering, False Positives (marking important email as spam) are worse, so we optimize for Precision. F1 Score balances both.',
              whyItMatters: 'Evaluated in technical interview case studies and problem-solving rounds.',
              keyTakeaways: [
                'Accuracy Paradox: a model predicting "No Cancer" for 100% of samples achieves 99% accuracy if prevalence is 1%, but is completely useless.',
                'ROC-AUC measures model ability to rank positive instances above negative instances across all classification thresholds.',
              ],
            },
          ],
        },
      ],
    },

    // Level 6: Deep Learning
    {
      id: 'level-6-deep-learning',
      levelNumber: '06',
      title: 'Deep Learning & Neural Networks',
      shortDescription: 'Artificial Neural Networks (ANN), Forward & Backpropagation, Activations (ReLU), Optimizers (Adam), CNNs, and Transformers.',
      estimatedHours: '10 Hours',
      concepts: [
        {
          id: 'neural-networks-backprop',
          title: 'Neural Networks & Gradient Descent',
          tagline: 'Perceptrons, Multilayer Perceptrons, ReLU/Sigmoid/Softmax, Chain rule backpropagation, Cross-Entropy loss, Adam.',
          description: 'Understand how deep neural networks learn non-linear representations through gradient backpropagation.',
          topics: [
            {
              id: 'forward-backprop-activations-optimizers',
              title: 'Forward Propagation, Backprop, Activation Functions & Optimizers',
              summary: 'Forward pass computing layer outputs; Chain rule calculating $\\frac{\\partial L}{\\partial W}$; ReLU solving vanishing gradients; Adam optimizer.',
              whatYouWillLearn: 'Tracing the backpropagation gradient flow through hidden layers and updating weights using SGD and Adam.',
              concept: 'Neural networks are universal function approximators. Activation functions (ReLU: $\\max(0, x)$) introduce non-linearity. Backpropagation uses the calculus chain rule to compute gradients of the loss with respect to all network weights.',
              whyItMatters: 'Mandatory technical questions for all Deep Learning and AI roles.',
              keyTakeaways: [
                'Vanishing Gradient Problem: Sigmoid derivative saturates at 0 for large inputs; ReLU avoids this by having a constant gradient of 1 for $x > 0$.',
                'Adam optimizer combines momentum (exponentially decaying average of past gradients) and RMSprop (scaling by root mean square gradients).',
              ],
            },
            {
              id: 'cnn-rnn-transformers-basics',
              title: 'CNNs, RNNs & Transformer Attention Basics',
              summary: 'Convolutional layers, pooling filters for spatial data; RNN hidden states; Self-Attention mechanism in Transformers.',
              whatYouWillLearn: 'Why Convolutions provide translation invariance for images and how Transformer Self-Attention ($Q K^T / \\sqrt{d_k}$) replaced sequential RNNs.',
              concept: 'CNNs use 2D spatial kernels that slide across images. Transformers process entire sequences simultaneously in parallel using Self-Attention matrices to model long-range contextual relationships.',
              whyItMatters: 'The architectural foundation behind all modern computer vision and Large Language Models.',
              keyTakeaways: [
                'Transformers eliminate sequential bottleneck of RNNs, allowing massive parallel GPU pre-training.',
                'Self-Attention formula: $\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{Q K^T}{\\sqrt{d_k}}\\right) V$.',
              ],
            },
          ],
        },
      ],
    },

    // Level 7: Generative AI
    {
      id: 'level-7-generative-ai',
      levelNumber: '07',
      title: 'Generative AI & LLM Systems',
      shortDescription: 'LLMs, Tokenization, Vector Embeddings, Prompt Engineering, Vector Databases, RAG architecture, and AI APIs.',
      estimatedHours: '8 Hours',
      concepts: [
        {
          id: 'llm-rag-vector-db',
          title: 'LLMs, Vector Embeddings & RAG Architecture',
          tagline: 'Autoregressive token generation, cosine similarity on embeddings, Pinecone/Chroma vector DBs, Retrieval-Augmented Generation.',
          description: 'Build real-world Generative AI applications combining LLMs with proprietary company knowledge bases.',
          topics: [
            {
              id: 'llm-embeddings-prompt-engineering',
              title: 'LLM Foundations, Embeddings & Prompt Engineering',
              summary: 'Next-token prediction probability distributions; Text embeddings (768/1536-dim vectors); Few-shot prompting, Chain-of-Thought (CoT).',
              whatYouWillLearn: 'How LLMs generate text token-by-token and formulating structured system/user prompt templates.',
              concept: 'LLMs are autoregressive models trained on trillions of words to predict the next token given context. Text embeddings project text into dense semantic vector spaces where semantically similar phrases are close together in vector space.',
              whyItMatters: 'Highest growing demand in Tier-1 product companies and startups.',
              keyTakeaways: [
                'Tokens are sub-word units (~0.75 words per token).',
                'Chain-of-Thought (CoT) prompting ("Think step by step") forces LLMs to generate intermediate reasoning tokens, boosting logic accuracy.',
              ],
            },
            {
              id: 'rag-vector-databases-fine-tuning',
              title: 'RAG (Retrieval-Augmented Generation) & Vector Databases',
              summary: 'RAG pipeline: Document Chunking → Embedding Model → Vector DB (Chroma/Pinecone) → Context Augmentation → LLM Response.',
              whatYouWillLearn: 'Solving LLM hallucinations and outdated training data by dynamically injecting retrieved document chunks into prompt context.',
              concept: 'RAG retrieves relevant private documents from a Vector Database via cosine similarity search on user query embeddings, appending those chunks to the LLM prompt as ground-truth context.',
              whyItMatters: 'The standard production AI architecture deployed by 90%+ of enterprises today.',
              keyTakeaways: [
                'RAG vs Fine-Tuning: RAG provides dynamic real-time knowledge with source citations; Fine-Tuning adapts tone, style, or specific grammar/format.',
                'Chunking strategy (chunk size ~500 tokens with 10% overlap) directly determines retrieval precision.',
              ],
            },
          ],
        },
      ],
    },

    // Level 8: AI Interview Preparation & Project Defense
    {
      id: 'level-8-ai-interview-prep',
      levelNumber: '08',
      title: 'AI Interview Defense & Production ML',
      shortDescription: 'Explaining an ML project, algorithm selection rationale, avoiding data leakage, ML pipelines, and production deployment.',
      estimatedHours: '6 Hours',
      concepts: [
        {
          id: 'ai-interview-defense-concept',
          title: 'ML Project Explanation & Production ML Questions',
          tagline: 'STAR framework for ML projects, why algorithm X over Y, handling data drift, model latency vs accuracy trade-offs.',
          description: 'Confidently defend your machine learning and AI portfolio projects during technical interview grillings.',
          topics: [
            {
              id: 'defend-ml-project-tradeoffs',
              title: 'How to Defend an ML Project & Technical Interview FAQs',
              summary: 'Explaining Problem Statement → Data Collection/Cleaning → Feature Engineering → Baseline Model → Evaluation Metric Choice → Production Deployment.',
              whatYouWillLearn: 'Answering common trap questions: "Why did you choose XGBoost over Random Forest?", "How did you prevent data leakage?", "What were your latency constraints?".',
              concept: 'Interviewers evaluate whether you understand the engineering trade-offs behind your project rather than just importing libraries. Always justify your choices using metrics, data constraints, and business impact.',
              whyItMatters: 'Guarantees passing the technical project defense round for AI/ML roles.',
              keyTakeaways: [
                'Always explain your baseline model first (e.g. Logistic Regression) before justifying complex neural networks.',
                'Data Drift: monitor production inputs over time and trigger model retraining pipelines when feature distributions shift.',
              ],
            },
          ],
        },
      ],
    },
  ],
};
