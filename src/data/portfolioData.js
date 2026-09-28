export const personalInfo = {
  name: "Aishwarya Loni",
  title: "Software Developer — Java — Python",
  tagline: "Building Reliable Applications, REST APIs & Interactive Software Systems",
  location: "Pandharpur / Solapur, Maharashtra, India",
  phone: "+91-8010799591",
  email: "aishwaryaloni872@gmail.com",
  github: "https://github.com/AishwaryaLoni15",
  linkedin: "https://linkedin.com/in/aishwarya-loni",
  bio: "Motivated MCA student with strong proficiency in Java, Python, MySQL, and Web Technologies. Seeking an opportunity as a Software Engineer. Experienced in application development, REST API design, database integration, software testing, and debugging. A hardworking, quick learner who excels at solving complex problems and collaborating effectively in team environments.",
  status: "Seeking Software Engineer Roles & Technical Opportunities (MCA expected 2027)",
  stats: [
    { label: "Academic CGPA", value: 8.47, suffix: " / 10" },
    { label: "Projects Developed", value: 5, suffix: "+" },
    { label: "Certifications", value: 3, suffix: " Elite/AWS/CodeChef" },
    { label: "Core Focus", value: 100, suffix: "% Java & Python" },
  ],
  skillsSummary: ["Java & Core OOP", "Python", "MySQL & Database", "REST APIs", "React.js & Web Dev", "AWS Cloud"]
};

