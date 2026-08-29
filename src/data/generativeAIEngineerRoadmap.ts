export interface GenAIRoadmapStage {
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

export interface GenAIProjectProgression {
  id: string;
  stage: string;
  name: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Production GenAI' | 'Portfolio-Level';
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

export interface GenAISpecialization {
  title: string;
  description: string;
  coreTech: string[];
  focus: string;
  icon: string;
}

export interface GenAIToolkitCategory {
  category: string;
  coreItems: string[];
  advancedItems: string[];
}

export const GENAI_ROADMAP_STAGES: GenAIRoadmapStage[] = [
  {
    id: 'python-software-engineering',
    stageNumber: '01',
    title: 'Python & Software Engineering',
    shortTitle: 'Python & Engineering',
    tagline: 'Build the foundational engineering skills required to develop robust, modular, async GenAI applications.',
    iconName: 'Terminal',
    goal: 'Build strong software engineering fundamentals before working with complex GenAI systems.',
    whyItMatters:
      'GenAI applications are software applications. Prompting is only 10% of the work; the remaining 90% is asynchronous API design, Pydantic validation, structured logging, rate limiting, error fallbacks, and automated testing.',
    learningOutcome: 'Build clean, type-safe Python applications and asynchronous APIs using FastAPI and pytest that can serve as the foundation for GenAI systems.',
    recommendedApproach:
      'Treat GenAI backends as production software from day one: write typed functions, use Pydantic models for data validation, and write pytest unit tests with mock API fixtures.',
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
        category: 'Software Engineering Best Practices',
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
      'Asynchronous Streaming (SSE) for Real-Time LLM Tokens',
      'Pydantic v2 Data Modeling & Schema Enforcement',
      'SOLID Architecture in GenAI Microservices',
      'Unit & Integration Testing with Mock AI Fixtures',
      'Secure Secrets Management (.env & Cloud Secrets)',
    ],
    practiceSuggestions: [
      'Build an async FastAPI service that streams text tokens back to the client using Server-Sent Events (StreamingResponse).',
      'Write a pytest test suite using unittest.mock to test AI API endpoints without incurring actual API billing charges.',
      'Refactor a messy notebook into a clean, modular Python package with config management, typed interfaces, and error handlers.',
    ],
    projectSuggestions: [
      {
        title: 'Asynchronous Streaming API Boilerplate',
        description: 'A modular, typed FastAPI backend featuring Pydantic schemas, streaming endpoints, structured JSON logging, rate limiting, and 90%+ pytest test coverage.',
        level: 'Beginner',
      },
    ],
    commonMistakes: [
      'Writing synchronous blocking API endpoints for slow LLM calls, freezing the server under concurrent traffic.',
      'Hardcoding API keys directly into source code repositories instead of using environment variables.',
    ],
    nextStepPreview: 'Understand how machine learning algorithms learn patterns from data in Stage 02: AI & ML Foundations.',
  },
  {
    id: 'ai-ml-foundations',
    stageNumber: '02',
    title: 'AI & Machine Learning Foundations',
    shortTitle: 'AI & ML Basics',
    tagline: 'Supervised vs unsupervised learning, bias-variance tradeoff, cross-validation, and classical evaluation metrics.',
    iconName: 'Brain',
    goal: 'Understand the machine learning concepts required to understand modern Generative AI.',
    whyItMatters:
      'Generative AI engineers need enough ML knowledge to understand how models generalize, why overfitting occurs, how training/validation splits work, and how to evaluate classification or regression outputs.',
    learningOutcome: 'Understand the foundational machine learning mechanisms that underpin modern neural architectures.',
    recommendedApproach:
      'Generative AI engineers need enough ML knowledge to understand how models learn, but their main specialization comes with deep learning and transformers.',
    technologies: ['NumPy', 'Pandas', 'Scikit-learn', 'Logistic Regression', 'Random Forest', 'K-Means'],
    topics: [
      {
        category: 'Machine Learning Fundamentals',
        items: [
          'Supervised vs Unsupervised learning paradigms',
          'Features, labels, training sets, validation sets, and test sets',
          'The Bias-Variance Tradeoff (Underfitting vs Overfitting)',
          'Regularization techniques (L1 Lasso, L2 Ridge) and Cross-Validation',
        ],
      },
      {
        category: 'Core Algorithms & Dimensionality Reduction',
        items: [
          'Linear Regression and Logistic Regression (Sigmoid activation)',
          'Decision Trees and Random Forest ensemble methods',
          'K-Means clustering and Principal Component Analysis (PCA)',
        ],
      },
      {
        category: 'Model Evaluation Metrics',
        items: [
          'Classification: Accuracy, Precision, Recall, F1-Score, ROC-AUC, Confusion Matrix',
          'Regression: MAE, MSE, RMSE',
          'Evaluating imbalanced datasets (PR-AUC vs Accuracy)',
        ],
      },
    ],
    keyConcepts: [
      'Bias-Variance Tradeoff (Generalization vs Memorization)',
      'Precision vs Recall Tradeoff',
      'Train / Validation / Test Splitting',
      'Dimensionality Reduction with PCA',
      'Scikit-learn Pipeline Encapsulation',
    ],
    practiceSuggestions: [
      'Train a text intent classifier using TF-IDF features and Logistic Regression, evaluating F1-Score on test data.',
      'Demonstrate overfitting by training an unconstrained Decision Tree vs a regularized Random Forest.',
      'Perform PCA on a high-dimensional dataset to project features into 2D for visual cluster inspection.',
    ],
    projectSuggestions: [
      {
        title: 'Customer Intent & Sentiment Classifier Pipeline',
        description: 'A modular Scikit-learn classification pipeline preprocessing text, training a tuned classifier, and serving predictions with cross-validated evaluation metrics.',
        level: 'Beginner',
      },
    ],
    commonMistakes: [
      'Relying solely on Accuracy when evaluating imbalanced datasets, missing all rare minority class occurrences.',
      'Getting bogged down in traditional ML algorithms without progressing toward deep learning and language models.',
    ],
    nextStepPreview: 'Unpack the mechanics of neural networks in Stage 03: Deep Learning & Neural Networks.',
  },
  {
    id: 'deep-learning',
    stageNumber: '03',
    title: 'Deep Learning & Neural Networks',
    shortTitle: 'Deep Learning',
    tagline: 'PyTorch, neural network fundamentals, activation functions, loss functions, backpropagation, and GPU acceleration.',
    iconName: 'Cpu',
    goal: 'Understand neural networks and the training process behind modern generative models.',
    whyItMatters:
      'All generative models (LLMs, Diffusion models, Audio models) are deep neural networks. Understanding weights, biases, backpropagation, activation functions, loss curves, and GPU tensor operations is essential for fine-tuning and debugging models.',
    learningOutcome: 'Understand the core mechanics behind deep learning models and build neural training loops in PyTorch.',
    recommendedApproach:
      'Focus on understanding how neural networks learn rather than memorizing architectures.',
    technologies: ['PyTorch', 'Torchvision', 'CUDA / GPU Acceleration', 'Activation Functions (ReLU, GELU)', 'TensorBoard'],
    topics: [
      {
        category: 'Neural Network Foundations',
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
        category: 'Core Architectures Overview',
        items: [
          'Feedforward networks, Convolutional Neural Networks (CNNs)',
          'Recurrent Neural Networks (RNNs, LSTMs, GRUs) for sequential data',
          'Autoencoders for latent space representations and compression',
        ],
      },
    ],
    keyConcepts: [
      'Autograd Engine & Backpropagation Chain Rule',
      'Activation Functions (Why GELU is standard in modern LLMs)',
      'PyTorch Dataset & DataLoader Pipeline',
      'GPU Tensor Acceleration (.to("cuda"))',
      'Overfitting Prevention via Dropout and Early Stopping',
    ],
    practiceSuggestions: [
      'Write a complete PyTorch training loop from scratch with validation loss tracking and early stopping.',
      'Implement the Softmax function from scratch and observe how temperature scaling affects probability distributions.',
      'Visualize neural network loss curves and parameter updates in TensorBoard.',
    ],
    projectSuggestions: [
      {
        title: 'From-Scratch PyTorch Neural Classification Engine',
        description: 'A modular PyTorch application with custom Dataset/DataLoader pipelines, AdamW optimization, learning rate scheduling, GPU acceleration, and TensorBoard logging.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Forgetting optimizer.zero_grad() inside the PyTorch training loop, causing gradients to accumulate across batches.',
      'Not setting model.eval() and torch.no_grad() during inference, wasting GPU memory.',
    ],
    nextStepPreview: 'Discover the breakthrough architecture behind modern language AI in Stage 04: NLP & Transformers.',
  },
  {
    id: 'nlp-transformers',
    stageNumber: '04',
    title: 'NLP & Transformers',
    shortTitle: 'NLP & Transformers',
    tagline: 'Text tokenization, vector embeddings, Self-Attention mechanism, Transformer architecture, BERT, GPT, and Hugging Face.',
    iconName: 'Network',
    goal: 'Understand the technology that enabled modern language models.',
    whyItMatters:
      'The Transformer architecture (Attention Is All You Need) is the foundational breakthrough behind GPT, Claude, Gemini, Llama, and all modern generative AI. Understanding Self-Attention, Query/Key/Value projections, and tokenizers is crucial.',
    learningOutcome: 'Understand why Transformers became the foundation of modern language generation and use Hugging Face tokenizers/models.',
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
      'Using encoder-only models (like BERT) for autoregressive text generation instead of decoder models (like GPT).',
    ],
    nextStepPreview: 'Unpack the mechanics of state-of-the-art foundation models in Stage 05: Large Language Models.',
  },
  {
    id: 'large-language-models',
    stageNumber: '05',
    title: 'Large Language Models (LLMs)',
    shortTitle: 'LLM Fundamentals',
    tagline: 'Parameters, tokens, context windows, sampling controls (temperature, top-p), commercial APIs, and open-source models with Ollama.',
    iconName: 'Sparkles',
    goal: 'Understand how modern LLMs work and how to use them effectively for generative applications.',
    whyItMatters:
      'LLMs are foundation models capable of reasoning, translation, summarization, and code generation. Understanding parameters, context window limits, sampling controls (temperature, top-p), commercial vs open-source models, and quantization is vital.',
    learningOutcome: 'Understand how LLMs generate text, manage context windows, and select models for different application use-cases.',
    recommendedApproach:
      'Learn model capabilities, costs, and latency trade-offs, not just one provider’s API.',
    technologies: ['OpenAI API', 'Google Gemini API', 'Anthropic Claude API', 'Ollama (Local LLMs)', 'Llama 3 / Mistral', 'vLLM'],
    topics: [
      {
        category: 'LLM Mechanics & Training Lifecycle',
        items: [
          'What is an LLM: Autoregressive next-token prediction at scale',
          'Pretraining on internet-scale text (Self-Supervised Learning)',
          'Supervised Fine-Tuning (SFT) and Instruction Tuning',
          'Alignment: Reinforcement Learning from Human Feedback (RLHF) and Direct Preference Optimization (DPO)',
          'Context windows (128k, 1M+ tokens) and parameter sizes (8B, 70B, 405B)',
        ],
      },
      {
        category: 'Inference & Generation Controls',
        items: [
          'Temperature: 0.0 (deterministic) vs 0.7+ (creative stochastic sampling)',
          'Top-p (Nucleus Sampling), Top-k sampling, Max Tokens, and Stop Sequences',
          'Base models vs Instruction-tuned vs Chat vs Multimodal models',
        ],
      },
      {
        category: 'Commercial APIs & Open-Source Local Inference',
        items: [
          'Commercial APIs: OpenAI (GPT-4o), Google AI (Gemini 1.5 Pro/Flash), Anthropic (Claude 3.5 Sonnet)',
          'Open-source models: Meta Llama 3, Mistral, Gemma running locally via Ollama and vLLM',
          'Model quantization concepts (GGUF, 4-bit, 8-bit quantization for consumer GPUs)',
          'Context management, conversation message history formatting (System, User, Assistant)',
        ],
      },
    ],
    keyConcepts: [
      'Autoregressive Next-Token Generation',
      'Temperature & Top-p Sampling Controls',
      'Context Window Budget Management',
      'Local Open-Source Model Inference with Ollama',
      'Model Quantization (GGUF 4-bit vs 16-bit FP)',
    ],
    practiceSuggestions: [
      'Write a Python script calling both OpenAI and Gemini APIs, comparing latency and output differences for the same prompt.',
      'Run Llama 3 locally using Ollama and connect it to a Python script via its REST API.',
      'Test the effect of Temperature 0.0 vs 1.2 across 10 repeated generations to observe variance.',
    ],
    projectSuggestions: [
      {
        title: 'Multi-Provider LLM Benchmark & Comparison Hub',
        description: 'A Python application that queries multiple commercial and open-source LLMs simultaneously, comparing latency, token consumption, and response quality across standard evaluation prompts.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Using Temperature 1.0 for strict JSON extraction tasks where Temperature 0.0 is needed for determinism.',
      'Accumulating infinite chat history in the context window until the token limit is exceeded and API costs skyrocket.',
    ],
    nextStepPreview: 'Master the art of reliable instruction and structured output design in Stage 06: Prompt Engineering.',
  },
  {
    id: 'prompt-engineering',
    stageNumber: '06',
    title: 'Prompt Engineering & Structured Outputs',
    shortTitle: 'Prompt Engineering',
    tagline: 'Role prompting, few-shot exemplars, structured JSON schemas with Pydantic, prompt chaining, and hallucination reduction.',
    iconName: 'MessageSquare',
    goal: 'Learn how to communicate with generative models reliably and structure their outputs.',
    whyItMatters:
      'Unstructured natural language outputs break production systems. Professional prompt engineering uses strict formatting, role definitions, few-shot examples, and Pydantic JSON schema enforcement to produce deterministic, testable outputs.',
    learningOutcome: 'Write prompts that produce predictable, testable, structured outputs conforming strictly to Pydantic JSON schemas.',
    recommendedApproach:
      'Focus on observable outputs, structured reasoning strategies, and reliable system design. Never rely on hidden chain-of-thought extraction.',
    technologies: ['Pydantic v2', 'JSON Schema Enforcement', 'Prompt Templates', 'Few-Shot Prompting', 'System Prompts'],
    topics: [
      {
        category: 'Prompt Fundamentals & Instruction Design',
        items: [
          'Clear instruction design, role prompting, and delimiter formatting (XML/Markdown tags)',
          'Few-shot prompting: Providing 2-3 high-quality input/output exemplars',
          'Structured prompting & Chain-of-Thought prompting (asking the model to think step-by-step)',
          'Context injection, negative constraints, and output boundaries',
        ],
      },
      {
        category: 'Structured JSON Outputs & Schema Validation',
        items: [
          'Enforcing strict JSON outputs via API JSON Mode / Structured Outputs',
          'Pydantic v2 schema generation and runtime validation',
          'Handling schema validation errors with automated retry prompts',
        ],
      },
      {
        category: 'Prompt Patterns & Reliability',
        items: [
          'Common patterns: Classification, Entity Extraction, Summarization, Transformation, Question Answering',
          'Prompt templates, parameterized variable injection, and prompt versioning',
          'Prompt chaining: Breaking complex generation tasks into sequential sub-prompts',
          'Reducing hallucinations via grounding constraints ("Only answer based on facts provided")',
        ],
      },
    ],
    keyConcepts: [
      'Few-Shot Prompting with Exemplars',
      'Strict Pydantic JSON Schema Validation',
      'Delimiter Formatting (XML tags like <context>...</context>)',
      'Prompt Chaining for Multi-Step Tasks',
      'Grounding Constraints to Prevent Hallucinations',
    ],
    practiceSuggestions: [
      'Write a Python script that forces an LLM to extract names, dates, and amounts from an unstructured invoice into a Pydantic model.',
      'Implement an automated retry loop that re-prompts the LLM with the validation error message if the output JSON fails Pydantic parsing.',
      'Build a prompt chain that first extracts key facts from a news article, then summarizes each fact in 1 sentence.',
    ],
    projectSuggestions: [
      {
        title: 'Structured AI Content Generation & Extraction API',
        description: 'A production FastAPI service that accepts unstructured text documents, executes prompt chains, and returns validated, typed Pydantic JSON entities with automated fallback handling.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Relying on vague natural language prompts without JSON constraints, leading to unpredictable parsing errors.',
      'Treating every problem as a prompt problem instead of using external knowledge (RAG) or fine-tuning when needed.',
    ],
    nextStepPreview: 'Represent knowledge mathematically in Stage 07: Embeddings & Vector Databases.',
  },
  {
    id: 'embeddings-vector-databases',
    stageNumber: '07',
    title: 'Embeddings & Vector Databases',
    shortTitle: 'Embeddings & Vector DBs',
    tagline: 'Dense vector embeddings, cosine similarity, chunking strategies, Approximate Nearest Neighbor search, and Vector DBs.',
    iconName: 'Database',
    goal: 'Understand how AI systems represent information semantically and retrieve relevant knowledge.',
    whyItMatters:
      'Embeddings convert words, sentences, and documents into high-dimensional vectors where semantically similar concepts are located close to each other. Vector databases enable sub-millisecond similarity search across millions of documents.',
    learningOutcome: 'Understand how AI applications represent and retrieve relevant information using vector representations and vector databases.',
    technologies: ['Sentence-Transformers', 'ChromaDB', 'FAISS', 'Pinecone', 'Cosine Similarity', 'Text Chunking'],
    topics: [
      {
        category: 'Vector Embeddings & Similarity Math',
        items: [
          'What are embeddings: Transforming text into high-dimensional vectors (e.g. 1536 dimensions)',
          'Semantic similarity vs keyword matching',
          'Cosine similarity math: cos(θ) = (A · B) / (||A|| ||B||)',
          'Distance metrics: Cosine Distance, Euclidean (L2) Distance, Dot Product',
          'Embedding models: OpenAI text-embedding-3, BGE, all-MiniLM-L6-v2',
        ],
      },
      {
        category: 'Text Chunking Strategies',
        items: [
          'Fixed-size chunking vs Recursive character chunking vs Semantic chunking',
          'Chunk size and Chunk overlap trade-offs (e.g. 500 characters with 50 overlap)',
          'Preserving metadata (source URL, document title, page number, timestamp)',
        ],
      },
      {
        category: 'Vector Databases & Indexing',
        items: [
          'Approximate Nearest Neighbor (ANN) search algorithms (HNSW, IVF)',
          'Embedded local vector DBs: ChromaDB, FAISS',
          'Managed cloud vector DBs: Pinecone, Weaviate, Qdrant, pgvector (PostgreSQL)',
          'Metadata filtering (filtering search results by user_id, date, or category)',
          'Top-K retrieval scoring and distance thresholds',
        ],
      },
    ],
    keyConcepts: [
      'Dense High-Dimensional Vector Representations',
      'Cosine Similarity Search in Vector Space',
      'Recursive Character Chunking with Overlap',
      'Hierarchical Navigable Small World (HNSW) Indexing',
      'Metadata Filtering in Vector Databases',
    ],
    practiceSuggestions: [
      'Write a Python script that embeds 100 sentences into ChromaDB and performs Top-3 semantic search for a query.',
      'Compare search results between naive fixed-size chunking and recursive character chunking with overlap.',
      'Perform metadata-filtered vector search in ChromaDB (e.g., retrieve chunks where category == "legal").',
    ],
    projectSuggestions: [
      {
        title: 'Semantic Document Search Engine',
        description: 'A semantic search engine that ingests documents, chunks text with overlap, computes dense vector embeddings, indexes them into ChromaDB, and returns ranked search results with similarity scores and metadata filters.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Using chunks that are too large (introducing irrelevant noise) or too small (losing semantic context).',
      'Forgetting to store document metadata alongside embeddings, making it impossible to cite source pages.',
    ],
    nextStepPreview: 'Connect vector search to language models in Stage 08: Retrieval Augmented Generation (RAG).',
  },
  {
    id: 'rag-architecture',
    stageNumber: '08',
    title: 'Retrieval Augmented Generation (RAG)',
    shortTitle: 'RAG Architecture',
    tagline: 'Document ingestion, hybrid search (BM25 + vector), Cohere cross-encoder reranking, context construction, and RAGAS evaluation.',
    iconName: 'Search',
    goal: 'Learn how to connect LLMs with external, private, and real-time knowledge bases.',
    whyItMatters:
      'LLMs lack access to private company documents and up-to-date data. RAG (Retrieval Augmented Generation) solves this by fetching relevant document chunks from a vector database and injecting them into the LLM prompt as grounded context with citations.',
    learningOutcome: 'Build, optimize, and evaluate production-grade RAG systems with hybrid search, reranking, and citation generation.',
    recommendedApproach:
      'Good RAG is primarily a retrieval and evaluation problem, not simply a vector database problem. Retrieval quality directly determines generation quality.',
    technologies: ['LangChain', 'LlamaIndex', 'ChromaDB', 'Cohere Rerank', 'RAGAS', 'BM25 Hybrid Search'],
    topics: [
      {
        category: 'The Production RAG Architecture',
        items: [
          'The Complete RAG Pipeline: Ingestion → Chunking → Embeddings → Vector DB → Retrieval → Reranking → Context → LLM → Grounded Response → Citations',
          'Document loaders (PDF, Markdown, HTML, CSV, DOCX) and text sanitization',
          'Context construction: Formatting prompt with source citations and page numbers',
          'Preventing Hallucinations: Strict grounding prompt constraints',
        ],
      },
      {
        category: 'Advanced Retrieval & Reranking',
        items: [
          'Hybrid Search: Combining BM25 keyword search with dense vector semantic search',
          'Cross-Encoder Reranking (Cohere Rerank, BGE-Reranker) to score top retrieved chunks',
          'Query Rewriting and Multi-Query Retrieval to expand user intent',
          'Parent-Child Retrieval (retrieving small chunks for search, returning parent text for context)',
        ],
      },
      {
        category: 'RAG Evaluation & Quality Metrics',
        items: [
          'Evaluating RAG with RAGAS / TruLens frameworks',
          'Context Precision: Measuring if retrieved chunks were relevant',
          'Context Recall: Measuring if all necessary information was retrieved',
          'Faithfulness (Groundedness): Measuring if the answer is grounded strictly in context',
          'Answer Relevance: Measuring if the answer directly addresses the query',
        ],
      },
    ],
    keyConcepts: [
      'The 9-Step End-to-End RAG Pipeline',
      'Hybrid Search (BM25 Keyword + Dense Vector)',
      'Cross-Encoder Reranking for Precision',
      'Query Rewriting & Expansion',
      'RAGAS Evaluation: Faithfulness & Context Precision',
    ],
    practiceSuggestions: [
      'Build a complete RAG script that loads a 20-page PDF, chunks it with overlap, embeds it into ChromaDB, and answers user queries with page citations.',
      'Implement a two-stage retrieval pipeline: Retrieve 20 chunks via vector search, then rerank down to Top-4 using Cohere Rerank.',
      'Evaluate your RAG pipeline using RAGAS to compute Faithfulness and Answer Relevancy scores over 20 test questions.',
    ],
    projectSuggestions: [
      {
        title: 'Enterprise Document Intelligence & RAG Platform',
        description: 'A complete production RAG system that ingests multi-format documents (PDFs, Markdown), performs hybrid search with metadata filters, reranks context with Cohere, and outputs grounded answers with exact source citations.',
        level: 'Production GenAI',
      },
    ],
    commonMistakes: [
      'Skipping reranking, allowing irrelevant chunks to crowd out the correct answer in the LLM context window.',
      'Assuming that adding a vector database automatically produces good answers without testing retrieval precision.',
    ],
    nextStepPreview: 'Learn when and how to customize model weights in Stage 09: Fine-Tuning & Model Adaptation.',
  },
  {
    id: 'fine-tuning-adaptation',
    stageNumber: '09',
    title: 'Fine-Tuning & Model Adaptation',
    shortTitle: 'Fine-Tuning & PEFT',
    tagline: 'Supervised Fine-Tuning (SFT), Parameter-Efficient Fine-Tuning (LoRA, QLoRA), dataset preparation, and evaluation.',
    iconName: 'Sliders',
    goal: 'Understand when and how to customize models beyond prompting and RAG.',
    whyItMatters:
      'While RAG provides new factual knowledge, Fine-Tuning teaches the model a specific behavioral style, complex formatting, domain vocabulary, or specialized task reasoning. Parameter-Efficient Fine-Tuning (LoRA/QLoRA) makes fine-tuning accessible on single GPUs.',
    learningOutcome: 'Know when to use prompting, RAG, or fine-tuning, and fine-tune open-source models using LoRA/QLoRA.',
    recommendedApproach:
      'Do not fine-tune simply because you can. Always check if Prompt Engineering or RAG can solve the problem first.',
    technologies: ['Hugging Face PEFT', 'LoRA', 'QLoRA', 'TRL (Transformer Reinforcement Learning)', 'Datasets', 'BitsAndBytes'],
    topics: [
      {
        category: 'The Strategic Decision: Prompt vs RAG vs Fine-Tuning',
        items: [
          'Need new factual knowledge? → Use RAG',
          'Need different behavioral style, tone, or specialized task output? → Use Fine-Tuning',
          'Need better instructions or formatting? → Use Prompt Engineering',
          'Combining RAG + Fine-Tuning for domain-specific intelligence',
        ],
      },
      {
        category: 'Supervised Fine-Tuning (SFT) & Dataset Preparation',
        items: [
          'Pretraining vs Supervised Fine-Tuning (SFT) vs RLHF/DPO',
          'Preparing high-quality instruction dataset pairs (Instruction, Input, Output)',
          'Data formatting in ChatML / Llama instruction format',
          'Dataset quality vs dataset quantity (1,000 clean examples > 50,000 noisy examples)',
        ],
      },
      {
        category: 'Parameter-Efficient Fine-Tuning (PEFT)',
        items: [
          'Why full-parameter fine-tuning is too expensive (requires multi-GPU clusters)',
          'Low-Rank Adaptation (LoRA): Freezing base weights, training low-rank adapter matrices (r, alpha)',
          'QLoRA: Quantized LoRA loading base model in 4-bit NormalFloat (NF4)',
          'Using Hugging Face PEFT and TRL SFTTrainer',
          'Merging LoRA adapter weights back into base model for deployment',
        ],
      },
    ],
    keyConcepts: [
      'The Prompt vs RAG vs Fine-Tuning Decision Framework',
      'Low-Rank Adaptation (LoRA) Rank (r) and Alpha Hyperparameters',
      'QLoRA 4-bit Quantized Fine-Tuning on Consumer GPUs',
      'Instruction-Tuning Dataset Formatting (ChatML)',
      'Adapter Weight Merging & Exporting',
    ],
    practiceSuggestions: [
      'Format a custom dataset of 500 customer support conversations into the ChatML instruction format.',
      'Fine-tune an open-source 3B model (e.g. Llama 3.2 3B or Gemma) on Google Colab GPU using QLoRA and TRL SFTTrainer.',
      'Evaluate the fine-tuned adapter against the base model on a holdout test set to measure format compliance.',
    ],
    projectSuggestions: [
      {
        title: 'Specialized Domain Task Fine-Tuned LLM with QLoRA',
        description: 'A complete fine-tuning project creating an instruction dataset, training a LoRA adapter on an open-source LLM with Hugging Face PEFT, evaluating output benchmarks, and exporting the merged model.',
        level: 'Advanced',
      },
    ],
    commonMistakes: [
      'Fine-tuning a model on private factual documents instead of using RAG (models hallucinate facts learned during fine-tuning).',
      'Training on low-quality, synthetic, or duplicate data that degrades the model’s general reasoning ability.',
    ],
    nextStepPreview: 'Give models autonomy and tool-calling capabilities in Stage 10: AI Agents & Tool Use.',
  },
  {
    id: 'ai-agents-tool-use',
    stageNumber: '10',
    title: 'AI Agents & Tool Use',
    shortTitle: 'AI Agents & Workflows',
    tagline: 'Function calling, tool integration (SQL, Web, APIs), ReAct reasoning loops, LangGraph stateful graphs, and multi-agent coordination.',
    iconName: 'Bot',
    goal: 'Learn how GenAI systems can interact with tools and perform multi-step autonomous tasks.',
    whyItMatters:
      'While a basic LLM only generates text, an AI Agent takes action in the real world. Agents plan multi-step workflows, call tools (SQL databases, web search, calculators, APIs), observe results, and loop iteratively until the objective is accomplished.',
    learningOutcome: 'Design controlled, stateful AI workflows and agents that safely interact with external tools using LangGraph.',
    recommendedApproach:
      'Do not use autonomous agents when a deterministic workflow is simpler and more reliable. Use agents when dynamic decision-making is genuinely required.',
    technologies: ['LangGraph', 'LangChain Agents', 'OpenAI Tool Calling', 'LlamaIndex Workflows', 'Web Search / SQL Tools'],
    topics: [
      {
        category: 'LLM vs Workflow vs Autonomous Agent',
        items: [
          'Deterministic Workflow: Step 1 → Step 2 → Step 3 (Predictable, robust, fast)',
          'Autonomous Agent: Goal → Plan → Select Tool → Execute → Observe → Loop (Flexible, dynamic)',
          'When to use workflows vs agents: Rule of thumb for enterprise reliability',
        ],
      },
      {
        category: 'Tool Calling & The ReAct Framework',
        items: [
          'Function Calling / Tool Calling: Defining JSON schemas for tools the model can invoke',
          'The ReAct Framework: Reason → Act → Observe → Loop',
          'Equipping agents with tools: Web Search (Tavily), Calculator, SQL Database querying, REST APIs, File system I/O',
        ],
      },
      {
        category: 'Stateful Graphs with LangGraph',
        items: [
          'LangGraph: Building stateful, cyclic multi-agent graphs with nodes and edges',
          'Agent State Management: Tracking scratchpads, message histories, and intermediate tool outputs',
          'Planning and Task Decomposition: Breaking complex objectives into subtasks',
          'Human-in-the-Loop (HITL): Inserting confirmation approval checkpoints for destructive tool actions',
          'Multi-agent architectures: Supervisor agent orchestrating specialized worker agents',
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
    nextStepPreview: 'Ensure your GenAI systems are safe, reliable, and evaluated in Stage 11: GenAI Evaluation, Safety & Reliability.',
  },
  {
    id: 'evaluation-safety-reliability',
    stageNumber: '11',
    title: 'GenAI Evaluation, Safety & Reliability',
    shortTitle: 'Evaluation & Safety',
    tagline: 'Automated evaluation with RAGAS & DeepEval, golden test datasets, prompt injection security, PII protection, and observability.',
    iconName: 'ShieldCheck',
    goal: 'Learn how to determine whether a Generative AI system is actually useful, reliable, and safe.',
    whyItMatters:
      'An impressive AI demo is not a production product. Production GenAI applications require automated evaluation (detecting hallucinations and measuring groundedness), security hardening (prompt injection defense), observability, and rate limiting.',
    learningOutcome: 'Implement automated LLM evaluation pipelines, secure systems against prompt injection, configure observability, and build guardrails.',
    recommendedApproach:
      'Build automated evaluation into your CI/CD pipeline so every prompt change or model upgrade is automatically benchmarked on golden datasets.',
    technologies: ['RAGAS', 'DeepEval', 'Langfuse / LangSmith (Observability)', 'NeMo Guardrails', 'Prompt Injection Defenses'],
    topics: [
      {
        category: 'GenAI Quality & RAG Evaluation',
        items: [
          'Why unit tests fail for non-deterministic AI outputs',
          'Automated evaluation frameworks: DeepEval, RAGAS, TruLens',
          'Core RAG metrics: Faithfulness (Groundedness), Answer Relevance, Context Precision, Context Recall',
          'Agent evaluation: Task success rate, tool selection accuracy, tool execution success',
          'Creating golden test datasets and benchmarking with LLM-as-a-Judge',
        ],
      },
      {
        category: 'Security Hardening & Guardrails',
        items: [
          'Direct prompt injection attacks and Jailbreak awareness',
          'Indirect prompt injection from untrusted web sources or uploaded PDFs',
          'Data leakage prevention and PII (Personally Identifiable Information) masking',
          'Tool sandboxing and strict authorization permission scopes',
        ],
      },
      {
        category: 'Observability & Monitoring',
        items: [
          'Full-stack LLM Observability with Langfuse / LangSmith',
          'Tracing multi-step agent execution graphs, step latencies, and token costs',
          'Tracking production user feedback signals (thumbs up/down)',
          'Setting up automated alerts on error rate spikes and latency degradation',
        ],
      },
    ],
    keyConcepts: [
      'LLM-as-a-Judge Automated Evaluation Pipelines',
      'RAGAS Faithfulness & Answer Relevancy Metrics',
      'Direct & Indirect Prompt Injection Defense',
      'Full-Stack LLM Observability & Tracing (Langfuse)',
      'PII Redaction & Tool Sandboxing Security',
    ],
    practiceSuggestions: [
      'Set up Langfuse or LangSmith tracing in your FastAPI application to inspect execution graphs, latency, and token costs for every call.',
      'Build a test suite with DeepEval running 25 golden test cases to benchmark groundedness and hallucination rates.',
      'Implement an input guardrail that detects and blocks adversarial prompt injection attempts before sending to the model.',
    ],
    projectSuggestions: [
      {
        title: 'Production-Hardened AI Customer Support Platform',
        description: 'An enterprise customer support API featuring intent classification, RAG retrieval, PII sanitization, prompt injection defenses, Redis semantic caching, Langfuse tracing, and automated evaluation suites.',
        level: 'Production GenAI',
      },
    ],
    commonMistakes: [
      'Shipping GenAI applications without automated evaluation, relying solely on manual inspection of 3-4 example prompts.',
      'Giving AI agents unrestricted database write access without sandboxing or human approval confirmation.',
    ],
    nextStepPreview: 'Deploy, scale, and operate GenAI apps in production in Stage 12: LLMOps & Production GenAI.',
  },
  {
    id: 'llmops-production',
    stageNumber: '12',
    title: 'LLMOps & Production GenAI',
    shortTitle: 'LLMOps & Production',
    tagline: 'Docker containerization, cloud deployment (AWS/GCP), Redis semantic caching, model routing, cost optimization, and CI/CD.',
    iconName: 'Cloud',
    goal: 'Learn how to deploy, monitor, optimize, and maintain real-world GenAI applications in production.',
    whyItMatters:
      'Production GenAI systems run on cloud infrastructure with latency, cost, and availability constraints. Understanding Docker packaging, semantic caching, smart model routing (small fast model vs frontier model), and CI/CD pipelines is what makes an engineer senior.',
    learningOutcome: 'Deploy, containerize, scale, and cost-optimize GenAI applications reliably on production cloud infrastructure.',
    recommendedApproach:
      'Choose one cloud platform (AWS, GCP, or Azure) and master Docker + Docker Compose first.',
    technologies: ['Docker', 'Docker Compose', 'AWS / GCP Cloud', 'Redis (Semantic Caching)', 'GitHub Actions CI/CD', 'Model Routing'],
    topics: [
      {
        category: 'Containerization & Cloud Infrastructure',
        items: [
          'Dockerizing GenAI applications: Multi-stage Dockerfiles, dependency caching, lightweight Python images',
          'Docker Compose: Orchestrating Frontend, FastAPI Backend, Redis, ChromaDB, and Langfuse services',
          'Deploying containerized GenAI backends to Cloud Compute (AWS ECS, GCP Cloud Run, Render)',
          'Serverless deployment concepts vs dedicated GPU instances for self-hosted models',
        ],
      },
      {
        category: 'Cost Optimization & High Performance',
        items: [
          'Semantic Caching with Redis to return cached responses for semantically identical queries',
          'Smart Model Routing: Routing simple queries to cheap models (GPT-4o-mini) and complex queries to frontier models (GPT-4o/Claude)',
          'Token optimization: Prompt compression, concise system prompts, and strict max_tokens',
          'Measuring and optimizing Time to First Token (TTFT < 500ms)',
        ],
      },
      {
        category: 'LLMOps Lifecycle & CI/CD',
        items: [
          'Prompt versioning, model versioning, and dataset versioning',
          'GitHub Actions CI/CD: Automated pytest execution, linting, evaluation tests, and Docker image builds',
          'Continuous monitoring: Tracking token usage, API latencies, error rates, and user feedback',
        ],
      },
    ],
    keyConcepts: [
      'Full-Stack Docker Compose Multi-Container Orchestration',
      'Semantic Caching with Redis for Cost & Latency Reduction',
      'Smart Model Routing Architecture',
      'CI/CD Automated Evaluation & Deployment Pipelines',
      'Time to First Token (TTFT) Optimization',
    ],
    practiceSuggestions: [
      'Write a multi-stage Dockerfile that packages a FastAPI + LangChain application into a slim production image.',
      'Implement a Redis semantic caching layer that returns cached responses for semantically similar user queries (similarity > 0.92).',
      'Build a model router that uses a cheap small model to classify query complexity, routing only hard queries to a frontier model.',
    ],
    projectSuggestions: [
      {
        title: 'End-to-End Enterprise Generative AI Platform',
        description: 'A flagship enterprise-grade GenAI platform featuring an API gateway, LangGraph orchestrator, smart model routing, pgvector knowledge base, Redis semantic caching, Langfuse observability, Docker Compose packaging, and automated CI/CD evaluation test suites.',
        level: 'Portfolio-Level',
      },
    ],
    commonMistakes: [
      'Routing every single trivial query to an expensive frontier model, causing massive unnecessary monthly API bills.',
      'Deploying without semantic caching, re-computing identical answers for hundreds of users every day.',
    ],
    nextStepPreview: 'You have mastered the complete Generative AI Roadmap. Build real products and turn models into production systems!',
  },
];

export const GENAI_PROJECT_PROGRESSION: GenAIProjectProgression[] = [
  {
    id: 'genai-proj-1',
    stage: 'Stage 06 — Beginner',
    name: 'AI Content Generator & Structured Extraction API',
    difficulty: 'Beginner',
    recommendedStack: ['Python 3', 'FastAPI', 'OpenAI / Gemini API', 'Pydantic v2', 'Server-Sent Events (SSE)'],
    skillsLearned: ['Prompt engineering', 'Token streaming with SSE', 'Pydantic JSON schema enforcement', 'Automated retry error handling'],
    description: 'A modular FastAPI service that accepts unstructured content requests, executes prompt chains with few-shot exemplars, streams tokens via SSE, and outputs strictly validated Pydantic JSON schemas.',
    problemSolved: 'Eliminate manual content formatting and extract structured entities from raw text with 100% schema validation reliability.',
    aiArchitecture: 'Client UI → FastAPI SSE Streaming Endpoint → Prompt Template with Few-Shot Exemplars → LLM API → Validated Pydantic JSON',
    evaluationMetrics: 'Time to First Token (TTFT < 500ms), 100% Pydantic schema validation success rate',
    deploymentDetails: 'Containerized FastAPI application with interactive Swagger docs (/docs) and lightweight web client.',
    monitoringDetails: 'Structured logging of token counts, latency, and model parameters.',
    githubReqs: 'Clean modular repo with src/, tests/ (pytest), requirements.txt, and documented curl examples in README.',
  },
  {
    id: 'genai-proj-2',
    stage: 'Stage 08 — Intermediate',
    name: 'Chat With Your Documents (Enterprise RAG)',
    difficulty: 'Intermediate',
    recommendedStack: ['Python', 'LangChain / LlamaIndex', 'ChromaDB', 'Sentence-Transformers', 'Cohere Rerank', 'FastAPI'],
    skillsLearned: ['Document chunking strategies', 'Dense vector embeddings', 'Hybrid search (BM25 + Dense)', 'Cross-encoder reranking', 'Source citation formatting'],
    description: 'A complete RAG application that ingests complex multi-page PDFs, chunks text with overlap, embeds into ChromaDB, performs hybrid search, reranks context with Cohere, and generates grounded answers with exact page citations.',
    problemSolved: 'Eliminate LLM hallucinations by restricting answers to private company policy manuals and financial reports with exact source citations.',
    aiArchitecture: 'PDF Ingestion → Recursive Chunking → ChromaDB → Hybrid Vector Retrieval → Cohere Reranker → Grounded LLM Prompt → Answer with Citations',
    evaluationMetrics: 'RAGAS Faithfulness: > 0.92, Context Precision: > 0.88, Zero hallucinations verified',
    deploymentDetails: 'Containerized FastAPI service with document upload endpoint and interactive query interface.',
    monitoringDetails: 'Track retrieval recall, embedding latency, and citation accuracy.',
    githubReqs: 'Full repo with sample PDF documents, benchmark evaluation script with RAGAS, and architecture diagram in README.',
  },
  {
    id: 'genai-proj-3',
    stage: 'Stage 10 — Advanced',
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
    id: 'genai-proj-4',
    stage: 'Stage 11 — Production GenAI',
    name: 'AI Customer Support Platform with Guardrails',
    difficulty: 'Production GenAI',
    recommendedStack: ['FastAPI', 'Redis (Semantic Cache)', 'Langfuse (Observability)', 'DeepEval', 'Pydantic', 'Docker'],
    skillsLearned: ['Semantic caching with Redis', 'PII sanitization', 'Prompt injection defenses', 'LLM observability & tracing', 'Automated LLM-as-a-judge evaluation'],
    description: 'A production-hardened customer support GenAI platform featuring intent classification, RAG retrieval, PII masking, prompt injection defense, Redis semantic caching, and full Langfuse observability.',
    problemSolved: 'Serve 10,000+ support queries daily with < 50ms cached responses, zero PII leaks, and automated hallucination detection.',
    aiArchitecture: 'User Query → PII Masking → Prompt Injection Guard → Redis Semantic Cache (Hit -> Instant Return) → RAG Pipeline → Grounded Response → Langfuse Tracing',
    evaluationMetrics: 'Semantic Cache Hit Ratio > 40%, P95 Latency < 250ms on cache miss, DeepEval Hallucination Score < 0.05',
    deploymentDetails: 'Multi-container Docker Compose cluster (FastAPI + Redis + Chroma + Langfuse).',
    monitoringDetails: 'Real-time Langfuse tracing of every execution step, token cost analytics, and user feedback tracking.',
    githubReqs: 'Production repo with docker-compose.yml, security test suite, DeepEval evaluation suite, and architecture diagram.',
  },
  {
    id: 'genai-proj-5',
    stage: 'Stage 12 — Portfolio Level',
    name: 'End-to-End Enterprise Generative AI Platform',
    difficulty: 'Portfolio-Level',
    recommendedStack: ['FastAPI', 'LangGraph', 'PostgreSQL (pgvector)', 'Redis', 'Docker Compose', 'AWS ECS / GCP', 'GitHub Actions'],
    skillsLearned: ['Full-stack enterprise GenAI architecture', 'Smart model routing', 'Hybrid RAG with pgvector', 'Stateful agent orchestration', 'CI/CD automated evaluation'],
    description: 'A flagship enterprise-grade GenAI platform featuring smart model routing (small fast models for simple tasks, frontier models for complex reasoning), LangGraph multi-agent orchestration, pgvector knowledge retrieval, Redis semantic caching, and CI/CD evaluation pipelines.',
    problemSolved: 'Provide an enterprise-wide intelligent workspace where employees can query internal knowledge, execute database queries, and automate multi-step workflows with full security and auditability.',
    aiArchitecture: 'Frontend UI → API Gateway → Smart Model Router → Supervisor Agent (LangGraph) → [RAG Agent | SQL Agent | Web Agent] → pgvector + Redis Cache → Observability → Response',
    evaluationMetrics: 'Task Success Rate: > 94%, RAG Faithfulness: > 0.95, Average Cost per Query: < $0.02, P99 Latency: < 800ms',
    deploymentDetails: 'Multi-stage Docker containers deployed to AWS/GCP with automated GitHub Actions CI/CD running automated evaluation tests.',
    monitoringDetails: 'Complete observability dashboard tracking agent trajectories, drift, user satisfaction ratings, and token cost breakdown.',
    githubReqs: 'Flagship GitHub portfolio repository with full system architecture diagram, Dockerfile, docker-compose.yml, CI/CD pipeline, and live public demo.',
  },
];

export const GENAI_TOOLKIT: GenAIToolkitCategory[] = [
  {
    category: 'PROGRAMMING & BACKEND',
    coreItems: ['Python 3.12', 'FastAPI', 'Pydantic v2', 'pytest', 'Git & GitHub'],
    advancedItems: ['TypeScript / Next.js', 'Asyncio', 'WebSockets', 'Docker'],
  },
  {
    category: 'LLM APIs & RUNTIMES',
    coreItems: ['OpenAI APIs', 'Google Gemini APIs', 'Anthropic Claude APIs', 'Ollama (Local LLMs)'],
    advancedItems: ['vLLM', 'Llama.cpp', 'Groq', 'Hugging Face Inference'],
  },
  {
    category: 'PROMPTING & STRUCTURE',
    coreItems: ['Prompt Templates', 'Pydantic JSON Mode', 'Few-Shot Exemplars', 'Role Prompting'],
    advancedItems: ['Instructor', 'Outlines', 'Prompt Versioning', 'Chain-of-Thought Design'],
  },
  {
    category: 'RAG & RETRIEVAL',
    coreItems: ['LangChain', 'LlamaIndex', 'Recursive Chunking', 'Cohere Rerank'],
    advancedItems: ['BM25 Hybrid Search', 'Contextual Compression', 'Multi-Query Retrieval'],
  },
  {
    category: 'VECTOR DATABASES',
    coreItems: ['ChromaDB', 'FAISS', 'Pinecone'],
    advancedItems: ['Qdrant', 'Weaviate', 'pgvector (PostgreSQL)', 'Milvus'],
  },
  {
    category: 'FINE-TUNING & PEFT',
    coreItems: ['LoRA', 'QLoRA', 'Hugging Face PEFT', 'Instruction Datasets'],
    advancedItems: ['TRL (SFTTrainer)', 'BitsAndBytes', 'DPO Alignment', 'Axolotl'],
  },
  {
    category: 'AI AGENTS & STATE',
    coreItems: ['LangGraph', 'Tool Calling / JSON Schemas', 'ReAct Loop'],
    advancedItems: ['CrewAI', 'AutoGen', 'Multi-Agent Supervisor', 'Human-in-the-Loop'],
  },
  {
    category: 'OBSERVABILITY & EVALUATION',
    coreItems: ['RAGAS', 'DeepEval', 'Langfuse (Observability)', 'Structured JSON Logging'],
    advancedItems: ['LangSmith', 'TruLens', 'PromptFoo', 'Arize Phoenix'],
  },
  {
    category: 'DEPLOYMENT & CLOUD',
    coreItems: ['Docker', 'Docker Compose', 'AWS or GCP Cloud'],
    advancedItems: ['Redis (Semantic Cache)', 'GitHub Actions CI/CD', 'Model Routing'],
  },
];

export const GENAI_SPECIALIZATIONS: GenAISpecialization[] = [
  {
    title: 'LLM Application Engineer',
    description: 'Build end-to-end production web applications powered by commercial and open-source foundation models, structured prompt pipelines, and low-latency APIs.',
    coreTech: ['Python', 'FastAPI', 'OpenAI/Gemini APIs', 'Pydantic', 'Streaming SSE'],
    focus: 'LLM APIs, Prompt Engineering, Structured Outputs, Backend Integration',
    icon: 'Sparkles',
  },
  {
    title: 'RAG Systems Engineer',
    description: 'Architect enterprise retrieval pipelines connecting massive unstructured document repositories with vector databases, hybrid search, and cross-encoder rerankers.',
    coreTech: ['LangChain', 'LlamaIndex', 'ChromaDB / Pinecone', 'Cohere Rerank', 'RAGAS'],
    focus: 'Embeddings, Chunking Strategies, Vector Databases, Reranking, Citations',
    icon: 'Database',
  },
  {
    title: 'AI Agent Engineer',
    description: 'Design autonomous multi-step reasoning workflows, tool calling systems, state machines, and multi-agent coordination with human-in-the-loop validation.',
    coreTech: ['LangGraph', 'OpenAI Tool Calling', 'State Graphs', 'Python', 'APIs'],
    focus: 'Tool Calling, Agent Workflows, Orchestration, Multi-Step Reasoning',
    icon: 'Bot',
  },
  {
    title: 'LLM Fine-Tuning Engineer',
    description: 'Customize open-source foundation models for specialized domain tasks using Parameter-Efficient Fine-Tuning (LoRA, QLoRA) and high-quality instruction datasets.',
    coreTech: ['Hugging Face PEFT', 'LoRA / QLoRA', 'TRL', 'PyTorch', 'CUDA'],
    focus: 'Instruction Datasets, LoRA/QLoRA, Domain Adaptation, Alignment',
    icon: 'Sliders',
  },
  {
    title: 'Multimodal GenAI Engineer',
    description: 'Develop systems processing cross-modal data: text, vision/images, audio/voice, and structured documents in unified multimodal pipelines.',
    coreTech: ['Gemini Multimodal', 'GPT-4o Vision', 'Whisper (Speech)', 'CLIP', 'Vector DBs'],
    focus: 'Vision-Language Models, Voice AI, Cross-Modal Embeddings',
    icon: 'Layers',
  },
  {
    title: 'LLMOps & Platform Engineer',
    description: 'Architect enterprise GenAI infrastructure: low-latency model routing, semantic caching, automated evaluation benchmarks, and security guardrails.',
    coreTech: ['Docker', 'Langfuse', 'Redis Semantic Cache', 'AWS/GCP', 'vLLM'],
    focus: 'AI Infrastructure, Semantic Caching, Observability, Scaling, Security',
    icon: 'Cloud',
  },
];

export const GENAI_COMMON_MISTAKES = [
  {
    title: 'Learning Only Prompt Engineering (Ignoring Software Engineering)',
    solution: 'Master Python, async FastAPI backends, Pydantic validation, and automated testing. Prompts are just one component of a production software system.',
  },
  {
    title: 'Fine-Tuning When RAG Is What Is Actually Needed',
    solution: 'Use RAG when the model needs new factual, private, or real-time knowledge. Use Fine-Tuning only when you need the model to learn a specific behavioral style or specialized format.',
  },
  {
    title: 'Using Autonomous Agents Where a Simple Deterministic Workflow Suffices',
    solution: 'Use deterministic Python code for straightforward workflows. Use agents only when dynamic multi-step decision-making is genuinely necessary.',
  },
  {
    title: 'Deploying GenAI Applications Without Automated Evaluation',
    solution: 'Set up golden test datasets and automated evaluation suites (DeepEval / RAGAS) to detect hallucinations and measure groundedness before shipping.',
  },
  {
    title: 'Using the Biggest Frontier Model for Every Trivial Task',
    solution: 'Implement smart model routing: route simple classification and extraction tasks to small fast models (e.g. GPT-4o-mini, Llama 3 8B) to save 90% on API costs.',
  },
  {
    title: 'Ignoring Latency, Token Costs & Semantic Caching',
    solution: 'Implement response streaming (SSE), use semantic caching with Redis for repetitive queries, and optimize prompt lengths.',
  },
  {
    title: 'Ignoring Security (Prompt Injections & PII Leaks)',
    solution: 'Sanitize untrusted inputs, mask PII before sending to external APIs, and never give tools unrestricted database or shell access without confirmation.',
  },
  {
    title: 'Building Only Simple Wrapper Prototypes That Never Reach Production',
    solution: 'Package your projects with Docker, write unit tests, include architecture diagrams, and deploy live publicly accessible APIs.',
  },
];

export const GENAI_FOUR_PILLARS = [
  {
    title: 'Software Engineering',
    subtitle: 'Modular Python, async FastAPI backends, Pydantic validation, pytest testing suites, and clean API design.',
    icon: 'Terminal',
  },
  {
    title: 'Generative AI Mastery',
    subtitle: 'Understanding LLMs, tokenization, embeddings, Transformers, attention mechanisms, and fine-tuning dynamics.',
    icon: 'Sparkles',
  },
  {
    title: 'AI Application Development',
    subtitle: 'Building production RAG pipelines, stateful LangGraph agents, tool integrations, and semantic caching.',
    icon: 'Brain',
  },
  {
    title: 'Systems & Production Thinking',
    subtitle: 'Automated evaluation (RAGAS), prompt security, LLM observability (Langfuse), Docker, and cloud scaling.',
    icon: 'Cloud',
  },
];

export const GENAI_APPLICATION_ARCHITECTURE_STEPS = [
  { step: '1', title: 'User Interface', desc: 'Web frontend or client application sending requests' },
  { step: '2', title: 'API Gateway', desc: 'FastAPI backend handling auth, rate limiting & validation' },
  { step: '3', title: 'Security Guard', desc: 'Sanitize inputs, mask PII & detect prompt injections' },
  { step: '4', title: 'Semantic Cache', desc: 'Redis cache checking for identical semantic queries' },
  { step: '5', title: 'Model Router', desc: 'Routes simple tasks to fast models, hard tasks to frontier models' },
  { step: '6', title: 'Orchestration', desc: 'LangGraph workflow or agent managing execution plan' },
  { step: '7', title: 'RAG Retrieval', desc: 'Vector DB hybrid search & Cohere cross-encoder reranking' },
  { step: '8', title: 'Tool Execution', desc: 'Invoking SQL queries, web search, or external APIs' },
  { step: '9', title: 'LLM Generation', desc: 'Model generates grounded output conforming to Pydantic schema' },
  { step: '10', title: 'Evaluation & Tracing', desc: 'Langfuse logging traces, latency, token cost & metrics' },
  { step: '11', title: 'Streaming Delivery', desc: 'Real-time Server-Sent Events (SSE) token delivery' },
];

export const RAG_ARCHITECTURE_BLUEPRINT = [
  { step: '1', title: 'Data Sources', desc: 'PDFs, Markdown, Web pages & SQL DBs' },
  { step: '2', title: 'Ingestion & Cleaning', desc: 'Extract raw text, strip artifacts & sanitize' },
  { step: '3', title: 'Chunking', desc: 'Recursive splitting with overlap (500 chars / 50 overlap)' },
  { step: '4', title: 'Embedding', desc: 'Transform chunks into dense vector embeddings' },
  { step: '5', title: 'Vector Database', desc: 'Indexed in Chroma, Pinecone, or pgvector' },
  { step: '6', title: 'Hybrid Retrieval', desc: 'BM25 keyword search + Dense semantic search' },
  { step: '7', title: 'Cross-Encoder Reranking', desc: 'Score & filter top 3-5 most relevant chunks' },
  { step: '8', title: 'Context Construction', desc: 'Format prompt with retrieved text & citations' },
  { step: '9', title: 'LLM Generation', desc: 'Model generates answer grounded strictly in context' },
  { step: '10', title: 'Grounded Response', desc: 'Verified response with source page citations' },
];

export const GENAI_DECISION_TREE = [
  {
    step: '1',
    question: 'Is the problem caused by missing external, private, or real-time knowledge?',
    yesAction: 'USE RAG (Retrieval Augmented Generation)',
    yesDesc: 'Connect your LLM to a vector database with hybrid search and reranking to supply private document context.',
    noFollowup: 'Proceed to Question 2',
  },
  {
    step: '2',
    question: 'Do you need the model to consistently learn a specific behavioral style, complex format, or domain tone?',
    yesAction: 'USE FINE-TUNING (LoRA / QLoRA)',
    yesDesc: 'Fine-tune an open-source model using Parameter-Efficient Fine-Tuning on an instruction dataset.',
    noFollowup: 'Proceed to Question 3',
  },
  {
    step: '3',
    question: 'Can better instructions, delimiters, few-shot examples, and Pydantic schemas solve the problem?',
    yesAction: 'USE PROMPT ENGINEERING',
    yesDesc: 'Refine your prompt template with XML tags, few-shot input/output exemplars, and strict JSON Mode.',
    noFollowup: 'Change model family, architecture, or workflow design.',
  },
];

export const GENAI_THINKING_LADDER = [
  { step: '1', label: 'PROBLEM VALIDATION', question: 'Does Generative AI actually solve this problem, or is deterministic code better?' },
  { step: '2', label: 'CAPABILITY MAPPING', question: 'What model capability is needed (fast small model vs frontier reasoning model)?' },
  { step: '3', label: 'PROMPTING STRATEGY', question: 'Can clear instructions, few-shot exemplars, and JSON schemas solve it directly?' },
  { step: '4', label: 'KNOWLEDGE & RAG', question: 'Does the model need private external data and how will we ensure high retrieval precision?' },
  { step: '5', label: 'FINE-TUNING NEED', question: 'Do we genuinely need custom weights for domain style or can RAG handle it?' },
  { step: '6', label: 'WORKFLOW VS AGENT', question: 'Should this be a predictable deterministic pipeline or an autonomous tool-calling agent?' },
  { step: '7', label: 'EVALUATION & SAFETY', question: 'How will we automatically evaluate hallucinations and secure against prompt injection?' },
  { step: '8', label: 'PRODUCTION SCALING', question: 'How will we stream responses, cache semantically, monitor latency, and optimize token costs?' },
];

export const GENAI_SCORECARD = [
  {
    category: 'QUALITY & GROUNDEDNESS',
    metrics: [
      { name: 'Faithfulness (Groundedness)', desc: 'Measures if the generated answer is strictly grounded in context without hallucinating.' },
      { name: 'Answer Relevance', desc: 'Measures if the generated output directly answers the user prompt without irrelevant fluff.' },
      { name: 'Context Precision', desc: 'Measures if the retrieved chunks were truly relevant and ranked near the top.' },
    ],
  },
  {
    category: 'RELIABILITY & SAFETY',
    metrics: [
      { name: 'Prompt Injection Resistance', desc: 'Validates that the model resists direct and indirect adversarial injection attacks.' },
      { name: 'PII Protection', desc: 'Ensures sensitive personal information is masked before external API calls.' },
      { name: 'Tool Execution Success Rate', desc: 'Measures percentage of tool calls executed with valid JSON arguments without error.' },
    ],
  },
  {
    category: 'PERFORMANCE & COST',
    metrics: [
      { name: 'Time to First Token (TTFT)', desc: 'Measures perceived latency before the user sees the first streamed token (Target < 500ms).' },
      { name: 'Semantic Cache Hit Ratio', desc: 'Percentage of repeated queries served instantly from Redis cache without calling LLMs.' },
      { name: 'Cost Optimization (Model Routing)', desc: 'Percentage of simple queries routed to low-cost models (saving up to 90% on API costs).' },
    ],
  },
];
