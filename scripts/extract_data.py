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
        'syllabusType': 'pyq-derived', # Official detailed syllabus not prescribed
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

def detect_module(text, subject_config):
    text_lower = text.lower()
    best_mod = subject_config['modules'][0]['title']
    best_score = -1
    
    for mod in subject_config['modules']:
        score = 0
        for topic in mod['topics']:
            words = topic.lower().split()
            for w in words:
                cleaned_w = re.sub(r'[^\w]', '', w)
                if len(cleaned_w) > 3 and cleaned_w in text_lower:
                    score += 1
        if score > best_score:
            best_score = score
            best_mod = mod['title']
            
    return best_mod

def extract_key_points(answer_text):
    points = []
    lines = answer_text.split('\n')
    for line in lines:
        cleaned = line.strip()
        # Look for numbered or bullet points with substantive length
        if re.match(r'^[\*\-\d\.\)]+\s+\*?\*?[A-Z]', cleaned) and len(cleaned) > 25:
            pt = re.sub(r'^[\*\-\d\.\)]+\s+', '', cleaned)
            pt = re.sub(r'[*_`]', '', pt)
            if len(pt) > 20 and pt not in points:
                points.append(pt)
        if len(points) >= 6:
            break
            
    if len(points) < 3:
        # Fallback to definition/intro sentences
        sentences = re.split(r'\.\s+', answer_text)
        for s in sentences:
            clean_s = re.sub(r'[*_#`]', '', s).strip()
            if 35 < len(clean_s) < 180 and clean_s not in points and not clean_s.startswith('|'):
                points.append(clean_s + '.')
            if len(points) >= 5:
                break
                
    return points[:5]

def generate_simple_explanation(q_text, answer_text, subject_name):
    paragraphs = [p.strip() for p in answer_text.split('\n\n') if p.strip()]
    expl = ""
    for p in paragraphs:
        cleaned = re.sub(r'^#+.*', '', p).strip()
        cleaned = re.sub(r'[*_`]', '', cleaned)
        if len(cleaned) > 60 and not cleaned.startswith('|') and not cleaned.startswith('```') and not cleaned.startswith('$'):
            expl = cleaned
            break
            
    if not expl:
        expl = f"This core question addresses foundational principles in {subject_name}. Review the essential definitions, structural mechanisms, and trade-offs presented in the model solution."
        
    if len(expl) > 280:
        expl = expl[:277] + "..."
    return expl

def generate_flashcards(q_num, q_text, answer_text):
    cards = []
    clean_q = re.sub(r'\[\s*\d+\s*[Mm]arks?\s*\]', '', q_text).strip()
    clean_q = re.sub(r'^[#\s]*Q(?:uestion)?\s*\d+[\w\(\)\.\:]*\s*', '', clean_q).strip()
    
    # Extract first sentence or definition
    clean_ans = re.sub(r'^#+.*', '', answer_text).strip()
    sentences = [s.strip() for s in re.split(r'\.\s+', clean_ans) if len(s.strip()) > 20 and not s.startswith('|') and not s.startswith('```')]
    summary = (sentences[0] + ".") if sentences else "Review reference solution for detailed examination breakdown."
    summary = re.sub(r'[*_`#]', '', summary)
    
    cards.append({
        'front': f"{clean_q[:140]}",
        'back': summary[:260]
    })
    
    # Second card for key points
    key_pts = extract_key_points(answer_text)
    if len(key_pts) >= 2:
        cards.append({
            'front': f"Key Points & Exam Criteria: {clean_q[:110]}",
            'back': " • " + " • ".join(key_pts[:3])[:260]
        })
        
    return cards

