export interface NLPRoadmapStage {
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

export interface NLPProjectProgression {
  id: string;
  stage: string;
  name: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Portfolio-Level';
  problem: string;
  description: string;
  architecture: string;
  dataset: string;
  technologies: string[];
  models: string[];
  nlpTechniques: string[];
  evaluationMetrics: string;
  deployment: string;
  githubReqs: string;
  skillsLearned: string[];
}

export interface NLPTaskMapItem {
  id: string;
  task: string;
  targetTechnique: string;
  problem: string;
  recommendedApproach: string;
  example: string;
  models: string[];
  evaluationMetric: string;
  projectIdea: string;
  icon: string;
}

export interface NLPSpecialization {
  title: string;
  description: string;
  coreTech: string[];
  focus: string;
  icon: string;
}

export interface NLPToolkitCategory {
  category: string;
  coreItems: string[];
  advancedItems: string[];
}

export interface NLPCommonMistake {
  title: string;
  solution: string;
}

export interface NLPEvaluationCategory {
  category: string;
  metrics: {
    name: string;
    desc: string;
  }[];
}

export interface NLPFourPillars {
  title: string;
  subtitle: string;
  icon: string;
}

export const NLP_ROADMAP_STAGES: NLPRoadmapStage[] = [
  {
    id: 'python-software-engineering',
    stageNumber: '01',
    title: 'Python & Software Engineering',
    shortTitle: 'Python & Engineering',
    tagline: 'Build the software engineering foundation required to develop reliable, high-performance NLP systems.',
    iconName: 'Terminal',
    goal: 'Build the software engineering foundation required to develop reliable NLP systems.',
    whyItMatters:
      'NLP models are only as good as the software around them. High-throughput text tokenization, multi-threaded corpus streaming, robust data serialization, and async REST endpoints require clean, production-grade Python engineering.',
    learningOutcome: 'Build Python programs capable of processing, analyzing, and serving language data.',
    recommendedApproach:
      'Write modular, strictly-typed Python code from day one. Use generators for processing multi-gigabyte text files to prevent out-of-memory errors, and build async FastAPI endpoints for model inference.',
    technologies: ['Python 3.12', 'Jupyter Lab', 'VS Code', 'Git & GitHub', 'Linux / Terminal', 'FastAPI', 'pytest'],
    topics: [
      {
        category: 'Core Python Fundamentals',
        items: [
          'Variables, data types, string manipulation & encoding (ASCII, UTF-8, Unicode)',
          'Lists, tuples, sets, dictionaries, and dictionary/list comprehensions',
          'Functions, *args, **kwargs, lambda functions, and type hints (typing module)',
          'Modules, packages, namespaces, and virtual environments (venv, uv, poetry)',
          'File handling (buffered I/O, context managers, path manipulation with pathlib)',
          'Object-Oriented Programming (OOP): Classes, inheritance, encapsulation, dataclasses',
          'Exception handling, custom exceptions, and structured debugging',
        ],
      },
      {
        category: 'Advanced Python for Text Streaming',
        items: [
          'Iterators and Generators (yield) for out-of-memory text file streaming',
          'Decorators (timing, caching with lru_cache, input validation)',
          'Context managers (__enter__ and __exit__ protocols)',
          'Async programming basics (async / await, asyncio for concurrent API requests)',
          'Multiprocessing and multi-threading for parallel corpus preprocessing',
        ],
      },
      {
        category: 'Data Handling & Regular Expressions',
        items: [
          'File formats: CSV, JSON, JSONL, XML, and raw text corpus files',
          'Regular expressions (re module): Pattern matching, token extraction, substitution, regex groups',
          'Text cleaning pipelines: Whitespace normalization, HTML tag stripping, regex filters',
        ],
      },
      {
        category: 'API Development & Production Engineering',
        items: [
          'HTTP fundamentals, REST principles, JSON serialization',
          'FastAPI: Path operations, request bodies, Pydantic schemas, dependency injection',
          'Software engineering standards: Git branching, pull requests, clean code principles',
          'Automated testing with pytest (unit tests, mock inputs)',
          'Logging with structlog / logging module, configuration with .env & environment variables',
        ],
      },
    ],
    keyConcepts: [
      'Unicode & String Encodings (UTF-8, byte sequences)',
      'Memory-Efficient Generators for Large Text Corpora',
      'Pydantic Data Validation & Type Hints',
      'Asynchronous FastAPI REST Endpoints',
      'Clean Code & Automated Pytest Fixtures',
    ],
    practiceSuggestions: [
      'Write a streaming Python generator that processes a 2GB raw text file line-by-line without consuming more than 50MB of RAM.',
      'Build a regular expression engine that extracts email addresses, URLs, mentions (@user), and hashtags (#topic) from unstructured text.',
      'Develop a typed FastAPI microservice that accepts text payloads, cleans them using modular pipeline functions, and returns structured JSON responses.',
    ],
    projectSuggestions: [
      {
        title: 'High-Throughput Text Preprocessing Microservice',
        description: 'A modular, async FastAPI service that ingests messy web text, cleans noise via regex, validates schema via Pydantic, and benchmarks processing latency with pytest.',
        level: 'Beginner',
      },
    ],
    commonMistakes: [
      'Loading multi-gigabyte corpus files entirely into RAM with file.read() instead of iterating lazily with line generators.',
      'Ignoring character encodings, causing UnicodeDecodeError when encountering non-ASCII or multilingual characters.',
      'Writing monolithic single-file script scripts instead of modular, testable Python packages.',
    ],
    nextStepPreview: 'Understand the mathematical foundations of vector spaces, probability, and gradients in Stage 02: Mathematics & Statistics for NLP.',
  },
  {
    id: 'mathematics-statistics',
    stageNumber: '02',
    title: 'Mathematics & Statistics for NLP',
    shortTitle: 'Mathematics & Statistics',
    tagline: 'Master the linear algebra, probability, and calculus intuition needed to understand embeddings and language models.',
    iconName: 'Binary',
    goal: 'Understand the mathematics needed to understand machine learning and language models.',
    whyItMatters:
      'Computers do not process words; they process vectors and probability distributions. Linear algebra represents text in geometric spaces, probability predicts the next token, and calculus optimizes billions of neural weights.',
    learningOutcome: 'Understand the mathematical intuition behind NLP models and embeddings.',
    recommendedApproach:
      'Focus on geometric and probabilistic intuition rather than memorizing dry mathematical proofs. Visualize how dot products measure semantic alignment and how softmax transforms logits into next-word probabilities.',
    technologies: ['NumPy', 'SciPy', 'SymPy', 'Matplotlib', 'Jupyter Notebooks'],
    visualIntuition: {
      label: 'NLP Mathematical Intuitions',
      steps: [
        'VECTOR → EMBEDDING (Words as spatial coordinates)',
        'DOT PRODUCT → SIMILARITY (Geometric directional alignment)',
        'GRADIENT → MODEL TRAINING (Backpropagation error guidance)',
        'PROBABILITY → LANGUAGE PREDICTION (Next-token likelihood distributions)',
      ],
    },
    topics: [
      {
        category: 'Linear Algebra for Word Vectors',
        items: [
          'Scalars, vectors, and vector spaces in d-dimensional space',
          'Matrices and matrix multiplication (dimensions, batch processing)',
          'Dot product (inner product) and its geometric interpretation as cosine angle',
          'Vector norms (L1 norm, L2 / Euclidean norm, unit vectors)',
          'Orthogonality, linear independence, and basis vectors',
          'Eigenvalues, eigenvectors, and Principal Component Analysis (PCA) intuition',
        ],
      },
      {
        category: 'Probability for Language Modeling',
        items: [
          'Probability axioms, sample spaces, and events in language sequences',
          'Conditional probability P(w2 | w1) and the Chain Rule of probability',
          'Bayes Theorem and its application to text classification (Naive Bayes)',
          'Discrete random variables, probability mass functions, and distributions',
          'Expected value, variance, and standard deviation of token statistics',
          'Joint distributions, marginal probability, and Markov property in text',
        ],
      },
      {
        category: 'Calculus & Optimization',
        items: [
          'Derivatives, slopes, and instantaneous rates of change',
          'Partial derivatives and gradients (∇f) in multi-dimensional loss landscapes',
          'Chain Rule: The mathematical engine powering backpropagation in neural networks',
          'Gradient Descent (SGD, Momentum, Adam optimizer mathematics)',
          'Convex vs non-convex loss functions, local minima, and saddle points',
        ],
      },
      {
        category: 'Statistics & Information Theory',
        items: [
          'Summary statistics: Mean, median, mode, variance, and standard deviation',
          'Correlation, covariance, and word co-occurrence statistics',
          'Entropy, Cross-Entropy loss, and KL Divergence (measuring distribution divergence)',
          'Softmax function mathematics: Converting raw logits into valid probability distributions',
        ],
      },
    ],
    keyConcepts: [
      'Dot Product as Semantic Similarity Metric',
      'Softmax Function & Probability Distributions',
      'Cross-Entropy Loss & Maximum Likelihood',
      'Gradient Descent & Backpropagation Chain Rule',
      'Vector Space Geometry & Cosine Distance',
    ],
    practiceSuggestions: [
      'Implement cosine similarity, Euclidean distance, and dot product from scratch using only raw Python and compare with NumPy vectorization.',
      'Compute the softmax distribution and cross-entropy loss by hand on a 5-word vocabulary toy example.',
      'Implement a simple 2-variable gradient descent algorithm in Python to minimize a quadratic loss function.',
    ],
    projectSuggestions: [
      {
        title: 'NumPy Vector Space & Similarity Engine',
        description: 'A pure NumPy mathematical engine implementing vector normalization, cosine distance matrices, matrix dot product searches, and softmax distribution generators.',
        level: 'Beginner',
      },
    ],
    commonMistakes: [
      'Getting bogged down in manual theorem proofs instead of understanding how matrices represent word embedding lookup tables.',
      'Confusing dot product with cosine similarity (cosine similarity normalizes by vector lengths, dot product considers magnitude).',
      'Ignoring cross-entropy loss mathematics, making it harder to debug exploding or vanishing loss curves later.',
    ],
    nextStepPreview: 'Apply these mathematical concepts to train predictive models on language features in Stage 03: Machine Learning Fundamentals.',
  },
  {
    id: 'machine-learning-fundamentals',
    stageNumber: '03',
    title: 'Machine Learning Fundamentals',
    shortTitle: 'Machine Learning Basics',
    tagline: 'Master the supervised and unsupervised learning foundations used in traditional and modern NLP.',
    iconName: 'BarChart3',
    goal: 'Understand the machine learning foundations used in traditional and modern NLP.',
    whyItMatters:
      'Before jumping into deep learning, every NLP engineer must master classical machine learning. Classifying spam, routing customer support tickets, and clustering documents are frequently solved faster, cheaper, and more reliably with classical ML.',
    learningOutcome: 'Understand how machine learning can be applied to language data.',
    recommendedApproach:
      'Master the NLP Connection: Raw Text → Feature Extraction (TF-IDF / Counts) → Machine Learning Model → Prediction. Always establish a simple Logistic Regression or Naive Bayes baseline before considering complex models.',
    technologies: ['Scikit-learn', 'NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Joblib'],
    topics: [
      {
        category: 'Supervised Learning for Text',
        items: [
          'Linear Regression & Logistic Regression (the standard baseline for text classification)',
          'Naive Bayes (MultinomialNB, BernoulliNB for text and spam filtering)',
          'Support Vector Machines (LinearSVC, SGDClassifier with hinge loss for high-dimensional text)',
          'Decision Trees, Random Forests, and Gradient Boosted Trees (XGBoost / LightGBM)',
          'Multi-class vs multi-label text classification workflows',
        ],
      },
      {
        category: 'Unsupervised Learning & Clustering',
        items: [
          'K-Means clustering on text feature vectors',
          'Principal Component Analysis (PCA) and t-SNE for visualizing high-dimensional text clusters',
          'Hierarchical clustering and document grouping',
        ],
      },
      {
        category: 'Core Machine Learning Concepts',
        items: [
          'Features, labels, training sets, validation sets, and test sets',
          'Train/Test split, Stratified K-Fold Cross-Validation for imbalanced datasets',
          'Overfitting vs Underfitting, Bias-Variance tradeoff in text classifiers',
          'Regularization techniques: L1 (Lasso / feature selection) and L2 (Ridge)',
          'Hyperparameter tuning using GridSearchCV and RandomizedSearchCV',
        ],
      },
      {
        category: 'Model Evaluation for NLP',
        items: [
          'Confusion matrix (True Positives, False Positives, True Negatives, False Negatives)',
          'Accuracy vs Precision vs Recall vs F1-score (Micro, Macro, and Weighted F1)',
          'ROC Curve, Area Under the Curve (ROC-AUC), Precision-Recall Curve',
          'Handling extreme class imbalance (SMOTE, class weighting, focal loss)',
        ],
      },
    ],
    keyConcepts: [
      'Text → Numerical Features → Estimator Pipeline',
      'Macro F1 vs Micro F1 for Imbalanced Classes',
      'Logistic Regression & Linear SVM for Sparse Text',
      'Stratified K-Fold Cross-Validation',
      'Scikit-learn Pipeline & ColumnTransformer',
    ],
    practiceSuggestions: [
      'Build a Scikit-learn Pipeline chaining a text vectorizer, a standard scaler, and a LogisticRegression classifier.',
      'Perform Stratified 5-Fold Cross-Validation on an imbalanced customer review dataset and compute macro-averaged F1 score.',
      'Train both a Naive Bayes and a LinearSVC model on a sentiment classification dataset, plot their confusion matrices, and analyze false positives.',
    ],
    projectSuggestions: [
      {
        title: 'Production Spam & Phishing Email Classifier',
        description: 'An end-to-end spam classifier built with Scikit-learn, featuring TF-IDF feature extraction, cross-validation, precision-recall optimization, and a FastAPI prediction endpoint.',
        level: 'Beginner',
      },
    ],
    commonMistakes: [
      'Evaluating imbalanced text datasets using raw Accuracy (e.g., 99% accuracy on a dataset where 99% of samples are spam is a useless baseline).',
      'Fitting the vectorizer on the entire dataset before train/test split, causing severe data leakage.',
      'Skipping classical ML baselines and jumping straight to multi-billion parameter LLMs for simple classification tasks.',
    ],
    nextStepPreview: 'Explore the nuances of human linguistics, tokenization, and text normalization in Stage 04: NLP Fundamentals.',
  },
  {
    id: 'nlp-fundamentals',
    stageNumber: '04',
    title: 'NLP Fundamentals & Linguistics',
    shortTitle: 'NLP Fundamentals',
    tagline: 'Understand how computers represent, clean, normalize, and extract linguistic features from raw human language.',
    iconName: 'FileText',
    goal: 'Understand how computers represent and process human language.',
    whyItMatters:
      'Human language is inherently messy, ambiguous, and rich in syntactic subtleties. Before a computer can understand semantics, raw strings must undergo normalization, tokenization, stemming/lemmatization, and syntactic parsing.',
    learningOutcome: 'Understand how raw language becomes structured data that machines can process.',
    recommendedApproach:
      'Understand the classical NLP processing funnel: RAW TEXT → CLEANING → TOKENIZATION → NORMALIZATION → LINGUISTIC FEATURES → NLP MODEL. Experiment with both rule-based NLTK and industrial spaCy pipelines.',
    technologies: ['spaCy', 'NLTK', 'Regex (re)', 'TextBlob', 'Stanza'],
    visualIntuition: {
      label: 'Classical NLP Text Pipeline',
      steps: [
        'RAW TEXT (Unstructured string with noise & punctuation)',
        'CLEANING (Lowercasing, noise filtering, whitespace stripping)',
        'TOKENIZATION (Character, Word, Subword, Sentence splitting)',
        'NORMALIZATION (Stemming vs Lemmatization, stop words)',
        'LINGUISTIC FEATURES (POS tags, Named Entities, Dependency parses)',
        'NLP MODEL (Structured input ready for classification or extraction)',
      ],
    },
    topics: [
      {
        category: 'Introduction to NLP & Terminology',
        items: [
          'What is NLP? The distinction between NLP, Artificial Intelligence, Machine Learning, and GenAI',
          'Linguistic concepts: Syntax (structure), Semantics (meaning), Pragmatics (intent/context)',
          'Language ambiguity: Lexical ambiguity, syntactic ambiguity, polysemy, and sarcasm',
          'Corpus, vocabulary, tokens, types, and document collections',
        ],
      },
      {
        category: 'Text Preprocessing & Normalization',
        items: [
          'Text normalization: Lowercasing, Unicode NFKD normalization, accent stripping',
          'Punctuation, URL, HTML, emoji, and special character handling',
          'Whitespace normalization and casing strategies (cased vs uncased trade-offs)',
          'Stop words removal: When to use stop words (topic modeling) and when NOT to (sentiment, translation)',
        ],
      },
      {
        category: 'Tokenization Strategies',
        items: [
          'Character tokenization: Advantages (no out-of-vocabulary) vs disadvantages (long sequences)',
          'Word tokenization: Whitespace vs rule-based (Penn Treebank tokenizer)',
          'Subword tokenization preview: Byte-Pair Encoding (BPE), WordPiece, SentencePiece',
          'Sentence tokenization / boundary disambiguation (handling abbreviations like "Dr." or "e.g.")',
        ],
      },
      {
        category: 'Classical Linguistic Feature Extraction',
        items: [
          'Stemming: Porter Stemmer, Snowball Stemmer (heuristic suffix stripping)',
          'Lemmatization: WordNet Lemmatizer, spaCy lemmatizer (vocabulary-aware morphological analysis)',
          'Part-of-Speech (POS) Tagging: Universal POS tags, Penn Treebank tagset',
          'Named Entity Recognition (NER): Persons, Organizations, Geopolitical entities, Dates',
          'Noun Chunking, syntactic dependency parsing, and relation trees',
        ],
      },
    ],
    keyConcepts: [
      'Stemming vs Lemmatization Differences',
      'Sentence Boundary Disambiguation (SBD)',
      'spaCy Doc, Span, Token, and Lexeme Architecture',
      'Named Entity Recognition (NER) & IOB Tagging',
      'Part-of-Speech (POS) & Dependency Trees',
    ],
    practiceSuggestions: [
      'Compare PorterStemmer vs spaCy Lemmatizer on irregular verbs ("running", "ran", "better", "feet") to inspect morphological outputs.',
      'Build a spaCy custom pipeline component that extracts product codes and order numbers using Matcher rules.',
      'Extract all Subject-Verb-Object (SVO) triplets from a news article using dependency parsing in spaCy.',
    ],
    projectSuggestions: [
      {
        title: 'Rule-Based Entity & Linguistic Analyzer',
        description: 'An automated text intelligence engine using spaCy and NLTK that ingests raw documents, extracts POS tags, identifies named entities, and visualizes dependency parse trees.',
        level: 'Beginner',
      },
    ],
    commonMistakes: [
      'Blindly removing stop words for tasks like Sentiment Analysis or Machine Translation where words like "not" or "no" invert sentence polarity.',
      'Confusing stemming (fast rule-based chopping) with lemmatization (linguistically sound dictionary base forms).',
      'Relying solely on string.split(" ") for tokenization, failing on contractions ("don\'t") and punctuation ("end.")',
    ],
    nextStepPreview: 'Learn how to transform these linguistic tokens into dense numerical vectors in Stage 05: Text Representation & Embeddings.',
  },
  {
    id: 'text-representation-embeddings',
    stageNumber: '05',
    title: 'Text Representation & Embeddings',
    shortTitle: 'Embeddings & Vectors',
    tagline: 'Learn how language is converted into dense numerical representations that capture semantic meaning.',
    iconName: 'Layers',
    goal: 'Learn how language is converted into numerical representations that machine learning models can understand.',
    whyItMatters:
      'Classical sparse representations (One-Hot, BoW, TF-IDF) treat words as isolated symbols with no semantic relationship. Dense embeddings place words into continuous geometric vector spaces where semantic similarity equals geometric proximity (e.g. king - man + woman ≈ queen).',
    learningOutcome: 'Understand why embeddings are fundamental to modern NLP systems.',
    recommendedApproach:
      'Contrast classical sparse count-based representations with distributed dense embeddings. Understand the limitations: TF-IDF is sparse and misses synonyms, while Word2Vec is dense but static (cannot disambiguate "apple" the fruit vs "apple" the tech company).',
    technologies: ['Gensim', 'Scikit-learn', 'Sentence Transformers', 'NumPy', 'FAISS Basics'],
    visualIntuition: {
      label: 'Vector Space Representation Flow',
      steps: [
        'WORD ("king", "queen", "apple")',
        'VECTOR ([0.24, -0.89, 0.45, ... 300 dimensions])',
        'VECTOR SPACE (Continuous high-dimensional coordinate system)',
        'SEMANTIC RELATIONSHIPS (Cosine distance = Conceptual similarity)',
      ],
    },
    topics: [
      {
        category: 'Classical Sparse Representations',
        items: [
          'One-Hot Encoding and the curse of dimensionality',
          'Bag of Words (BoW) model: CountVectorizer, term frequency matrices',
          'N-grams: Unigrams, bigrams, trigrams for capturing local phrase order',
          'TF-IDF (Term Frequency - Inverse Document Frequency) mathematical formulation',
          'Limitations of sparse methods: High dimensionality, sparsity, lack of semantic relationships',
        ],
      },
      {
        category: 'Static Word Embeddings',
        items: [
          'Distributional Hypothesis: "A word is characterized by the company it keeps"',
          'Word2Vec architectures: Continuous Bag of Words (CBOW) vs Continuous Skip-gram',
          'Negative Sampling and Hierarchical Softmax training techniques',
          'GloVe (Global Vectors for Word Representation): Matrix factorization + global co-occurrence',
          'FastText: Subword character n-grams (handling out-of-vocabulary words & typos)',
        ],
      },
      {
        category: 'Embedding Geometry & Similarity Metrics',
        items: [
          'Dense vectors vs sparse vectors: Memory footprint and representational capacity',
          'Cosine similarity vs Dot product vs Euclidean (L2) distance',
          'Vector arithmetic & semantic analogies ("king" - "man" + "woman" = "queen")',
          'Visualizing word embedding clusters using t-SNE and UMAP',
        ],
      },
      {
        category: 'Sentence & Document Embeddings',
        items: [
          'Averaging word embeddings (mean pooling) and its limitations',
          'Doc2Vec (Distributed Memory and Distributed Bag of Words)',
          'Sentence Transformers (SBERT): Bi-encoder architectures for dense sentence embeddings',
          'Semantic search intuition: Query vector vs Document vector indexing',
        ],
      },
    ],
    keyConcepts: [
      'TF-IDF Formula: TF(t,d) × log(N / DF(t))',
      'Word2Vec Skip-Gram with Negative Sampling',
      'FastText Subword Embeddings for OOV Words',
      'Cosine Similarity in Normalized Vector Space',
      'Sentence Transformers (SBERT) Dense Vectors',
    ],
    practiceSuggestions: [
      'Train a custom Word2Vec model on a domain-specific dataset (e.g. medical or financial text) using Gensim and find most similar terms.',
      'Implement TF-IDF from scratch in pure Python/NumPy and verify outputs against Scikit-learn\'s TfidfVectorizer.',
      'Use sentence-transformers to generate 384-dimensional embeddings for 100 sentences and compute the top-3 most similar pairs using cosine similarity.',
    ],
    projectSuggestions: [
      {
        title: 'Domain Semantic Similarity & Search Engine',
        description: 'An interactive semantic search system using Sentence Transformers and Scikit-learn/FAISS that matches natural language search queries to relevant technical document passages.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Assuming Word2Vec can handle polysemy (Word2Vec assigns a single static vector to "bank", conflating river bank and financial bank).',
      'Using Euclidean distance on unnormalized embeddings instead of Cosine Similarity.',
      'Using basic mean-pooling of TF-IDF vectors for complex sentence semantic matching instead of pre-trained bi-encoders.',
    ],
    nextStepPreview: 'Learn how neural sequence models capture temporal order and context in Stage 06: Deep Learning for NLP.',
  },
  {
    id: 'deep-learning-nlp',
    stageNumber: '06',
    title: 'Deep Learning for NLP',
    shortTitle: 'Deep Learning for NLP',
    tagline: 'Learn how neural networks, sequence models, and recurrent architectures model language patterns over time.',
    iconName: 'Brain',
    goal: 'Learn how neural networks can model sequences and language patterns.',
    whyItMatters:
      'Language is an ordered sequence of tokens where word order dictates meaning ("dog bites man" vs "man bites dog"). Deep sequence models maintain hidden state memory across time steps, allowing models to capture context and sequential dependencies.',
    learningOutcome: 'Understand how neural networks model sequential language information.',
    recommendedApproach:
      'Implement basic Feedforward and RNN models in PyTorch. Understand the mechanics of hidden states, the vanishing/exploding gradient problem, and why gating mechanisms in LSTMs and GRUs were revolutionary.',
    technologies: ['PyTorch', 'TensorFlow / Keras', 'TorchText', 'CUDA / GPU Acceleration'],
    topics: [
      {
        category: 'Neural Network Fundamentals for NLP',
        items: [
          'Perceptrons, multi-layer perceptrons (MLP), weights, biases, activation functions (ReLU, GELU, Sigmoid)',
          'Loss functions for NLP: Cross-Entropy Loss, Binary Cross-Entropy, CTC Loss',
          'Backpropagation algorithm and computational graphs in PyTorch (autograd)',
          'Optimizers: SGD, Momentum, RMSprop, Adam, AdamW with learning rate schedulers',
          'PyTorch Dataset, DataLoader, collate_fn, and sequence padding (pad_sequence)',
        ],
      },
      {
        category: 'Recurrent Neural Networks (RNN)',
        items: [
          'Standard Recurrent Neural Network (RNN) cell and hidden state formulation',
          'Unrolling RNNs across time steps for sequence modeling',
          'Vanishing and exploding gradients in deep recurrent architectures',
          'Gradient clipping techniques and weight initialization',
        ],
      },
      {
        category: 'Gated Architectures: LSTM & GRU',
        items: [
          'Long Short-Term Memory (LSTM): Forget gate, Input gate, Output gate, Cell state (c_t), Hidden state (h_t)',
          'Gated Recurrent Unit (GRU): Reset gate, Update gate, merged hidden state',
          'Bidirectional RNNs / LSTMs: Processing text from left-to-right AND right-to-left',
          'Multi-layer (stacked) LSTMs and dropout regularizations across recurrent layers',
        ],
      },
      {
        category: 'Deep Sequence NLP Applications',
        items: [
          'Text Classification with Bi-LSTM + linear classification head',
          'Sequence Labeling: POS tagging and Named Entity Recognition using Bi-LSTM + CRF',
          'Encoder-Decoder (Seq2Seq) architectures for early machine translation and summarization',
          'Character-level language models for text generation and next-character prediction',
        ],
      },
    ],
    keyConcepts: [
      'Hidden State (h_t) & Cell State (c_t) Transitions',
      'Vanishing Gradient Problem in Long Sequences',
      'Bidirectional LSTM (Bi-LSTM) Context Capture',
      'Embedding Layers (nn.Embedding) & Lookup Tables',
      'PyTorch Dynamic Graph & Padding / Packing Sequences',
    ],
    practiceSuggestions: [
      'Build a character-level RNN in PyTorch that trains on Shakespeare plays to generate text character-by-character.',
      'Train a Bidirectional LSTM in PyTorch on the IMDB sentiment dataset with packed padded sequences (nn.utils.rnn.pack_padded_sequence).',
      'Implement an LSTM cell from scratch using only matrix multiplications to understand gating mathematics.',
    ],
    projectSuggestions: [
      {
        title: 'Deep Sentiment & Emotion Classifier in PyTorch',
        description: 'A custom PyTorch deep learning pipeline featuring pre-trained GloVe embeddings, a multi-layer Bidirectional LSTM with dropout, early stopping, and GPU-accelerated batch training.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Failing to mask or pad sequences properly, leading to the model learning padding tokens as meaningful features.',
      'Passing gradients across batches without calling optimizer.zero_grad() in PyTorch.',
      'Expecting standard RNNs to remember dependencies longer than 10-20 tokens due to vanishing gradients.',
    ],
    nextStepPreview: 'Discover how the Attention mechanism solved sequential bottlenecks to create the modern Transformer in Stage 07: Transformers & Attention.',
  },
  {
    id: 'transformers-attention',
    stageNumber: '07',
    title: 'Transformers & Attention',
    shortTitle: 'Transformers & Attention',
    tagline: 'Understand the architecture behind modern NLP systems and how self-attention revolutionized language processing.',
    iconName: 'Network',
    goal: 'Understand the architecture behind modern NLP systems.',
    whyItMatters:
      'Recurrent models process tokens sequentially, creating a computational bottleneck that prevents massive GPU parallelization. Transformers replaced recurrence with multi-head self-attention, allowing all tokens to attend to each other simultaneously regardless of sequence length.',
    learningOutcome: 'Understand Transformers at an engineering level, not just as a buzzword.',
    recommendedApproach:
      'Study "Attention Is All You Need" systematically. Master the Query, Key, Value mathematical formulation, scaled dot-product attention, positional encodings, and the distinction between Encoders, Decoders, and Encoder-Decoder architectures.',
    technologies: ['PyTorch', 'Hugging Face Transformers', 'Einops', 'FlashAttention Basics'],
    visualIntuition: {
      label: 'Transformer Contextual Processing Flow',
      steps: [
        'TOKENS (Subword token IDs)',
        'EMBEDDINGS (Token embeddings + Positional encodings)',
        'SELF-ATTENTION (Q, K, V scaled dot product matrix)',
        'TRANSFORMER BLOCKS (Multi-head attention + FFN + LayerNorm + Residuals)',
        'CONTEXTUAL REPRESENTATION (Dynamic vectors aware of full sentence context)',
        'TASK / GENERATION (Classification head, NER head, or next-token decoder)',
      ],
    },
    topics: [
      {
        category: 'The Attention Mechanism',
        items: [
          'Why Attention was needed: Solving the information bottleneck of fixed Seq2Seq vectors',
          'Bahdanau (additive) and Luong (multiplicative) attention mechanisms',
          'Self-Attention intuition: How a word resolves its meaning from surrounding context',
          'Query (Q), Key (K), and Value (V) projections: The database retrieval analogy',
          'Scaled Dot-Product Attention formula: Attention(Q, K, V) = softmax(QK^T / √d_k)V',
        ],
      },
      {
        category: 'The Transformer Architecture',
        items: [
          'Multi-Head Attention: Attending to information from different representation subspaces',
          'Positional Encodings: Sinusoidal encodings vs Learnable positional embeddings vs RoPE',
          'Feed-Forward Networks (FFN): Dense two-layer projections with GELU activation',
          'Residual Connections (Add) and Layer Normalization (Pre-LN vs Post-LN)',
          'Encoder Block vs Decoder Block (Causal / Masked Self-Attention, Cross-Attention)',
        ],
      },
      {
        category: 'Major Model Families & Architectures',
        items: [
          'Encoder-Only (BERT, RoBERTa, DeBERTa): Bidirectional context, masked language modeling (MLM), optimal for classification and NER',
          'Decoder-Only (GPT family, Llama, Mistral): Causal autoregressive language modeling, optimal for text generation',
          'Encoder-Decoder (T5, BART): Sequence-to-sequence text-to-text formulation, optimal for translation and summarization',
        ],
      },
      {
        category: 'Contextual Representations & Masking',
        items: [
          'Dynamic contextual embeddings: How "apple" gets different vectors in "apple fruit" vs "apple iPhone"',
          'Attention masks: Preventing attention to padding tokens',
          'Causal masking: Upper-triangular masks preventing decoders from seeing future tokens',
        ],
      },
    ],
    keyConcepts: [
      'Scaled Dot-Product Attention: softmax(QK^T / √d_k)V',
      'Multi-Head Attention (Parallel Subspaces)',
      'Positional Encodings (Injecting Sequence Order)',
      'Encoder (BERT) vs Decoder (GPT) vs Encoder-Decoder (T5)',
      'LayerNorm & Residual Skip Connections',
    ],
    practiceSuggestions: [
      'Write a clean, commented PyTorch module implementing single-head and multi-head scaled dot-product attention from scratch.',
      'Extract intermediate hidden state representations from a pre-trained BERT model and visualize token attention maps for an ambiguous sentence.',
      'Implement sinusoidal positional encodings in NumPy and plot the wavelength patterns across dimensions.',
    ],
    projectSuggestions: [
      {
        title: 'Transformer Encoder from Scratch in PyTorch',
        description: 'A modular from-scratch implementation of a complete Transformer Encoder block with Multi-Head Attention, LayerNorm, Residuals, and a text classification head.',
        level: 'Advanced',
      },
    ],
    commonMistakes: [
      'Thinking BERT generates text (BERT is an encoder trained with masked language modeling; it cannot autoregressively generate new sequences).',
      'Forgetting the scaling factor (√d_k) in dot-product attention, which causes softmax gradients to vanish in high dimensions.',
      'Confusing Layer Normalization (normalizing across features per token) with Batch Normalization (normalizing across batch samples).',
    ],
    nextStepPreview: 'Harness the global ecosystem of pre-trained models in Stage 08: Hugging Face & Modern NLP Models.',
  },
  {
    id: 'huggingface-modern-nlp',
    stageNumber: '08',
    title: 'Hugging Face & Modern NLP Models',
    shortTitle: 'Hugging Face Ecosystem',
    tagline: 'Learn how to use, fine-tune, and evaluate pre-trained Transformer models instead of training everything from scratch.',
    iconName: 'Layers3',
    goal: 'Learn how to use pretrained NLP models instead of training everything from scratch.',
    whyItMatters:
      'Modern NLP is built on transfer learning. Rather than spending millions training models from scratch, NLP engineers fine-tune pre-trained foundation checkpoints from Hugging Face for specific enterprise classification, extraction, and generation tasks.',
    learningOutcome: 'Use pretrained language models efficiently for real NLP tasks.',
    recommendedApproach:
      'Master the standard Hugging Face pipeline: INPUT TEXT → TOKENIZER → MODEL → PREDICTION → POST-PROCESSING. Master the Trainer API, datasets loading, token classification heads, and parameter-efficient fine-tuning (PEFT/LoRA).',
    technologies: ['Hugging Face Transformers', 'Datasets', 'Tokenizers', 'Accelerate', 'PEFT', 'Evaluate', 'Optimum'],
    topics: [
      {
        category: 'Hugging Face Core Ecosystem',
        items: [
          'Hugging Face Hub: Navigating model checkpoints, model cards, datasets, and Spaces',
          'Tokenizers library: Fast Rust-based tokenizers (WordPiece, BPE, SentencePiece)',
          'Datasets library: Memory-mapped arrow datasets, streaming huge corpora with streaming=True',
          'High-level pipeline() API for instant zero-shot inference across 20+ NLP tasks',
        ],
      },
      {
        category: 'Pretrained Model Architectures',
        items: [
          'BERT & RoBERTa (Robustly Optimized BERT Approach)',
          'DistilBERT & ALBERT (Distilled and lightweight Transformer variants)',
          'DeBERTa (Disentangled Attention for state-of-the-art NLU tasks)',
          'T5 (Text-to-Text Transfer Transformer) and BART for generative tasks',
        ],
      },
      {
        category: 'Fine-Tuning Workflows with Trainer',
        items: [
          'AutoModelForSequenceClassification, AutoModelForTokenClassification, AutoModelForSeq2SeqLM',
          'DataCollatorWithPadding and DataCollatorForLanguageModeling',
          'TrainingArguments configuration: Learning rate, warm-up steps, weight decay, gradient accumulation',
          'Writing custom compute_metrics functions with evaluate library (F1, Accuracy, Precision)',
          'PyTorch native fine-tuning loop vs Hugging Face Trainer API',
        ],
      },
      {
        category: 'Model Optimization & Inference',
        items: [
          'Parameter-Efficient Fine-Tuning (PEFT): LoRA (Low-Rank Adaptation) and QLoRA basics',
          'Quantization: FP16, BF16, INT8, and INT4 (bitsandbytes)',
          'ONNX Runtime and Hugging Face Optimum for accelerated CPU/GPU inference',
          'Saving, loading, and publishing custom fine-tuned models to the Hub',
        ],
      },
    ],
    keyConcepts: [
      'Input IDs, Attention Masks, and Token Type IDs',
      'AutoTokenizer & AutoModel Abstraction',
      'Hugging Face Trainer API & Evaluation Hooks',
      'Low-Rank Adaptation (LoRA) for Efficient Fine-Tuning',
      'ONNX Export & Quantization for Low-Latency Serving',
    ],
    practiceSuggestions: [
      'Fine-tune a distilbert-base-uncased checkpoint on a custom multi-class news dataset using the Hugging Face Trainer API.',
      'Build a custom token classification pipeline for financial Named Entity Recognition (tickers, currencies, percentages).',
      'Export a fine-tuned Hugging Face transformer model to ONNX format and benchmark latency reduction versus standard PyTorch inference.',
    ],
    projectSuggestions: [
      {
        title: 'Multi-Task NLP System with Fine-Tuned Transformers',
        description: 'A production-grade NLP service utilizing fine-tuned RoBERTa for sentiment analysis, DeBERTa for legal entity extraction, and T5 for abstractive summarization, served via FastAPI.',
        level: 'Advanced',
      },
    ],
    commonMistakes: [
      'Using a different tokenizer than the one the model was pre-trained with (e.g. tokenizing with BERT for a RoBERTa model).',
      'Forgetting to pass the attention_mask to the model, leading to corrupted hidden states on padded tokens.',
      'Fine-tuning all model weights when a LoRA adapter would achieve identical accuracy in 20% of the training time and memory.',
    ],
    nextStepPreview: 'Discover how foundational Transformers scaled into General-Purpose Language Models in Stage 09: Large Language Models & Generative NLP.',
  },
  {
    id: 'large-language-models',
    stageNumber: '09',
    title: 'Large Language Models & Generative NLP',
    shortTitle: 'LLMs & Generative NLP',
    tagline: 'Understand how modern LLMs extend NLP into general-purpose language generation, reasoning, and instruction following.',
    iconName: 'MessageSquare',
    goal: 'Understand how modern LLMs extend NLP into general-purpose language generation and reasoning applications.',
    whyItMatters:
      'LLMs represent a massive scaling of NLP autoregressive language modeling. Modern NLP engineers must understand next-token probability distributions, prompt engineering, context window management, and open-source model deployment.',
    learningOutcome: 'Understand where modern LLMs fit into the broader NLP ecosystem.',
    recommendedApproach:
      'An NLP Engineer understands LLMs without assuming every problem requires an LLM. Understand how next-token prediction works: Previous tokens → Context → Probability distribution → Sampling → Next-token prediction.',
    technologies: ['Open-Source LLMs (Llama, Mistral, Gemma)', 'vLLM', 'Ollama', 'LangChain Basics', 'OpenAI / Anthropic APIs', 'tiktoken'],
    topics: [
      {
        category: 'LLM Foundations & Mechanics',
        items: [
          'What is an LLM? Parameters, pre-training corpora (Common Crawl), and compute scaling laws',
          'Tokenization in LLMs: Byte-level BPE, token budgets, and context window limits',
          'Autoregressive language modeling: Next-token prediction and autoregressive decoding loops',
          'Pre-training (unsupervised next-token) vs Instruction Tuning (SFT) vs RLHF / DPO',
        ],
      },
      {
        category: 'Generation Parameters & Sampling',
        items: [
          'Logits, Softmax, and Temperature scaling (controlling randomness)',
          'Top-k sampling and Top-p (nucleus) sampling',
          'Repetition penalty, frequency penalty, and presence penalty',
          'Stop sequences, max tokens, and streaming generation responses',
        ],
      },
      {
        category: 'Open-Source vs Commercial LLM Ecosystem',
        items: [
          'Open-weights model families: Llama-family, Mistral-family, Gemma-family',
          'Quantized formats (GGUF, AWQ, GPTQ) for running LLMs on consumer hardware and local GPUs',
          'Inference engines: vLLM (PagedAttention, continuous batching), Ollama, TGI',
          'Commercial API integration, structured outputs (JSON mode), and tool/function calling',
        ],
      },
      {
        category: 'LLM-Powered NLP Workflows',
        items: [
          'Zero-shot, Few-shot (in-context learning), and Chain-of-Thought prompting',
          'Information extraction with structured schema output (Pydantic / Instructor)',
          'Text summarization, rewriting, translation, and synthetic data generation for classical NLP models',
          'Model routing: Deciding when to use a fast 50M parameter classifier vs a 7B LLM',
        ],
      },
    ],
    keyConcepts: [
      'Next-Token Probability & Autoregressive Decoding',
      'Temperature & Nucleus (Top-p) Sampling',
      'Instruction Fine-Tuning (SFT) & Alignment (DPO)',
      'High-Throughput Inference with vLLM PagedAttention',
      'Model Routing: Classical NLP vs Pre-trained vs LLM',
    ],
    practiceSuggestions: [
      'Run an open-source 7B or 8B model locally using Ollama or vLLM and benchmark generation throughput (tokens/second).',
      'Build a structured entity extraction system using an LLM with Pydantic schema enforcement to extract JSON records from messy emails.',
      'Implement an automated prompt evaluation harness comparing zero-shot vs few-shot prompt performance across 50 test examples.',
    ],
    projectSuggestions: [
      {
        title: 'Intelligent Enterprise Document Extraction Engine',
        description: 'An end-to-end extraction engine combining spaCy regex pre-filters with an open-source LLM via vLLM to extract structured contract data into validated Pydantic models.',
        level: 'Advanced',
      },
    ],
    commonMistakes: [
      'Using a massive generative LLM for simple binary classification when a 50M parameter RoBERTa model is 50x faster and 100x cheaper.',
      'Assuming LLM outputs are deterministic without setting temperature=0 and fixed seeds.',
      'Hardcoding vendor-specific API formats instead of building modular provider-agnostic interfaces.',
    ],
    nextStepPreview: 'Combine classical NLP, embeddings, Transformers, and LLMs into production systems in Stage 10: Advanced NLP Applications.',
  },
  {
    id: 'advanced-nlp-applications',
    stageNumber: '10',
    title: 'Advanced NLP Applications',
    shortTitle: 'Advanced NLP Systems',
    tagline: 'Build real-world NLP applications across classification, extraction, semantic search, QA, and document intelligence.',
    iconName: 'Search',
    goal: 'Build real-world NLP systems using the techniques learned throughout the roadmap.',
    whyItMatters:
      'Theory without practical application is incomplete. An NLP engineer must know how to combine tokenizers, vector databases, Transformer heads, and heuristic business rules into robust end-to-end production systems.',
    learningOutcome: 'Turn NLP concepts into useful applications.',
    recommendedApproach:
      'Build modular, production-ready applications. Focus on real-world constraints: noisy inputs, multilingual text, low latency requirements, and hybrid search architectures.',
    technologies: ['FastAPI', 'ChromaDB / Pinecone / Qdrant', 'spaCy', 'Hugging Face', 'LangChain', 'Docker'],
    topics: [
      {
        category: 'Text Classification & Intent Detection',
        items: [
          'Multi-class customer support routing and spam/abuse detection',
          'Hierarchical text classification for large taxonomy categories',
          'Sentiment analysis with aspect-based extraction (ABSA)',
          'Zero-shot topic classification using NLI (Natural Language Inference) models',
        ],
      },
      {
        category: 'Information Extraction & Document Intelligence',
        items: [
          'Named Entity Recognition (NER) & Relation Extraction (RE) from contracts and medical notes',
          'Resume parsing & automated invoice metadata extraction',
          'OCR integration (Tesseract, PaddleOCR) + layout-aware NLP for scanned PDFs',
          'Constructing structured knowledge graphs from unstructured text',
        ],
      },
      {
        category: 'Semantic Search & Question Answering',
        items: [
          'Dense vector retrieval (bi-encoders) vs Sparse keyword retrieval (BM25 / Elasticsearch)',
          'Hybrid search architectures: Combining BM25 sparse scores with dense vector similarities',
          'Cross-encoder rerankers (Cohere Rerank, BGE-Reranker) for precision top-K refinement',
          'Extractive QA (RoBERTa QA head) vs Generative RAG (Retrieval-Augmented Generation)',
        ],
      },
      {
        category: 'Summarization & Machine Translation',
        items: [
          'Extractive summarization (TextRank, LexRank, sentence scoring)',
          'Abstractive summarization with fine-tuned Seq2Seq models (BART, T5, Pegasus)',
          'Machine translation with multilingual models (NLLB, mBART, MarianMT)',
          'Controlled generation and style transfer',
        ],
      },
    ],
    keyConcepts: [
      'Hybrid Search: BM25 Lexical + Dense Vector Fusion (RRF)',
      'Cross-Encoder Reranking for Precision Retrieval',
      'Aspect-Based Sentiment Analysis (ABSA)',
      'Layout-Aware Document Intelligence Pipelines',
      'Extractive vs Abstractive Summarization',
    ],
    practiceSuggestions: [
      'Build a hybrid search engine combining BM25 keyword search with sentence-transformers embeddings and Reciprocal Rank Fusion (RRF).',
      'Implement an Aspect-Based Sentiment Analysis (ABSA) system that extracts both product features ("battery", "screen") and corresponding sentiment ("great", "dim").',
      'Build a multilingual translation API using Hugging Face MarianMT models with automatic language detection.',
    ],
    projectSuggestions: [
      {
        title: 'Hybrid Semantic Search & Document Q&A Engine',
        description: 'A production search platform that ingests technical PDF manuals, indexes them via BM25 + Qdrant vectors, applies a cross-encoder reranker, and answers queries via extractive QA.',
        level: 'Advanced',
      },
    ],
    commonMistakes: [
      'Relying solely on vector embeddings for search, completely failing on exact keyword matches like product SKU codes or error numbers.',
      'Feeding massive unchunked documents into models without proper sliding-window chunking and metadata attribution.',
      'Neglecting post-processing validation, allowing hallucinations or malformed JSON to reach user interfaces.',
    ],
    nextStepPreview: 'Learn how to benchmark, evaluate, optimize, and deploy these systems in Stage 11: NLP Evaluation, Deployment & Production.',
  },
  {
    id: 'evaluation-deployment-production',
    stageNumber: '11',
    title: 'NLP Evaluation, Deployment & Production',
    shortTitle: 'Evaluation & Deployment',
    tagline: 'Learn how to benchmark, evaluate, optimize, deploy, and monitor NLP systems reliably in production.',
    iconName: 'Server',
    goal: 'Learn how to evaluate and deploy NLP systems reliably.',
    whyItMatters:
      'A model running in a Jupyter notebook is not a production service. Production NLP systems require rigorous task-specific metrics, low-latency serving (batching, quantization), containerized deployment, and drift monitoring.',
    learningOutcome: 'Deploy NLP systems that are measurable, maintainable, and reliable.',
    recommendedApproach:
      'Adopt the continuous feedback loop: INPUT → MODEL → PREDICTION → ERROR ANALYSIS → IMPROVEMENT. Implement task-specific evaluation scorecards before writing production deployment code.',
    technologies: ['FastAPI', 'Docker', 'Triton / TorchServe', 'Prometheus', 'Grafana', 'MLflow', 'RAGAS / DeepEval'],
    topics: [
      {
        category: 'Task-Specific NLP Evaluation Metrics',
        items: [
          'Classification: Precision, Recall, Macro-F1, Weighted-F1, Confusion Matrices',
          'Sequence Labeling / NER: Entity-level strict precision, recall, and CoNLL F1 score (seqeval)',
          'Machine Translation & Summarization: BLEU, ROUGE-1/2/L, METEOR, BERTScore',
          'Semantic Search & Retrieval: Precision@K, Recall@K, Mean Reciprocal Rank (MRR), NDCG@K',
          'Generative LLM Evaluation: Relevance, Groundedness, Faithfulness, Toxicity (RAGAS / DeepEval)',
        ],
      },
      {
        category: 'Error Analysis & Robustness Testing',
        items: [
          'Systematic error analysis: Categorizing false positives and false negatives by failure mode',
          'Behavioral testing for NLP (CheckList methodology: Invariance, Directional, Minimum Functionality)',
          'Adversarial evaluation: Handling typos, spelling noise, casing variations, and out-of-domain inputs',
        ],
      },
      {
        category: 'Model Serving & Inference Optimization',
        items: [
          'FastAPI + Uvicorn: High-throughput async REST API wrappers with Pydantic validation',
          'Batching inference: Dynamic batching for maximizing GPU tensor parallelism',
          'Quantization & Pruning: INT8/INT4 weight quantization via ONNX Runtime & TensorRT',
          'Production model servers: TorchServe, Triton Inference Server, vLLM',
          'Docker containerization: Multi-stage Dockerfiles optimized for GPU/CUDA runtimes',
        ],
      },
      {
        category: 'Production Monitoring & MLOps',
        items: [
          'Latency, throughput (QPS), GPU memory utilization, and p95/p99 response time monitoring',
          'Data drift and concept drift detection in live user text queries',
          'Continuous logging of predictions, user feedback loops, and automated retraining pipelines',
        ],
      },
    ],
    keyConcepts: [
      'Entity-Level CoNLL F1 Evaluation (Seqeval)',
      'ROUGE & BERTScore for Text Generation',
      'NDCG & MRR for Information Retrieval Systems',
      'Dynamic Batching & ONNX Runtime Acceleration',
      'Continuous Drift Monitoring & Error Analysis Loops',
    ],
    practiceSuggestions: [
      'Write an automated evaluation script that computes entity-level strict F1 score for a custom NER model using the seqeval library.',
      'Containerize a PyTorch NLP model in a slim multi-stage Docker container and expose a health check and batch prediction endpoint.',
      'Set up Prometheus metrics inside a FastAPI model server to track inference latency histograms and prediction error counts.',
    ],
    projectSuggestions: [
      {
        title: 'Production NLP Microservice with Docker & Monitoring',
        description: 'An enterprise-grade NLP deployment featuring ONNX-optimized Transformer inference, dynamic batching, Prometheus latency tracking, Grafana dashboards, and Docker Compose orchestration.',
        level: 'Production-Level',
      },
    ],
    commonMistakes: [
      'Using word-level accuracy to evaluate Named Entity Recognition instead of strict entity-level boundary matching.',
      'Evaluating generative text with only BLEU or ROUGE, which rely on exact n-gram overlap and penalize valid paraphrasing.',
      'Deploying unquantized FP32 models directly in synchronous Flask servers without request batching or containerization.',
    ],
    nextStepPreview: 'You have mastered the complete NLP lifecycle! Build your portfolio projects and prepare for engineering interviews.',
  },
];

export const NLP_PROJECT_PROGRESSION: NLPProjectProgression[] = [
  {
    id: 'spam-message-classifier',
    stage: 'Project 01 — Beginner',
    name: 'Spam Message Classifier',
    difficulty: 'Beginner',
    problem: 'Filter out malicious, spam, and phishing messages from high-volume SMS and email communication streams with high precision.',
    description: 'A classical machine learning text classification system that cleans raw text, extracts TF-IDF n-gram features, trains a Naive Bayes / Linear SVM model, and evaluates precision-recall trade-offs.',
    architecture: 'Raw Text → Regex Normalization → TF-IDF Vectorizer → Multinomial Naive Bayes / Linear SVM → Probability Output',
    dataset: 'SMS Spam Collection / Enron Spam Dataset (5,500+ annotated emails & SMS messages)',
    technologies: ['Python 3.12', 'Scikit-learn', 'NLTK', 'NumPy', 'Pandas', 'FastAPI'],
    models: ['Multinomial Naive Bayes', 'Logistic Regression', 'LinearSVC'],
    nlpTechniques: ['Text Normalization', 'Stop Word Removal', 'TF-IDF Feature Extraction', 'N-grams'],
    evaluationMetrics: 'Precision (prioritizing low false positives), Recall, F1-Score, Confusion Matrix',
    deployment: 'FastAPI REST microservice with interactive Swagger documentation',
    githubReqs: 'Modular src/ layout, requirements.txt, serialized model artifact (.joblib), unit tests with pytest.',
    skillsLearned: ['Text cleaning', 'TF-IDF', 'Naive Bayes', 'Scikit-learn Pipelines', 'Model evaluation'],
  },
  {
    id: 'sentiment-analysis-system',
    stage: 'Project 02 — Intermediate',
    name: 'Customer Sentiment Analysis System',
    difficulty: 'Intermediate',
    problem: 'Automatically monitor customer satisfaction across millions of product reviews and social media comments with aspect granularity.',
    description: 'A deep learning sentiment classifier comparing pre-trained word embeddings (GloVe/FastText) with a Bidirectional LSTM and fine-tuned DistilBERT to classify multi-class sentiment.',
    architecture: 'Text Tokens → Embedding Layer (GloVe) → Bidirectional LSTM + Attention → Dense Classification Head → Sentiment Score',
    dataset: 'IMDb Movie Reviews / Amazon Customer Reviews (50,000+ labeled samples)',
    technologies: ['PyTorch', 'TorchText', 'Hugging Face Transformers', 'spaCy', 'Matplotlib'],
    models: ['Bi-LSTM with GloVe', 'Fine-tuned DistilBERT-base-uncased'],
    nlpTechniques: ['Word Embeddings', 'Sequential Deep Learning', 'Transfer Learning', 'Attention Pooling'],
    evaluationMetrics: 'Macro F1-Score, Multi-Class Accuracy, ROC-AUC, Latency Benchmarks',
    deployment: 'Dockerized PyTorch service with GPU acceleration support',
    githubReqs: 'PyTorch training script with learning rate scheduler, model checkpointing, evaluation notebook.',
    skillsLearned: ['PyTorch', 'Recurrent Neural Networks', 'Word Embeddings', 'Transfer Learning', 'Batching'],
  },
  {
    id: 'semantic-search-engine',
    stage: 'Project 03 — Advanced',
    name: 'Neural Semantic Search Engine',
    difficulty: 'Advanced',
    problem: 'Traditional keyword search fails when users describe concepts using synonyms, paraphrasing, or natural language questions.',
    description: 'A dense vector search engine powered by Sentence Transformers and FAISS/Qdrant that indexes 100,000+ technical articles and performs sub-10ms semantic retrieval with cross-encoder reranking.',
    architecture: 'Document Chunks → Bi-Encoder (all-MiniLM-L6-v2) → FAISS Index → Top-50 Retrieval → Cross-Encoder Reranker → Top-5 Results',
    dataset: 'MS MARCO Passage Dataset / arXiv Research Papers (100,000+ technical abstracts)',
    technologies: ['Sentence Transformers', 'FAISS', 'Qdrant', 'FastAPI', 'NumPy', 'Docker'],
    models: ['sentence-transformers/all-MiniLM-L6-v2 (Bi-Encoder)', 'cross-encoder/ms-marco-MiniLM-L-6-v2 (Reranker)'],
    nlpTechniques: ['Dense Embeddings', 'Vector Similarity (Cosine/Dot)', 'ANN Vector Indexing', 'Cross-Encoder Reranking'],
    evaluationMetrics: 'MRR@10 (Mean Reciprocal Rank), Precision@5, NDCG@10, Retrieval Latency (ms)',
    deployment: 'Containerized FastAPI service with persistent vector database volume',
    githubReqs: 'Indexing script, chunking pipeline, reranking module, automated evaluation against benchmark queries.',
    skillsLearned: ['Sentence Embeddings', 'Vector Search', 'FAISS', 'Bi-Encoder vs Cross-Encoder', 'Ranking Metrics'],
  },
  {
    id: 'document-intelligence-system',
    stage: 'Project 04 — Advanced',
    name: 'Resume & Document Intelligence System',
    difficulty: 'Advanced',
    problem: 'Manually screening and extracting structured candidate profiles and contract clauses from unstructured PDF documents is slow and error-prone.',
    description: 'An automated information extraction engine combining spaCy custom NER, layout parser, and fine-tuned DeBERTa to extract names, skills, certifications, and experience into structured JSON schemas.',
    architecture: 'PDF / Text Input → Text & Layout Extraction → Custom NER Pipeline + DeBERTa → Entity Resolution → Structured Pydantic JSON',
    dataset: 'Annotated Resume Corpus & Contract Extraction Dataset (CoNLL format)',
    technologies: ['spaCy v3', 'Hugging Face DeBERTa', 'Pydantic v2', 'PyMuPDF', 'FastAPI'],
    models: ['Custom spaCy NER Model', 'microsoft/deberta-v3-base for Token Classification'],
    nlpTechniques: ['Named Entity Recognition (NER)', 'Token Classification', 'IOB Tagging', 'Schema Enforcement'],
    evaluationMetrics: 'Entity-Level Strict Precision, Recall, and CoNLL F1 Score (seqeval)',
    deployment: 'FastAPI microservice with file upload endpoints and asynchronous processing workers',
    githubReqs: 'Custom spaCy training config, annotation guidelines, Pydantic validation schemas, API docs.',
    skillsLearned: ['NER', 'Information Extraction', 'spaCy Pipelines', 'Token Classification', 'Document Processing'],
  },
  {
    id: 'enterprise-nlp-assistant',
    stage: 'Project 05 — Portfolio Level',
    name: 'Enterprise Multimodal NLP Assistant',
    difficulty: 'Portfolio-Level',
    problem: 'Enterprises need an intelligent system that understands user intents, retrieves proprietary knowledge, executes tools, and generates verified responses.',
    description: 'A flagship production NLP system integrating intent classification, dense retrieval, Hugging Face transformers, open-source LLM generation, hallucination guardrails, and real-time observability.',
    architecture: 'User Input → Intent Detection → Hybrid Retrieval (BM25 + Vector) → Cross-Encoder → Transformer/LLM Generator → Output Guardrails → Response + Observability',
    dataset: 'Enterprise Knowledge Base (Internal documentation, wikis, API specs)',
    technologies: ['FastAPI', 'Qdrant', 'vLLM', 'Hugging Face', 'Pydantic v2', 'Prometheus', 'Grafana', 'Docker'],
    models: ['Fine-tuned Intent Classifier (RoBERTa)', 'BGE-Large Embeddings', 'Llama / Mistral Open LLM via vLLM'],
    nlpTechniques: ['Intent Detection', 'Hybrid Search', 'Reranking', 'Generative QA', 'Output Validation', 'Latency Optimization'],
    evaluationMetrics: 'End-to-End Latency (<250ms), Faithfulness (RAGAS), Intent Accuracy (98%+), P99 Latency',
    deployment: 'Docker Compose cluster with vLLM model server, Qdrant vector DB, and Prometheus metrics scraper',
    githubReqs: 'Full CI/CD pipeline, architecture diagrams, Docker Compose configuration, comprehensive documentation.',
    skillsLearned: ['System Architecture', 'Intent Detection', 'Hybrid Search', 'LLM Integration', 'Production MLOps'],
  },
];

export const NLP_TASK_MAP: NLPTaskMapItem[] = [
  {
    id: 'text-classification',
    task: 'Text Classification',
    targetTechnique: 'Classification Model',
    problem: 'Assigning predefined labels or categories to raw text documents (e.g. spam detection, sentiment analysis, topic routing).',
    recommendedApproach: 'Start with TF-IDF + Logistic Regression or Linear SVM. For complex semantic context, fine-tune a pre-trained Encoder model (RoBERTa/DeBERTa).',
    example: 'Classifying incoming customer support tickets into "Billing", "Technical Issue", or "Account Cancellation".',
    models: ['Logistic Regression / LinearSVC', 'RoBERTa-base', 'DeBERTa-v3', 'DistilBERT'],
    evaluationMetric: 'Macro F1-score, Precision, Recall, Confusion Matrix',
    projectIdea: 'Automated news topic classifier and sentiment tracker across financial feeds.',
    icon: 'BarChart3',
  },
  {
    id: 'entity-extraction',
    task: 'Entity Extraction (NER)',
    targetTechnique: 'NER / Token Classification Model',
    problem: 'Locating and classifying named entities in unstructured text into predefined categories (persons, organizations, dates, medical codes).',
    recommendedApproach: 'Use spaCy for rule-based and statistical NER; fine-tune DeBERTa or BERT-CRF for complex domain-specific extraction.',
    example: 'Extracting patient symptoms, drug dosages, and diagnosis codes from clinical hospital notes.',
    models: ['spaCy NER (en_core_web_trf)', 'DeBERTa-v3-TokenClassification', 'Bi-LSTM + CRF'],
    evaluationMetric: 'Strict Entity-level Precision, Recall, and CoNLL F1 (seqeval)',
    projectIdea: 'Legal contract analyzer that automatically highlights indemnity clauses and monetary values.',
    icon: 'FileText',
  },
  {
    id: 'semantic-search',
    task: 'Semantic Search',
    targetTechnique: 'Embeddings + Vector Search',
    problem: 'Finding relevant passages based on conceptual meaning rather than exact keyword overlap.',
    recommendedApproach: 'Generate dense sentence vectors with Sentence Transformers, index in an ANN Vector DB (FAISS/Qdrant), and rerank top results with a Cross-Encoder.',
    example: 'Searching technical code documentation for "how to handle race conditions" returning threading tutorials.',
    models: ['sentence-transformers/all-mpnet-base-v2', 'bge-large-en-v1.5', 'Cohere Rerank'],
    evaluationMetric: 'MRR@10 (Mean Reciprocal Rank), Precision@K, NDCG@10',
    projectIdea: 'Developer code documentation search engine with sub-10ms semantic query matching.',
    icon: 'Search',
  },
  {
    id: 'question-answering',
    task: 'Question Answering (QA)',
    targetTechnique: 'Retrieval + Language Model',
    problem: 'Extracting exact answer spans or generating conversational answers from reference documents.',
    recommendedApproach: 'For exact answers from text, use an Extractive QA model (RoBERTa-QA). For natural conversational answers, use Retrieval-Augmented Generation (RAG).',
    example: 'Answering employee HR questions ("How many parental leave days do I get?") from company handbook PDFs.',
    models: ['deepset/roberta-base-squad2', 'Flan-T5-Large', 'Llama-3-8B-Instruct'],
    evaluationMetric: 'Exact Match (EM), F1-score (Extractive), Faithfulness / Groundedness (Generative)',
    projectIdea: 'Interactive enterprise FAQ bot that cites exact paragraph numbers for every answer.',
    icon: 'MessageSquare',
  },
  {
    id: 'summarization',
    task: 'Summarization',
    targetTechnique: 'Seq2Seq / LLM',
    problem: 'Condensing long-form text (articles, meeting transcripts, reports) into concise executive summaries.',
    recommendedApproach: 'For fast key sentence extraction, use Extractive Summarization (TextRank). For synthesized fluent summaries, fine-tune BART or T5.',
    example: 'Generating 3-bullet executive summaries from 20-page earnings call transcripts.',
    models: ['facebook/bart-large-cnn', 'google/pegasus-xsum', 'T5-v1_1-base', 'Open LLMs'],
    evaluationMetric: 'ROUGE-1, ROUGE-2, ROUGE-L, BERTScore, Human Readability',
    projectIdea: 'Podcast audio transcript summarizer that produces bullet points and key takeaways.',
    icon: 'Layers',
  },
  {
    id: 'translation',
    task: 'Machine Translation',
    targetTechnique: 'Transformer Seq2Seq',
    problem: 'Translating text across natural languages while preserving linguistic syntax and domain context.',
    recommendedApproach: 'Use pre-trained multilingual sequence-to-sequence Transformer models with subword tokenizers.',
    example: 'Translating product descriptions from English to Spanish, French, German, and Japanese.',
    models: ['facebook/nllb-200-distilled-600M', 'Helsinki-NLP/opus-mt', 'mBART-50'],
    evaluationMetric: 'BLEU score, chrF, COMET (neural translation metric)',
    projectIdea: 'Real-time multilingual customer support translation plugin for chat desks.',
    icon: 'Network',
  },
  {
    id: 'text-generation',
    task: 'Text Generation',
    targetTechnique: 'Autoregressive Language Model',
    problem: 'Generating fluent, contextually coherent natural language text (creative writing, code generation, rewording).',
    recommendedApproach: 'Use pre-trained decoder-only autoregressive language models with tuned temperature and nucleus sampling.',
    example: 'Drafting personalized sales outreach emails based on prospect LinkedIn data.',
    models: ['Mistral-7B-Instruct', 'Llama-3-8B-Instruct', 'Gemma-2-9B-It'],
    evaluationMetric: 'Perplexity, Human Evaluation, Diversity metrics, Task completion rate',
    projectIdea: 'Context-aware documentation generator that turns Python functions into docstrings.',
    icon: 'Brain',
  },
  {
    id: 'document-intelligence',
    task: 'Document Intelligence',
    targetTechnique: 'OCR + NLP + Information Extraction',
    problem: 'Processing visually rich, unstructured documents (scanned PDFs, invoices, receipts, tax forms).',
    recommendedApproach: 'Combine OCR text extraction with layout awareness (LayoutLM) and token classification heads.',
    example: 'Extracting vendor name, line items, tax, and total amount due from scanned PDF receipts.',
    models: ['microsoft/layoutlmv3-base', 'PaddleOCR + spaCy', 'Tesseract + DeBERTa'],
    evaluationMetric: 'Field-level Precision & Recall, End-to-End Extraction Accuracy',
    projectIdea: 'Automated invoice processing pipeline that validates line items against a PostgreSQL database.',
    icon: 'Layers3',
  },
];

export const NLP_TOOLKIT: NLPToolkitCategory[] = [
  {
    category: 'Programming & Foundations',
    coreItems: ['Python 3.12', 'SQL', 'Git & GitHub', 'Bash / Linux Terminal'],
    advancedItems: ['TypeScript Basics', 'C++ / Rust (Extensions)', 'uv / Poetry'],
  },
  {
    category: 'Data Manipulation',
    coreItems: ['NumPy', 'Pandas', 'Regex (re)', 'JSON / JSONL'],
    advancedItems: ['Polars', 'Arrow / PyArrow', 'BeautifulSoup4'],
  },
  {
    category: 'Machine Learning',
    coreItems: ['Scikit-learn', 'Joblib', 'Matplotlib / Seaborn'],
    advancedItems: ['XGBoost', 'LightGBM', 'Optuna (Hyperparameter Tuning)'],
  },
  {
    category: 'Classical NLP',
    coreItems: ['NLTK', 'spaCy', 'TextBlob'],
    advancedItems: ['Stanza (Stanford NLP)', 'Gensim', 'Pattern'],
  },
  {
    category: 'Deep Learning',
    coreItems: ['PyTorch', 'TensorFlow / Keras', 'CUDA / cuDNN'],
    advancedItems: ['TorchText', 'Einops', 'FlashAttention'],
  },
  {
    category: 'Transformers & Pretrained Models',
    coreItems: ['Hugging Face Transformers', 'Hugging Face Tokenizers', 'Hugging Face Datasets'],
    advancedItems: ['PEFT (LoRA/QLoRA)', 'Accelerate', 'Optimum / ONNX Runtime'],
  },
  {
    category: 'Word & Sentence Embeddings',
    coreItems: ['Word2Vec', 'GloVe', 'Sentence Transformers (SBERT)'],
    advancedItems: ['FastText', 'BGE Embeddings', 'OpenAI Embeddings API'],
  },
  {
    category: 'Vector Search & Indexing',
    coreItems: ['FAISS', 'ChromaDB'],
    advancedItems: ['Pinecone', 'Qdrant', 'Weaviate', 'Milvus'],
  },
  {
    category: 'LLM & Generative Frameworks',
    coreItems: ['Commercial LLM APIs', 'Ollama', 'Open-Source LLMs (Llama/Mistral)'],
    advancedItems: ['vLLM', 'TGI (Text Generation Inference)', 'LangChain / LlamaIndex'],
  },
  {
    category: 'Backend & Serving',
    coreItems: ['FastAPI', 'Uvicorn', 'Pydantic v2', 'REST APIs'],
    advancedItems: ['gRPC', 'TorchServe', 'Triton Inference Server'],
  },
  {
    category: 'Database & Caching',
    coreItems: ['PostgreSQL', 'SQLite'],
    advancedItems: ['Redis (Caching & Rate Limiting)', 'Elasticsearch / OpenSearch'],
  },
  {
    category: 'Deployment & MLOps',
    coreItems: ['Docker', 'Cloud Platforms (AWS / GCP / Azure)'],
    advancedItems: ['Kubernetes', 'MLflow', 'Prometheus & Grafana', 'GitHub Actions CI/CD'],
  },
];

export const NLP_EVOLUTION_TIMELINE = [
  {
    era: 'Era 1: Traditional NLP',
    period: '1980s – 2012',
    tech: 'Rules, Regular Expressions, Bag of Words, TF-IDF, N-grams, Naive Bayes, Hidden Markov Models, SVMs',
    description: 'Relied on handcrafted linguistic rules, frequency statistics, and sparse count matrices. Highly interpretable but fragile, with zero understanding of semantic synonyms.',
    icon: 'FileText',
  },
  {
    era: 'Era 2: Distributed Word Embeddings',
    period: '2013 – 2017',
    tech: 'Word2Vec (CBOW & Skip-gram), GloVe, FastText',
    description: 'Introduced continuous dense vector spaces where semantic similarity equals geometric proximity. Enabled algebraic word analogies (king - man + woman = queen), but vectors were static and context-blind.',
    icon: 'Layers',
  },
  {
    era: 'Era 3: Deep Sequential Models',
    period: '2014 – 2018',
    tech: 'Recurrent Neural Networks (RNN), LSTM, GRU, Seq2Seq, Early Attention',
    description: 'Modeled language as ordered sequential time steps with hidden memory states. Addressed long-range dependencies but suffered from vanishing gradients and sequential training bottlenecks.',
    icon: 'Brain',
  },
  {
    era: 'Era 4: The Transformer Revolution',
    period: '2017 – 2022',
    tech: 'Self-Attention, BERT, RoBERTa, GPT-1/2/3, T5, BART, DeBERTa',
    description: 'Replaced recurrent sequential processing with highly parallel multi-head self-attention. Pre-training on massive unlabelled corpora followed by fine-tuning became the dominant paradigm.',
    icon: 'Network',
  },
  {
    era: 'Era 5: Modern NLP & Large Language Models',
    period: '2022 – Present',
    tech: 'LLMs (Llama, Mistral, GPT-4), Dense Vector Search, RAG, PEFT (LoRA), Multimodal Systems, AI Agents',
    description: 'Scales autoregressive transformers to hundreds of billions of parameters. Combines vector search, retrieval-augmented grounding, parameter-efficient fine-tuning, and reasoning capabilities.',
    icon: 'Sparkles',
  },
];

export const NLP_SPECIALIZATIONS: NLPSpecialization[] = [
  {
    title: 'NLP / Language Engineer',
    description: 'Designs and builds end-to-end language pipelines, fine-tunes Transformer models, and deploys high-throughput text understanding APIs.',
    coreTech: ['Python', 'Hugging Face', 'PyTorch', 'spaCy', 'FastAPI', 'Docker'],
    focus: 'Core NLP pipelines, fine-tuning, sequence modeling, and language understanding.',
    icon: 'Terminal',
  },
  {
    title: 'Search & Information Retrieval Engineer',
    description: 'Builds enterprise search engines, hybrid lexical-vector retrieval systems, embedding indexers, and precision ranking algorithms.',
    coreTech: ['Sentence Transformers', 'FAISS', 'Qdrant / Pinecone', 'BM25', 'Elasticsearch', 'Cross-Encoders'],
    focus: 'Information retrieval, vector databases, hybrid search fusion, and reranking.',
    icon: 'Search',
  },
  {
    title: 'Conversational AI Engineer',
    description: 'Develops dialogue systems, intent classifiers, contextual chatbots, customer support agents, and voice/chat assistant architectures.',
    coreTech: ['Rasa', 'LangChain', 'FastAPI', 'LLM APIs', 'Intent Classifiers', 'WebSocket Streams'],
    focus: 'Dialogue state management, intent detection, slot filling, and multi-turn conversations.',
    icon: 'MessageSquare',
  },
  {
    title: 'Information Extraction Engineer',
    description: 'Specializes in transforming messy, unstructured enterprise documents (contracts, medical notes, invoices) into structured relational databases.',
    coreTech: ['spaCy v3', 'DeBERTa', 'LayoutLM', 'Regex', 'Pydantic v2', 'OCR Pipelines'],
    focus: 'Named Entity Recognition, Relation Extraction, document intelligence, and schema validation.',
    icon: 'FileText',
  },
  {
    title: 'Language Model / LLM Engineer',
    description: 'Focuses on training, fine-tuning (LoRA/QLoRA), aligning (DPO), quantizing, and optimizing open-source foundation models for enterprise scale.',
    coreTech: ['vLLM', 'PEFT', 'DeepSpeed', 'Triton', 'Hugging Face Accelerate', 'Quantization (AWQ/GGUF)'],
    focus: 'Instruction tuning, parameter-efficient fine-tuning, high-throughput inference, and model serving.',
    icon: 'Brain',
  },
  {
    title: 'Multilingual NLP Engineer',
    description: 'Solves cross-lingual language barriers, machine translation systems, multilingual entity extraction, and low-resource language adaptation.',
    coreTech: ['NLLB-200', 'mBART', 'MarianMT', 'Multilingual BERT (mBERT)', 'XLM-RoBERTa'],
    focus: 'Machine translation, cross-lingual representations, and multilingual text processing.',
    icon: 'Layers3',
  },
];

export const NLP_THINKING_LADDER = [
  { step: '01', label: 'Business Problem', question: 'What exact business language problem are we solving?' },
  { step: '02', label: 'Task Framing', question: 'Is this classification, extraction, search, generation, translation, or QA?' },
  { step: '03', label: 'Data Audit', question: 'What text data do we have? How clean, noisy, imbalanced, or multilingual is it?' },
  { step: '04', label: 'Text Representation', question: 'How should text be converted? Tokens, TF-IDF, Word2Vec, or dense Transformer vectors?' },
  { step: '05', label: 'Model Selection', question: 'Do we need classical ML, embeddings, a pre-trained Transformer, or an LLM?' },
  { step: '06', label: 'Evaluation Strategy', question: 'How will we measure success? Macro-F1, strict NER F1, MRR@10, or BERTScore?' },
  { step: '07', label: 'Failure Analysis', question: 'What are the edge cases? Typos, out-of-vocabulary terms, ambiguity, hallucinations?' },
  { step: '08', label: 'Deployment Architecture', question: 'What are our latency, throughput, and hardware constraints (CPU vs GPU)?' },
  { step: '09', label: 'Production Monitoring', question: 'How will we monitor latency, prediction drift, data drift, and user feedback in real time?' },
];

export const NLP_COMMON_MISTAKES: NLPCommonMistake[] = [
  {
    title: 'Using an LLM for every language problem',
    solution: 'Use simple Scikit-learn models or pre-trained Transformers for classification and extraction. They are 50x faster and 100x cheaper than LLMs.',
  },
  {
    title: 'Ignoring classical NLP fundamentals',
    solution: 'Master tokenization, linguistic features, and text normalization before diving into modern deep learning frameworks.',
  },
  {
    title: 'Neglecting Python engineering standards',
    solution: 'Write modular packages, use generators for big text files, write pytest test suites, and avoid messy monolithic notebooks.',
  },
  {
    title: 'Ignoring machine learning baselines',
    solution: 'Always establish a Logistic Regression or Naive Bayes baseline before training complex neural networks.',
  },
  {
    title: 'Misunderstanding embedding vector spaces',
    solution: 'Learn why cosine similarity is preferred over Euclidean distance for high-dimensional normalized text vectors.',
  },
  {
    title: 'Jumping to Transformers without understanding Attention',
    solution: 'Study Query, Key, Value mechanics and scaled dot-product attention mathematics before using Transformer libraries.',
  },
  {
    title: 'Training massive models unnecessarily',
    solution: 'Use pre-trained models and parameter-efficient fine-tuning (LoRA) instead of training from scratch.',
  },
  {
    title: 'Ignoring data quality and preprocessing noise',
    solution: 'Garbage in, garbage out. Invest time in cleaning HTML, fixing Unicode encoding errors, and handling domain slang.',
  },
  {
    title: 'Using Accuracy for imbalanced NLP tasks',
    solution: 'Always evaluate with Macro F1, Precision, Recall, and Confusion Matrices on skewed text datasets.',
  },
  {
    title: 'Evaluating NER with word-level accuracy',
    solution: 'Use strict entity-level boundary evaluation tools like the seqeval library to measure true entity extraction precision and recall.',
  },
  {
    title: 'Relying exclusively on Vector Search',
    solution: 'Combine dense vector search with sparse keyword search (BM25) and cross-encoder rerankers for robust hybrid retrieval.',
  },
  {
    title: 'Ignoring latency and serving costs',
    solution: 'Optimize models with ONNX Runtime, quantization (INT8/INT4), and dynamic request batching for production throughput.',
  },
];

export const NLP_SCORECARD: NLPEvaluationCategory[] = [
  {
    category: 'Text Classification',
    metrics: [
      { name: 'Precision & Recall', desc: 'Balances false positives (critical for spam) vs false negatives (critical for fraud).' },
      { name: 'Macro-Averaged F1', desc: 'Gives equal weight to rare minority classes in imbalanced classification.' },
      { name: 'Confusion Matrix', desc: 'Identifies exact pair-wise label confusion modes.' },
    ],
  },
  {
    category: 'Entity Extraction (NER)',
    metrics: [
      { name: 'Strict Entity Precision', desc: 'Requires exact matching of both entity type and character token span boundaries.' },
      { name: 'Strict Entity Recall', desc: 'Measures what percentage of actual entities were identified by the model.' },
      { name: 'CoNLL F1 Score (seqeval)', desc: 'The gold standard benchmark for token classification and sequence labeling.' },
    ],
  },
  {
    category: 'Search & Retrieval',
    metrics: [
      { name: 'Mean Reciprocal Rank (MRR)', desc: 'Measures how high up the first relevant document appears in search results.' },
      { name: 'NDCG@K', desc: 'Normalized Discounted Cumulative Gain accounting for graded relevance of top-K results.' },
      { name: 'Precision@K & Recall@K', desc: 'Evaluates top-K retrieved items against ground-truth relevant document lists.' },
    ],
  },
  {
    category: 'Generation & Translation',
    metrics: [
      { name: 'BLEU & chrF Score', desc: 'Measures n-gram precision overlap between machine translation and human reference.' },
      { name: 'ROUGE-1, ROUGE-2, ROUGE-L', desc: 'Evaluates n-gram and longest common subsequence recall for summarization.' },
      { name: 'BERTScore & Faithfulness', desc: 'Computes semantic similarity of generated tokens via contextual embeddings.' },
    ],
  },
  {
    category: 'Production & Latency',
    metrics: [
      { name: 'P95 & P99 Latency (ms)', desc: 'Ensures 99% of user requests complete within acceptable latency thresholds.' },
      { name: 'Throughput (Tokens/Sec & QPS)', desc: 'Measures concurrent request capacity on targeted CPU/GPU hardware.' },
      { name: 'Prediction & Data Drift', desc: 'Monitors distribution shifts between training text and real-world inference queries.' },
    ],
  },
];

export const NLP_FOUR_PILLARS: NLPFourPillars[] = [
  {
    title: 'Language Understanding',
    subtitle: 'Deep intuition for linguistic syntax, semantics, tokenization, embeddings, and Transformer attention mechanisms.',
    icon: 'FileText',
  },
  {
    title: 'Machine Learning',
    subtitle: 'Mastery of supervised learning, classification algorithms, loss optimization, and rigorous evaluation metrics.',
    icon: 'BarChart3',
  },
  {
    title: 'NLP Engineering',
    subtitle: 'Hands-on experience fine-tuning pre-trained models, building hybrid search engines, and prompt/RAG architectures.',
    icon: 'Network',
  },
  {
    title: 'Software Engineering',
    subtitle: 'Clean modular Python, async FastAPI microservices, containerization with Docker, and automated pytest testing.',
    icon: 'Terminal',
  },
];

export const NLP_PIPELINE_ARCHITECTURE_STEPS = [
  { step: '01', title: 'Raw Text Input', desc: 'Unstructured text strings from user queries, web pages, PDFs, or databases.' },
  { step: '02', title: 'Text Cleaning', desc: 'Noise removal, HTML stripping, regex filtering, and Unicode normalization.' },
  { step: '03', title: 'Tokenization', desc: 'Splitting into characters, words, or subwords (BPE, WordPiece) with special tokens.' },
  { step: '04', title: 'Representation', desc: 'Mapping token IDs to dense embeddings with positional encodings.' },
  { step: '05', title: 'NLP / Transformer Model', desc: 'Multi-head self-attention, deep sequence encoding, or autoregressive generation.' },
  { step: '06', title: 'Task Head / Prediction', desc: 'Softmax probabilities, classification logits, entity tags, or token outputs.' },
  { step: '07', title: 'Post-Processing', desc: 'Decoding token IDs, stripping special tokens, entity aggregation, and schema parsing.' },
  { step: '08', title: 'Evaluation', desc: 'Benchmarking against task-specific metrics (F1, MRR, ROUGE, BERTScore).' },
  { step: '09', title: 'Production Deployment', desc: 'Async FastAPI serving, Docker containerization, dynamic batching, and monitoring.' },
];

export const MODERN_NLP_ARCHITECTURE_STEPS = [
  { step: '01', title: 'User / App', desc: 'Sends natural language query or document payload' },
  { step: '02', title: 'Preprocessing', desc: 'Cleaning, regex filters, and length truncation' },
  { step: '03', title: 'Tokenizer', desc: 'Fast Rust-based subword tokenization with attention masks' },
  { step: '04', title: 'Transformer / NLP Model', desc: 'Contextual representation via pre-trained foundation model' },
  { step: '05', title: 'Task Head / Generation', desc: 'Classification, entity tagging, dense embedding, or next-token' },
  { step: '06', title: 'Post-Processing', desc: 'Schema validation, entity mapping, and JSON formatting' },
  { step: '07', title: 'Result', desc: 'High-confidence structured output returned to application' },
];

export const ADVANCED_RAG_NLP_STEPS = [
  { step: '01', title: 'User', desc: 'Submits natural language question' },
  { step: '02', title: 'Application', desc: 'Ingests query and coordinates pipeline' },
  { step: '03', title: 'Retrieval', desc: 'Hybrid search across vector database & BM25' },
  { step: '04', title: 'Context', desc: 'Reranks top chunks & builds structured prompt' },
  { step: '05', title: 'Language Model', desc: 'Generates grounded answer using context' },
  { step: '06', title: 'Validation', desc: 'Guardrails verify citations & faithfulness' },
  { step: '07', title: 'Response', desc: 'Delivers verified, reliable answer to user' },
];
