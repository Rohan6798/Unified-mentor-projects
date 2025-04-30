import { Shield, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary/10 py-8 border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-medium text-lg">EPLQ</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Efficient Privacy-Preserving Location-Based Query &copy; {new Date().getFullYear()}
          </div>
          
          <div className="flex items-center mt-4 md:mt-0">
            <a
              href="https://github.com/example/eplq-project"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-primary transition"
            >
              <Github className="h-5 w-5" />
              <span>GitHub Repository</span>
            </a>
          </div>
        </div>
        
        <div className="mt-8 border-t border-primary/10 pt-6 text-center text-sm text-muted-foreground">
          <p>EPLQ enables secure, privacy-preserving location-based queries while ensuring user data protection.</p>
          <p className="mt-2">
            Built with React, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;