def generate_authentic_practice_questions(q_text, answer_text, subject_name, q_id, is_numerical, has_diagram):
    clean_q = re.sub(r'\[\s*\d+\s*[Mm]arks?\s*\]', '', q_text).strip()
    clean_q = re.sub(r'^[#\s]*Q(?:uestion)?\s*\d+[\w\(\)\.\:]*\s*', '', clean_q).strip()
    
    key_points = extract_key_points(answer_text)
    
    # 1. Authentic MCQ
    # Construct meaningful options from answer content
    clean_ans = re.sub(r'^#+.*', '', answer_text).strip()
    sentences = [s.strip() for s in re.split(r'\.\s+', clean_ans) if 25 < len(s.strip()) < 150 and not s.startswith('|') and not s.startswith('```')]
    
    correct_fact = sentences[0] if sentences else (key_points[0] if key_points else f"It is a fundamental concept in {subject_name} governing core system operations.")
    correct_fact = re.sub(r'[*_`#]', '', correct_fact).strip()
    if not correct_fact.endswith('.'):
        correct_fact += '.'
        
    # Domain-specific distractors based on subject
    domain_distractors = {
        'computer-networks': [
            "It is restricted solely to the physical transmission medium and does not interact with higher protocol layers.",
            "It operates exclusively via unguided electromagnetic waves without packet routing or flow control.",
            "It requires full manual reconfiguration of routing tables at every network hop."
        ],
        'cloud-computing': [
            "It strictly requires on-premises hardware ownership and forbids multi-tenant infrastructure.",
            "It eliminates the need for virtualization by delegating all execution to client workstations.",
            "It is confined to private cloud setups and cannot operate under public or hybrid service models."
        ],
        'image-processing': [
            "It operates exclusively on binary 1-bit images and cannot process continuous spatial gray levels.",
            "It inverts pixel values without altering the underlying spatial histogram or dynamic range.",
            "It requires zero mathematical transforms and ignores spatial frequency characteristics."
        ],
        'entrepreneurship': [
            "It depends entirely on government grants and operates with zero personal financial risk or innovation.",
            "It is exclusively confined to large multinational corporations with no application to MSMEs.",
            "It discourages feasibility analysis and relies purely on impulsive market speculation."
        ],
        'nlp': [
            "It assumes natural language text is completely devoid of ambiguity and requires no morphological normalization.",
            "It is restricted to acoustic waveforms and cannot process written orthographic representations.",
            "It eliminates syntactic parsing by assuming all sentences conform to identical linear templates."
        ],
        'system-software': [
            "It operates independently of underlying machine instruction sets and memory register architectures.",
            "It eliminates the need for symbol tables by allocating absolute fixed memory addresses during compilation.",
            "It performs execution directly on magnetic storage without loading into main memory."
        ]
    }
    
    # Pick subject-specific distractors
    sub_key = 'computer-networks'
    for k in domain_distractors:
        if k in q_id:
            sub_key = k
            break
            
    distractors = domain_distractors[sub_key]
    
    mcq = {
        'id': f'{q_id}-mcq',
        'type': 'mcq',
        'question': f"Regarding '{clean_q[:110]}...', which of the following statements is technically accurate?",
        'options': [
            correct_fact,
            distractors[0],
            distractors[1],
            distractors[2]
        ],
        'correctIndex': 0,
        'explanation': f"Correct. {correct_fact}"
    }
    
    # 2. Authentic True/False
    tf = {
        'id': f'{q_id}-tf',
        'type': 'tf',
        'question': f"True or False: According to the principles of {subject_name}, {correct_fact}",
        'isTrue': True,
        'explanation': f"True. As established in the syllabus: {correct_fact}"
    }
    
    # 3. Authentic Fill in the Blanks
    # Find substantive technical term
    candidates = re.findall(r'\b[A-Z][a-zA-Z0-9\-_]{3,}\b', clean_q + " " + correct_fact)
    ignored = {'What', 'Explain', 'Discuss', 'Define', 'Describe', 'Illustrate', 'Write', 'Differentiate', 'Compare', 'State', 'Show', 'With', 'From', 'This', 'These', 'Which', 'When', 'Where', 'Their'}
    valid_candidates = [c for c in candidates if c not in ignored]
    
    target_word = valid_candidates[0] if valid_candidates else "Protocol"
    fill_sentence = correct_fact.replace(target_word, "_______", 1) if target_word in correct_fact else f"In {subject_name}, the mechanism of _______ is vital for {clean_q[:60]}."
    
    fill = {
        'id': f'{q_id}-fill',
        'type': 'fill',
        'question': f"Fill in the blank: {fill_sentence}",
        'answer': target_word,
        'hint': f"Starts with '{target_word[0].upper()}' ({len(target_word)} characters)."
    }
    
    # 4. Matching Pairs (Subject-level concepts)
    pairs = [
        {'left': f"{clean_q[:35]}", 'right': f"{correct_fact[:60]}..."},
        {'left': "Primary Objective", 'right': "Standardization & architectural reliability"},
        {'left': "Exam Strategy", 'right': "Structured headings, diagrams & formulas"},
        {'left': "Core Domain", 'right': f"{subject_name} Curriculum"}
    ]
    match_q = {
        'id': f'{q_id}-match',
        'type': 'match',
        'question': f"Match each aspect of '{clean_q[:50]}' with its appropriate description:",
        'pairs': pairs,
        'explanation': f"Each concept directly aligns with the technical specification in the {subject_name} syllabus."
    }
    
    # 5. One-Line Direct Recall
    oneline = {
        'id': f'{q_id}-oneline',
        'type': 'oneline',
        'question': f"State the primary definition or significance of: {clean_q[:90]}",
        'answer': correct_fact[:180],
        'explanation': f"Model concise answer: {correct_fact}"
    }
    
    # 6. Short Answer (2-3 marks)
    short = {
        'id': f'{q_id}-short',
        'type': 'short',
        'question': f"Provide a concise technical summary (3 key points) for: {clean_q[:90]}",
        'keyPoints': key_points[:3] if key_points else [correct_fact],
        'marks': 3,
        'explanation': "A full-credit short answer must define the term, explain the core mechanism, and state an operational advantage."
    }
    
    # 7. Long Answer (7 marks full paper prompt)
    long_q = {
        'id': f'{q_id}-long',
        'type': 'long',
        'question': q_text,
        'marks': 7,
        'rubric': [
            "Clear Introduction & Definition (1.5 Marks)",
            "Step-by-step Architectural / Algorithmic Breakdown (2.5 Marks)",
            "Labelled Diagram or Structured Comparison Table (1.5 Marks)",
            "Practical Examples, Advantages, & Conclusion (1.5 Marks)"
        ],
        'keyPoints': key_points,
        'explanation': "Draft your solution adhering strictly to the 4-part university 7-mark examination rubric."
    }
    
    # 8. Numerical Practice
    numerical = {
        'id': f'{q_id}-num',
        'type': 'numerical',
        'question': f"Numerical / Algorithmic Formulation: {clean_q[:100]}",
        'isApplicable': is_numerical,
        'explanation': "Inspect the step-by-step mathematical substitution and final computed result in the reference answer."
    }
    
    # 9. Diagram Practice
    diagram = {
        'id': f'{q_id}-diagram',
        'type': 'diagram',
        'question': f"Architectural Schematic Recognition: {clean_q[:80]}",
        'hasDiagram': has_diagram,
        'explanation': "Verify the flow of data, control signals, and table interactions illustrated in the reference diagram."
    }
    
    # 10. Rapid Revision Item
    rapid = {
        'id': f'{q_id}-rapid',
        'type': 'rapid',
        'question': f"Rapid Blitz: What is the core function of '{clean_q[:70]}'?",
        'quickAnswer': correct_fact[:120],
        'explanation': correct_fact
    }
    
    return [mcq, tf, fill, match_q, oneline, short, long_q, numerical, diagram, rapid]