export const projectsData = [
  {
    id: "govt-tracker",
    title: "Smart Government Productivity Tracker",
    category: "Enterprise",
    shortDesc: "Full-stack administrative management platform with 4 user roles, task management, employee monitoring, and MySQL database integration.",
    fullDesc: "A comprehensive full-stack enterprise productivity tracker engineered to manage government employee tasks, workflow bottlenecks, and department efficiency. Features 4 distinct user roles (Super Admin, Department Head, Officer, Auditor), 10+ operational modules, performance analytics dashboards, and robust error handling validated across 20+ rigorous test cases.",
    tech: ["Python", "MySQL", "HTML5", "CSS3", "JavaScript", "REST APIs", "SQL"],
    type: "Full-Stack Enterprise Project",
    interactiveType: "govt-tracker",
    metrics: [
      { label: "User Roles", value: "4 Roles" },
      { label: "Data Tables", value: "5+ Tables" },
      { label: "Test Cases Passed", value: "20+ Passed" }
    ],
    features: [
      "4-Level Role-Based Access Control (RBAC)",
      "Employee Productivity & Task Assignment Monitoring",
      "Dynamic Department Performance Reporting & Dashboards",
      "MySQL Relational Database Schema with 5+ Core Tables",
      "Comprehensive Input Validation & Error Handling"
    ],
    codeSnippet: `# Government Employee Task Assignment Controller (Python Snippet)
def assign_government_task(task_id, officer_id, priority, db_connection):
    cursor = db_connection.cursor()
    query = """
        UPDATE govt_tasks 
        SET assigned_officer_id = %s, status = 'IN_PROGRESS', priority = %s, updated_at = NOW()
        WHERE task_id = %s AND status = 'PENDING'
    """
    cursor.execute(query, (officer_id, priority, task_id))
    db_connection.commit()
    return {"status": "SUCCESS", "rows_affected": cursor.rowcount}`,
    githubUrl: "https://github.com/AishwaryaLoni15/Smart-Government-Productivity-Tracker",
    liveUrl: "#"
  },
  {
    id: "electronics-shop",
    title: "Online Electronics Shop Management System",
    category: "Enterprise",
    shortDesc: "Java-based multi-module inventory, sales, purchase, and customer management system backed by MySQL database.",
    fullDesc: "An end-to-end Java enterprise desktop/web management application built with 4 primary operational modules: Product Inventory, Sales Management, Supplier Purchase Records, and Customer CRM. Engineered with robust JDBC database connectivity, Object-Oriented architecture, Collections Framework, and validated with over 20+ test scenarios.",
    tech: ["Java", "Core Java", "JDBC", "MySQL", "HTML/CSS", "JavaScript", "OOP"],
    type: "Java & MySQL Enterprise App",
    interactiveType: "electronics-shop",
    metrics: [
      { label: "Core Modules", value: "4 Modules" },
      { label: "Database Tables", value: "5+ Relational" },
      { label: "Validation Test Cases", value: "20+ Verified" }
    ],
    features: [
      "Product Stock Inventory & Threshold Alerts",
      "Sales Invoice Generation & Purchase Management",
      "Customer CRM & Purchase History Tracking",
      "JDBC MySQL Connectivity with Prepared Statements",
      "Core Java Multithreading & Exception Handling"
    ],
    codeSnippet: `// Electronics Inventory & Sales Controller (Java Snippet)
public class InventoryManager {
    public boolean processSale(int productId, int quantitySold, double unitPrice) throws SQLException {
        String updateStock = "UPDATE inventory SET stock_qty = stock_qty - ? WHERE product_id = ? AND stock_qty >= ?";
        try (PreparedStatement pstmt = connection.prepareStatement(updateStock)) {
            pstmt.setInt(1, quantitySold);
            pstmt.setInt(2, productId);
            pstmt.setInt(3, quantitySold);
            int updated = pstmt.executeUpdate();
            return updated > 0;
        }
    }
}`,
    githubUrl: "https://github.com/AishwaryaLoni15/Electronics-Shop-Management-System",
    liveUrl: "#"
  },
  {
    id: "loan-tracker",
    title: "Smart Loan Utilization Tracker",
    category: "Enterprise",
    shortDesc: "Enterprise financial tracking platform with automated fund verification, risk evaluation algorithms, and real-time audit logging.",
    fullDesc: "An end-to-end enterprise solution engineered to monitor loan disbursements and verify fund utilization across multiple tranches. Built with Spring Boot microservices, React UI, PostgreSQL database, and JWT security. Includes predictive risk scoring, automated anomaly detection for fraudulent expense claims, and dynamic PDF audit report generation.",
    tech: ["Java", "Spring Boot", "React", "MySQL/PostgreSQL", "JWT Security", "Chart.js"],
    type: "Enterprise Financial System",
    interactiveType: "loan-tracker",
    metrics: [
      { label: "Audit Speedup", value: "85%" },
      { label: "Disbursement Accuracy", value: "99.9%" },
      { label: "Active Tranches", value: "1,200+" }
    ],
    features: [
      "Role-Based Access Control (Admin, Auditor, Borrower)",
      "Automated Expense Receipt Verification",
      "Real-Time Loan Health & Risk Scoring Dashboard",
      "Immutable Audit Log Trail for Compliance"
    ],
    codeSnippet: `// Loan Health Score Evaluator (Java Service Snippet)
@Service
public class LoanRiskEvaluatorService {
    public RiskAssessment evaluateTranche(UUID loanId, BigDecimal claimedAmount) {
        BigDecimal approvedLimit = loanRepository.findLimitById(loanId);
        RiskLevel level = (claimedAmount.compareTo(approvedLimit) > 0) ? RiskLevel.HIGH : RiskLevel.LOW;
        return new RiskAssessment(loanId, level, LocalDateTime.now());
    }
}`,
    githubUrl: "https://github.com/AishwaryaLoni15/smart-loan-utilization-tracker",
    liveUrl: "#"
  },
  {
    id: "3d-nature-scene",
    title: "3D Nature Ecosystem & Physics Simulator",
    category: "AI & 3D",
    shortDesc: "Interactive 3D environmental simulation with procedural terrain, day/night lighting cycles, wind physics, and animal AI state machines.",
    fullDesc: "Interactive 3D nature simulation rendered via Three.js / WebGL. Users can navigate a rich procedural nature ecosystem, toggle dynamic solar weather cycles, plant trees, inspect lighting shaders, and observe real-time physics dynamics.",
    tech: ["Python", "Three.js", "WebGL", "JavaScript", "HTML5", "Framer Motion"],
    type: "Interactive 3D WebGL Simulation",
    interactiveType: "nature-3d",
    metrics: [
      { label: "Target FPS", value: "60 FPS" },
      { label: "3D Meshes Rendered", value: "5,000+" },
      { label: "Weather Cycles", value: "Dynamic" }
    ],
    features: [
      "Real-time Day/Sunset/Night solar rotation cycle",
      "Procedural tree planting tool & wind sway physics",
      "Rain particle weather control & orbit camera",
      "60 FPS WebGL rendering engine"
    ],
    codeSnippet: `// Three.js Solar Cycle Controller
function setTimeOfDay(mode) {
  if (mode === 'day') {
    scene.background = new THREE.Color(0x87ceeb);
    sunLight.intensity = 1.2;
  } else if (mode === 'night') {
    scene.background = new THREE.Color(0x090d16);
    sunLight.intensity = 0.3;
  }
}`,
    githubUrl: "https://github.com/AishwaryaLoni15/3d-nature-ecosystem",
    liveUrl: "#"
  },
  {
    id: "personal-portfolio-web",
    title: "Personal Portfolio & Interactive Showcase Website",
    category: "Personal",
    shortDesc: "Responsive portfolio website featuring 5+ detailed sections, 3D Canvas animations, component architecture, and multi-device testing.",
    fullDesc: "Designed and built a highly responsive, modern portfolio website to showcase technical skills, academic achievements, and software engineering deliverables. Built with React, Tailwind CSS, Framer Motion, and Three.js. Thoroughly tested on 3+ screen sizes for layout responsiveness, accessibility, and performance.",
    tech: ["HTML5", "CSS3", "JavaScript", "React.js", "Tailwind CSS", "Framer Motion"],
    type: "Frontend & UI/UX Web Project",
    interactiveType: "default",
    metrics: [
      { label: "Sections Built", value: "5+ Sections" },
      { label: "Interactive Elements", value: "5+ Custom" },
      { label: "Devices Tested", value: "3+ Screen Sizes" }
    ],
    features: [
      "5+ Structured Sections (Hero, Projects, Skills, Education, Contact)",
      "Light / Dark mode smooth theme toggle",
      "Interactive 3D canvas particle wave background",
      "Responsive layout validated on mobile, tablet, and desktop"
    ],
    codeSnippet: `// Theme Context Toggle Hook
export const useThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);
  return { isDark, toggleTheme: () => setIsDark(!isDark) };
};`,
    githubUrl: "https://github.com/AishwaryaLoni15/Personal-Portfolio-Website",
    liveUrl: "#"
  }
];

