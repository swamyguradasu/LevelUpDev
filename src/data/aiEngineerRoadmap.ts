export interface AIEngineerRoadmapStage {
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
    level: 'Beginner' | 'Intermediate' | 'Production AI' | 'Advanced' | 'Portfolio-Level';
  }[];
  commonMistakes: string[];
  nextStepPreview: string;
}

export interface AIEngineerProjectProgression {
  id: string;
  stage: string;
  name: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Production AI' | 'Advanced' | 'Portfolio-Level';
  recommendedStack: string[];
  skillsLearned: string[];
  description: string;
  problemSolved: string;
  aiArchitecture: string;
  evaluationMetrics: string;
  deploymentDetails: string;
  monitoringDetails: string;
  githubReqs: string;
}

export interface AISpecialization {
  title: string;
  description: string;
  coreTech: string[];
  focus: string;
  icon: string;
}

export interface AIToolkitCategory {
  category: string;
  coreItems: string[];
  specializedItems: string[];
}

export const AI_ENGINEER_ROADMAP_STAGES: AIEngineerRoadmapStage[] = [
  {
    id: 'programming-software-engineering',
    stageNumber: '01',
    title: 'Programming & Software Engineering',
    shortTitle: 'Software Engineering',
    tagline: 'Build clean, typed, modular Python applications, async FastAPI backends, and robust testing suites.',
    iconName: 'Terminal',
    goal: 'Become a strong software engineer capable of building reliable, maintainable AI-powered applications.',
    whyItMatters:
      'AI Engineers are software engineers who specialize in building intelligent systems. An AI prototype is only as good as the software architecture around it: modular API backends, streaming protocols, async handlers, structured logging, and automated test suites.',
    learningOutcome: 'Build clean, testable, type-safe Python applications and asynchronous APIs using FastAPI and pytest.',
    recommendedApproach:
      'Master object-oriented and asynchronous Python first. AI apps rely heavily on streaming HTTP requests, background workers, and API integrations.',
    technologies: ['Python 3.12', 'FastAPI', 'Pydantic v2', 'pytest', 'Git & GitHub', 'Docker Basics', 'Asyncio'],
    topics: [
      {
        category: 'Core & Asynchronous Python',
        items: [
          'Python data structures (dictionaries, lists, sets, tuples, list/dict comprehensions)',
          'Object-Oriented Programming (OOP): Classes, inheritance, dataclasses, design patterns',
          'Type hints (mypy), Pydantic v2 for strict request/response data validation',
          'Asynchronous programming (async / await, asyncio, concurrency, rate limiting)',
          'Decorators, generators (yield for streaming responses), and context managers',
        ],
      },
      {
        category: 'Software Engineering & Architecture',
        items: [
          'Clean code principles, SOLID design, modular project architecture (src/ layout)',
          'Structured logging (Loguru / structlog) vs basic print statements',
          'Environment variable configuration (.env, pydantic-settings, secret handling)',
          'Robust exception handling, custom domain exceptions, and HTTP status codes',
        ],
      },
      {
        category: 'API Development & Automated Testing',
        items: [
          'FastAPI: Building high-performance REST APIs, dependency injection, middleware',
          'Server-Sent Events (SSE) and WebSockets for streaming token responses',
          'Automated testing with pytest: Unit tests, integration tests, mock LLM fixtures',
          'Linters and code quality: ruff, black, pre-commit hooks',
        ],
      },
    ],
    keyConcepts: [
      'Asynchronous Streaming (SSE) for Real-Time AI Tokens',
      'Pydantic v2 Data Modeling & Runtime Validation',
      'SOLID Principles in AI Application Architecture',
      'Unit & Integration Testing with Mock AI Fixtures',
      'Secrets Management (.env & Cloud Secrets)',
    ],
    practiceSuggestions: [
      'Build an async FastAPI service that streams simulated text tokens back to the client using Server-Sent Events (StreamingResponse).',
      'Write a pytest test suite using unittest.mock to test AI API endpoints without incurring actual API billing charges.',
      'Refactor a monolithic script into a clean, modular Python package with config management, typed interfaces, and error handlers.',
    ],
    projectSuggestions: [
      {
        title: 'Asynchronous Streaming API Boilerplate',
        description: 'A modular, typed FastAPI backend featuring Pydantic schemas, streaming endpoints, structured JSON logging, rate limiting, and 90%+ pytest test coverage.',
        level: 'Beginner',
      },
    ],
    commonMistakes: [
      'Writing synchronous blocking API endpoints for slow LLM calls, causing the entire server to freeze under concurrent traffic.',
      'Hardcoding API keys directly into source code repositories instead of using environment variables.',
    ],
    nextStepPreview: 'Unpack the mathematical intuition of neural networks and embeddings in Stage 02: Mathematics & AI Fundamentals.',
  },
  {
    id: 'mathematics-ai-fundamentals',
    stageNumber: '02',
    title: 'Mathematics & AI Fundamentals',
    shortTitle: 'Math & AI Basics',
    tagline: 'Linear algebra, matrix operations, vectors, gradient descent, probability distributions, and the AI taxonomy.',
    iconName: 'Brain',
    goal: 'Understand the mathematical and conceptual foundations behind modern AI, embeddings, and neural networks.',
    whyItMatters:
      'Modern AI models operate on high-dimensional vector spaces. Linear algebra powers vector embeddings and cosine similarity search; calculus computes gradients to update weights; and probability models token generation likelihood.',
    learningOutcome: 'Understand the intuitive mathematics behind vector embeddings, dot products, loss functions, and backpropagation.',
    recommendedApproach:
      'Learn the intuition first. Advanced mathematical proofs are optional unless your target role requires research-level model training.',
    technologies: ['Linear Algebra', 'Vector Spaces', 'Cosine Similarity', 'Calculus (Gradients)', 'Probability Distributions'],
    topics: [
      {
        category: 'Linear Algebra for AI & Embeddings',
        items: [
          'Scalars, vectors, high-dimensional vector spaces (e.g. 1536-dim text embeddings)',
          'Vector operations: Addition, scalar multiplication, dot products, Euclidean distance',
          'Cosine similarity (normalized dot product) for measuring semantic text distance',
          'Matrix multiplication, transposition, and dimensionality transformations',
        ],
      },
      {
        category: 'Calculus, Optimization & Loss Functions',
        items: [
          'Derivatives, partial derivatives, and Gradient vectors (∇f)',
          'The Chain Rule (Backpropagation foundation for updating neural network weights)',
          'Loss functions: Mean Squared Error, Cross-Entropy Loss, Negative Log-Likelihood',
          'Gradient Descent optimization, learning rates, and convergence',
        ],
      },
      {
        category: 'Probability & The AI Taxonomy',
        items: [
          'Probability basics, conditional probability, Bayes Theorem, Softmax distribution',
          'The AI Taxonomy: Artificial Intelligence vs Machine Learning vs Deep Learning vs Generative AI',
          'How token sampling works: Probability distributions over vocabulary tokens',
        ],
      },
    ],
    keyConcepts: [
      'Cosine Similarity: cos(θ) = (A · B) / (||A|| ||B||)',
      'High-Dimensional Embedding Vector Spaces',
      'The Chain Rule in Neural Network Backpropagation',
      'Softmax Probability Distribution over Vocabulary',
      'The AI Hierarchy: AI ⊃ ML ⊃ DL ⊃ GenAI',
    ],
    practiceSuggestions: [
      'Write a pure NumPy script calculating cosine similarity and Euclidean distance between word embedding vectors without libraries.',
      'Implement the Softmax function from scratch and observe how temperature scaling affects token probability distribution.',
      'Visualize a 2D projection of 10 sentence embeddings using PCA or t-SNE to see semantic clustering.',
    ],
    projectSuggestions: [
      {
        title: 'From-Scratch Vector Search & Similarity Engine',
        description: 'A pure Python/NumPy semantic search engine calculating dot products, cosine similarities, and Top-K nearest neighbors over 10,000 embedded sentences.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Getting bogged down in manual multi-variable proofs instead of focusing on practical vector operations and similarity metrics.',
      'Assuming embedding distance is always Euclidean rather than understanding normalized cosine similarity.',
    ],
    nextStepPreview: 'Explore classical machine learning foundations in Stage 03: Machine Learning Fundamentals.',
  },
  {
    id: 'machine-learning-fundamentals',
    stageNumber: '03',
    title: 'Machine Learning Fundamentals',
    shortTitle: 'ML Fundamentals',
    tagline: 'Supervised classification, regression, clustering, Scikit-learn, bias-variance tradeoff, and evaluation metrics.',
    iconName: 'BarChart3',
    goal: 'Understand the core machine learning concepts and algorithms that form the foundation of modern AI.',
    whyItMatters:
      'Understanding supervised vs unsupervised learning, training/validation splits, overfitting, cross-validation, and metrics (Precision, Recall, F1, ROC-AUC) is essential for evaluating AI models and building hybrid classification pipelines.',
    learningOutcome: 'Train, evaluate, and tune classical machine learning models and understand generalization principles.',
    technologies: ['NumPy', 'Pandas', 'Scikit-learn', 'Logistic Regression', 'Random Forest', 'K-Means'],
    topics: [
      {
        category: 'Supervised Learning Algorithms',
        items: [
          'Linear Regression, Ridge, Lasso regularized regression',
          'Logistic Regression (Sigmoid activation, binary classification)',
          'Decision Trees, Random Forest (Bagging), and Gradient Boosting (XGBoost)',
          'Support Vector Machines (SVM) and K-Nearest Neighbors (KNN)',
        ],
      },
      {
        category: 'Unsupervised Learning & Clustering',
        items: [
          'K-Means clustering & Silhouette score evaluation',
          'DBSCAN density-based spatial clustering',
          'Principal Component Analysis (PCA) for dimensionality reduction',
        ],
      },
      {
        category: 'Feature Preprocessing & Validation',
        items: [
          'Train, validation, and test dataset splitting (preventing data leakage)',
          'Feature scaling (StandardScaler, MinMaxScaler) and categorical encoding (One-Hot)',
          'The Bias-Variance Tradeoff (Underfitting vs Overfitting)',
          'K-Fold Cross-Validation for model validation',
        ],
      },
      {
        category: 'Model Evaluation Metrics',
        items: [
          'Classification: Accuracy, Precision, Recall, F1-Score, ROC-AUC, Confusion Matrix',
          'Regression: MAE, MSE, RMSE, R²',
          'Evaluating imbalanced datasets (PR-AUC vs Accuracy)',
        ],
      },
    ],
    keyConcepts: [
      'Bias-Variance Tradeoff (Underfitting vs Overfitting)',
      'Precision vs Recall Business Tradeoff',
      'Train / Validation / Test Leak-Free Splitting',
      'Scikit-learn Pipeline Encapsulation',
      'K-Means Clustering for Unsupervised Grouping',
    ],
    practiceSuggestions: [
      'Train a text intent classifier using TF-IDF features and Logistic Regression, evaluating F1-Score on test data.',
      'Demonstrate data leakage by fitting a scaler before splitting vs after splitting, observing the performance inflation.',
      'Use K-Means to cluster customer support ticket descriptions into 5 distinct categories.',
    ],
    projectSuggestions: [
      {
        title: 'Customer Intent & Sentiment Classifier Pipeline',
        description: 'A modular Scikit-learn classification pipeline preprocessing text, training a tuned classifier, and serving predictions with cross-validated evaluation metrics.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Relying solely on Accuracy when evaluating imbalanced datasets, missing all rare minority class occurrences.',
      'Over-complicating simple tabular classification tasks with deep neural networks when a Random Forest yields better results.',
    ],
    nextStepPreview: 'Master neural networks and GPU training in Stage 04: Deep Learning & PyTorch.',
  },
  {
    id: 'deep-learning-pytorch',
    stageNumber: '04',
    title: 'Deep Learning & Neural Networks',
    shortTitle: 'Deep Learning',
    tagline: 'PyTorch, neural network architectures, activation functions, backpropagation, CNNs, LSTMs, and GPU acceleration.',
    iconName: 'Cpu',
    goal: 'Understand how neural networks learn, how tensor computation operates, and how modern deep learning systems are built.',
    whyItMatters:
      'Deep learning is the underlying technological engine for modern AI, vision models, and Large Language Models. Understanding PyTorch tensors, backpropagation, CUDA acceleration, and training dynamics prepares you for advanced generative models.',
    learningOutcome: 'Build, train, regularize, and evaluate deep neural networks using PyTorch with GPU acceleration.',
    recommendedApproach:
      'Focus on PyTorch as your primary framework. Understand tensor manipulation, custom training loops, and loss convergence.',
    technologies: ['PyTorch', 'Torchvision', 'CUDA / GPU Acceleration', 'Activation Functions (ReLU, GELU)', 'TensorBoard'],
    topics: [
      {
        category: 'Neural Network Architecture Fundamentals',
        items: [
          'The Artificial Neuron (Perceptron), weights, biases, and activation functions (ReLU, Sigmoid, Softmax, GELU)',
          'Multi-Layer Perceptron (MLP): Forward pass, loss calculation, backpropagation',
          'Optimizers: SGD with momentum, RMSprop, Adam, AdamW, learning rate schedulers',
          'Regularization: Dropout, Batch Normalization, Layer Normalization, early stopping',
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
        ],
      },
      {
        category: 'Core Neural Architectures',
        items: [
          'Convolutional Neural Networks (CNNs): Convolutions, pooling, ResNet transfer learning',
          'Recurrent Neural Networks (RNNs, LSTMs, GRUs) for sequential data',
          'Autoencoders for dimensionality reduction and latent space representations',
        ],
      },
    ],
    keyConcepts: [
      'Autograd Engine & Backpropagation Chain Rule',
      'PyTorch Dataset & DataLoader Pipeline',
      'Activation Functions (Why ReLU/GELU solve vanishing gradients)',
      'Regularization via Dropout and Early Stopping',
      'GPU Tensor Acceleration (.to("cuda"))',
    ],
    practiceSuggestions: [
      'Write a complete PyTorch training loop from scratch with validation loss tracking, checkpoint saving, and early stopping.',
      'Fine-tune a pre-trained ResNet-18 model on a custom image classification dataset using Transfer Learning.',
      'Visualize neural network activations and training loss curves in TensorBoard.',
    ],
    projectSuggestions: [
      {
        title: 'Deep Learning Vision Classifier with Transfer Learning',
        description: 'A complete PyTorch application fine-tuning a pre-trained CNN on custom data with data augmentation, learning rate scheduling, GPU training, and TensorBoard logging.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Forgetting to call optimizer.zero_grad() inside the PyTorch training loop, causing gradients to accumulate across batches.',
      'Not setting model.eval() and torch.no_grad() during validation/inference, leading to memory leaks and incorrect dropout behavior.',
    ],
    nextStepPreview: 'Unpack the architecture that revolutionized AI in Stage 05: NLP & Transformers.',
  },
  {
    id: 'nlp-transformers',
    stageNumber: '05',
    title: 'NLP & Transformers',
    shortTitle: 'NLP & Transformers',
    tagline: 'Text tokenization, vector embeddings, Self-Attention mechanism, Transformer architecture, BERT, GPT, and Hugging Face.',
    iconName: 'MessageSquare',
    goal: 'Understand how modern language AI systems process, represent, and generate human text using Transformers.',
    whyItMatters:
      'The Transformer architecture (Attention Is All You Need) is the foundational breakthrough behind GPT, Claude, Gemini, BERT, and all modern generative AI. Understanding Self-Attention, Query/Key/Value projections, and tokenizers is essential for every AI engineer.',
    learningOutcome: 'Understand the Transformer architecture, use Hugging Face tokenizers/models, and perform semantic search with embeddings.',
    technologies: ['Hugging Face Transformers', 'Tokenizers (BPE, WordPiece)', 'Self-Attention Mechanism', 'BERT', 'GPT', 'Sentence-Transformers'],
    topics: [
      {
        category: 'NLP Fundamentals & Tokenization',
        items: [
          'Text preprocessing: Cleaning, normalization, subword tokenization (Byte-Pair Encoding - BPE, WordPiece)',
          'Vocabulary IDs, special tokens ([CLS], [SEP], <bos>, <eos>, <pad>)',
          'Word embeddings (Word2Vec) vs contextual transformer embeddings',
          'Sentence embeddings and dense vector semantic representations',
        ],
      },
      {
        category: 'The Transformer Architecture Deep Dive',
        items: [
          'The Attention mechanism: Query (Q), Key (K), Value (V) matrix projections',
          'Scaled Dot-Product Attention: Attention(Q, K, V) = softmax(QK^T / √d_k) * V',
          'Multi-Head Attention (MHA) for capturing multiple semantic relationships',
          'Positional Encoding (Sinusoidal & Rotary Position Embedding - RoPE)',
          'Encoder-only (BERT), Decoder-only (GPT/Llama), and Encoder-Decoder (T5) models',
        ],
      },
      {
        category: 'Hugging Face Ecosystem Mastery',
        items: [
          'Hugging Face Transformers library: AutoModel, AutoTokenizer, AutoConfig',
          'Hugging Face Datasets and Model Hub exploration',
          'Generating embeddings with Sentence-Transformers (all-MiniLM-L6-v2, BGE)',
          'Performing semantic text search using embedding dot products',
        ],
      },
    ],
    keyConcepts: [
      'Scaled Dot-Product Attention: Attention(Q, K, V) = softmax(QK^T / √d_k) * V',
      'Multi-Head Attention (MHA) Mechanism',
      'Encoder (BERT) vs Decoder (GPT) Architectures',
      'Subword Tokenization (BPE & Token IDs)',
      'Sentence-Transformers for Dense Semantic Embeddings',
    ],
    practiceSuggestions: [
      'Implement the Scaled Dot-Product Attention function from scratch in pure PyTorch and compute attention weights.',
      'Tokenize 5 sentences using Hugging Face AutoTokenizer and inspect token IDs, attention masks, and decoding.',
      'Generate dense sentence embeddings using Sentence-Transformers and compute a 10x10 semantic similarity matrix.',
    ],
    projectSuggestions: [
      {
        title: 'Transformer Semantic Search & Document Ranking Engine',
        description: 'A semantic search engine using Hugging Face Sentence-Transformers to index 1,000 documents, compute dense embeddings, and return ranked search results based on cosine similarity.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Confusing characters/words with Tokens (1,000 words ≈ 1,333 tokens).',
      'Using encoder-only models (like BERT) for text generation instead of autoregressive decoder models (like GPT).',
    ],
    nextStepPreview: 'Harness state-of-the-art Large Language Models in Stage 06: Generative AI & Large Language Models.',
  },
  {
    id: 'generative-ai-llms',
    stageNumber: '06',
    title: 'Generative AI & Large Language Models',
    shortTitle: 'GenAI & LLMs',
    tagline: 'LLM parameters, context windows, prompt engineering, structured JSON outputs, streaming, Ollama, and LLM APIs.',
    iconName: 'Sparkles',
    goal: 'Learn how modern generative AI models work and how to build production-style applications using commercial and open-source LLMs.',
    whyItMatters:
      'LLMs represent a fundamental paradigm shift in software development. AI engineers must master prompt engineering, structured JSON outputs, context window management, temperature controls, streaming responses, and local open-source model execution.',
    learningOutcome: 'Build reliable LLM applications with prompt templates, structured JSON outputs, streaming responses, and local model inference.',
    recommendedApproach:
      'Focus on observable outputs and robust prompt engineering techniques (role definition, few-shot examples, strict JSON output schemas).',
    technologies: ['OpenAI API', 'Google Gemini API', 'Anthropic Claude API', 'Ollama (Local LLMs)', 'Llama 3 / Mistral', 'Pydantic JSON Output'],
    topics: [
      {
        category: 'LLM Mechanics & Core Concepts',
        items: [
          'What is an LLM: Autoregressive next-token prediction at scale',
          'Pretraining vs Supervised Fine-Tuning (SFT) vs RLHF / DPO alignment',
          'Context windows (e.g. 128k, 1M tokens), parameter sizes (8B, 70B, 405B)',
          'Inference sampling parameters: Temperature (0.0 for deterministic vs 0.7+ for creative), Top-p (nucleus sampling), frequency/presence penalties',
          'Base models vs Instruction-tuned vs Chat vs Multimodal models',
        ],
      },
      {
        category: 'Professional Prompt Engineering',
        items: [
          'Clear instruction design, role prompting, and delimiter formatting (XML/Markdown)',
          'Few-shot prompting: Providing 2-3 high-quality input/output exemplars',
          'Structured prompting & Chain-of-Thought prompting (asking the model to think step-by-step)',
          'Strict JSON outputs: Enforcing Pydantic schemas via API JSON Mode / Structured Outputs',
          'Prompt templates and parameterized prompt injection defenses',
        ],
      },
      {
        category: 'Commercial APIs & Open-Source Local Inference',
        items: [
          'Commercial APIs: OpenAI (GPT-4o), Google AI (Gemini 1.5 Pro/Flash), Anthropic (Claude 3.5 Sonnet)',
          'Open-source models: Meta Llama 3, Mistral, Gemma running locally via Ollama and vLLM',
          'Model quantization concepts (GGUF, 4-bit, 8-bit quantization for running on consumer hardware)',
          'Context management, conversation message history formatting (System, User, Assistant)',
        ],
      },
    ],
    keyConcepts: [
      'Temperature & Top-p Sampling Controls',
      'Few-Shot Prompting with Input/Output Exemplars',
      'Strict JSON Schema Output Enforcement (Pydantic)',
      'Local Open-Source Model Inference with Ollama',
      'Conversation Memory & Sliding Window Context Management',
    ],
    practiceSuggestions: [
      'Write a Python script that forces an LLM to output strictly formatted JSON conforming to a Pydantic schema.',
      'Run Llama 3 locally on your laptop using Ollama and connect it to a Python FastAPI backend.',
      'Build a streaming CLI chat client that renders tokens in real time as they are generated by the model.',
    ],
    projectSuggestions: [
      {
        title: 'Production-Style Multi-Turn AI Chatbot with Streaming',
        description: 'An interactive chatbot application featuring conversation memory, temperature controls, system prompt customization, streaming token responses, and structured Pydantic data extraction.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Relying on vague natural language prompts without JSON constraints, leading to unpredictable parsing errors.',
      'Accumulating infinite chat history in the context window until the token limit is exceeded and API costs skyrocket.',
    ],
    nextStepPreview: 'Connect LLMs to external private databases in Stage 07: RAG & AI Application Engineering.',
  },
  {
    id: 'rag-ai-applications',
    stageNumber: '07',
    title: 'RAG & AI Application Engineering',
    shortTitle: 'RAG & Vector DBs',
    tagline: 'Document chunking, dense vector embeddings, vector databases (Chroma, Pinecone, FAISS), reranking, and LangChain/LlamaIndex.',
    iconName: 'Database',
    goal: 'Learn how to connect LLMs with private, external enterprise knowledge bases and build reliable Retrieval-Augmented Generation (RAG) applications.',
    whyItMatters:
      'LLMs hallucinate and lack access to private, real-time company data. RAG (Retrieval-Augmented Generation) solves this by fetching relevant document chunks from a vector database and injecting them into the LLM prompt as verifiable context with citations.',
    learningOutcome: 'Build, evaluate, and optimize production RAG pipelines using chunking strategies, vector databases, and reranking.',
    recommendedApproach:
      'RAG is not simply adding a vector database. Retrieval quality directly determines generation quality. Focus on chunking strategies and reranking.',
    technologies: ['LangChain', 'LlamaIndex', 'ChromaDB', 'Pinecone / Qdrant', 'FAISS', 'Cohere Rerank', 'RAGAS (RAG Evaluation)'],
    topics: [
      {
        category: 'The Production RAG Architecture',
        items: [
          'The RAG Pipeline: Documents → Ingestion → Chunking → Embeddings → Vector DB → Retrieval → Reranking → Context → LLM → Grounded Response',
          'Document loaders (PDF, Markdown, DOCX, HTML, SQL) and text sanitization',
          'Chunking strategies: Fixed-size, Recursive character chunking, Semantic chunking, Sliding window chunking with overlap',
          'Dense vector indexing & Approximate Nearest Neighbor (ANN) search',
        ],
      },
      {
        category: 'Vector Databases & Hybrid Search',
        items: [
          'Embedded local vector databases: ChromaDB, FAISS',
          'Cloud-native vector databases: Pinecone, Qdrant, Weaviate, pgvector (PostgreSQL)',
          'Metadata filtering (filtering by date, author, department, access control)',
          'Hybrid Search: Combining BM25 keyword search with dense vector semantic search',
          'Cross-Encoder Reranking (Cohere Rerank, BGE-Reranker) to score top retrieved chunks',
        ],
      },
      {
        category: 'RAG Optimization & Evaluation Frameworks',
        items: [
          'Context construction: Formatting prompt with source citations and page numbers',
          'Handling context window limits and eliminating irrelevant noise',
          'RAG Evaluation with RAGAS / TruLens: Context Precision, Context Recall, Faithfulness (groundedness), Answer Relevancy',
          'Preventing Hallucinations: Prompt constraints ("Only answer using the provided context; if unknown, state so")',
        ],
      },
    ],
    keyConcepts: [
      'The 9-Step End-to-End RAG Pipeline',
      'Recursive Character Chunking with Overlap (e.g. 500 chars, 50 overlap)',
      'Hybrid Search (BM25 Keyword + Dense Vector)',
      'Cross-Encoder Reranking for Precision',
      'RAGAS Evaluation: Faithfulness & Context Precision',
    ],
    practiceSuggestions: [
      'Build a complete RAG script that loads a 20-page PDF, chunks it with overlap, embeds it into ChromaDB, and answers user queries with page citations.',
      'Implement a two-stage retrieval pipeline: Retrieve 20 chunks via vector search, then rerank down to Top-4 using Cohere Rerank.',
      'Evaluate your RAG pipeline using RAGAS to compute Faithfulness and Answer Relevancy scores over 20 test questions.',
    ],
    projectSuggestions: [
      {
        title: 'Enterprise Document Intelligence & RAG Assistant',
        description: 'A complete production RAG system that ingests multi-format documents (PDFs, Markdown), performs hybrid search with metadata filters, reranks context, and outputs grounded answers with exact source citations.',
        level: 'Production AI',
      },
    ],
    commonMistakes: [
      'Using naive chunking (e.g. chunks too large causing noise, or chunks too small losing semantic context).',
      'Skipping reranking, allowing irrelevant chunks to crowd out the correct answer in the LLM context window.',
    ],
    nextStepPreview: 'Empower LLMs with tools and multi-step reasoning in Stage 08: AI Agents & Tool Use.',
  },
  {
    id: 'ai-agents-tool-use',
    stageNumber: '08',
    title: 'AI Agents & Tool Use',
    shortTitle: 'AI Agents & Tools',
    tagline: 'Function calling, tool integration (SQL, Web, APIs), ReAct reasoning loops, LangGraph stateful agents, and multi-agent systems.',
    iconName: 'Bot',
    goal: 'Learn how AI systems can reason over complex tasks, call external tools, maintain state, and execute multi-step autonomous workflows.',
    whyItMatters:
      'While a chatbot only talks, an AI Agent takes action. Agents understand complex tasks, break them into sub-goals, call tools (SQL databases, web search, calculators, APIs), observe results, and loop iteratively until the objective is accomplished.',
    learningOutcome: 'Build stateful, multi-step AI agents with tool calling, planning loops, error recovery, and LangGraph workflows.',
    recommendedApproach:
      'Use deterministic code workflows when they are simpler and more reliable. Use autonomous agents when dynamic multi-step decision-making is genuinely required.',
    technologies: ['LangGraph', 'LangChain Agents', 'OpenAI Tool Calling', 'LlamaIndex Workflows', 'Web Search / SQL Tools'],
    topics: [
      {
        category: 'Agent Fundamentals & Tool Calling',
        items: [
          'LLM Chatbot (Single Turn) vs AI Agent (Multi-Step Goal-Oriented Execution)',
          'Function Calling / Tool Calling: Defining JSON schemas for functions the LLM can invoke',
          'The ReAct Framework: Reason → Act → Observe → Loop',
          'Equipping agents with tools: Web Search (Tavily), Calculator, SQL Database querying, REST APIs, File system I/O',
        ],
      },
      {
        category: 'Stateful Agent Workflows & LangGraph',
        items: [
          'LangGraph: Building stateful, cyclic multi-agent graphs with nodes and edges',
          'Agent State Management: Tracking scratchpads, message histories, and intermediate tool outputs',
          'Planning and Task Decomposition: Breaking complex multi-step objectives into subtasks',
          'Human-in-the-Loop (HITL): Inserting confirmation approval gates for destructive tool calls (e.g. database writes, emails)',
        ],
      },
      {
        category: 'Multi-Agent Orchestration & Reliability',
        items: [
          'Multi-agent architectures: Supervisor agent orchestrating specialized worker agents (Researcher, Coder, Critic)',
          'Error recovery: Handling tool call failures, invalid arguments, and infinite loop timeouts',
          'Deterministic workflows vs Autonomous agents (When to use which)',
        ],
      },
    ],
    keyConcepts: [
      'The ReAct (Reason + Act + Observe) Loop',
      'Function / Tool Calling with JSON Schemas',
      'LangGraph State Graphs (Nodes, Edges, State)',
      'Human-in-the-Loop Approval Checkpoints',
      'Supervisor Multi-Agent Orchestration',
    ],
    practiceSuggestions: [
      'Build an AI Agent with 3 tools (Web Search, Calculator, Python REPL) that answers complex multi-step research questions.',
      'Build a Text-to-SQL Agent using LangGraph that inspects a PostgreSQL database schema, writes a SQL query, executes it, and explains the result.',
      'Implement a human-in-the-loop approval gate in LangGraph before executing any external API write action.',
    ],
    projectSuggestions: [
      {
        title: 'Autonomous Research & Market Analysis Agent',
        description: 'A multi-step autonomous agent built with LangGraph that plans research topics, searches the live web, extracts relevant data, cross-references sources, and compiles a comprehensive structured markdown report.',
        level: 'Advanced',
      },
    ],
    commonMistakes: [
      'Using an unpredictable autonomous agent for a simple deterministic business process that could be written in 10 lines of Python.',
      'Failing to set max iteration limits on agent loops, causing infinite recursive tool execution and massive API bills.',
    ],
    nextStepPreview: 'Turn prototypes into secure, monitored production systems in Stage 09: AI Engineering, Evaluation & Production.',
  },
  {
    id: 'ai-engineering-production',
    stageNumber: '09',
    title: 'AI Engineering, Evaluation & Production',
    shortTitle: 'Evaluation & Production',
    tagline: 'AI evaluation frameworks, LLM-as-a-judge, prompt injection security, semantic caching (Redis), and LLM observability (Langfuse).',
    iconName: 'ShieldCheck',
    goal: 'Learn how to transform fragile AI prototypes into secure, robust, evaluated, observable production applications.',
    whyItMatters:
      'An impressive AI demo is not a production system. Production AI applications require automated evaluation (detecting hallucinations and measuring answer groundedness), security hardening (prompt injection defense), observability, rate limiting, and cost tracking.',
    learningOutcome: 'Implement automated LLM evaluation, secure systems against prompt injection, configure observability, and optimize latency/cost.',
    technologies: ['FastAPI', 'Redis (Semantic Caching)', 'Langfuse / LangSmith (Observability)', 'DeepEval / TruLens', 'Prompt Security'],
    topics: [
      {
        category: 'AI Application Production Architecture',
        items: [
          'Full-stack architecture: Frontend UI → API Gateway → AI Orchestration → LLMs / RAG / Tools → Response Streaming',
          'Response caching & Semantic Caching with Redis to eliminate redundant LLM API costs',
          'Token rate limiting, user authentication, and quota management',
          'Graceful fallbacks and retry logic with exponential backoff for API outages',
        ],
      },
      {
        category: 'AI Evaluation & Benchmarking (LLMOps)',
        items: [
          'Why unit tests are insufficient for non-deterministic AI outputs',
          'Automated evaluation: Golden test datasets, LLM-as-a-Judge frameworks (DeepEval, RAGAS)',
          'Evaluating metrics: Groundedness, Hallucination score, Answer relevance, Toxicity, Task completion rate',
          'Continuous regression testing on prompt and model upgrades',
        ],
      },
      {
        category: 'Security Hardening & Observability',
        items: [
          'Prompt Injection defenses (Direct injection, Indirect injection from untrusted web documents)',
          'Data leakage prevention and PII (Personally Identifiable Information) masking',
          'Tool sandboxing and strict authorization permission scopes',
          'LLM Observability with Langfuse / LangSmith: Tracing multi-step agent calls, token latency, and cost analytics',
        ],
      },
    ],
    keyConcepts: [
      'LLM-as-a-Judge Automated Evaluation Pipelines',
      'Semantic Caching with Redis for Cost & Latency Reduction',
      'Prompt Injection & Indirect Injection Defense',
      'Full-Stack LLM Observability & Tracing (Langfuse)',
      'PII Redaction & Tool Sandboxing Security',
    ],
    practiceSuggestions: [
      'Set up Langfuse or LangSmith tracing in your FastAPI application to inspect execution graphs, latency, and token costs for every call.',
      'Build a test suite with DeepEval running 25 golden test cases to benchmark groundedness and hallucination rates.',
      'Implement a Redis semantic caching layer that returns cached responses for semantically similar user queries (similarity > 0.92).',
    ],
    projectSuggestions: [
      {
        title: 'Production-Hardened AI Customer Support System',
        description: 'An enterprise customer support API featuring intent classification, RAG retrieval, PII sanitization, prompt injection defenses, Redis semantic caching, Langfuse tracing, and automated evaluation suites.',
        level: 'Production AI',
      },
    ],
    commonMistakes: [
      'Shipping AI applications to users without any automated evaluation or hallucination detection benchmarks.',
      'Giving AI agents unrestricted access to execute shell commands or database write operations without sandboxing or user confirmation.',
    ],
    nextStepPreview: 'Deploy and scale production AI systems in the cloud in Stage 10: Deployment, MLOps & Real-World AI Projects.',
  },
  {
    id: 'deployment-real-world-projects',
    stageNumber: '10',
    title: 'Deployment, MLOps & Real-World AI Projects',
    shortTitle: 'Portfolio & Job Ready',
    tagline: 'Docker containerization, cloud deployment (AWS/GCP), CI/CD pipelines, portfolio presentation, and AI System Design interviews.',
    iconName: 'Rocket',
    goal: 'Learn how to deploy, scale, monitor, and assemble flagship portfolio projects that prove you are job-ready as an AI Engineer.',
    whyItMatters:
      'Companies hire AI Engineers who can take models and turn them into scalable, live, containerized software products. A portfolio showcasing end-to-end RAG systems, stateful agents, and evaluated APIs with architecture diagrams guarantees senior interviews.',
    learningOutcome: 'A complete, public portfolio of containerized AI applications deployed to the cloud, with architecture diagrams and interview mastery.',
    technologies: ['Docker', 'Docker Compose', 'AWS / GCP Cloud', 'GitHub Actions CI/CD', 'AI System Design', 'Architecture Diagrams'],
    topics: [
      {
        category: 'Containerization & Cloud Deployment',
        items: [
          'Dockerizing AI applications: Multi-stage Dockerfiles, dependency caching, lightweight Python images',
          'Docker Compose: Orchestrating Frontend, FastAPI Backend, Redis, ChromaDB, and Langfuse services',
          'Deploying containerized AI backends to Cloud Compute (AWS ECS, GCP Cloud Run, Render)',
          'Serverless deployment concepts vs dedicated GPU instances for self-hosted open-source models',
        ],
      },
      {
        category: 'Continuous Integration & Monitoring',
        items: [
          'GitHub Actions CI/CD: Automated pytest execution, linting, evaluation tests, and Docker image builds',
          'Continuous monitoring: Tracking token usage, API latencies, error rates, and user feedback signals (thumbs up/down)',
          'Cost management & model routing: Routing simple queries to cheap models (GPT-4o-mini) and hard queries to frontier models (GPT-4o/Claude)',
        ],
      },
      {
        category: 'AI Engineer Interview Mastery',
        items: [
          'AI System Design interviews: Designing complex AI systems (e.g. Enterprise RAG, Coding Assistant, Multi-Agent Support Center)',
          'Explaining trade-offs: RAG vs Fine-Tuning, Deterministic vs Agentic workflows, Small vs Large models',
          'Live Python coding & API architecture technical assessments',
          'STAR behavioral interview framework for past engineering accomplishments',
        ],
      },
    ],
    keyConcepts: [
      'Full-Stack Docker Compose Orchestration',
      'AI System Design Interview Framework',
      'Smart Model Routing (Small Fast Model vs Frontier Model)',
      'CI/CD Automated Evaluation & Deployment Pipelines',
      'Comprehensive Architecture Diagram Documentation',
    ],
    practiceSuggestions: [
      'Conduct a 45-minute mock AI System Design interview (e.g. "Design a Production Code Search & Explanation Assistant for a 1M-line Repo").',
      'Draw a complete architecture diagram for your flagship project using Excalidraw or Mermaid showing all data flows and services.',
      'Deploy a containerized multi-container AI app (FastAPI + Chroma + Streamlit) to GCP Cloud Run or AWS ECS with public URL.',
    ],
    projectSuggestions: [
      {
        title: 'Flagship End-to-End Enterprise Multi-Agent AI Platform',
        description: 'An enterprise-grade multi-agent platform with a LangGraph orchestrator, hybrid RAG pipeline, tool calling, Redis semantic caching, Langfuse observability, Docker Compose packaging, and automated CI/CD evaluation test suites.',
        level: 'Portfolio-Level',
      },
    ],
    commonMistakes: [
      'Only sharing GitHub repos with raw Jupyter notebooks instead of deployed applications with live demo links and architecture diagrams.',
      'Failing to practice AI System Design interviews, which are the #1 evaluation standard for professional AI Engineer roles.',
    ],
    nextStepPreview: 'You have the complete roadmap. Start with Stage 01, build real software systems, and engineer intelligent AI products!',
  },
];

export const AI_ENGINEER_PROJECT_PROGRESSION: AIEngineerProjectProgression[] = [
  {
    id: 'ai-proj-1',
    stage: 'Stage 06 — Beginner',
    name: 'Production-Style Multi-Turn AI Chatbot with Streaming',
    difficulty: 'Beginner',
    recommendedStack: ['Python 3', 'FastAPI', 'OpenAI / Gemini API', 'Pydantic v2', 'Server-Sent Events (SSE)'],
    skillsLearned: ['Prompt engineering', 'Token streaming with SSE', 'Conversation memory management', 'FastAPI endpoint design', 'Pydantic JSON validation'],
    description: 'An interactive streaming AI chat application featuring custom system prompts, sliding-window conversation memory, temperature controls, and structured Pydantic data extraction.',
    problemSolved: 'Provide an interactive streaming chat interface for users with zero response buffering and strict structured entity extraction.',
    aiArchitecture: 'Client UI → FastAPI SSE Streaming Endpoint → OpenAI / Gemini API → Streaming Token Response',
    evaluationMetrics: 'Time to First Token (TTFT < 500ms), 100% Pydantic schema validation success rate',
    deploymentDetails: 'FastAPI backend with streaming endpoints and local lightweight web interface.',
    monitoringDetails: 'Structured logging of token counts, latency, and model parameters.',
    githubReqs: 'Clean modular repo with src/, tests/ (pytest), requirements.txt, and documented curl examples in README.',
  },
  {
    id: 'ai-proj-2',
    stage: 'Stage 07 — Intermediate',
    name: 'Enterprise Document Intelligence & RAG Assistant',
    difficulty: 'Intermediate',
    recommendedStack: ['Python', 'LangChain / LlamaIndex', 'ChromaDB', 'Sentence-Transformers', 'Cohere Rerank', 'FastAPI'],
    skillsLearned: ['Document chunking strategies', 'Dense vector embeddings', 'Hybrid search (BM25 + Dense)', 'Cross-encoder reranking', 'Source citation formatting'],
    description: 'A complete RAG application that ingests complex multi-page PDFs, chunks text with overlap, embeds into ChromaDB, performs hybrid search, reranks context, and generates grounded answers with exact page citations.',
    problemSolved: 'Eliminate LLM hallucinations by restricting answers to private company policy manuals and financial reports with exact source citations.',
    aiArchitecture: 'PDF Ingestion → Recursive Chunking → ChromaDB → Hybrid Vector Retrieval → Cohere Reranker → Grounded LLM Prompt → Answer with Citations',
    evaluationMetrics: 'RAGAS Faithfulness: > 0.92, Context Precision: > 0.88, Zero hallucinations verified',
    deploymentDetails: 'Containerized FastAPI service with document upload endpoint and interactive query interface.',
    monitoringDetails: 'Track retrieval recall, embedding latency, and citation accuracy.',
    githubReqs: 'Full repo with sample PDF documents, benchmark evaluation script with RAGAS, and architecture diagram in README.',
  },
  {
    id: 'ai-proj-3',
    stage: 'Stage 08 — Advanced',
    name: 'Autonomous Research & Market Analysis Agent',
    difficulty: 'Advanced',
    recommendedStack: ['LangGraph', 'Python', 'Tavily Search API', 'FastAPI', 'Pydantic', 'Docker'],
    skillsLearned: ['ReAct agent loops', 'Tool calling & function schemas', 'LangGraph state management', 'Task decomposition', 'Human-in-the-loop validation'],
    description: 'An autonomous multi-step research agent that takes a complex market research topic, plans search queries, navigates the live web, extracts data, cross-references sources, and compiles a comprehensive Markdown report.',
    problemSolved: 'Automate 5+ hours of manual market research by autonomously gathering, synthesizing, and structuring data from dozens of live web sources.',
    aiArchitecture: 'LangGraph State Machine: Plan Node → Search Tool Node → Summarizer Node → Critic/Reviewer Node → Final Report Generator',
    evaluationMetrics: 'Task Completion Rate > 90%, Source Diversity (min 5 distinct sources per report), Citation Accuracy',
    deploymentDetails: 'FastAPI microservice executing background agent research jobs with status polling endpoints.',
    monitoringDetails: 'Log step-by-step agent trajectory, tool execution latencies, and total token usage.',
    githubReqs: 'Comprehensive repo with LangGraph graph definition, custom tool schemas, sample generated reports, and tests.',
  },
  {
    id: 'ai-proj-4',
    stage: 'Stage 09 — Production AI',
    name: 'Production-Hardened AI Customer Support System',
    difficulty: 'Production AI',
    recommendedStack: ['FastAPI', 'Redis (Semantic Cache)', 'Langfuse (Observability)', 'DeepEval', 'Pydantic', 'Docker'],
    skillsLearned: ['Semantic caching with Redis', 'PII sanitization', 'Prompt injection defenses', 'LLM observability & tracing', 'Automated LLM-as-a-judge evaluation'],
    description: 'A production-hardened customer support AI system featuring intent detection, RAG retrieval, PII masking, prompt injection defense, Redis semantic caching, and full Langfuse observability.',
    problemSolved: 'Serve 10,000+ support queries daily with < 50ms cached responses, zero PII leaks, and automated hallucination detection.',
    aiArchitecture: 'User Query → PII Masking → Prompt Injection Guard → Redis Semantic Cache (Hit -> Instant Return) → RAG Pipeline → Grounded Response → Langfuse Tracing',
    evaluationMetrics: 'Semantic Cache Hit Ratio > 40%, P95 Latency < 250ms on cache miss, DeepEval Hallucination Score < 0.05',
    deploymentDetails: 'Multi-container Docker Compose cluster (FastAPI + Redis + Chroma + Langfuse).',
    monitoringDetails: 'Real-time Langfuse tracing of every execution step, token cost analytics, and user feedback tracking.',
    githubReqs: 'Production repo with docker-compose.yml, security test suite, DeepEval evaluation suite, and architecture diagram.',
  },
  {
    id: 'ai-proj-5',
    stage: 'Stage 10 — Portfolio Level',
    name: 'End-to-End Enterprise Multi-Agent AI Platform',
    difficulty: 'Portfolio-Level',
    recommendedStack: ['FastAPI', 'LangGraph', 'PostgreSQL (pgvector)', 'Redis', 'Docker Compose', 'AWS ECS / GCP', 'GitHub Actions'],
    skillsLearned: ['Full-stack enterprise AI architecture', 'Stateful multi-agent orchestration', 'Hybrid RAG with pgvector', 'Model routing & cost optimization', 'CI/CD automated evaluation'],
    description: 'A flagship enterprise-grade AI platform featuring a LangGraph supervisor orchestrating specialized agents (Researcher, SQL Data Analyst, Coder), connected to a PostgreSQL pgvector knowledge base, with Redis caching, Langfuse tracing, and CI/CD evaluation pipelines.',
    problemSolved: 'Provide an enterprise-wide intelligent workspace where employees can query internal knowledge, execute database queries, and automate multi-step workflows with full security and auditability.',
    aiArchitecture: 'Frontend UI → API Gateway → Supervisor Agent (LangGraph) → [RAG Agent | SQL Agent | Web Agent] → pgvector + Redis Cache → Observability → Response',
    evaluationMetrics: 'Task Success Rate: > 94%, RAG Faithfulness: > 0.95, Average Cost per Query: < $0.02, P99 Latency: < 800ms',
    deploymentDetails: 'Multi-stage Docker containers deployed to AWS/GCP with automated GitHub Actions CI/CD running automated evaluation tests.',
    monitoringDetails: 'Complete observability dashboard tracking agent trajectories, drift, user satisfaction ratings, and token cost breakdown.',
    githubReqs: 'Flagship GitHub portfolio repository with full system architecture diagram, Dockerfile, docker-compose.yml, CI/CD pipeline, and live public demo.',
  },
];

export const AI_ENGINEER_TOOLKIT: AIToolkitCategory[] = [
  {
    category: 'PROGRAMMING & BACKEND',
    coreItems: ['Python 3.12', 'FastAPI', 'Pydantic v2', 'pytest', 'Git & GitHub'],
    specializedItems: ['TypeScript / Next.js', 'Asyncio', 'WebSockets', 'Docker'],
  },
  {
    category: 'LLM APIs & RUNTIMES',
    coreItems: ['OpenAI API', 'Google Gemini API', 'Anthropic Claude API', 'Ollama (Local LLMs)'],
    specializedItems: ['vLLM', 'Llama.cpp', 'Hugging Face Inference', 'Groq'],
  },
  {
    category: 'RAG & ORCHESTRATION',
    coreItems: ['LangChain', 'LlamaIndex', 'Recursive Chunking', 'Cohere Rerank'],
    specializedItems: ['Hybrid Search (BM25)', 'Contextual Compression', 'RAGAS'],
  },
  {
    category: 'VECTOR DATABASES',
    coreItems: ['ChromaDB', 'FAISS', 'Pinecone'],
    specializedItems: ['Qdrant', 'Weaviate', 'pgvector (PostgreSQL)', 'Milvus'],
  },
  {
    category: 'AI AGENTS & STATE',
    coreItems: ['LangGraph', 'Tool Calling / Function Schemas', 'ReAct Loop'],
    specializedItems: ['CrewAI', 'AutoGen', 'Multi-Agent Supervisor', 'Human-in-the-Loop'],
  },
  {
    category: 'EVALUATION & OBSERVABILITY',
    coreItems: ['Langfuse', 'DeepEval', 'Structured JSON Logging'],
    specializedItems: ['LangSmith', 'TruLens', 'PromptFoo', 'Arize Phoenix'],
  },
  {
    category: 'DEPLOYMENT & CLOUD',
    coreItems: ['Docker', 'Docker Compose', 'AWS or GCP Cloud'],
    specializedItems: ['Redis (Semantic Cache)', 'GitHub Actions CI/CD', 'Kubernetes'],
  },
];

export const AI_SPECIALIZATIONS: AISpecialization[] = [
  {
    title: 'Generative AI Engineer',
    description: 'Build production LLM applications, advanced RAG knowledge systems, structured prompt pipelines, and model integrations.',
    coreTech: ['Python', 'FastAPI', 'LangChain / LlamaIndex', 'Vector DBs', 'RAGAS'],
    focus: 'LLMs, RAG, Structured Outputs, Embeddings, Prompt Engineering',
    icon: 'Sparkles',
  },
  {
    title: 'AI Agent Engineer',
    description: 'Design autonomous multi-step reasoning workflows, tool calling systems, state machines, and multi-agent coordination.',
    coreTech: ['LangGraph', 'OpenAI Function Calling', 'Python', 'State Graphs', 'APIs'],
    focus: 'Tool Calling, Agent Workflows, Orchestration, Multi-Step Reasoning',
    icon: 'Bot',
  },
  {
    title: 'NLP & Language Engineer',
    description: 'Build text classification systems, fine-tune transformer models, domain-specific embeddings, and semantic search platforms.',
    coreTech: ['Hugging Face', 'Transformers', 'PyTorch', 'Tokenizers', 'BERT / GPT'],
    focus: 'Transformers, Fine-Tuning, Semantic Search, Text Embeddings',
    icon: 'MessageSquare',
  },
  {
    title: 'Computer Vision Engineer',
    description: 'Process and analyze visual imagery: object detection, image classification, segmentation, and vision transformers.',
    coreTech: ['OpenCV', 'PyTorch', 'YOLO', 'Torchvision', 'Vision Transformers (ViT)'],
    focus: 'Image Understanding, Object Detection, Segmentation, Video',
    icon: 'Layers',
  },
  {
    title: 'Multimodal AI Engineer',
    description: 'Develop systems processing cross-modal data: text, voice/audio, vision, and documents in unified multimodal pipelines.',
    coreTech: ['Gemini Multimodal', 'GPT-4o Vision', 'Whisper (Speech)', 'CLIP', 'Vector DBs'],
    focus: 'Vision-Language Models, Voice AI, Cross-Modal Embeddings',
    icon: 'Layers3',
  },
  {
    title: 'AI Platform & LLMOps Engineer',
    description: 'Architect enterprise AI infrastructure: low-latency model serving, semantic caching, automated evaluation, and security.',
    coreTech: ['Docker', 'Kubernetes', 'Langfuse', 'Redis', 'AWS/GCP', 'vLLM'],
    focus: 'AI Infrastructure, Semantic Caching, Observability, Scaling, Security',
    icon: 'Server',
  },
];

export const AI_ENGINEER_COMMON_MISTAKES = [
  {
    title: 'Learning Only Prompt Engineering (Ignoring Software Engineering)',
    solution: 'Master Python, async FastAPI backends, Pydantic validation, and testing. Prompts are just one component of a production software system.',
  },
  {
    title: 'Using Complex Autonomous Agents Where a Simple Workflow Suffices',
    solution: 'Use deterministic Python code for straightforward workflows. Use agents only when dynamic multi-step decision-making is genuinely necessary.',
  },
  {
    title: 'Building RAG Without Understanding Retrieval Quality',
    solution: 'Optimize chunking strategies, use hybrid search (BM25 + vectors), and add a reranker (Cohere) to ensure only relevant context reaches the LLM.',
  },
  {
    title: 'Deploying AI Applications Without Automated Evaluation',
    solution: 'Set up golden test datasets and automated evaluation suites (DeepEval / RAGAS) to detect hallucinations and measure groundedness before shipping.',
  },
  {
    title: 'Ignoring Latency, Token Costs & Semantic Caching',
    solution: 'Implement response streaming (SSE), use semantic caching with Redis for repetitive queries, and route simple queries to smaller, faster models.',
  },
  {
    title: 'Ignoring Security (Prompt Injections & Data Leakage)',
    solution: 'Sanitize untrusted inputs, mask PII before sending to external APIs, and never give tools unrestricted database or shell access without confirmation.',
  },
  {
    title: 'Assuming a Bigger Model Always Solves Bad System Design',
    solution: 'A well-engineered RAG pipeline with a small fast model (e.g. GPT-4o-mini or Llama 3 8B) frequently outperforms an ungrounded frontier model.',
  },
  {
    title: 'Building Only Simple Wrapper Prototypes That Never Reach Production',
    solution: 'Package your projects with Docker, write unit tests, include architecture diagrams, and deploy live publicly accessible APIs.',
  },
];

export const AI_ENGINEER_FOUR_PILLARS = [
  {
    title: 'Software Engineering',
    subtitle: 'Modular Python, async FastAPI backends, Pydantic validation, pytest testing suites, and clean API design.',
    icon: 'Terminal',
  },
  {
    title: 'AI & ML Knowledge',
    subtitle: 'Understanding embeddings, tokenization, Transformers, attention mechanisms, and model training dynamics.',
    icon: 'Brain',
  },
  {
    title: 'AI Application Engineering',
    subtitle: 'Building production RAG pipelines, stateful LangGraph agents, tool integrations, and semantic caching.',
    icon: 'Sparkles',
  },
  {
    title: 'Systems & Production Thinking',
    subtitle: 'Automated evaluation (RAGAS), prompt security, LLM observability (Langfuse), Docker, and cloud scaling.',
    icon: 'Server',
  },
];

export const AI_APPLICATION_ARCHITECTURE_STEPS = [
  { step: '1', title: 'User Interface', desc: 'Web frontend or client application sending requests' },
  { step: '2', title: 'API Gateway', desc: 'FastAPI backend handling auth, rate limiting & validation' },
  { step: '3', title: 'Security & PII Guard', desc: 'Sanitize inputs, mask PII & detect prompt injections' },
  { step: '4', title: 'Semantic Cache', desc: 'Redis cache checking for identical semantic queries' },
  { step: '5', title: 'AI Orchestration', desc: 'LangGraph workflow or agent managing execution plan' },
  { step: '6', title: 'RAG Retrieval', desc: 'Vector DB hybrid search & Cohere cross-encoder reranking' },
  { step: '7', title: 'Tool Execution', desc: 'Invoking SQL queries, web search, or external APIs' },
  { step: '8', title: 'LLM Generation', desc: 'Frontier or local model streaming grounded response' },
  { step: '9', title: 'Evaluation & Tracing', desc: 'Langfuse logging traces, latency, token cost & metrics' },
  { step: '10', title: 'Streaming Response', desc: 'Real-time Server-Sent Events (SSE) token delivery' },
];

export const RAG_ARCHITECTURE_STEPS = [
  { step: '1', title: 'Documents', desc: 'PDFs, Markdown, Web pages & DB tables' },
  { step: '2', title: 'Ingestion & Cleaning', desc: 'Extract raw text, strip artifacts & sanitize' },
  { step: '3', title: 'Chunking', desc: 'Recursive splitting with overlap (500 chars / 50 overlap)' },
  { step: '4', title: 'Embedding', desc: 'Transform chunks into dense vector embeddings' },
  { step: '5', title: 'Vector Database', desc: 'Indexed in Chroma, Pinecone, or pgvector' },
  { step: '6', title: 'Hybrid Retrieval', desc: 'BM25 keyword search + Dense semantic search' },
  { step: '7', title: 'Cross-Encoder Reranking', desc: 'Score & filter top 3-5 most relevant chunks' },
  { step: '8', title: 'Context Construction', desc: 'Format prompt with retrieved text & citations' },
  { step: '9', title: 'LLM Generation', desc: 'Model generates answer grounded strictly in context' },
  { step: '10', title: 'Grounded Answer', desc: 'Verified response with source page citations' },
];

export const AI_AGENT_ARCHITECTURE_STEPS = [
  { step: '1', title: 'User Request', desc: 'Complex multi-step goal or question submitted by user' },
  { step: '2', title: 'Task Understanding', desc: 'Agent parses goal, constraints, and available tools' },
  { step: '3', title: 'Planning', desc: 'Decomposes objective into sequential sub-tasks' },
  { step: '4', title: 'Tool Selection', desc: 'Selects optimal tool (SQL, Web Search, Calculator, API)' },
  { step: '5', title: 'Tool Execution', desc: 'Invokes function with structured JSON arguments' },
  { step: '6', title: 'Observation', desc: 'Parses tool output and checks if sub-goal is achieved' },
  { step: '7', title: 'Reason & Loop', desc: 'Determines whether next tool is needed (ReAct loop)' },
  { step: '8', title: 'Final Response', desc: 'Compiles synthesized result and returns answer to user' },
];

export const AI_ENGINEER_THINKING_LADDER = [
  { step: '1', label: 'PROBLEM VALIDATION', question: 'Does this problem actually require AI, or is deterministic code better?' },
  { step: '2', label: 'CAPABILITY MAPPING', question: 'What model capability is needed (fast small model vs frontier reasoning model)?' },
  { step: '3', label: 'KNOWLEDGE & RAG', question: 'Does the model need private external data and how will we ensure high retrieval precision?' },
  { step: '4', label: 'TOOL INTEGRATION', question: 'Does the system need to take actions (call APIs, query SQL) or just answer text?' },
  { step: '5', label: 'WORKFLOW DESIGN', question: 'Can this be a reliable deterministic pipeline, or does it require an autonomous agent loop?' },
  { step: '6', label: 'EVALUATION & SAFETY', question: 'How will we automatically evaluate hallucinations and secure against prompt injection?' },
  { step: '7', label: 'PRODUCTION SCALING', question: 'How will we stream responses, cache semantically, monitor latency, and track token costs?' },
];

export const AI_EVALUATION_CRITERIA = [
  {
    category: 'QUALITY & FAITHFULNESS',
    metrics: [
      { name: 'Faithfulness (Groundedness)', desc: 'Measures if the generated answer is strictly grounded in the retrieved context without hallucinating external facts.' },
      { name: 'Answer Relevance', desc: 'Measures if the generated output directly addresses the user query without irrelevant fluff.' },
      { name: 'Context Precision', desc: 'Measures if the retrieved chunks were truly relevant to the query and ranked near the top.' },
    ],
  },
  {
    category: 'RELIABILITY & SAFETY',
    metrics: [
      { name: 'Prompt Injection Resistance', desc: 'Validates that the model ignores adversarial instructions embedded in user queries or documents.' },
      { name: 'PII Data Protection', desc: 'Ensures sensitive personal data (emails, credit cards, SSNs) is masked before external API calls.' },
      { name: 'Tool Execution Success Rate', desc: 'Measures the percentage of tool calls executed with valid JSON arguments without error.' },
    ],
  },
  {
    category: 'PERFORMANCE & COST',
    metrics: [
      { name: 'Time to First Token (TTFT)', desc: 'Measures perceived latency before the user sees the first streamed token (Target < 500ms).' },
      { name: 'Token Cost Optimization', desc: 'Measures average cost per query through prompt compression and semantic caching.' },
      { name: 'Semantic Cache Hit Ratio', desc: 'Percentage of repeated queries served instantly from Redis cache without calling LLMs.' },
    ],
  },
];