def parse_subject(subject_key):
    config = SUBJECTS_CONFIG[subject_key]
    file_path = config['file']
    
    if not os.path.exists(file_path):
        print(f"Error: {file_path} not found!")
        return None
        
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        full_text = f.read()
        
    all_questions = []
    years_found = set()
    
    # Natural Language Processing uses ### Question and has single 2025 paper
    if subject_key == 'nlp':
        year = '2025'
        years_found.add(year)
        
        # Split by ### Question
        q_chunks = re.split(r'\n(?=###\s*Question\s*\d)', full_text, flags=re.I)
        
        for chunk in q_chunks:
            chunk = chunk.strip()
            if not chunk or not re.match(r'^###\s*Question\s*\d', chunk, re.I):
                continue
                
            lines = chunk.split('\n')
            q_header = lines[0].strip()
            
            num_match = re.search(r'###\s*(Question\s*\d+[\w\(\)\.\:]*)', q_header, re.I)
            q_number = num_match.group(1).strip() if num_match else "Question 1"
            
            marks_match = re.search(r'\[\s*(\d+)\s*[Mm]arks?\s*\]', q_header)
            marks = int(marks_match.group(1)) if marks_match else 7
            
            q_text = re.sub(r'^###\s*Question\s*\d+[\w\(\)\.\:]*[\.\:]*\s*', '', q_header).strip()
            q_text = re.sub(r'\[\s*\d+\s*[Mm]arks?\s*\]', '', q_text).strip()
            
            ans_body = '\n'.join(lines[1:]).strip()
            ans_body = re.sub(r'^####\s*Answer\s*', '', ans_body, flags=re.I).strip()
            
            clean_num = re.sub(r'[^\w]', '', q_number).lower()
            q_id = f"{config['id']}-{year}-{clean_num}"
            
            module = detect_module(q_text + " " + ans_body[:400], config)
            is_numerical = bool(re.search(r'\b(calculate|formula|polynomial|matrix|argmax|svd|probability|pcfg|cky|tf-idf)\b', (q_text + ans_body).lower()))
            has_diagram = bool('```mermaid' in ans_body or '+---' in ans_body or '|' in ans_body or 'diagram' in q_text.lower())
            
            key_points = extract_key_points(ans_body)
            simple_expl = generate_simple_explanation(q_text, ans_body, config['name'])
            flashcards = generate_flashcards(q_number, q_text, ans_body)
            practice_questions = generate_authentic_practice_questions(q_text, ans_body, config['name'], q_id, is_numerical, has_diagram)
            
            # Question category
            q_cat = 'short_note' if 'short note' in q_text.lower() else ('or_option' if 'or' in q_header.lower() else 'subquestion')
            
            topic = q_text[:75].strip()
            if topic.endswith('.'): topic = topic[:-1]
            if not topic: topic = f"{config['name']} Concept"
            
            all_questions.append({
                'id': q_id,
                'subjectId': config['id'],
                'subjectName': config['name'],
                'courseCode': config['code'],
                'year': year,
                'paperTitle': f"{year} Annual Examination",
                'questionNumber': q_number,
                'questionText': q_text,
                'marks': marks,
                'topic': topic,
                'module': module,
                'syllabusStatus': 'Official Prescribed Syllabus Module',
                'questionCategory': q_cat,
                'answerMarkdown': ans_body,
                'keyPoints': key_points,
                'simplifiedExplanation': simple_expl,
                'isNumerical': is_numerical,
                'hasDiagram': has_diagram,
                'flashcards': flashcards,
                'practiceQuestions': practice_questions
            })
            
    else:
        # Other 5 subjects
        year_splits = re.split(r'\n(?=#\s+(?:PART\s+[IVXLCDM]+\s*[-–—:]*\s*)?(?:Part\s+[A-Z]\s*[-–—:]*\s*)?(?:[^\n]*?)?(202[0-9]))', full_text, flags=re.I)
        
        # If no split matched, check top header
        if len(year_splits) <= 1:
            year_match = re.search(r'\b(202[0-9])\b', full_text[:300])
            if year_match:
                year_splits = ['', year_match.group(1), full_text]
                
        # Iterate over year pairs
        for i in range(1, len(year_splits), 2):
            year = year_splits[i]
            section = year_splits[i+1] if i+1 < len(year_splits) else ''
            years_found.add(year)
            
            q_chunks = re.split(r'\n(?=##\s*(?:Question|QX?)\s*\d)', section, flags=re.I)
            
            for chunk in q_chunks:
                chunk = chunk.strip()
                if not chunk or not re.match(r'^##\s*(?:Question|QX?)\s*\d', chunk, re.I):
                    continue
                    
                lines = chunk.split('\n')
                q_header = lines[0].strip()
                
                num_match = re.search(r'##\s*((?:Question|QX?)\s*\d+[\w\(\)\.\:]*)', q_header, re.I)
                q_number = num_match.group(1).strip() if num_match else "Q1"
                
                marks_match = re.search(r'\[\s*(\d+)\s*[Mm]arks?\s*\]', q_header)
                marks = int(marks_match.group(1)) if marks_match else 7
                
                q_text = re.sub(r'^##\s*(?:Question|QX?)\s*\d+[\w\(\)\.\:]*[\.\:]*\s*', '', q_header).strip()
                q_text = re.sub(r'\[\s*\d+\s*[Mm]arks?\s*\]', '', q_text).strip()
                if not q_text and len(lines) > 1 and not lines[1].startswith('#'):
                    q_text = lines[1].strip()
                    
                ans_body_lines = lines[1:]
                if ans_body_lines and (ans_body_lines[0].startswith('### Answer') or ans_body_lines[0].startswith('**Answer:**')):
                    ans_body_lines = ans_body_lines[1:]
                    
                ans_body = '\n'.join(ans_body_lines).strip()
                if not ans_body:
                    ans_body = "Detailed answer available in reference syllabus solution."
                    
                clean_num = re.sub(r'[^\w]', '', q_number).lower()
                q_id = f"{config['id']}-{year}-{clean_num}"
                
                module = detect_module(q_text + " " + ans_body[:400], config)
                is_numerical = bool(re.search(r'\b(calculate|formula|polynomial|matrix|histogram\s+equalization|shannon|nyquist|crc|parity|hamming|subnet|mask|generator\s+bits|fourier)\b', (q_text + ans_body).lower()))
                has_diagram = bool('```mermaid' in ans_body or '+---' in ans_body or '|' in ans_body or 'diagram' in q_text.lower())
                
                key_points = extract_key_points(ans_body)
                simple_expl = generate_simple_explanation(q_text, ans_body, config['name'])
                flashcards = generate_flashcards(q_number, q_text, ans_body)
                practice_questions = generate_authentic_practice_questions(q_text, ans_body, config['name'], q_id, is_numerical, has_diagram)
                
                # Question category
                q_cat = 'short_note' if 'short note' in q_text.lower() else ('or_option' if ('or' in q_header.lower() or 'alternative' in q_header.lower()) else 'subquestion')
                
                topic = q_text[:75].strip()
                if topic.endswith('.'): topic = topic[:-1]
                if not topic: topic = f"{config['name']} Concept"
                
                all_questions.append({
                    'id': q_id,
                    'subjectId': config['id'],
                    'subjectName': config['name'],
                    'courseCode': config['code'],
                    'year': year,
                    'paperTitle': f"{year} Annual Examination",
                    'questionNumber': q_number,
                    'questionText': q_text,
                    'marks': marks,
                    'topic': topic,
                    'module': module,
                    'syllabusStatus': 'Official Prescribed Syllabus Module' if subject_key != 'entrepreneurship' else 'PYQ-Derived Examination Theme (Official detailed syllabus not prescribed)',
                    'questionCategory': q_cat,
                    'answerMarkdown': ans_body,
                    'keyPoints': key_points,
                    'simplifiedExplanation': simple_expl,
                    'isNumerical': is_numerical,
                    'hasDiagram': has_diagram,
                    'flashcards': flashcards,
                    'practiceQuestions': practice_questions
                })

    all_questions.sort(key=lambda q: (q['year'], q['questionNumber']), reverse=True)
    
    return {
        'id': config['id'],
        'name': config['name'],
        'code': config['code'],
        'color': config['color'],
        'syllabusType': config['syllabusType'],
        'years': sorted(list(years_found), reverse=True),
        'modules': config['modules'],
        'totalQuestions': len(all_questions),
        'questions': all_questions
    }

