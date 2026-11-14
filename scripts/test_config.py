import os
import re
import json

SUBJECTS_CONFIG = {
    'computer-networks': {
        'id': 'computer-networks',
        'name': 'Computer Networks',
        'code': 'CS601',
        'file': 'Answers/COMPUTER_NETWORKS_PYQ_ANSWERS.md',
        'color': '#3b82f6', # Blue
        'syllabusType': 'prescribed',
        'modules': [
            {'id': 'm1', 'title': 'Module 1: Data Communication Components, Topologies & OSI/TCP-IP', 'topics': ['OSI Model', 'TCP/IP Model', 'Network Topologies', 'Transmission Media', 'Protocols and Standards']},
            {'id': 'm2', 'title': 'Module 2: LANs & Bandwidth Utilization', 'topics': ['Wired LAN', 'Wireless LANs', 'Connecting LAN and Virtual LAN', 'Multiplexing (FDM, TDM, WDM)', 'Spread Spectrum']},
            {'id': 'm3', 'title': 'Module 3: Data Link Layer & Medium Access Sublayer', 'topics': ['Error Detection & Correction', 'Hamming Distance', 'Block Coding', 'CRC (Cyclic Redundancy Check)']},
            {'id': 'm4', 'title': 'Module 4: Flow & Error Control Protocols & Multiple Access', 'topics': ['Stop-and-Wait', 'Go-Back-N ARQ', 'Selective Repeat ARQ', 'Sliding Window', 'Piggybacking', 'Pure & Slotted ALOHA', 'CSMA/CD', 'CSMA/CA']},
            {'id': 'm5', 'title': 'Module 5: Network Layer & Routing Protocols', 'topics': ['Switching', 'IPv4 and IPv6 Addressing', 'Subnetting', 'ARP & RARP', 'BOOTP and DHCP', 'Unicast Routing Protocols']},
            {'id': 'm6', 'title': 'Module 6: Transport & Application Layers, QoS', 'topics': ['Process-to-Process Communication', 'TCP vs UDP', 'SCTP', 'Congestion Control', 'Quality of Service (QoS)', 'Leaky & Token Bucket']}
        ]
    },
    'cloud-computing': {
        'id': 'cloud-computing',
        'name': 'Cloud Computing',
        'code': 'CS642',
        'file': 'Answers/CLOUD_COMPUTING_PYQ_ANSWERS.md',
        'color': '#06b6d4', # Cyan
        'syllabusType': 'prescribed',
        'modules': [
            {'id': 'm1', 'title': 'Module 1: Introduction to Cloud & SPI Framework', 'topics': ['Cloud Definition', 'NIST Characteristics', 'Public & Private Clouds', 'Hardware & Software Evolution', 'SPI Framework']},
            {'id': 'm2', 'title': 'Module 2: Cloud Delivery Models & Services', 'topics': ['CaaS (Communication-as-a-Service)', 'IaaS (Infrastructure-as-a-Service)', 'MaaS (Monitoring-as-a-Service)', 'PaaS (Platform-as-a-Service)', 'SaaS (Software-as-a-Service)']},
            {'id': 'm3', 'title': 'Module 3: Cloud Security Challenges & Governance', 'topics': ['Security Architecture Design', 'Identity & Access Management (IAM)', 'Data Security', 'Cloud Threats', 'Case Studies (Amazon EC2, Google App Engine, IBM Clouds)']},
            {'id': 'm4', 'title': 'Module 4: MSP Model, Data Centers & SOA', 'topics': ['MSP Model Evolution', 'Cloud Data Center', 'Data Center-Based SOA', 'Open Source Software', 'Service-Oriented Architectures']},
            {'id': 'm5', 'title': 'Module 5: Virtualization Concepts & Mobile Cloud', 'topics': ['Hardware, Storage & Network Virtualization', 'Hypervisors (Type 1 & Type 2)', 'KVM & VMware', 'Mobile Cloud Computing']}
        ]
    },
    'image-processing': {
        'id': 'image-processing',
        'name': 'Digital Image Processing',
        'code': 'CS633',
        'file': 'Answers/IMAGE_PROCESSING_PYQ_ANSWERS.md',
        'color': '#8b5cf6', # Purple
        'syllabusType': 'prescribed',
        'modules': [
            {'id': 'm1', 'title': 'Module 1: Digital Image Fundamentals', 'topics': ['Steps in Image Processing', 'Visual Perception', 'Image Sensing & Acquisition', 'Sampling & Quantization', 'Pixel Relationships', 'Color Models']},
            {'id': 'm2', 'title': 'Module 2: Digital Image Formation & Geometric Transforms', 'topics': ['Simple Image Model', 'Geometric Transforms (Translation, Scaling, Rotation)', 'Perspective Projection', 'Uniform & Non-Uniform Sampling']},
            {'id': 'm3', 'title': 'Module 3: Mathematical Preliminaries & Transforms', 'topics': ['Neighbors & Connectivity', 'Distance Measures', 'Arithmetic & Logic Operations', '2D Fourier Transform', 'Discrete Fourier Transform (DFT)', 'Discrete Cosine & Sine Transforms (DCT/DST)']},
            {'id': 'm4', 'title': 'Module 4: Image Enhancement (Spatial & Frequency Domains)', 'topics': ['Gray Level Transformations', 'Histogram Processing & Equalization', 'Spatial Filtering (Smoothing & Sharpening)', 'Frequency Filtering', 'Ideal, Butterworth & Gaussian Filters']},
            {'id': 'm5', 'title': 'Module 5: Image Restoration & Segmentation', 'topics': ['Noise Models', 'Mean & Order-Statistics Filters', 'Wiener Filter', 'Edge Detection (Sobel, Prewitt, Canny)', 'Region Growing', 'Morphological Operations']}
        ]
    },
    'entrepreneurship': {
        'id': 'entrepreneurship',
        'name': 'Entrepreneurship',
        'code': 'IC601',
        'file': 'Answers/ENTREPRENEURSHIP_PYQ_ANSWERS.md',
        'color': '#f59e0b', # Amber
        'syllabusType': 'pyq-derived', # Explicitly label absence of prescribed syllabus
        'modules': [
            {'id': 't1', 'title': 'Theme 1: Entrepreneurship Concepts, Theories & Traits (PYQ Derived)', 'topics': ['Entrepreneurial Traits & Competencies', 'Theories of Entrepreneurship (Schumpeter, McClelland)', 'Born vs Made Debate', 'Types of Entrepreneurs', 'Intrapreneurship']},
            {'id': 't2', 'title': 'Theme 2: EDP, Women & Rural Entrepreneurship (PYQ Derived)', 'topics': ['Entrepreneurship Development Programmes (EDP)', 'Phases of EDP', 'Women Entrepreneurs (Challenges & Growth)', 'Rural Entrepreneurship', 'Social Entrepreneurship']},
            {'id': 't3', 'title': 'Theme 3: Project Identification, Feasibility & Business Plan (PYQ Derived)', 'topics': ['Project Identification & Selection', 'Feasibility Analysis (Technical, Financial, Market)', 'Business Plan Formulation & DPR', 'Market Assessment']},
            {'id': 't4', 'title': 'Theme 4: Institutional Support, Financing & Incentives (PYQ Derived)', 'topics': ['Financial Institutions (Commercial Banks, SIDBI, NABARD, SFCs)', 'Venture Capital & Angel Investment', 'Seed Funding', 'Subsidies, Tax Holidays & Incentives']},
            {'id': 't5', 'title': 'Theme 5: MSMEs, Small-Scale Industries & Industrial Sickness (PYQ Derived)', 'topics': ['MSME Act & Classification Criteria', 'Role of SSI in Indian Economy', 'Industrial Sickness (Symptoms, Causes, Remedies)', 'BIFR / IBC Guidelines']}
        ]
    },
    'nlp': {
        'id': 'nlp',
        'name': 'Natural Language Processing',
        'code': 'CS622',
        'file': 'Answers/NATURAL_LANGUAGE_PROCESSING_PYQ_ANSWERS_AUDITED.md',
        'color': '#10b981', # Emerald
        'syllabusType': 'prescribed',
        'modules': [
            {'id': 'm1', 'title': 'Module-I: Introduction to NLP & Speech Processing', 'topics': ['NLP Phases', 'Biology of Speech Processing', 'Place & Manner of Articulation', 'Word Boundary Detection', 'Argmax Computations', 'HMMs & Speech Recognition']},
            {'id': 'm2', 'title': 'Module-II: Words & Word Forms (Morphology & FSM)', 'topics': ['Morphology Fundamentals', 'Lemmatization vs Stemming', 'Morphological Diversity of Indian Languages', 'Finite State Machine (FSM) Morphology', 'Two-Level Morphology', 'Automatic Morphology Learning', 'Shallow Parsing', 'Named Entity Recognition (NER)', 'Maximum Entropy Models', 'Random Fields (CRFs)']},
            {'id': 'm3', 'title': 'Module-III: Structures & Parsing Algorithms', 'topics': ['Theories of Parsing', 'Parsing Algorithms (CKY, Earley)', 'Robust & Scalable Parsing on Web Documents', 'Hybrid Rule-Based & Probabilistic Parsing (PCFG)', 'Scope & Attachment Ambiguity Resolution']},
            {'id': 'm4', 'title': 'Module-IV: Meaning, Lexical Networks & Semantic Roles', 'topics': ['WordNet Theory & Synsets', 'Indian Language Wordnets (IndoWordNet)', 'Multilingual Dictionaries', 'Semantic Roles & Case Grammar', 'Word Sense Disambiguation (WSD)', 'Metaphors & Co-references']},
            {'id': 'm5', 'title': 'Module-V: Web 2.0 Applications & CLIR', 'topics': ['Sentiment Analysis', 'Named Entity Recognition', 'Text Entailment', 'Robust & Scalable Machine Translation', 'Question Answering in Multilingual Setting', 'Cross Lingual Information Retrieval (CLIR)', 'Information Retrieval Systems', 'Word2Vec Embeddings']}
        ]
    },
    'system-software': {
        'id': 'system-software',
        'name': 'System Software',
        'code': 'IT611',
        'file': 'Answers/SYSTEM_SOFTWARE_PYQ_ANSWERS.md',
        'color': '#ec4899', # Pink
        'syllabusType': 'prescribed',
        'modules': [
            {'id': 'm1', 'title': 'Module 1: Introduction to System Software & Machine Architecture', 'topics': ['System Software vs Application Software', 'Components of Programming System (Assembler, Loader, Linker, Macros, Compiler)', 'Program Development Cycle', 'Evolution & Functions of OS', 'General Machine Structure (SIC & SIC/XE)', 'Memory, Registers, Data, Instructions', 'Evolution of Machine Language & Assembly Language']},
            {'id': 'm2', 'title': 'Module 2: Assemblers, Loaders and Linkers', 'topics': ['Basic Assembler Functions', 'Two-Pass Assembler Design', 'OPTAB, SYMTAB, LITTAB', 'Assembler Directives', 'Loaders & Linkers Functions', 'Machine-Dependent & Independent Loader Features', 'Relocation & Linking', 'Dynamic Linking and Loading', 'Object Files (Relocatable a.out, ELF)']},
            {'id': 'm3', 'title': 'Module 3: Macroprocessors and Emulators', 'topics': ['Basic Macro Processor Functions', 'Machine-Independent Macro Processor Features', 'Macro Processor Design Options (DEFTAB, NAMTAB, ARGTAB)', 'Conditional Macros & Macro Invocation Inside Macros', 'Introduction to Virtual Machines (VM)', 'Emulation & Interpretation (Basic, Threaded, CISC, Binary Translation)']},
            {'id': 'm4', 'title': 'Module 4: Virtual Machines & Advanced Features', 'topics': ['Pascal P-Code VM', 'Object-Oriented VMs', 'Java VM (JVM) Architecture & Execution Engine', 'Common Language Infrastructure (CLI)', 'Dynamic Class Loading', 'Instruction Set Issues, Profiling, Migration, Grids', 'Code Optimizations & Garbage Collection', 'Real-World Implementations of System Software']}
        ]
    }
}

print("Config validated. Total subjects:", len(SUBJECTS_CONFIG))

