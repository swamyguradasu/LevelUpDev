export interface CVRoadmapStage {
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

export interface CVProjectProgression {
  id: string;
  stage: string;
  name: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Portfolio-Level';
  problem: string;
  description: string;
  architecture: string;
  dataset: string;
  technologies: string[];
  model: string;
  technique: string;
  metrics: string;
  deployment: string;
  githubReqs: string;
  skillsLearned: string[];
}

export interface CVTaskMapItem {
  id: string;
  taskName: string;
  recommendedApproach: string;
  problem: string;
  example: string;
  modelTypes: string[];
  evaluationMetric: string;
  projectIdea: string;
  icon: string;
}

export interface CVSpecialization {
  title: string;
  description: string;
  coreTech: string[];
  focus: string;
  icon: string;
}

export interface CVToolkitCategory {
  category: string;
  coreItems: string[];
  advancedItems: string[];
}

export interface CVCommonMistake {
  title: string;
  solution: string;
}

export interface CVEvaluationMetricCategory {
  category: string;
  metrics: {
    name: string;
    desc: string;
  }[];
}

export interface CVFourPillars {
  title: string;
  subtitle: string;
  icon: string;
}

export const CV_ROADMAP_STAGES: CVRoadmapStage[] = [
  {
    id: 'python-software-engineering',
    stageNumber: '01',
    title: 'Python & Software Engineering for Vision',
    shortTitle: 'Python & Software Eng',
    tagline: 'Build the programming and software engineering foundation required to develop high-performance computer vision applications.',
    iconName: 'Terminal',
    goal: 'Build the programming foundation required to develop reliable computer vision applications.',
    whyItMatters:
      'Computer vision applications require heavy numerical matrix manipulation, high-throughput image file reading, memory management, modular object-oriented architecture, and production API serving.',
    learningOutcome: 'Build Python applications capable of processing visual data and serving computer vision models.',
    recommendedApproach:
      'Master multi-dimensional NumPy array slicing and broadcasting first. Images in Python are fundamentally NumPy tensors. Structure projects in modular packages and write automated unit tests for data transforms.',
    technologies: ['Python 3.12', 'NumPy', 'FastAPI', 'Pydantic v2', 'pytest', 'Git & GitHub'],
    visualIntuition: {
      label: 'Image Tensor in NumPy Representation',
      steps: [
        'IMAGE FILE (JPEG / PNG / WebP)',
        'NUMPY ARRAY (Height × Width × 3 Channels)',
        'PIXEL TENSOR (uint8: 0 to 255 RGB intensities)',
        'NORMALIZATION (float32: 0.0 to 1.0 or standardized)',
        'BATCH TENSOR (Batch Size × Channels × Height × Width)',
      ],
    },
    topics: [
      {
        category: 'Core Python & Object-Oriented Design',
        items: [
          'Variables, data structures (lists, tuples, sets, dictionaries, dict comprehensions)',
          'Modular code design: Custom classes, inheritance, encapsulation, dataclasses',
          'File handling: pathlib, reading image folders, recursive directory traversal',
          'Type hints with typing and data validation with Pydantic v2',
          'Virtual environments (venv, uv, poetry) and reproducible dependency locking',
          'Robust exception handling for corrupted image files and missing metadata',
        ],
      },
      {
        category: 'Advanced Python for Vision Pipelines',
        items: [
          'Generators and iterators (yield) for lazy streaming of gigabyte-scale image datasets',
          'Decorators for timing inference latency, image caching, and retries',
          'Context managers (__enter__ / __exit__) for webcam streams and video capture resources',
          'Asynchronous programming (async / await) for non-blocking image upload endpoints in FastAPI',
        ],
      },
      {
        category: 'Numerical Computing with NumPy for Images',
        items: [
          'NumPy ndarray creation, data types (uint8, float32, int64), and shape manipulation',
          'Multi-dimensional array slicing: Cropping bounding boxes (image[ymin:ymax, xmin:xmax])',
          'Channel indexing: Accessing individual Red, Green, and Blue color channels',
          'Broadcasting & Vectorization: Performing pixel-wise arithmetic without slow Python for-loops',
          'JSON and CSV handling for bounding box annotations and ground-truth labels',
        ],
      },
      {
        category: 'Vision API Development & Clean Code',
        items: [
          'Building REST API endpoints with FastAPI accepting multipart/form-data image uploads',
          'Returning structured JSON prediction payloads (bounding boxes, class labels, confidence)',
          'Version control with Git, branching, commit discipline, and .gitignore for datasets',
          'Automated testing with pytest: Validating image resize functions, aspect ratios, and format conversions',
        ],
      },
    ],
    keyConcepts: [
      'NumPy Multi-Dimensional Tensor Slicing & Strides',
      'Broadcasting & Vectorized Pixel Arithmetic',
      'FastAPI Multipart Image Ingestion',
      'Modular Project Architecture & Pytest Fixtures',
      'Data Generators for Memory-Efficient Batch Streaming',
    ],
    practiceSuggestions: [
      'Load an RGB image into a NumPy array, isolate the Green channel, compute average brightness, and crop a 100x100 region.',
      'Write a Python generator function that scans a directory of 5,000 images and yields batches of 32 resized normalized arrays without loading the entire dataset into RAM.',
      'Build a FastAPI endpoint that receives an image file upload, validates its MIME type, and returns its width, height, and color channels as JSON.',
    ],
    projectSuggestions: [
      {
        title: 'High-Throughput Image Processing Utility & API',
        description: 'A modular Python package and FastAPI microservice that ingests image batches, validates formats, generates thumbnail grids, and normalizes tensors with automated pytest coverage.',
        level: 'Beginner',
      },
    ],
    commonMistakes: [
      'Using nested Python for-loops to iterate over individual pixels instead of using vectorized NumPy tensor operations (100x slower).',
      'Loading entire multi-gigabyte image datasets directly into memory at once, causing Out-Of-Memory (OOM) crashes.',
      'Ignoring image color channel order (e.g. OpenCV loads images in BGR format, while Pillow and PyTorch expect RGB).',
    ],
    nextStepPreview: 'Understand the mathematical and machine learning foundations behind transformations and optimization in Stage 02: Mathematics & Machine Learning.',
  },
  {
    id: 'mathematics-machine-learning',
    stageNumber: '02',
    title: 'Mathematics & Machine Learning for Vision',
    shortTitle: 'Math & Machine Learning',
    tagline: 'Understand the linear algebra, multivariable calculus, probability, and classical ML algorithms behind visual intelligence.',
    iconName: 'Sigma',
    goal: 'Understand the mathematical and machine learning foundations required for computer vision.',
    whyItMatters:
      'Computer vision is applied mathematics. Images are matrices, spatial transformations are matrix multiplications, neural network training is multivariable gradient optimization, and classifier outputs are probability distributions.',
    learningOutcome: 'Understand the mathematical intuition behind images, transformations, optimization, and machine learning.',
    recommendedApproach:
      'Focus on the geometric intuition of Linear Algebra (rotation matrices, dot products for similarity, coordinate systems) and Calculus (gradients and chain rule for backpropagation) rather than abstract proofs.',
    technologies: ['Scikit-learn', 'NumPy', 'SciPy', 'Matplotlib', 'SymPy'],
    visualIntuition: {
      label: 'Core Mathematical Connections in Computer Vision',
      steps: [
        'MATRIX → An image grid of pixel intensity values',
        'MATRIX MULTIPLICATION → 2D/3D affine transformation & convolution',
        'DOT PRODUCT → Feature similarity & vector projection',
        'GRADIENT → Direction of steepest descent for loss optimization',
        'PROBABILITY (Softmax) → Multi-class confidence score distribution',
      ],
    },
    topics: [
      {
        category: 'Linear Algebra for Visual Computing',
        items: [
          'Vectors and Vector Spaces: Direction, magnitude (L1, L2 norm), Euclidean distance',
          'Matrices: Addition, scalar multiplication, Matrix multiplication (dot product)',
          'Geometric Transformations: 2D & 3D translation, rotation, scaling, shear, and affine transformation matrices',
          'Homogeneous coordinates: 3x3 matrices for 2D perspective and projective geometry',
          'Eigenvalues and Eigenvectors: Principal Component Analysis (PCA) for image dimensionality reduction',
        ],
      },
      {
        category: 'Multivariable Calculus & Optimization',
        items: [
          'Derivatives, partial derivatives, and the Gradient vector (∇f)',
          'The Chain Rule: Propagating gradients through composite functions (Backpropagation)',
          'Loss functions: Mean Squared Error (MSE), Binary Cross-Entropy, Categorical Cross-Entropy, Focal Loss',
          'Optimization algorithms: Gradient Descent, Stochastic Gradient Descent (SGD), Momentum, Adam optimizer',
        ],
      },
      {
        category: 'Probability & Statistics for Vision',
        items: [
          'Probability distributions: Gaussian / Normal distribution, Uniform distribution',
          'Mean, variance, standard deviation, and covariance of pixel populations',
          'Bayes\' Theorem, conditional probability, and maximum likelihood estimation (MLE)',
          'Softmax function: Converting raw neural network logits into normalized probability distributions',
        ],
      },
      {
        category: 'Classical Machine Learning Algorithms',
        items: [
          'Supervised vs Unsupervised learning paradigms',
          'Logistic Regression & Softmax Regression for binary and multi-class classification',
          'Support Vector Machines (SVM) with linear and RBF kernels for handcrafted visual feature classification',
          'Decision Trees, Random Forests, and Gradient Boosting (XGBoost) for tabular visual metadata',
          'K-Means Clustering: Color quantization and dominant color extraction from images',
          'Model validation: Train/Validation/Test splits, K-Fold cross-validation, Overfitting vs Underfitting, L1/L2 Regularization',
        ],
      },
    ],
    keyConcepts: [
      'Affine Transformation Matrices & Homogeneous Coordinates',
      'Gradient Descent & Multivariable Backpropagation',
      'Cross-Entropy Loss & Softmax Probability Distributions',
      'Support Vector Machines (SVM) on Feature Descriptors',
      'Overfitting Prevention via L2 Weight Decay',
    ],
    practiceSuggestions: [
      'Write a Python function from scratch that applies a 2D affine rotation and scaling transformation to an image coordinate grid using matrix multiplication.',
      'Train an SVM and a Random Forest classifier in Scikit-learn on extracted image color histogram vectors and compare classification accuracy.',
      'Implement K-Means clustering to extract the 5 dominant color palettes from any input photograph.',
    ],
    projectSuggestions: [
      {
        title: 'Dominant Color Palette Extractor & Image Feature Classifier',
        description: 'A classical computer vision pipeline using K-Means clustering for color quantization and Scikit-learn SVM/Random Forest models to classify scenes based on color and texture statistics.',
        level: 'Beginner',
      },
    ],
    commonMistakes: [
      'Treating neural network optimizers as black boxes without understanding how learning rate and momentum affect gradient descent convergence.',
      'Failing to normalize input image pixel ranges (leaving values 0-255 instead of 0.0-1.0), causing exploding gradients during optimization.',
      'Evaluating models on training data, leading to severe overfitting blindness.',
    ],
    nextStepPreview: 'Understand how digital cameras and computers represent visual data in Stage 03: Computer Vision Fundamentals.',
  },
  {
    id: 'computer-vision-fundamentals',
    stageNumber: '03',
    title: 'Computer Vision Fundamentals',
    shortTitle: 'CV Fundamentals',
    tagline: 'Understand how digital devices and computers represent, store, interpret, and manipulate visual information.',
    iconName: 'Image',
    goal: 'Understand how computers represent and interpret visual information.',
    whyItMatters:
      'To build computer vision systems, you must deeply understand what an image actually is: an array of pixel values with discrete dimensions, color spaces, bit depths, and coordinate systems that behave differently across software libraries.',
    learningOutcome: "Understand what an image and video actually look like from a computer's perspective.",
    recommendedApproach:
      'Inspect pixel values directly. Learn the differences between RGB, BGR, HSV, and Grayscale color channels and understand image coordinate systems (where (0,0) is top-left, X is width, Y is height).',
    technologies: ['NumPy', 'Pillow (PIL)', 'Matplotlib', 'ImageIO'],
    visualIntuition: {
      label: 'The Visual Representation Pipeline',
      steps: [
        'SCENE (Continuous photons captured by camera sensor)',
        'PIXELS (2D spatial matrix of discrete intensity samples)',
        'CHANNELS (Red, Green, Blue / Hue, Saturation, Value)',
        'FEATURES (Edges, textures, color distributions, keypoints)',
        'VISION MODEL (Neural network / algorithmic classifier)',
        'PREDICTION (Semantic class, bounding box, or segmentation mask)',
      ],
    },
    topics: [
      {
        category: 'Digital Image Representation',
        items: [
          'What is a pixel? Spatial resolution (Width × Height), pixel aspect ratio',
          'Channels: Single-channel Grayscale vs 3-channel RGB vs 4-channel RGBA (Alpha transparency)',
          'Bit Depth: 8-bit unsigned integers (0 to 255) vs 16-bit medical images vs 32-bit floating point',
          'Raster formats (JPEG lossy compression, PNG lossless, WebP, TIFF, BMP) vs Vector graphics basics',
          'Computer vision coordinate system: Origin (0,0) at top-left corner, +X right, +Y down',
        ],
      },
      {
        category: 'Color Spaces & Representations',
        items: [
          'RGB (Red, Green, Blue) additive color model: Intuition and limitations for segmentation',
          'BGR (Blue, Green, Red): Why OpenCV uses BGR by default and how to convert to RGB',
          'HSV (Hue, Saturation, Value): Isolating colors regardless of lighting variations (essential for color-based tracking)',
          'LAB / CIELAB (Luminance, A-channel green-red, B-channel blue-yellow): Perceptually uniform color space',
          'Grayscale conversion formulas: Luminance weighting (0.299R + 0.587G + 0.114B) vs simple averaging',
        ],
      },
      {
        category: 'Image Properties & Geometry',
        items: [
          'Brightness, Contrast, Dynamic Range, and Pixel Intensity Histograms',
          'Bounding box representations: (xmin, ymin, xmax, ymax) vs (xcenter, ycenter, width, height)',
          'Normalized coordinates: Bounding box coordinates expressed as relative floats between 0.0 and 1.0',
          'Aspect ratio constraints and letterboxing / padding for model inputs',
        ],
      },
      {
        category: 'Video Fundamentals',
        items: [
          'What is a video? A continuous sequence of temporal frames (images over time)',
          'Frame Rate (FPS - Frames Per Second): Real-time standards (24 FPS, 30 FPS, 60 FPS)',
          'Video Codecs & Containers: H.264, H.265, VP9, MP4, AVI, MKV',
          'Interlaced vs Progressive video scanning',
        ],
      },
    ],
    keyConcepts: [
      'Top-Left Origin Image Coordinate Space (X=Width, Y=Height)',
      'RGB vs BGR vs HSV Color Space Conversions',
      'Bounding Box Coordinate Conventions (Absolute vs Normalized)',
      'Pixel Intensity Distribution Histograms',
      'Temporal Frame Streaming & Frame Rate (FPS)',
    ],
    practiceSuggestions: [
      'Load an image using Pillow and convert it to HSV; threshold the Hue channel to isolate and mask all yellow objects in the scene.',
      'Write a Python utility to convert bounding box coordinates between [xmin, ymin, xmax, ymax] and [x_center, y_center, width, height] normalized formats.',
      'Plot individual Red, Green, and Blue pixel intensity histograms of an underexposed photo using Matplotlib.',
    ],
    projectSuggestions: [
      {
        title: 'Interactive Color Space Explorer & Bounding Box Converter',
        description: 'A visual tool that displays live RGB, HSV, and LAB channel decompositions, interactive pixel coordinate inspection, and bounding box coordinate transformation utilities.',
        level: 'Beginner',
      },
    ],
    commonMistakes: [
      'Confusing image dimensions order in NumPy: array.shape is (Height, Width, Channels) while image APIs often specify (Width, Height).',
      'Attempting color-based object segmentation in RGB space where shadow and lighting changes drastically alter R, G, and B values simultaneously (use HSV instead).',
      'Mixing up BGR (OpenCV) and RGB (Matplotlib/PyTorch), resulting in blue-tinted faces in visualizations.',
    ],
    nextStepPreview: 'Master traditional image manipulation, filtering, and morphological operations in Stage 04: Image Processing.',
  },
  {
    id: 'image-processing',
    stageNumber: '04',
    title: 'Image Processing Techniques',
    shortTitle: 'Image Processing',
    tagline: 'Learn how to filter, enhance, transform, and extract geometric features from visual data using classical image processing.',
    iconName: 'Sliders',
    goal: 'Learn how to manipulate, enhance, and transform visual data before applying machine learning.',
    whyItMatters:
      'Before deep learning models can operate, images must be cleaned, normalized, resized, filtered, and augmented. Classical image processing provides robust, ultra-fast techniques for noise removal, edge detection, binarization, and shape analysis.',
    learningOutcome: 'Understand how traditional image processing techniques manipulate visual information.',
    recommendedApproach:
      'Master spatial convolution filters (Sobel, Gaussian), thresholding techniques (Otsu), and morphological operations (Erosion/Dilation). These form the backbone of preprocessing pipelines.',
    technologies: ['OpenCV (cv2)', 'scikit-image', 'NumPy', 'SciPy ndimage', 'Matplotlib'],
    visualIntuition: {
      label: 'The Classical Image Processing Pipeline',
      steps: [
        'RAW IMAGE (Noisy, varying illumination photograph)',
        'FILTER (Gaussian / Bilateral noise reduction)',
        'EDGE DETECTION (Sobel / Canny gradient computation)',
        'THRESHOLDING (Otsu adaptive binarization into black & white)',
        'MORPHOLOGY (Dilation & erosion to close gaps)',
        'CONTOUR EXTRACTION (Extracting shape polygons & bounding boxes)',
      ],
    },
    topics: [
      {
        category: 'Basic Transformations & Resizing',
        items: [
          'Spatial interpolation methods: Nearest neighbor, bilinear, bicubic, and Lanczos interpolation',
          'Geometric transforms: Translation, scaling, rotation around image center, horizontal/vertical flipping',
          'Affine transformations: cv2.getAffineTransform and cv2.warpAffine (3-point mapping)',
          'Perspective / Homography transformations: cv2.getPerspectiveTransform and cv2.warpPerspective (4-point document unwarping)',
        ],
      },
      {
        category: 'Image Enhancement & Spatial Filtering',
        items: [
          'Spatial convolution with 2D kernels: Smoothing, sharpening, and edge filters',
          'Blurring filters: Average blur, Gaussian blur (kernel size & sigma), Median blur (salt-and-pepper noise removal)',
          'Bilateral filtering: Edge-preserving smoothing (smoothing textures while keeping crisp edges)',
          'Contrast Limited Adaptive Histogram Equalization (CLAHE) for dark/overexposed image enhancement',
        ],
      },
      {
        category: 'Edge Detection & Image Gradients',
        items: [
          'First-order derivatives: Sobel operator (horizontal Gx and vertical Gy gradients) and Scharr operator',
          'Second-order derivatives: Laplacian operator for rapid intensity change detection',
          'The Canny Edge Detector: 5-step algorithm (Gaussian filter → Gradient calculation → Non-Maximum Suppression → Double Thresholding → Edge Tracking by Hysteresis)',
        ],
      },
      {
        category: 'Thresholding, Morphology & Contours',
        items: [
          'Simple binary thresholding vs Adaptive thresholding (handling non-uniform lighting)',
          'Otsu\'s thresholding: Automatically calculating optimal binarization threshold from histogram bimodal distribution',
          'Morphological operations: Structuring elements (kernels), Erosion, Dilation, Opening (remove noise), Closing (fill holes)',
          'Contour detection (cv2.findContours), contour hierarchy, bounding rectangles, minAreaRect, convex hulls, and perimeter/area calculation',
        ],
      },
    ],
    keyConcepts: [
      '2D Kernel Convolution & Spatial Filtering',
      'Canny 5-Stage Edge Detection Pipeline',
      'Otsu\'s Automated Bimodal Thresholding',
      'Morphological Dilation, Erosion, Opening & Closing',
      'Contour Hierarchy & Convex Hull Analysis',
    ],
    practiceSuggestions: [
      'Implement an automated document scanner pipeline: convert a photo of a receipt to grayscale, apply Gaussian blur, run Canny edge detection, find the 4-corner contour, and apply a perspective warp to flatten it.',
      'Build an image noise reduction tool comparing Gaussian blur, Median filter, and Bilateral filter on noisy images.',
      'Use CLAHE to dramatically improve feature visibility on medical X-ray or dark low-light images.',
    ],
    projectSuggestions: [
      {
        title: 'Automated Perspective Document Scanner & Optimizer',
        description: 'A complete computer vision script that automatically detects page borders from smartphone photos, applies 4-point perspective correction, and enhances contrast using CLAHE and adaptive thresholding.',
        level: 'Beginner',
      },
    ],
    commonMistakes: [
      'Applying edge detection directly to raw noisy images without applying a Gaussian smoothing filter first, resulting in noisy false edges.',
      'Using standard global thresholding on images with uneven shadows or gradient lighting (use adaptive thresholding or Otsu instead).',
      'Using nearest-neighbor interpolation when downscaling high-resolution images, causing aliasing and jagged artifacts.',
    ],
    nextStepPreview: 'Build practical real-time computer vision applications and camera pipelines in Stage 05: OpenCV & Computer Vision Tools.',
  },
  {
    id: 'opencv-tools',
    stageNumber: '05',
    title: 'OpenCV & Computer Vision Tools',
    shortTitle: 'OpenCV & Tools',
    tagline: 'Master OpenCV to capture live video streams, process frames in real time, extract keypoints, and build interactive vision systems.',
    iconName: 'Scan',
    goal: 'Learn the practical tools used to build computer vision applications.',
    whyItMatters:
      'OpenCV is the industry standard library for computer vision. It provides optimized C++ implementations with Python bindings for video capture, camera calibration, drawing UI overlays, feature matching, and real-time processing.',
    learningOutcome: 'Build practical computer vision applications using image and video processing.',
    recommendedApproach:
      'Build interactive webcam applications. Measure your loop processing time per frame to calculate real-time Frames Per Second (FPS) and practice non-blocking video stream handling.',
    technologies: ['OpenCV (cv2)', 'NumPy', 'Pillow', 'scikit-image', 'imutils'],
    topics: [
      {
        category: 'OpenCV Video & Webcam Streams',
        items: [
          'cv2.VideoCapture: Accessing webcams (device index 0, 1), video files, and RTSP IP camera streams',
          'Frame-by-frame processing loops: Reading frames, error handling on stream disconnects, cv2.waitKey()',
          'FPS calculation: Measuring frame processing latency and displaying live FPS counters on screen',
          'cv2.VideoWriter: Encoding and saving processed frames to MP4 / AVI using FourCC codecs (e.g. mp4v, XVID)',
        ],
      },
      {
        category: 'Drawing & UI Overlays',
        items: [
          'Drawing primitives: cv2.rectangle, cv2.circle, cv2.line, cv2.polylines with custom colors and line thickness',
          'Text rendering: cv2.putText, font selections (cv2.FONT_HERSHEY_SIMPLEX), text bounding boxes',
          'Creating visual HUD overlays (confidence meters, tracking trails, bounding box labels)',
        ],
      },
      {
        category: 'Camera Calibration & Geometry',
        items: [
          'Pinhole camera model: Focal length (fx, fy), optical center (cx, cy), pixel skew',
          'Lens distortion: Radial distortion (barrel, pincushion) and tangential distortion',
          'Camera calibration with chessboard patterns: cv2.findChessboardCorners, cv2.calibrateCamera',
          'Intrinsic matrix vs Extrinsic matrix (Rotation and Translation vectors)',
          'Undistorting camera frames in real time using cv2.undistort',
        ],
      },
      {
        category: 'Traditional Visual Features & Matching',
        items: [
          'Keypoint detection and feature descriptors: Why corners and unique textures are robust to rotation and scale',
          'SIFT (Scale-Invariant Feature Transform) and SURF concepts',
          'ORB (Oriented FAST and Rotated BRIEF): Fast, open-source binary feature detector and descriptor',
          'Feature Matching: Brute-Force Matcher (cv2.BFMatcher) and FLANN (Fast Library for Approximate Nearest Neighbors)',
          'RANSAC (Random Sample Consensus) for robust homography estimation and object localization',
          'HOG (Histogram of Oriented Gradients) for human body and pedestrian detection',
        ],
      },
    ],
    keyConcepts: [
      'Real-Time cv2.VideoCapture & cv2.VideoWriter Pipelines',
      'Pinhole Camera Calibration & Lens Undistortion',
      'ORB Binary Feature Extraction & FLANN Matching',
      'RANSAC Outlier Rejection for Planar Homographies',
      'Histogram of Oriented Gradients (HOG) Feature Vectors',
    ],
    practiceSuggestions: [
      'Build a real-time motion detection system that computes frame differencing between consecutive video frames and draws bounding boxes around moving objects.',
      'Calibrate your laptop webcam using a printed 8x6 chessboard pattern, calculate camera intrinsic parameters, and undistort live video frames.',
      'Implement an image stitching / panorama generator using ORB keypoint matching, RANSAC homography, and cv2.warpPerspective.',
    ],
    projectSuggestions: [
      {
        title: 'Real-Time Webcam Motion Detection & Security Recorder',
        description: 'An OpenCV application that continuously monitors a webcam feed, triggers automated video recording when motion exceeds a threshold, and highlights movement contours with live FPS overlays.',
        level: 'Beginner',
      },
    ],
    commonMistakes: [
      'Calling blocking operations or heavy disk I/O inside the live video frame loop, dropping frame rates from 30 FPS down to 5 FPS.',
      'Hardcoding camera resolution without checking supported hardware capabilities via cap.set(cv2.CAP_PROP_FRAME_WIDTH).',
      'Forgetting to call cap.release() and cv2.destroyAllWindows(), leaking webcam hardware locks and memory.',
    ],
    nextStepPreview: 'Transition from handcrafted features to learned neural representations in Stage 06: Deep Learning for Computer Vision.',
  },
  {
    id: 'deep-learning-vision',
    stageNumber: '06',
    title: 'Deep Learning for Computer Vision',
    shortTitle: 'Deep Learning Basics',
    tagline: 'Understand how deep neural networks automatically learn hierarchical visual representations from raw image datasets.',
    iconName: 'Brain',
    goal: 'Understand how neural networks learn visual features.',
    whyItMatters:
      'Classical computer vision relied on manually handcrafted feature extractors (like SIFT and HOG) that broke when lighting, angle, or background changed. Deep learning models learn robust visual representations directly from data through backpropagation.',
    learningOutcome: 'Understand how deep learning models learn visual features from images.',
    recommendedApproach:
      'Master PyTorch. Understand Tensors, Dataset and DataLoader classes, custom nn.Module definitions, training loops, GPU CUDA device management, and loss backpropagation.',
    technologies: ['PyTorch', 'Torchvision', 'Albumentations', 'CUDA / cuDNN', 'TensorBoard'],
    visualIntuition: {
      label: 'The Deep Learning Training Loop',
      steps: [
        'IMAGE BATCH (Transformed & augmented tensor [B, C, H, W])',
        'FORWARD PASS (Tensors propagate through neural network layers)',
        'LOSS COMPUTATION (Compute loss against ground truth labels)',
        'BACKPROPAGATION (optimizer.zero_grad() & loss.backward())',
        'WEIGHT UPDATE (optimizer.step() adjusts network weights)',
        'EVALUATION (Validate on unseen validation dataset & save checkpoint)',
      ],
    },
    topics: [
      {
        category: 'Neural Network Fundamentals for Vision',
        items: [
          'Artificial Neurons (Perceptrons): Inputs, weights, biases, linear combination (z = Wx + b)',
          'Activation Functions: ReLU, LeakyReLU, GELU, Sigmoid, Softmax (why non-linearity is essential)',
          'Fully Connected (Dense) Layers and why flattening high-resolution images leads to parameter explosion',
          'Forward propagation, computational graphs in PyTorch, and automatic differentiation (Autograd)',
          'Loss functions: Cross-Entropy Loss, Binary Cross-Entropy (BCEWithLogitsLoss), MSE Loss',
          'Optimizers: SGD with Momentum, Adam, AdamW (weight decay decoupled optimization)',
        ],
      },
      {
        category: 'PyTorch Architecture & Workflow',
        items: [
          'PyTorch Tensors: Creation, shapes, indexing, CPU vs GPU memory (.to("cuda"))',
          'Custom Dataset class: Implementing __len__ and __getitem__ for lazy image loading',
          'DataLoader: Batching, shuffling, multi-process worker loading (num_workers), pin_memory',
          'Building custom models with torch.nn.Module: Defining __init__ and forward()',
          'Writing clean training and validation loops with epoch tracking and metric logging',
          'Saving and loading model checkpoints (torch.save / torch.load state_dict)',
          'Early stopping to prevent overfitting when validation loss plateaus',
        ],
      },
      {
        category: 'Data Augmentation for Visual Robustness',
        items: [
          'Why data augmentation is mandatory: Simulating real-world variations and preventing overfitting',
          'Spatial transforms: Random horizontal flips, random rotations, random affine cropping, scaling',
          'Color space transforms: Color jitter (brightness, contrast, saturation, hue variations)',
          'Modern augmentation techniques: CutOut, MixUp, CutMix, Random Erasing',
          'Using the Albumentations library for ultra-fast, synchronized image and bounding box augmentations',
        ],
      },
      {
        category: 'GPU Acceleration & CUDA Concepts',
        items: [
          'Why GPUs excel at deep learning: Massive parallel matrix multiplication cores',
          'CUDA drivers, cuDNN acceleration, and PyTorch device management (device = "cuda" if torch.cuda.is_available() else "cpu")',
          'GPU VRAM management: Batch size tuning, out-of-memory (CUDA OOM) debugging, torch.cuda.empty_cache()',
          'Mixed precision training (torch.cuda.amp.autocast): Using FP16 to speed up training by 2x and cut VRAM usage in half',
        ],
      },
    ],
    keyConcepts: [
      'PyTorch Custom Dataset & DataLoader Pipelines',
      'Automatic Differentiation & Backpropagation (loss.backward())',
      'Albumentations Data Augmentation Pipelines',
      'CUDA Device Management & Mixed Precision (FP16)',
      'Model Checkpointing & Early Stopping Strategies',
    ],
    practiceSuggestions: [
      'Write a custom PyTorch Dataset class that loads image files from disk, applies Albumentations augmentations, and returns normalized (C, H, W) tensors.',
      'Train a multi-layer neural network in PyTorch on the Fashion-MNIST dataset and plot training vs validation loss curves in TensorBoard.',
      'Implement mixed precision training using torch.cuda.amp and benchmark training speed and VRAM consumption vs standard FP32.',
    ],
    projectSuggestions: [
      {
        title: 'Custom Deep Learning Training Pipeline in PyTorch',
        description: 'A modular, production-ready PyTorch training boilerplate featuring custom Dataset loaders, Albumentations pipelines, TensorBoard logging, mixed precision training, and early stopping.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Forgetting optimizer.zero_grad() inside the training loop, causing gradients to accumulate indefinitely across batches.',
      'Forgetting model.eval() and torch.no_grad() during validation, causing Dropout/BatchNorm to behave incorrectly and leaking memory.',
      'Setting num_workers=0 in DataLoader, causing the GPU to sit idle while waiting for the single-threaded CPU to load images from disk.',
    ],
    nextStepPreview: 'Master spatial feature extraction and Convolutional Neural Networks in Stage 07: CNNs & Image Classification.',
  },
  {
    id: 'cnns-image-classification',
    stageNumber: '07',
    title: 'CNNs & Image Classification',
    shortTitle: 'CNNs & Classification',
    tagline: 'Understand Convolutional Neural Networks, hierarchical feature learning, classic backbones, and transfer learning.',
    iconName: 'Grid',
    goal: 'Understand Convolutional Neural Networks and how they classify images.',
    whyItMatters:
      'Convolutional Neural Networks (CNNs) revolutionized computer vision by leveraging translation invariance and local receptive fields. Instead of treating pixels independently, CNNs learn hierarchical visual primitives: edges in early layers, textures in middle layers, and complete object parts in deeper layers.',
    learningOutcome: 'Build and fine-tune CNN-based image classification systems.',
    recommendedApproach:
      'Master Transfer Learning. Instead of training CNNs from scratch on small datasets, use pre-trained backbones (ResNet, EfficientNet) trained on ImageNet, freeze feature extractors, and fine-tune custom classification heads.',
    technologies: ['PyTorch', 'Torchvision Models', 'Timm (PyTorch Image Models)', 'ResNet', 'EfficientNet', 'Grad-CAM'],
    visualIntuition: {
      label: 'The Convolutional Neural Network Pipeline',
      steps: [
        'INPUT IMAGE (224 × 224 × 3 RGB tensor)',
        'CONVOLUTION + RELU (Kernel filters extract local edge feature maps)',
        'MAX POOLING / STRIDED CONV (Downsamples spatial resolution)',
        'DEEP CONVOLUTIONAL BLOCKS (Extracts complex shapes & semantic parts)',
        'GLOBAL AVERAGE POOLING (Reduces feature map to 1D embedding vector)',
        'LINEAR CLASSIFICATION HEAD (Softmax outputs class probabilities)',
      ],
    },
    topics: [
      {
        category: 'Convolutional Layer Mechanics',
        items: [
          '2D Convolution operations: Kernels, filters, weights, and spatial dot products',
          'Feature maps: How a 64-filter convolutional layer produces 64 distinct feature channels',
          'Stride: Step size of the moving filter across the spatial grid',
          'Padding: "Valid" padding (no padding) vs "Same" padding (preserving spatial dimensions)',
          'Pooling layers: Max Pooling and Average Pooling for spatial dimension reduction and translation invariance',
          'Receptive Field: How deeper neurons "see" larger regions of the original input image',
          'Global Average Pooling (GAP) vs Flattening: Drastically reducing parameter counts and preventing overfitting',
        ],
      },
      {
        category: 'Classic & Modern CNN Architectures',
        items: [
          'LeNet-5 (1998) and AlexNet (2012): The historical breakthroughs',
          'VGG (VGG16 / VGG19): Small 3x3 uniform filters and deep sequential stacking',
          'GoogLeNet / Inception: Multi-scale parallel convolution kernels (1x1, 3x3, 5x5)',
          'ResNet (ResNet-18, 50, 101): Residual skip connections (y = F(x) + x) solving the vanishing gradient problem in deep networks',
          'EfficientNet: Compound scaling balancing network depth, width, and image resolution',
          'MobileNet (MobileNetV2/V3): Depthwise separable convolutions for low-power edge and mobile devices',
          'Using the timm (PyTorch Image Models) library to access hundreds of state-of-the-art pretrained backbones',
        ],
      },
      {
        category: 'Transfer Learning & Fine-Tuning',
        items: [
          'Why Transfer Learning works: Feature reuse from models pre-trained on 1.4M+ ImageNet images',
          'Feature Extraction: Freezing the convolutional backbone and training only the replacement final linear classification layer',
          'Fine-Tuning: Unfreezing top backbone layers with a low learning rate (e.g. 1e-5) for domain adaptation',
          'Layer-wise discriminative learning rates: Setting lower learning rates for early layers and higher for head layers',
        ],
      },
      {
        category: 'Classification Types & Evaluation',
        items: [
          'Binary Classification (Sigmoid + BCELoss) vs Multi-Class Classification (Softmax + CrossEntropyLoss)',
          'Multi-Label Classification: Predicting multiple simultaneous attributes (e.g. "sunglasses", "hat", "smiling") using independent Sigmoids',
          'Evaluation Metrics: Accuracy, Precision, Recall, Macro/Micro F1-Score, Confusion Matrix, Top-1 and Top-5 Accuracy',
          'Model Explainability: Grad-CAM (Gradient-weighted Class Activation Mapping) to visualize which image regions triggered predictions',
        ],
      },
    ],
    keyConcepts: [
      'Convolutional Kernels, Strides, Padding & Feature Maps',
      'ResNet Residual Skip Connections & Identity Mapping',
      'Transfer Learning (Feature Extraction vs Fine-Tuning)',
      'Global Average Pooling (GAP) & Linear Classifier Head',
      'Grad-CAM Visual Heatmap Model Explainability',
    ],
    practiceSuggestions: [
      'Load a pre-trained ResNet-50 from torchvision, replace its final fc layer with a custom classifier, freeze backbone weights, and train on a 5-class flower dataset.',
      'Implement fine-tuning by unfreezing the last residual block of ResNet and training with a differential learning rate (1e-5 for backbone, 1e-3 for head).',
      'Generate a Grad-CAM heatmap overlay showing where a trained classifier is looking when identifying a specific dog breed.',
    ],
    projectSuggestions: [
      {
        title: 'Agricultural Plant Disease Classifier with Grad-CAM Explainability',
        description: 'An end-to-end PyTorch image classification system using an EfficientNet backbone fine-tuned on crop leaf datasets, complete with confusion matrix evaluation and interactive Grad-CAM visual heatmaps.',
        level: 'Intermediate',
      },
    ],
    commonMistakes: [
      'Training a deep CNN from scratch on a small dataset of only a few hundred images, leading to immediate catastrophic overfitting (always use Transfer Learning).',
      'Fine-tuning all layers with a large default learning rate (e.g. 1e-2), destroying the pre-trained ImageNet weights (weight shattering).',
      'Using accuracy as the sole evaluation metric when evaluating highly imbalanced medical or defect datasets.',
    ],
    nextStepPreview: 'Locate and classify multiple objects in a single image in Stage 08: Object Detection.',
  },
  {
    id: 'object-detection',
    stageNumber: '08',
    title: 'Object Detection',
    shortTitle: 'Object Detection',
    tagline: 'Learn how to detect, locate with bounding boxes, and classify multiple objects inside images and video streams in real time.',
    iconName: 'Scan',
    goal: 'Learn how to locate and classify multiple objects inside an image.',
    whyItMatters:
      'Classification only answers "what is in this image?" Real-world applications—autonomous vehicles, security surveillance, robotics, retail checkout—require answering "what objects are present, where are they located, and how many are there?"',
    learningOutcome: 'Build systems that can locate and classify objects in images and video.',
    recommendedApproach:
      'Master the core detection concepts (Bounding Boxes, IoU, Confidence Scores, Non-Maximum Suppression, and mAP) before working with modern one-stage detector frameworks (YOLO family, SSD, RT-DETR).',
    technologies: ['PyTorch', 'Ultralytics YOLO', 'Torchvision (Faster R-CNN)', 'Albumentations', 'COCO Dataset Format'],
    visualIntuition: {
      label: 'The Object Detection Inference Pipeline',
      steps: [
        'INPUT IMAGE (Photo containing multiple objects)',
        'DETECTION BACKBONE & NECK (Feature pyramid network extracts multi-scale features)',
        'DETECTION HEAD (Predicts thousands of candidate bounding boxes + class probabilities)',
        'CONFIDENCE THRESHOLDING (Filters out low-confidence background boxes < 0.25)',
        'NON-MAXIMUM SUPPRESSION / NMS (Merges overlapping duplicate boxes with high IoU)',
        'FINAL DETECTIONS ([PERSON 0.94], [CAR 0.89], [BICYCLE 0.86])',
      ],
    },
    topics: [
      {
        category: 'Core Object Detection Concepts',
        items: [
          'Detection output formulation: For every object: [x_min, y_min, x_max, y_max, class_id, confidence_score]',
          'Intersection over Union (IoU): Area of Overlap / Area of Union (measuring bounding box localization accuracy)',
          'Anchor Boxes: Pre-defined bounding box aspect ratios and scales vs Modern Anchor-Free architectures',
          'Non-Maximum Suppression (NMS): Algorithm to eliminate redundant overlapping candidate boxes based on IoU threshold',
          'Soft-NMS: Decaying confidence scores of overlapping boxes rather than hard elimination',
        ],
      },
      {
        category: 'One-Stage vs Two-Stage Detectors',
        items: [
          'Two-Stage Detectors: R-CNN, Fast R-CNN, Faster R-CNN (Region Proposal Network + RoI Pooling + Classification/Regression heads). High accuracy, slower inference.',
          'One-Stage Detectors: SSD (Single Shot MultiBox Detector), RetinaNet (Focal Loss for class imbalance), YOLO family. Direct dense prediction, real-time speed.',
          'Feature Pyramid Networks (FPN) and PANet: Detecting tiny objects and large objects simultaneously across multiple feature resolutions',
          'Modern Real-Time Detectors (YOLO architectures & RT-DETR): Backbone, Neck (PANet/FPN), Head design principles',
        ],
      },
      {
        category: 'Evaluation Metrics for Object Detection',
        items: [
          'True Positives (TP), False Positives (FP), False Negatives (FN) based on IoU threshold (e.g. IoU >= 0.5)',
          'Precision-Recall curve for object detection',
          'Average Precision (AP) calculation via Area Under the PR curve',
          'Mean Average Precision (mAP): mAP@0.5 (PASCAL VOC metric) and mAP@0.5:0.95 (COCO standard metric averaged across 10 IoU thresholds)',
        ],
      },
      {
        category: 'Real-Time Performance & Dataset Formats',
        items: [
          'Annotation formats: COCO JSON format (annotations, images, categories), Pascal VOC XML, and YOLO TXT format',
          'Inference speed vs accuracy trade-offs: Model variants (Nano, Small, Medium, Large, X-Large)',
          'Benchmarking real-time video feeds: Inference time vs Post-processing (NMS) time vs Drawing time',
        ],
      },
    ],
    keyConcepts: [
      'Intersection over Union (IoU) & Bounding Box Overlap',
      'Non-Maximum Suppression (NMS) Filtering',
      'One-Stage (YOLO/SSD) vs Two-Stage (Faster R-CNN) Trade-Offs',
      'Mean Average Precision (mAP@0.5 and mAP@0.5:0.95)',
      'Feature Pyramid Networks (FPN) for Multi-Scale Detection',
    ],
    practiceSuggestions: [
      'Implement an IoU calculation function and an NMS (Non-Maximum Suppression) algorithm from scratch in NumPy/PyTorch.',
      'Train a lightweight YOLO object detector on a custom dataset (e.g. PPE safety helmets, retail products) formatted in YOLO format.',
      'Evaluate your trained detector on test images, compute mAP@0.5:0.95, and plot Precision-Recall curves.',
    ],
    projectSuggestions: [
      {
        title: 'Real-Time Industrial Safety PPE Detection System',
        description: 'A custom-trained real-time object detection model that identifies hardhats, safety vests, and safety goggles in live video streams with automated alert triggers and bounding box visualizers.',
        level: 'Advanced',
      },
    ],
    commonMistakes: [
      'Memorizing specific version numbers rather than understanding the underlying bounding box regression, anchor assignment, and loss functions.',
      'Evaluating object detectors using standard classification accuracy instead of Mean Average Precision (mAP).',
      'Setting NMS IoU threshold too low (merging two people standing closely together into one box) or too high (leaving duplicate duplicate boxes around a single person).',
    ],
    nextStepPreview: 'Advance to pixel-level mask prediction and document text extraction in Stage 09: Image Segmentation, OCR & Document Vision.',
  },
  {
    id: 'segmentation-ocr-document',
    stageNumber: '09',
    title: 'Image Segmentation, OCR & Document Vision',
    shortTitle: 'Segmentation & OCR',
    tagline: 'Learn pixel-level semantic and instance segmentation, Optical Character Recognition (OCR), and document understanding.',
    iconName: 'Layers',
    goal: 'Learn advanced vision tasks that require pixel-level understanding and document intelligence.',
    whyItMatters:
      'Bounding boxes are insufficient when exact object boundaries are required (medical tumor delineation, autonomous lane boundaries, background removal). Similarly, extracting text from receipts, invoices, IDs, and forms requires combining vision with language understanding.',
    learningOutcome: 'Build systems that understand regions, pixels, and text inside images.',
    recommendedApproach:
      'Master the distinction between Semantic Segmentation (U-Net), Instance Segmentation (Mask R-CNN), and Panoptic Segmentation. Combine image preprocessing with OCR engines for robust document intelligence.',
    technologies: ['PyTorch', 'U-Net', 'Mask R-CNN', 'Tesseract OCR', 'EasyOCR / PaddleOCR', 'Albumentations'],
    visualIntuition: {
      label: 'The Segmentation and OCR Processing Pipeline',
      steps: [
        'INPUT IMAGE (Medical scan, road scene, or scanned invoice)',
        'ENCODER / BACKBONE (Compresses image into dense spatial feature representation)',
        'DECODER / UPSAMPLING (Transposed conv / bilinear upsampling restores original image resolution)',
        'PIXEL-LEVEL MASK (Outputs per-pixel class prediction mask)',
        'OCR TEXT DETECTION (Locates word bounding boxes in document regions)',
        'OCR TEXT RECOGNITION (Converts pixel crops into structured digital text strings)',
      ],
    },
    topics: [
      {
        category: 'Image Segmentation Paradigms',
        items: [
          'Semantic Segmentation: Classifying every single pixel into a class (e.g. road, car, sky) without distinguishing individual object instances',
          'Instance Segmentation: Detecting distinct object instances AND generating a precise pixel mask for each one (e.g. Car #1 vs Car #2)',
          'Panoptic Segmentation: Unified segmentation combining Semantic ("stuff" like sky, road) and Instance ("things" like people, cars)',
        ],
      },
      {
        category: 'Segmentation Architectures & Loss Functions',
        items: [
          'Fully Convolutional Networks (FCN): Replacing dense layers with 1x1 convolutions for arbitrary-sized spatial heatmaps',
          'U-Net Architecture: Symmetric Encoder-Decoder with Skip Connections preserving high-resolution spatial details for medical imaging',
          'Mask R-CNN: Adding a third branch (FCN mask head) alongside Faster R-CNN classification and bounding box regression',
          'Modern Segmentation Foundation Models: Segment Anything Model (SAM) promptable segmentation concepts',
          'Loss functions: Binary Cross-Entropy + Dice Loss (Dice Coefficient) and Focal Loss for severe class imbalance',
          'Evaluation Metrics: Intersection over Union (IoU / Jaccard Index), Dice Coefficient (F1-Score for pixels), Mean IoU (mIoU), Pixel Accuracy',
        ],
      },
      {
        category: 'Optical Character Recognition (OCR)',
        items: [
          'The 2-Stage OCR Pipeline: Text Detection (locating text bounding boxes) + Text Recognition (transcribing characters)',
          'Text Detection models: DBNet (Real-time Scene Text Detection), CRAFT (Character Region Awareness)',
          'Text Recognition models: CRNN (CNN feature extractor + BiLSTM sequence model + CTC Loss)',
          'OCR Engines: Tesseract (traditional open source), EasyOCR (PyTorch-based), PaddleOCR',
          'Preprocessing for OCR: Binarization, deskewing, contrast adjustment, and noise removal for noisy scanned documents',
        ],
      },
      {
        category: 'Document Intelligence & Layout Analysis',
        items: [
          'Document layout analysis: Detecting tables, headers, paragraphs, stamps, and signatures',
          'Key-Value pair extraction from structured documents (invoices, tax forms, receipts, IDs)',
          'Vision-Language models for document understanding (LayoutLM, Donut, modern Multimodal LLMs)',
        ],
      },
    ],
    keyConcepts: [
      'Semantic vs Instance vs Panoptic Segmentation',
      'U-Net Encoder-Decoder with Skip Connections',
      'Dice Loss & Mean Intersection over Union (mIoU)',
      '2-Stage OCR: Text Detection (DBNet) + Recognition (CRNN)',
      'Document Deskewing & Key-Value Information Extraction',
    ],
    practiceSuggestions: [
      'Build and train a U-Net model in PyTorch on a binary segmentation dataset (e.g. segmenting pets or aerial building footprints) using a combined BCE + Dice Loss.',
      'Build a document text extractor that ingests a receipt photo, deskews the image, runs OCR with EasyOCR/Tesseract, and uses regex to extract total amounts and dates.',
      'Evaluate a trained segmentation model and compute Pixel Accuracy and Mean IoU (mIoU) across validation masks.',
    ],
    projectSuggestions: [
      {
        title: 'Intelligent Receipt & Invoice Financial Data Extractor',
        description: 'An end-to-end document AI pipeline that automatically deskews receipts, runs OCR text detection/recognition, and structures line items, dates, and total amounts into validated JSON schemas.',
        level: 'Advanced',
      },
    ],
    commonMistakes: [
      'Using standard Cross-Entropy loss alone on segmentation masks with tiny foreground targets (e.g. 98% background, 2% tumor), causing the model to predict all background (use Dice Loss or Focal Loss).',
      'Feeding low-contrast or skewed images directly into OCR engines without grayscale contrast enhancement or deskewing preprocessing.',
      'Confusing Semantic Segmentation with Instance Segmentation when the task requires counting individual overlapping objects.',
    ],
    nextStepPreview: 'Track moving objects across temporal video frames in Stage 10: Video Analytics & Object Tracking.',
  },
  {
    id: 'video-analytics-tracking',
    stageNumber: '10',
    title: 'Video Analytics & Object Tracking',
    shortTitle: 'Video & Tracking',
    tagline: 'Understand temporal motion, track persistent object IDs across frames, and build automated video analytics pipelines.',
    iconName: 'Video',
    goal: 'Learn how computer vision systems understand movement and events across video frames.',
    whyItMatters:
      'Running an object detector independently on every video frame generates disconnected bounding boxes with no memory. Tracking assigns persistent unique IDs to objects across frames, predicts motion trajectories, and enables counting, speed estimation, and intrusion detection.',
    learningOutcome: 'Build computer vision systems capable of understanding objects and movement over time.',
    recommendedApproach:
      'Understand the Tracking-by-Detection paradigm. Combine an object detector with a state estimation filter (Kalman Filter) and appearance embedding similarity (DeepSORT / ByteTrack).',
    technologies: ['OpenCV', 'PyTorch', 'ByteTrack', 'DeepSORT', 'FilterPy (Kalman Filter)', 'Supervision'],
    visualIntuition: {
      label: 'The Video Tracking & Analytics Pipeline',
      steps: [
        'VIDEO STREAM (Live RTSP / MP4 frame stream at 30 FPS)',
        'FRAME EXTRACTION (Decode frame and buffer)',
        'OBJECT DETECTION (Predict candidate bounding boxes for current frame)',
        'MOTION ESTIMATION (Kalman Filter predicts where existing tracks moved)',
        'DATA ASSOCIATION (Hungarian algorithm matches detections to existing track IDs)',
        'ANALYTICS & EVENTS (Line-crossing counting, speed estimation, zone intrusion alerts)',
      ],
    },
    topics: [
      {
        category: 'Object Tracking Fundamentals',
        items: [
          'Detection vs Tracking: Why tracking is required (identity preservation, occlusion handling, reducing computational cost)',
          'Track management: Track initialization, active track updates, track coasting during occlusion, and track deletion',
          'Centroid Tracking: Basic Euclidean distance matching between bounding box centers',
          'State estimation with Kalman Filters: Predicting object position and velocity under Gaussian uncertainty',
        ],
      },
      {
        category: 'Modern Multi-Object Tracking (MOT) Algorithms',
        items: [
          'Tracking-by-Detection paradigm: The dominant modern approach',
          'SORT (Simple Online and Realtime Tracking): Kalman Filter + Hungarian Algorithm for bounding box IoU assignment',
          'DeepSORT: Integrating deep visual appearance feature embeddings to re-identify objects after long occlusions',
          'ByteTrack: Associating low-confidence detection boxes to retain tracks of occluded and blurry objects',
          'BoT-SORT and modern MOT tracking algorithms',
        ],
      },
      {
        category: 'Optical Flow & Motion Analysis',
        items: [
          'What is Optical Flow? Visual velocity vectors representing apparent motion of pixels between frames',
          'Brightness constancy assumption and spatial coherence assumptions',
          'Sparse Optical Flow: Lucas-Kanade method tracking specific corner keypoints',
          'Dense Optical Flow: Gunnar Farneback method computing motion vectors for every pixel',
        ],
      },
      {
        category: 'Video Analytics & Event Detection',
        items: [
          'Line-crossing counters: People counting and bidirectional traffic flow monitoring',
          'Zone / Polygon intrusion detection: Detecting when an object enters a restricted virtual polygon',
          'Trajectory analysis and heatmaps: Visualizing high-traffic movement paths in retail stores',
          'Speed estimation and stationary object / abandoned baggage detection',
        ],
      },
    ],
    keyConcepts: [
      'Tracking-by-Detection & Persistent Object ID Assignment',
      'Kalman Filter State Prediction & Uncertainty Update',
      'Hungarian Algorithm Bounding Box & Feature Association',
      'ByteTrack Low-Confidence Association Strategy',
      'Lucas-Kanade Sparse vs Farneback Dense Optical Flow',
    ],
    practiceSuggestions: [
      'Implement a Centroid Tracker from scratch in Python that tracks moving objects detected by a simple background subtractor.',
      'Integrate ByteTrack with a YOLO detector to track vehicles on a highway video and maintain persistent IDs across lane changes.',
      'Build a bidirectional line-crossing counter that increments an "in" count and "out" count when tracked object centroids cross a virtual coordinate line.',
    ],
    projectSuggestions: [
      {
        title: 'Multi-Camera Video Analytics & Traffic Counting System',
        description: 'A complete video analytics application using YOLO and ByteTrack that tracks vehicles, calculates velocities, logs bidirectional line-crossing counts, and generates spatial movement heatmaps.',
        level: 'Advanced',
      },
    ],
    commonMistakes: [
      'Running detection and tracking as completely disconnected processes, causing track IDs to flicker randomly when confidence fluctuates.',
      'Failing to handle ID switches during temporary object occlusions (e.g. one pedestrian walking in front of another).',
      'Processing video synchronously on the main thread, causing frame buffer lag when inference latency exceeds frame capture rate.',
    ],
    nextStepPreview: 'Explore attention mechanisms and multimodal vision architectures in Stage 11: Vision Transformers & Multimodal AI.',
  },
  {
    id: 'vision-transformers-multimodal',
    stageNumber: '11',
    title: 'Vision Transformers & Multimodal AI',
    shortTitle: 'Vision Transformers & Multimodal',
    tagline: 'Understand self-attention for images, Vision Transformers (ViT), Vision-Language Models (CLIP), and Multimodal AI.',
    iconName: 'Eye',
    goal: 'Understand modern vision architectures beyond traditional CNN-based systems.',
    whyItMatters:
      'Transformers have expanded beyond NLP into computer vision. Vision Transformers (ViT) process images as sequences of visual tokens using self-attention. Furthermore, multimodal models (like CLIP and Vision LLMs) bridge vision and language, enabling open-vocabulary search, visual question answering, and image reasoning.',
    learningOutcome: 'Understand modern vision systems and how computer vision is converging with language and multimodal AI.',
    recommendedApproach:
      'Learn the core Vision Transformer (ViT) architecture: image patching, linear projection, [CLS] token, positional embeddings, and multi-head self-attention. Study contrastive vision-language pre-training (CLIP) for zero-shot classification.',
    technologies: ['PyTorch', 'Hugging Face Transformers', 'Vision Transformer (ViT)', 'CLIP (OpenAI / OpenCLIP)', 'RT-DETR', 'vLLM / Ollama'],
    visualIntuition: {
      label: 'The Vision Transformer (ViT) Architecture',
      steps: [
        'INPUT IMAGE (224 × 224 × 3 RGB image)',
        'PATCH EXTRACTION (Divide image into grid of 16 × 16 non-overlapping patches)',
        'LINEAR PROJECTION (Flatten patches into 1D visual token embedding vectors)',
        'POSITIONAL EMBEDDINGS (Add 1D learnable spatial coordinates to each patch token)',
        'TRANSFORMER ENCODER (Multi-head self-attention captures global spatial context)',
        'CLASSIFICATION / TASK HEAD (Extracts [CLS] token embedding for predictions)',
      ],
    },
    topics: [
      {
        category: 'Vision Transformer (ViT) Architecture',
        items: [
          'Why Transformers for Vision? Overcoming the local receptive field limitation of CNNs via global self-attention',
          'Patch Embeddings: Slicing an image into N patches (e.g. 16x16 pixels) and projecting each into a D-dimensional embedding vector',
          'The [CLS] Classification Token: Prepended learnable token aggregating global image representation',
          '1D and 2D Positional Embeddings: Encoding spatial coordinate layout information into patch tokens',
          'Transformer Encoder blocks: Multi-Head Self-Attention (MHSA), LayerNorm, MLP feed-forward network, residual connections',
          'Hierarchical Vision Transformers: Swin Transformer (shifted window self-attention) for efficient high-resolution dense vision tasks',
        ],
      },
      {
        category: 'Vision-Language Models & Contrastive Learning',
        items: [
          'CLIP (Contrastive Language-Image Pre-Training): Dual encoders (Image Encoder + Text Encoder) trained on 400M image-text pairs',
          'Contrastive Loss: Maximizing cosine similarity between matching image-text embeddings while minimizing non-matching pairs',
          'Zero-Shot Image Classification: Classifying images without fine-tuning by comparing image embeddings against text prompts ("a photo of a {class}")',
          'Open-Vocabulary Object Detection: Detecting arbitrary object classes defined at inference time via text queries',
        ],
      },
      {
        category: 'Multimodal Vision-Language Applications',
        items: [
          'Visual Question Answering (VQA): Answering natural language questions about image contents',
          'Image Captioning: Auto-regressive generation of descriptive sentences from visual tokens',
          'Semantic Visual Search: Finding images in a database using natural language text search queries',
          'Vision-Language LLMs (LLaVA, Qwen-VL, GPT-4V): Combining vision encoders with Large Language Models for complex visual reasoning',
        ],
      },
      {
        category: 'Modern Transformer Detection & Segmentation',
        items: [
          'Detection Transformers (DETR & RT-DETR): End-to-end set prediction eliminating anchor boxes and NMS via bipartite matching loss',
          'Segment Anything Model (SAM): Promptable foundation model for zero-shot instance segmentation via points, boxes, or text prompts',
        ],
      },
    ],
    keyConcepts: [
      'Image Patch Tokenization & Linear Embedding Projection',
      'Multi-Head Self-Attention for Global Context Modeling',
      'CLIP Dual-Encoder Contrastive Representation Learning',
      'Zero-Shot Classification via Text Prompt Embeddings',
      'Detection Transformers (DETR) & Bipartite Set Loss',
    ],
    practiceSuggestions: [
      'Load a pre-trained Vision Transformer (ViT) from Hugging Face Transformers and run inference on custom images, inspecting attention rollout maps.',
      'Build a Zero-Shot image classifier using OpenAI CLIP that classifies images into 10 custom classes purely from natural language text prompts without any training data.',
      'Build a semantic visual search engine that embeds a folder of 1,000 images using CLIP and returns the top 5 closest matches for natural language queries (e.g. "a red sports car in the rain").',
    ],
    projectSuggestions: [
      {
        title: 'Zero-Shot Multimodal Visual Search & VQA Application',
        description: 'A multimodal application powered by CLIP and a lightweight Vision LLM that indexes image galleries for natural language semantic search and answers questions about uploaded images.',
        level: 'Portfolio-Level',
      },
    ],
    commonMistakes: [
      'Attempting to train a Vision Transformer (ViT) from scratch on a small dataset (ViT lacks the inductive bias of CNNs and requires massive pre-training data; always use pre-trained weights).',
      'Ignoring token sequence length when working with high-resolution images, leading to quadratic memory scaling (O(N²)) in standard self-attention (use Swin or hierarchical attention).',
      'Using poorly formatted prompt templates in zero-shot CLIP classification instead of ensemble prompting ("a photo of a {label}").',
    ],
    nextStepPreview: 'Optimize and deploy computer vision models into high-performance production systems in Stage 12: Computer Vision Deployment & Production.',
  },
  {
    id: 'cv-deployment-production',
    stageNumber: '12',
    title: 'Computer Vision Deployment & Production',
    shortTitle: 'Deployment & Production',
    tagline: 'Optimize model latency, quantize weights, package containerized vision APIs, and deploy to cloud and edge hardware.',
    iconName: 'Server',
    goal: 'Learn how to take a computer vision model from a notebook to a reliable production application.',
    whyItMatters:
      'A computer vision model running at 2 FPS in a Jupyter notebook cannot serve real-world users. Production deployment requires optimizing inference latency, quantizing neural networks, containerizing APIs with Docker, utilizing GPU acceleration, and deploying to cloud servers or edge devices (NVIDIA Jetson).',
    learningOutcome: 'Deploy computer vision systems that can operate reliably in real-world environments.',
    recommendedApproach:
      'Export models to ONNX and optimize with TensorRT or OpenVINO. Wrap models in asynchronous FastAPI services, package them in Docker containers, and implement live FPS and latency telemetry.',
    technologies: ['FastAPI', 'Docker', 'ONNX Runtime', 'TensorRT', 'NVIDIA Triton', 'NVIDIA Jetson / Edge AI', 'Prometheus'],
    visualIntuition: {
      label: 'The Production Computer Vision Deployment Pipeline',
      steps: [
        'TRAIN & VALIDATE (Trained PyTorch / Torchvision model checkpoint)',
        'EXPORT TO ONNX (Convert dynamic PyTorch graph to standardized ONNX format)',
        'QUANTIZE & COMPILE (TensorRT / OpenVINO FP16 or INT8 engine compilation)',
        'CONTAINERIZE (Docker image with CUDA runtime & FastAPI microservice)',
        'SERVE (High-throughput REST/gRPC API with GPU batching)',
        'MONITOR (Live telemetry: FPS, P99 latency, GPU VRAM, and error rates)',
      ],
    },
    topics: [
      {
        category: 'Model Optimization & Compression',
        items: [
          'The Latency vs Accuracy trade-off: Model size, throughput (QPS), and FPS',
          'ONNX (Open Neural Network Exchange): Exporting PyTorch models to standardized ONNX graphs (torch.onnx.export)',
          'ONNX Runtime: High-performance cross-platform CPU and GPU inference engine',
          'Quantization: FP32 (32-bit float) → FP16 (Half precision) → INT8 (8-bit integer) quantization for 2-4x speedups and 75% memory reduction',
          'Pruning and Knowledge Distillation concepts (compressing teacher models into lightweight student networks)',
          'TensorRT (NVIDIA): Layer fusion, kernel auto-tuning, and ultra-fast GPU inference acceleration',
          'OpenVINO (Intel): Optimizing vision inference for Intel CPUs, integrated GPUs, and VPUs',
        ],
      },
      {
        category: 'Production API & Microservice Architecture',
        items: [
          'Building high-throughput vision endpoints with FastAPI and Uvicorn',
          'Handling image ingestion: Multipart binary file upload vs Base64 JSON strings (trade-offs and bandwidth overhead)',
          'In-memory model caching: Loading heavy neural weights into GPU VRAM once during FastAPI lifespan startup',
          'Dynamic Batching: Grouping concurrent individual incoming inference requests into a single tensor batch to maximize GPU saturation',
          'Asynchronous background tasks for logging prediction bounding boxes and metadata to databases without blocking responses',
        ],
      },
      {
        category: 'Containerization & Cloud GPU Deployment',
        items: [
          'Writing production Dockerfiles for computer vision: nvidia/cuda base images vs python:slim',
          'NVIDIA Container Toolkit (nvidia-docker): Passing host GPU hardware acceleration into Docker containers (--gpus all)',
          'Cloud deployment: Deploying containerized vision services to AWS (EC2 G4dn/G5, ECS, SageMaker), GCP, or Azure',
          'Dedicated model serving platforms: NVIDIA Triton Inference Server for multi-model concurrent GPU execution',
        ],
      },
      {
        category: 'Edge AI & Embedded Vision',
        items: [
          'Edge Computing vs Cloud Computing: Latency, bandwidth constraints, privacy, and offline operation',
          'Hardware platforms: NVIDIA Jetson (Nano, Orin Nano, AGX), Raspberry Pi, Google Coral Edge TPU',
          'Camera interface protocols: MIPI CSI cameras, USB UVC cameras, RTSP IP camera decoding via hardware NVDEC',
        ],
      },
      {
        category: 'Observability & Performance Telemetry',
        items: [
          'Monitoring critical metrics: End-to-end latency histograms (P50, P95, P99), throughput (FPS / QPS)',
          'Hardware monitoring: GPU utilization (nvidia-smi), GPU VRAM usage, CPU memory leaks, temperature throttling',
          'Model drift and data quality monitoring: Detecting camera degradation (lens blur, dark lighting, out-of-distribution inputs)',
        ],
      },
    ],
    keyConcepts: [
      'ONNX Graph Export & TensorRT Engine Optimization',
      'Post-Training INT8 Quantization & FP16 Precision',
      'FastAPI In-Memory GPU Model Lifespan Serving',
      'Docker NVIDIA Container Toolkit GPU Pass-Through',
      'P99 Tail Latency & Real-Time FPS Telemetry',
    ],
    practiceSuggestions: [
      'Export a PyTorch image classification or detection model to ONNX format and benchmark inference latency vs PyTorch CPU and GPU using ONNX Runtime.',
      'Build a Docker container with CUDA support that runs a FastAPI vision microservice accepting image uploads and returning bounding box coordinates in <30ms.',
      'Use INT8 post-training quantization to compress a vision model and measure the reduction in model file size and memory footprint.',
    ],
    projectSuggestions: [
      {
        title: 'Production-Ready Edge/Cloud Vision Microservice with ONNX',
        description: 'A containerized, GPU-accelerated computer vision microservice featuring ONNX Runtime optimization, FastAPI async endpoints, Pydantic schema validation, Docker orchestration, and Prometheus latency monitoring.',
        level: 'Portfolio-Level',
      },
    ],
    commonMistakes: [
      'Sending images as massive Base64 JSON strings instead of raw binary multipart streams, adding 33% bandwidth overhead and slow serialization bottlenecks.',
      'Reloading the heavy PyTorch model weights from disk inside the API request handler on every single incoming image.',
      'Deploying unoptimized native PyTorch Python models to edge devices without converting to ONNX, TensorRT, or OpenVINO.',
    ],
    nextStepPreview: 'You have mastered the complete Computer Vision Engineering curriculum! Build your flagship portfolio project and prepare for technical interviews.',
  },
];

export const CV_PROJECT_PROGRESSION: CVProjectProgression[] = [
  {
    id: 'face-detection-webcam',
    stage: 'Project 01 — Beginner',
    name: 'Real-Time Face & Motion Detection System',
    difficulty: 'Beginner',
    problem: 'Need a fast, lightweight system to detect human faces and motion from a live webcam stream without requiring heavy GPU hardware.',
    description: 'An interactive OpenCV application that streams live webcam video, detects human faces and movement, draws bounding boxes and tracking trails, and displays live FPS metrics.',
    architecture: 'Webcam Stream → Frame Preprocessing → Haar Cascade / DNN Detector → Bounding Box Rendering → Live Video Display',
    dataset: 'Live webcam stream / Sample video clips',
    technologies: ['Python 3.12', 'OpenCV (cv2)', 'NumPy', 'Matplotlib'],
    model: 'Haar Cascade Classifiers / OpenCV DNN Face Detector',
    technique: 'Classical Computer Vision, Frame Differencing, Haar Features',
    metrics: 'Frames Per Second (FPS > 30), Detection Latency (<15ms)',
    deployment: 'Local desktop application with real-time UI window',
    githubReqs: 'Clean Python modular structure, requirements.txt, video demo GIF, README with run instructions.',
    skillsLearned: ['OpenCV VideoCapture', 'Frame Preprocessing', 'Bounding Box Drawing', 'Real-Time FPS Calculation'],
  },
  {
    id: 'image-classification-system',
    stage: 'Project 02 — Intermediate',
    name: 'Deep Learning Image Classifier with Grad-CAM Explainability',
    difficulty: 'Intermediate',
    problem: 'High-accuracy automated classification of fine-grained image categories with visual explainability for human verification.',
    description: 'A production PyTorch classification pipeline using transfer learning (ResNet / EfficientNet) with custom Albumentations data augmentation, learning rate scheduling, and Grad-CAM visual heatmaps.',
    architecture: 'Image Dataset → Albumentations Augmentations → PyTorch DataLoader → ResNet-50 Backbone → Custom Head → Grad-CAM Heatmap',
    dataset: 'Oxford Pets / PlantVillage (5,000+ labeled images)',
    technologies: ['PyTorch', 'Torchvision', 'Albumentations', 'Timm', 'Grad-CAM', 'TensorBoard'],
    model: 'ResNet-50 / EfficientNet-B0 (Pre-trained on ImageNet)',
    technique: 'Transfer Learning, Fine-Tuning, Data Augmentation, Grad-CAM',
    metrics: 'Accuracy (>95%), Precision, Recall, Macro F1-Score, Top-1/Top-5 Error',
    deployment: 'Saved PyTorch checkpoint (.pt) with standalone inference script',
    githubReqs: 'Modular dataset/model/train scripts, TensorBoard loss curves, confusion matrix plot, Grad-CAM output gallery.',
    skillsLearned: ['Transfer Learning', 'Fine-Tuning', 'Custom PyTorch Loops', 'Grad-CAM Explainability', 'F1 Evaluation'],
  },
  {
    id: 'real-time-object-detection',
    stage: 'Project 03 — Advanced',
    name: 'Real-Time Custom Object Detection System',
    difficulty: 'Advanced',
    problem: 'Detecting and localizing multiple industrial safety items (helmets, vests) or retail products in high-definition video feeds.',
    description: 'A fine-tuned real-time object detector trained on custom annotated data that detects multiple object classes with bounding boxes, confidence scores, and IoU-based NMS filtering.',
    architecture: 'Video Stream → Feature Pyramid Backbone → Detection Head → Confidence Thresholding → NMS → Bounding Box Overlays',
    dataset: 'Custom Annotated Dataset / Roboflow PPE Dataset (2,500+ annotated images in YOLO format)',
    technologies: ['PyTorch', 'Ultralytics YOLO', 'Albumentations', 'OpenCV', 'Supervision'],
    model: 'YOLOv8 / YOLOv11 / RT-DETR',
    technique: 'One-Stage Object Detection, Bounding Box Regression, Non-Maximum Suppression (NMS)',
    metrics: 'mAP@0.5 (>0.90), mAP@0.5:0.95 (>0.72), Inference Latency (<25ms)',
    deployment: 'Python video processing pipeline saving annotated output video files',
    githubReqs: 'Dataset YAML config, training hyperparameter logs, PR curves, mAP evaluation reports, video inference sample.',
    skillsLearned: ['Custom Dataset Annotation', 'YOLO Model Fine-Tuning', 'mAP Evaluation', 'NMS Filtering', 'Video Inference'],
  },
  {
    id: 'document-intelligence-ocr',
    stage: 'Project 04 — Advanced',
    name: 'Automated Document Intelligence & OCR Extraction Pipeline',
    difficulty: 'Advanced',
    problem: 'Automatically extracting structured financial text and line items from scanned receipts and unstandardized invoices.',
    description: 'A comprehensive document vision system that performs image deskewing, binarization, text detection (DBNet), text recognition (CRNN / EasyOCR), and regex parsing into structured JSON data.',
    architecture: 'Scanned Document → Deskewing & Thresholding → Text Detection → Bounding Box Crops → Text Recognition (CRNN) → JSON Parser',
    dataset: 'SROIE Receipt Dataset / Scanned Invoices',
    technologies: ['Python', 'OpenCV', 'EasyOCR / PaddleOCR', 'Tesseract', 'Pydantic', 'FastAPI'],
    model: 'DBNet (Text Detection) + CRNN (Text Recognition)',
    technique: 'Document Deskewing, Adaptive Thresholding, OCR, Layout Analysis, Text Extraction',
    metrics: 'Character Error Rate (CER < 3%), Word Error Rate (WER < 7%), Field Extraction Precision (>92%)',
    deployment: 'FastAPI microservice accepting document images and returning structured JSON metadata',
    githubReqs: 'FastAPI service code, Pydantic schemas, sample document test suite, regex parsers, evaluation benchmarks.',
    skillsLearned: ['Document Preprocessing', 'Text Detection & Recognition', 'OCR Pipelines', 'Structured Extraction', 'FastAPI'],
  },
  {
    id: 'video-analytics-tracking',
    stage: 'Project 05 — Advanced',
    name: 'Multi-Object Tracking & Traffic Analytics System',
    difficulty: 'Advanced',
    problem: 'Tracking vehicles across video frames, assigning persistent IDs, detecting line-crossings, and computing speed statistics.',
    description: 'A production video analytics application combining a real-time object detector with ByteTrack to track vehicles, maintain persistent IDs through occlusions, and calculate bidirectional traffic counts.',
    architecture: 'RTSP Video Stream → Object Detector → ByteTrack Association (Kalman Filter) → Persistent ID Assignment → Virtual Line Crossing Analytics → Live HUD Overlay',
    dataset: 'Traffic Surveillance Video Stream (1080p 30 FPS)',
    technologies: ['Python', 'PyTorch', 'YOLO', 'ByteTrack', 'OpenCV', 'Supervision', 'FilterPy'],
    model: 'YOLO Detector + ByteTrack Multi-Object Tracker',
    technique: 'Multi-Object Tracking (MOT), Kalman Filtering, Trajectory Estimation, Virtual Line Crossing',
    metrics: 'Multiple Object Tracking Accuracy (MOTA > 75%), ID Switches (<5 per 1000 frames), FPS (>30)',
    deployment: 'Real-time multi-threaded video stream processor with SQLite event logging',
    githubReqs: 'Multi-threaded RTSP reader, ByteTrack integration, counting logic, dashboard export, demo video.',
    skillsLearned: ['Multi-Object Tracking', 'ByteTrack Algorithm', 'Kalman Filter State Estimation', 'Event Detection', 'High-FPS Pipelines'],
  },
  {
    id: 'end-to-end-cv-platform',
    stage: 'Project 06 — Portfolio Level',
    name: 'Enterprise End-to-End Computer Vision Platform',
    difficulty: 'Portfolio-Level',
    problem: 'Enterprises need a complete, scalable computer vision platform connecting live camera ingestion, ONNX-optimized inference, tracking, REST API serving, and telemetry.',
    description: 'A flagship production computer vision system featuring camera stream ingestion, ONNX Runtime / TensorRT GPU acceleration, FastAPI microservice, Docker containerization, and Prometheus/Grafana latency monitoring.',
    architecture: 'Camera Ingestion → Preprocessing Tensor Pipeline → ONNX Runtime (GPU Accelerated) → ByteTrack → Business Logic → FastAPI REST / WebSocket API → PostgreSQL → Prometheus Metrics & Grafana Dashboard',
    dataset: 'Real-World Production Video Dataset / Benchmark Cameras',
    technologies: ['PyTorch', 'ONNX Runtime', 'FastAPI', 'Docker', 'Docker Compose', 'PostgreSQL', 'Prometheus', 'Grafana', 'ByteTrack'],
    model: 'ONNX-Quantized YOLO + ByteTrack + Segmentation Head',
    technique: 'ONNX Model Optimization, INT8 Quantization, GPU Tensor Batching, Telemetry Instrumentation, Containerization',
    metrics: 'P99 Latency (<20ms), GPU Throughput (>60 FPS), System Uptime (99.9%)',
    deployment: 'Multi-container Docker Compose stack with GPU passthrough (--gpus all) and Prometheus monitoring',
    githubReqs: 'Full architecture diagrams, Docker Compose file, ONNX conversion scripts, FastAPI service, load testing scripts with Locust, Grafana dashboard JSON.',
    skillsLearned: ['ONNX Model Optimization', 'GPU Containerization', 'Production FastAPI Serving', 'Telemetry & Grafana', 'Enterprise Architecture'],
  },
];

export const CV_TASK_MAP: CVTaskMapItem[] = [
  {
    id: 'image-classification',
    taskName: 'Image Classification',
    recommendedApproach: 'CNN Backbone (ResNet / EfficientNet) or Vision Transformer (ViT)',
    problem: 'Categorize an entire image into one or more discrete classes (e.g. "dog", "cat", "car").',
    example: 'Classifying medical chest X-rays into "Normal", "Pneumonia", or "COVID-19".',
    modelTypes: ['ResNet-50', 'EfficientNet-V2', 'Vision Transformer (ViT)', 'ConvNeXt'],
    evaluationMetric: 'Accuracy, Top-5 Accuracy, Precision, Recall, Macro F1-Score',
    projectIdea: 'Automated defect classification for manufacturing quality assurance.',
    icon: 'Grid',
  },
  {
    id: 'object-detection',
    taskName: 'Object Detection',
    recommendedApproach: 'One-Stage Detector (YOLO Family / RT-DETR) or Two-Stage (Faster R-CNN)',
    problem: 'Identify what objects are in an image and determine their exact rectangular bounding box locations.',
    example: 'Detecting pedestrians, traffic signs, and vehicles for autonomous driving.',
    modelTypes: ['YOLOv8 / YOLOv11', 'RT-DETR', 'Faster R-CNN', 'SSD'],
    evaluationMetric: 'Intersection over Union (IoU), Mean Average Precision (mAP@0.5, mAP@0.5:0.95)',
    projectIdea: 'Real-time personal protective equipment (PPE) compliance detection in construction sites.',
    icon: 'Scan',
  },
  {
    id: 'image-segmentation',
    taskName: 'Image Segmentation',
    recommendedApproach: 'U-Net (Semantic), Mask R-CNN (Instance), or SAM (Foundation Model)',
    problem: 'Delineate the exact pixel-level boundary masks of objects or semantic regions in the scene.',
    example: 'Segmenting brain tumors in MRI scans or isolating road surfaces from sidewalks.',
    modelTypes: ['U-Net', 'Mask R-CNN', 'DeepLabV3+', 'Segment Anything Model (SAM)'],
    evaluationMetric: 'Mean Intersection over Union (mIoU), Dice Coefficient, Pixel Accuracy',
    projectIdea: 'Automated satellite imagery segmentation for agricultural crop health monitoring.',
    icon: 'Layers',
  },
  {
    id: 'object-tracking',
    taskName: 'Object Tracking & Video',
    recommendedApproach: 'Object Detector + ByteTrack / DeepSORT / BoT-SORT',
    problem: 'Maintain persistent object identities and estimate trajectories across temporal video frames.',
    example: 'Tracking players and the ball during a soccer match to calculate heatmaps and sprint speeds.',
    modelTypes: ['ByteTrack', 'DeepSORT', 'BoT-SORT', 'SORT + Kalman Filter'],
    evaluationMetric: 'MOTA (Multiple Object Tracking Accuracy), MOTP, ID Switches, Frame Rate (FPS)',
    projectIdea: 'Automated retail customer flow tracking and checkout queue wait-time estimation.',
    icon: 'Video',
  },
  {
    id: 'ocr-document',
    taskName: 'Text in Image (OCR)',
    recommendedApproach: '2-Stage OCR (DBNet + CRNN) or Modern OCR Frameworks (PaddleOCR/EasyOCR)',
    problem: 'Detect text bounding regions in natural scenes or scanned documents and transcribe into digital text.',
    example: 'Extracting vendor names, dates, and total amounts from photographic receipt images.',
    modelTypes: ['PaddleOCR', 'EasyOCR', 'Tesseract', 'DBNet + CRNN', 'Donut'],
    evaluationMetric: 'Character Error Rate (CER), Word Error Rate (WER), Field Extraction Precision',
    projectIdea: 'Automated passport and ID card KYC verification scanner.',
    icon: 'Terminal',
  },
  {
    id: 'image-similarity',
    taskName: 'Image Similarity & Search',
    recommendedApproach: 'Deep Embedding Extractor (ResNet / ViT) + Cosine Similarity / Vector Database',
    problem: 'Find visually identical or similar images from a massive database of millions of photos.',
    example: 'Reverse image search on e-commerce websites to find matching fashion products.',
    modelTypes: ['DINOv2', 'CLIP Image Encoder', 'ResNet Embeddings', 'Qdrant / Milvus Vector DB'],
    evaluationMetric: 'Recall@K, Mean Reciprocal Rank (MRR), Cosine Similarity Score',
    projectIdea: 'Reverse fashion product visual search engine matching smartphone photos to catalog items.',
    icon: 'Eye',
  },
  {
    id: 'vision-language',
    taskName: 'Image + Text (Multimodal AI)',
    recommendedApproach: 'Contrastive Model (CLIP) or Vision LLM (LLaVA / Qwen-VL)',
    problem: 'Combine visual imagery with natural language reasoning, open-vocabulary querying, or VQA.',
    example: 'Asking a model "What is wrong with this car engine?" and receiving a detailed diagnostic answer.',
    modelTypes: ['OpenAI CLIP / OpenCLIP', 'LLaVA', 'Qwen-VL', 'BLIP-2'],
    evaluationMetric: 'BLEU-4, ROUGE-L, CIDEr (Captioning), Zero-Shot Accuracy',
    projectIdea: 'Multimodal visual accessibility assistant for visually impaired users.',
    icon: 'Sparkles',
  },
  {
    id: 'video-understanding',
    taskName: 'Video Understanding & Activity',
    recommendedApproach: '3D CNNs (SlowFast, I3D) or Video Transformers (TimeSformer)',
    problem: 'Classify complex human actions and physical interactions unfolding across time.',
    example: 'Detecting slip-and-fall accidents or physical security intrusions in surveillance video.',
    modelTypes: ['SlowFast', 'VideoMAE', 'TimeSformer', 'I3D'],
    evaluationMetric: 'Top-1 Video Action Accuracy, Mean Average Precision (mAP)',
    projectIdea: 'Automated workplace ergonomic safety and fall-detection surveillance alert system.',
    icon: 'Camera',
  },
];

export const CV_SPECIALIZATIONS: CVSpecialization[] = [
  {
    title: 'Vision Application Engineer',
    description: 'Builds end-to-end computer vision software products integrating camera streams, preprocessing, deep learning models, and production APIs.',
    coreTech: ['Python', 'OpenCV', 'PyTorch', 'FastAPI', 'Docker', 'YOLO'],
    focus: 'Product development, REST APIs, camera integrations, and practical vision systems.',
    icon: 'Laptop',
  },
  {
    title: 'Object Detection & Video Analytics Engineer',
    description: 'Specializes in high-throughput object detection, multi-object tracking (MOT), trajectory analysis, and real-time surveillance video systems.',
    coreTech: ['YOLO', 'ByteTrack', 'DeepSORT', 'TensorRT', 'C++', 'OpenCV'],
    focus: 'Real-time inference, high-FPS video streaming, tracking algorithms, and edge deployment.',
    icon: 'Scan',
  },
  {
    title: 'Medical Computer Vision Engineer',
    description: 'Develops high-precision segmentation and diagnostic algorithms for CT scans, MRI, histology slides, and ultrasound clinical imagery.',
    coreTech: ['U-Net', 'PyTorch', 'MONAI', 'SimpleITK', 'DICOM', '3D Vision'],
    focus: 'Pixel-level segmentation, high-resolution 3D medical volumes, and clinical validation.',
    icon: 'Layers',
  },
  {
    title: 'Autonomous Systems & Robotics Vision Engineer',
    description: 'Designs visual perception stacks for self-driving cars, drones, and robots combining stereo cameras, optical flow, and depth estimation.',
    coreTech: ['C++', 'ROS / ROS2', 'OpenCV', 'TensorRT', 'CUDA', 'Point Clouds'],
    focus: 'Real-time perception, 3D scene understanding, low-latency safety-critical systems.',
    icon: 'Camera',
  },
  {
    title: 'Document AI & OCR Engineer',
    description: 'Extracts structured information, tables, and text from complex scanned documents, invoices, receipts, and identity credentials.',
    coreTech: ['PaddleOCR', 'EasyOCR', 'LayoutLM', 'Donut', 'Pydantic', 'OpenCV'],
    focus: 'Text detection, OCR transcription, document layout analysis, and information extraction.',
    icon: 'Terminal',
  },
  {
    title: 'Edge AI & Embedded Vision Engineer',
    description: 'Optimizes deep vision models to execute at high frame rates on constrained hardware like NVIDIA Jetson, Raspberry Pi, and mobile devices.',
    coreTech: ['NVIDIA Jetson', 'TensorRT', 'ONNX Runtime', 'C++', 'INT8 Quantization'],
    focus: 'Hardware acceleration, model quantization, thermal/memory optimization, and edge inference.',
    icon: 'Cpu',
  },
  {
    title: 'Vision-Language & Multimodal AI Engineer',
    description: 'Works at the cutting-edge intersection of vision and language: Vision Transformers, CLIP embeddings, multimodal search, and Vision LLMs.',
    coreTech: ['Hugging Face', 'CLIP', 'Vision Transformers (ViT)', 'LLaVA', 'Vector DBs'],
    focus: 'Zero-shot classification, semantic visual search, VQA, and multimodal foundation models.',
    icon: 'Sparkles',
  },
];

export const CV_TOOLKIT: CVToolkitCategory[] = [
  {
    category: 'Programming & Core Runtimes',
    coreItems: ['Python 3.12', 'NumPy (Array Tensors)', 'Bash / Shell'],
    advancedItems: ['C++ (High-Performance CV)', 'CUDA / C++ Extensions', 'Rust Basics'],
  },
  {
    category: 'Image Processing & Classical CV',
    coreItems: ['OpenCV (cv2)', 'Pillow (PIL)', 'scikit-image'],
    advancedItems: ['SciPy ndimage', 'Mahotas', 'Libvips (Ultra-Fast Image I/O)'],
  },
  {
    category: 'Deep Learning Frameworks',
    coreItems: ['PyTorch', 'Torchvision', 'Albumentations'],
    advancedItems: ['Timm (PyTorch Image Models)', 'TensorFlow / Keras', 'JAX Basics'],
  },
  {
    category: 'Object Detection & Tracking',
    coreItems: ['Ultralytics YOLO', 'ByteTrack', 'OpenCV Trackers'],
    advancedItems: ['RT-DETR', 'DeepSORT', 'MMDetection', 'Supervision'],
  },
  {
    category: 'Image Segmentation Frameworks',
    coreItems: ['U-Net Architecture', 'Mask R-CNN', 'Torchvision Seg'],
    advancedItems: ['Segment Anything (SAM)', 'MMSegmentation', 'MONAI (Medical)'],
  },
  {
    category: 'OCR & Document Intelligence',
    coreItems: ['Tesseract OCR', 'EasyOCR', 'PaddleOCR'],
    advancedItems: ['DBNet', 'LayoutLMv3', 'Donut (OCR-Free VLM)'],
  },
  {
    category: 'Vision Transformers & Multimodal',
    coreItems: ['Hugging Face Transformers', 'Vision Transformer (ViT)', 'CLIP'],
    advancedItems: ['Swin Transformer', 'DINOv2', 'LLaVA', 'Qwen-VL'],
  },
  {
    category: 'Model Optimization & Inference',
    coreItems: ['ONNX Runtime', 'TorchScript', 'FP16 Half Precision'],
    advancedItems: ['NVIDIA TensorRT', 'OpenVINO (Intel)', 'INT8 Post-Training Quantization'],
  },
  {
    category: 'Annotation & Data Tooling',
    coreItems: ['CVAT', 'Label Studio', 'Roboflow'],
    advancedItems: ['VGG Image Annotator (VIA)', 'FiftyOne (Dataset Curation)'],
  },
  {
    category: 'Deployment & Serving',
    coreItems: ['FastAPI', 'Docker', 'Uvicorn'],
    advancedItems: ['NVIDIA Triton Inference Server', 'TorchServe', 'gRPC'],
  },
  {
    category: 'Edge AI & Embedded Platforms',
    coreItems: ['Raspberry Pi', 'USB Cameras / UVC'],
    advancedItems: ['NVIDIA Jetson (Orin / Nano)', 'Google Coral Edge TPU', 'MIPI CSI Cameras'],
  },
  {
    category: 'Standard Vision Benchmark Datasets',
    coreItems: ['COCO Dataset', 'ImageNet', 'Pascal VOC'],
    advancedItems: ['Open Images V7', 'Cityscapes', 'Objects365', 'LVIS'],
  },
];

export const CV_THINKING_LADDER = [
  { step: '01', label: 'Visual Goal', question: 'What exact visual information do we need from this scene to solve the problem?' },
  { step: '02', label: 'Modality', question: 'Is this a single static image problem or a continuous temporal video stream problem?' },
  { step: '03', label: 'Task Selection', question: 'Is the task Classification, Detection, Segmentation, Tracking, OCR, or Multimodal VLM?' },
  { step: '04', label: 'Data Needs', question: 'What training datasets, camera resolutions, lighting variations, and annotations are required?' },
  { step: '05', label: 'Classical vs Deep', question: 'Can fast classical image processing (thresholding, contours) solve it before using deep learning?' },
  { step: '06', label: 'Model Architecture', question: 'Which backbone (ResNet, EfficientNet, YOLO, ViT, U-Net) matches the accuracy-speed requirement?' },
  { step: '07', label: 'Evaluation Metrics', question: 'How will we evaluate (Accuracy vs mAP@0.5:0.95 vs mIoU vs MOTA vs Character Error Rate)?' },
  { step: '08', label: 'Inference Speed', question: 'How fast must inference run (e.g. real-time 30+ FPS vs offline batch processing)?' },
  { step: '09', label: 'Hardware & Compute', question: 'Where will the model execute (Cloud GPU server, local desktop, or constrained Edge device)?' },
  { step: '10', label: 'Optimization & Quantization', question: 'Can we optimize the model with ONNX, TensorRT, and FP16/INT8 quantization for 2-4x speedups?' },
  { step: '11', label: 'Observability & Drift', question: 'How will we monitor camera angle shifts, lens blur, lighting variations, and error rates in production?' },
];

export const CV_COMMON_MISTAKES: CVCommonMistake[] = [
  {
    title: 'Learning only OpenCV and skipping Machine Learning',
    solution: 'Master deep learning frameworks (PyTorch), neural architectures, and optimization alongside OpenCV image manipulation.',
  },
  {
    title: 'Jumping directly into YOLO without understanding computer vision basics',
    solution: 'Learn image representations, convolutions, IoU, NMS, and evaluation metrics before executing high-level YOLO scripts.',
  },
  {
    title: 'Ignoring image preprocessing and color channel ordering',
    solution: 'Always check RGB vs BGR formats and normalize pixel intensity values (0-1 float32) before feeding images into neural networks.',
  },
  {
    title: 'Evaluating object detection using standard classification accuracy',
    solution: 'Always evaluate object detectors using Intersection over Union (IoU) and Mean Average Precision (mAP@0.5 and mAP@0.5:0.95).',
  },
  {
    title: 'Training deep models from scratch on tiny datasets',
    solution: 'Always use Transfer Learning with pre-trained ImageNet backbones (ResNet, EfficientNet, ViT) and robust data augmentation.',
  },
  {
    title: 'Ignoring inference speed and GPU memory constraints',
    solution: 'Measure real-world FPS and P99 latency early; optimize models with ONNX Runtime, TensorRT, and INT8 quantization.',
  },
  {
    title: 'Evaluating models only on clean training data',
    solution: 'Always evaluate on an isolated test dataset containing realistic edge cases (shadows, occlusion, motion blur, varying angles).',
  },
  {
    title: 'Using huge, heavy models when lightweight architectures suffice',
    solution: 'Choose the simplest vision architecture (e.g. YOLO-Nano vs YOLO-XLarge) that meets production accuracy SLAs.',
  },
  {
    title: 'Using standard cross-entropy loss for severe class imbalance in segmentation',
    solution: 'Use Dice Loss, Focal Loss, or combined BCE+Dice to train models on small foreground targets.',
  },
  {
    title: 'Passing images as Base64 JSON strings instead of binary multipart streams',
    solution: 'Use raw binary multipart/form-data image uploads in FastAPI to eliminate 33% payload overhead and CPU serialization lag.',
  },
  {
    title: 'Ignoring camera calibration and lens distortion in robotics/measurement tasks',
    solution: 'Calibrate cameras using chessboard patterns and undistort frames with cv2.undistort before performing spatial measurements.',
  },
  {
    title: 'Building only disconnected prototype demos without deployment engineering',
    solution: 'Package models into containerized FastAPI microservices with automated unit tests and telemetry.',
  },
];

export const CV_EVALUATION_SCORECARD: CVEvaluationMetricCategory[] = [
  {
    category: 'Image Classification',
    metrics: [
      { name: 'Accuracy', desc: 'Percentage of total images classified correctly (useful only on balanced datasets).' },
      { name: 'Precision & Recall', desc: 'Precision (avoiding false alarms) vs Recall (catching all true positive targets).' },
      { name: 'F1-Score (Macro / Micro)', desc: 'Harmonic mean of precision and recall; gold standard for imbalanced classes.' },
      { name: 'Top-K Accuracy', desc: 'Target class is among the top K highest probability model predictions (e.g. Top-5).' },
      { name: 'Confusion Matrix', desc: 'Grid showing exact misclassification patterns across every class pair.' },
    ],
  },
  {
    category: 'Object Detection',
    metrics: [
      { name: 'Intersection over Union (IoU)', desc: 'Overlap area divided by union area between predicted and ground truth boxes.' },
      { name: 'mAP@0.5', desc: 'Mean Average Precision calculated at a fixed IoU threshold of 0.5 (PASCAL VOC standard).' },
      { name: 'mAP@0.5:0.95', desc: 'Mean Average Precision averaged across 10 IoU thresholds from 0.50 to 0.95 (COCO standard).' },
      { name: 'Precision-Recall Curve', desc: 'Trade-off curve across varying confidence detection thresholds.' },
    ],
  },
  {
    category: 'Image Segmentation',
    metrics: [
      { name: 'Mean IoU (mIoU / Jaccard Index)', desc: 'Average pixel overlap between ground-truth and predicted segmentation masks.' },
      { name: 'Dice Coefficient (F1 Pixel Score)', desc: '2 × Overlap / (Total Pixels in Ground Truth + Total Pixels in Prediction).' },
      { name: 'Pixel Accuracy', desc: 'Percentage of total pixels labeled correctly across the entire image.' },
    ],
  },
  {
    category: 'Multi-Object Tracking (MOT)',
    metrics: [
      { name: 'MOTA (Tracking Accuracy)', desc: 'Measures tracking errors combining false positives, missed targets, and ID switches.' },
      { name: 'ID Switches (IDSW)', desc: 'Number of times a tracked object changes its assigned ID across video frames.' },
      { name: 'Track Fragmentation', desc: 'Number of times an active track is interrupted and restarted.' },
    ],
  },
  {
    category: 'Optical Character Recognition (OCR)',
    metrics: [
      { name: 'Character Error Rate (CER)', desc: 'Levenshtein edit distance between predicted and ground-truth character sequences.' },
      { name: 'Word Error Rate (WER)', desc: 'Percentage of words transcribed with at least one character error.' },
      { name: 'Field Extraction Precision', desc: 'Accuracy of parsed key-value pairs (e.g. total amounts, invoice dates).' },
    ],
  },
  {
    category: 'Production System Performance',
    metrics: [
      { name: 'Frames Per Second (FPS)', desc: 'Number of full frames processed per second (target >= 30 FPS for real-time video).' },
      { name: 'P95 / P99 Latency', desc: 'Tail latency for 95% and 99% of all incoming image prediction API requests.' },
      { name: 'GPU VRAM & Compute Utilization', desc: 'GPU memory consumption and core utilization percentage under load.' },
    ],
  },
];

export const CV_FOUR_PILLARS: CVFourPillars[] = [
  {
    title: 'Computer Vision & Image Processing',
    subtitle: 'Deep understanding of image representation, color spaces, spatial filtering, morphological operations, and OpenCV.',
    icon: 'Scan',
  },
  {
    title: 'Deep Learning & Neural Architectures',
    subtitle: 'Mastery of CNN backbones, Transfer Learning, YOLO object detection, U-Net segmentation, and Vision Transformers.',
    icon: 'Brain',
  },
  {
    title: 'Data Curation & Evaluation',
    subtitle: 'Dataset annotation, Albumentations augmentation, mAP@0.5:0.95 evaluation, Dice metrics, and error analysis.',
    icon: 'Layers',
  },
  {
    title: 'Software & Production Deployment',
    subtitle: 'FastAPI microservices, Docker GPU containerization, ONNX / TensorRT optimization, and real-time video pipelines.',
    icon: 'Server',
  },
];

export const CV_PIPELINE_STEPS = [
  { step: '01', title: 'Camera / Sensor', desc: 'RTSP IP camera, webcam, smartphone photo, or medical scanner' },
  { step: '02', title: 'Data Ingestion', desc: 'High-throughput frame decoding & memory-safe batch loading' },
  { step: '03', title: 'Preprocessing', desc: 'Resizing, aspect ratio letterboxing, and color space conversion' },
  { step: '04', title: 'Data Augmentation', desc: 'Albumentations spatial & color jitter transforms for robustness' },
  { step: '05', title: 'Vision Model', desc: 'GPU-accelerated deep neural network inference (CNN / YOLO / ViT)' },
  { step: '06', title: 'Post-Processing', desc: 'Confidence filtering, Non-Maximum Suppression (NMS), thresholding' },
  { step: '07', title: 'Evaluation Gate', desc: 'Rigorous benchmark against mAP, IoU, Dice, or F1 standards' },
  { step: '08', title: 'Model Optimization', desc: 'ONNX export, TensorRT layer fusion, and INT8/FP16 quantization' },
  { step: '09', title: 'Deployment', desc: 'Containerized FastAPI microservice or edge embedded runtime' },
  { step: '10', title: 'Monitoring', desc: 'Live telemetry: FPS, P99 latency, GPU VRAM, and camera drift' },
];
