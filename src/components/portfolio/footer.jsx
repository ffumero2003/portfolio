import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-transparent text-[var(--color-primary)] py-4">
      <div className="w-full mx-auto flex items-center justify-between">
        
        {/* Left */}
        <div className="flex gap-4 text-3xl sm:text-4xl">
          <a
            href="https://www.linkedin.com/in/felipe-fumero-b5186030b/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-accent)] transition-colors"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a
            href="https://github.com/ffumero2003"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-accent)] transition-colors"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>

        {/*  Right */}
        <div className="flex gap-3 text-sm sm:text-base md:text-lg">
          <h3>© {new Date().getFullYear()} Felipe Fumero</h3>
          <h3>+(506) 8413-4000</h3>
        </div>
      </div>
    </footer>
  );
}