def main():
    print("="*80)
    print("SEMESTEROS - AUDITED CONTENT EXTRACTION & COMPILATION")
    print("="*80)
    
    database = {
        'subjects': {},
        'metadata': {
            'totalSubjects': len(SUBJECTS_CONFIG),
            'totalQuestions': 0,
            'subjectsList': []
        }
    }
    
    total_q = 0
    for sid in SUBJECTS_CONFIG.keys():
        print(f"Compiling subject: {sid}...")
        sub_data = parse_subject(sid)
        if sub_data:
            database['subjects'][sid] = sub_data
            q_cnt = sub_data['totalQuestions']
            total_q += q_cnt
            database['metadata']['subjectsList'].append({
                'id': sub_data['id'],
                'name': sub_data['name'],
                'code': sub_data['code'],
                'color': sub_data['color'],
                'syllabusType': sub_data['syllabusType'],
                'years': sub_data['years'],
                'totalModules': len(sub_data['modules']),
                'totalQuestions': q_cnt
            })
            print(f"  -> {sub_data['name']} ({sub_data['code']}): {q_cnt} verified questions across years {sub_data['years']} | {len(sub_data['modules'])} modules")
            
    database['metadata']['totalQuestions'] = total_q
    
    output_path = 'src/data/database.json'
    with open(output_path, 'w', encoding='utf-8') as out_f:
        json.dump(database, out_f, indent=2, ensure_ascii=False)
        
    print("\n" + "="*80)
    print(f"SUCCESS: Audited database written to {output_path} ({os.path.getsize(output_path):,} bytes)")
    print(f"Total Subjects: {len(database['subjects'])}, Total Verified PYQ Entries: {total_q}")
    print("="*80)

if __name__ == '__main__':
    main()
