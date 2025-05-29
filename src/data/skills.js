import { Brain, Zap, Eye, MessageSquare, Code, Globe, Server, Database, Layers } from 'lucide-react';

export const skillsData = {
  "AI/ML": [
    { name: "Machine Learning", level: 90, icon: <Brain size={20} /> },
    { name: "Deep Learning", level: 85, icon: <Layers size={20} /> },
    { name: "Computer Vision", level: 80, icon: <Eye size={20} /> },
    { name: "NLP", level: 75, icon: <MessageSquare size={20} /> },
    { name: "PyTorch", level: 85, icon: <Zap size={20} /> },
    { name: "TensorFlow", level: 80, icon: <Zap size={20} /> },
    { name: "Scikit-learn", level: 90, icon: <Brain size={20} /> },
    { name: "OpenCV", level: 75, icon: <Eye size={20} /> }
  ],
  "Software Development": [
    { name: "JavaScript", level: 95, icon: <Code size={20} /> },
    { name: "Python", level: 90, icon: <Code size={20} /> },
    { name: "React", level: 90, icon: <Globe size={20} /> },
    { name: "Node.js", level: 85, icon: <Server size={20} /> },
    { name: "TypeScript", level: 85, icon: <Code size={20} /> },
    { name: "PostgreSQL", level: 80, icon: <Database size={20} /> },
    { name: "Docker", level: 75, icon: <Layers size={20} /> },
    { name: "AWS", level: 70, icon: <Globe size={20} /> }
  ]
};

export const additionalTechs = [
  "Git", "Linux", "MongoDB", "Redis", "GraphQL", "FastAPI", 
  "Flask", "Vue.js", "Tailwind CSS", "Jupyter", "Pandas", "NumPy"
];