export const skillsCategories = [
  {
    id: "programming",
    name: "Programming Languages & Core Java",
    icon: "Server",
    description: "Solid algorithmic problem-solving in Java and Python with OOP principles.",
    skills: [
      { name: "Java (Core & OOP)", level: 92, status: "Advanced" },
      { name: "Python", level: 88, status: "Advanced" },
      { name: "Collections Framework", level: 90, status: "Advanced" },
      { name: "Exception Handling & Multithreading", level: 85, status: "Proficient" },
      { name: "JDBC (Java Database Connectivity)", level: 88, status: "Advanced" }
    ]
  },
  {
    id: "backend-db",
    name: "Backend & Database Systems",
    icon: "Database",
    description: "REST API design, relational schema architecture, and SQL query optimization.",
    skills: [
      { name: "REST API Design", level: 88, status: "Advanced" },
      { name: "MySQL Database", level: 90, status: "Advanced" },
      { name: "SQL & Database Design", level: 88, status: "Advanced" },
      { name: "MongoDB", level: 80, status: "Proficient" },
      { name: "DBMS & Schema Architecture", level: 88, status: "Advanced" }
    ]
  },
  {
    id: "frontend-tools",
    name: "Frontend Development & Tools",
    icon: "Layout",
    description: "Modern component-based web interfaces, Git version control, and IDEs.",
    skills: [
      { name: "React.js & Component Architecture", level: 86, status: "Proficient" },
      { name: "JavaScript (ES6+) & HTML5/CSS3", level: 90, status: "Advanced" },
      { name: "Git & GitHub Version Control", level: 90, status: "Advanced" },
      { name: "Eclipse & VS Code IDEs", level: 92, status: "Advanced" },
      { name: "Tailwind CSS & Web Styling", level: 88, status: "Advanced" }
    ]
  },
  {
    id: "concepts-cloud",
    name: "Core Concepts & AWS Cloud",
    icon: "Cloud",
    description: "Software engineering methodologies, testing, debugging, and cloud basics.",
    skills: [
      { name: "Object-Oriented Programming (OOP)", level: 94, status: "Expert" },
      { name: "Data Structures Basics", level: 85, status: "Proficient" },
      { name: "SDLC & Software Testing/Debugging", level: 88, status: "Advanced" },
      { name: "AWS Cloud Foundations", level: 82, status: "Certified / Workshop" }
    ]
  }
];

