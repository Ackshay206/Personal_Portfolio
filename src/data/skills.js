import { Brain, Zap, Eye, MessageSquare, Code, Globe, Server, Database, Layers } from 'lucide-react';

export const skillsData = {
  "AI/ML": [
    { name: "Machine Learning", level: 90, icon: <Brain size={20} /> },
    { name: "Computer Vision", level: 85, icon: <Eye size={20} /> },
    { name: "NLP", level: 75, icon: <MessageSquare size={20} /> },
    { name: "PyTorch", level: 90, icon: <Zap size={20} /> },
    { name: "TensorFlow", level: 80, icon: <Zap size={20} /> },
    { name: "Scikit-learn", level: 90, icon: <Brain size={20} /> },
    { name: "OpenCV", level: 75, icon: <Eye size={20} /> },
    { name: "Langchain", level: 75, icon: <MessageSquare size={20} /> },
  ],
  "Software Development": [
    { name: "Python", level: 95, icon: <Code size={20} /> },
    { name: "Javascript", level: 80, icon: <Code size={20} /> },
    { name: "React", level: 75, icon: <Globe size={20} /> },
    { name: "Node.js", level: 80, icon: <Server size={20} /> },
    { name: "Java", level: 60, icon: <Code size={20} /> },
    { name: "PostgreSQL", level: 70, icon: <Database size={20} /> },
    { name: "HTML/CSS", level: 90, icon: <Layers size={20} /> },
    { name: "FastAPI", level: 70, icon: <Globe size={20} /> }
  ]
};

export const additionalTechs = [
  "Git","AWS", "Linux", "MongoDB", "Nextjs", "Pinecone", "Material UI", 
  "Flask", "Streamlit", "Tailwind CSS", "Jupyter", "Pandas", "NumPy"
];