export const journeyTimeline = [
  {
    year: "Expected 2027",
    title: "Master of Computer Applications (MCA)",
    institution: "SVERI’s College of Engineering, Pandharpur",
    badge: "Pursuing Postgraduate Degree",
    description: "Focusing on Advanced Software Development, Data Structures, DBMS, Web Engineering, and Cloud Technologies.",
    highlights: [
      "SVERI's College of Engineering, Pandharpur academic program",
      "Developing full-stack projects using Java, Python, React, and MySQL",
      "Active participant in technical coding workshops and peer learning"
    ]
  },
  {
    year: "2025",
    title: "Bachelor of Science (Entire Computer Science)",
    institution: "Sangmeshwar College, Solapur",
    badge: "CGPA: 8.47 / 10",
    description: "Graduated with distinction in Entire Computer Science, establishing strong theoretical and practical software development fundamentals.",
    highlights: [
      "Achieved outstanding academic standing with CGPA 8.47 / 10",
      "Completed hands-on software development projects in Java, C++, and MySQL",
      "Core coursework in OOP, Data Structures, DBMS, and Operating Systems"
    ]
  },
  {
    year: "2021",
    title: "Class XII (HSC - Maharashtra State Board)",
    institution: "D.H.B Soni College, Solapur",
    badge: "Grade: 90.83%",
    description: "Completed Higher Secondary Certificate with distinction in Science and Mathematics.",
    highlights: [
      "Secured 90.83% distinction in HSC State Board examinations",
      "Strong analytical and mathematical problem-solving foundation"
    ]
  },
  {
    year: "2019",
    title: "Class X (SSC - Maharashtra State Board)",
    institution: "P.G. Chitale English Medium School, Barur",
    badge: "Grade: 80.40%",
    description: "Completed Secondary School Certificate with strong academic performance.",
    highlights: [
      "Secured 80.40% distinction in SSC State Board examinations"
    ]
  }
];

export const achievementsList = [
  {
    title: "Elite Certification in Programming in Java",
    issuer: "NPTEL (IIT-Delivered Java Course)",
    icon: "Award",
    desc: "Earned Elite status for outstanding performance in the rigorous IIT-delivered Java programming certification course."
  },
  {
    title: "AWS Cloud Foundations Workshop",
    issuer: "Amazon Web Services (AWS)",
    icon: "Cloud",
    desc: "Completed hands-on training covering core AWS cloud infrastructure services, cloud architecture, security, and deployment concepts."
  },
  {
    title: "React JS Certification",
    issuer: "CodeChef",
    icon: "Code",
    desc: "Completed certification focusing on component-based frontend web development, React hooks, state management, and modern UI practices."
  }
];

export const corePhilosophies = [
  {
    title: "Solid Algorithmic & OOP Core",
    icon: "ShieldAlert",
    desc: "Writing modular, object-oriented Java & Python applications built with clean principles and robust exception handling."
  },
  {
    title: "Thorough Testing & Quality Control",
    icon: "Sparkles",
    desc: "Validating software applications with 20+ test cases to verify database accuracy, error handling, and UI responsiveness."
  },
  {
    title: "Continuous Learning & AWS Cloud",
    icon: "Layers",
    desc: "Expanding knowledge continuously through elite certifications in Java, React JS, and AWS Cloud Foundations."
  }
];
