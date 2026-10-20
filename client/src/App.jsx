import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowDownToLine,
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Send,
  Sparkles,
  X,
  ExternalLink,
  Award,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";
import "./App.css";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const skillGroups = [
  {
    title: "Programming & CS",
    subtitle: "Core foundations",
    skills: [
      { name: "Python", level: "Practicing", score: 65 },
      { name: "C", level: "Learning & practicing", score: 52 },
      {
        name: "Data Structures & Algorithms",
        level: "Building foundations",
        score: 48,
      },
      { name: "SQL", level: "Practicing", score: 62 },
    ],
  },
  {
    title: "Frontend",
    subtitle: "Web interfaces",
    skills: [
      { name: "HTML", level: "Basics", score: 50 },
      { name: "CSS", level: "Learning", score: 42 },
      { name: "JavaScript", level: "Project exposure", score: 45 },
    ],
  },
  {
    title: "Backend & Technologies",
    subtitle: "Project experience / learning",
    skills: [
      { name: "Node.js & Express.js", level: "Project exposure", score: 42 },
      { name: "MySQL", level: "Project exposure", score: 52 },
      { name: "REST APIs", level: "Project exposure", score: 40 },
      { name: "JWT & bcrypt.js", level: "Project exposure", score: 35 },
      { name: "Machine Learning", level: "Project exposure", score: 42 },
    ],
  },
];

const projects = [
  {
    id: 1,
    name: "Lost and Found Management Website",
    category: "Database",
    period: "Sep – Nov 2025",
    description:
      "A web-based system to report, search, and manage lost and found items, using SQL to store and retrieve item details.",
    stack: ["SQL", "Database design", "HTML basics"],
    icon: "⌕",
    github: "https://github.com/jahnavichowdary15",
    demo: "",
    note: "Replace the GitHub profile link with this project's repository when available.",
  },
  {
    id: 2,
    name: "Rock–Paper–Scissors Game",
    category: "Python",
    period: "Dec 2025 – Jan 2026",
    description:
      "A console-based Python game with randomized computer choices and game logic built using conditionals and loops.",
    stack: ["Python", "Random module", "Conditionals", "Loops"],
    icon: "✳",
    github: "https://github.com/jahnavichowdary15",
    demo: "",
    note: "Replace the GitHub profile link with this project's repository when available.",
  },
  {
    id: 3,
    name: "Elder Care AI",
    category: "AI & ML",
    period: "Jan – Mar 2026",
    description:
      "An AI-based elderly health risk detection web application that classifies risk levels from vital health parameters using machine learning.",
    stack: ["Python", "Machine Learning", "Health risk classification"],
    icon: "✧",
    github: "https://github.com/jahnavichowdary15",
    demo: "",
    note: "Replace the GitHub profile link with this project's repository when available.",
  },
  {
    id: 4,
    name: "Ventrix CareerOS",
    category: "Web Development",
    period: "Sep 2026",
    description:
      "An AI-powered job portal project using a web interface, server-side APIs, database integration, and authentication technologies.",
    stack: [
      "HTML",
      "CSS",
      "JavaScript",
      "Node.js",
      "Express.js",
      "MySQL",
      "JWT",
      "bcrypt.js",
      "REST API",
    ],
    icon: "↗",
    github: "https://github.com/jahnavichowdary15",
    demo: "",
    note: "Replace the GitHub profile link with this project's repository when available.",
  },
];

const education = [
  {
    date: "2024 – 2028",
    title: "B.Tech — Computer Science Engineering (AI & ML)",
    place: "JK Lakshmipat University · Jaipur, Rajasthan",
    detail:
      "Currently in second year. Focused on programming, computer science foundations, and artificial intelligence.",
    icon: GraduationCap,
  },
];

const certificates = [
  {
    name: "Python Programming",
    issuer: "Coursera",
    date: "Feb 2025",
    url: "",
  },
  {
    name: "Database Management System",
    issuer: "Infosys Springboard",
    date: "Nov 2025",
    url: "",
  },
  {
    name: "Certificate of Participation",
    issuer: "ICAT",
    date: "Jan 2026",
    url: "",
  },
];

const activities = [
  { name: "Smart India Hackathon (SIH)", date: "Oct 2025" },
  { name: "LNMIIT Hackathon", date: "Jan 2026" },
];

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) =>
        element.classList.add("is-visible")
      );
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
}

function App() {
  useReveal();

  const [typedRole, setTypedRole] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState({
    type: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const roleText = "Full-Stack Developer";

  useEffect(() => {
    let index = 0;
    let deleting = false;
    let pause = 0;

    const timer = window.setInterval(() => {
      if (pause > 0) {
        pause -= 1;
        return;
      }

      if (!deleting) {
        index += 1;
        setTypedRole(roleText.slice(0, index));

        if (index >= roleText.length) {
          deleting = true;
          pause = 10;
        }
      } else {
        index -= 1;
        setTypedRole(roleText.slice(0, index));

        if (index <= 0) {
          deleting = false;
          pause = 3;
        }
      }
    }, 95);

    return () => window.clearInterval(timer);
  }, []);

  const filters = useMemo(
    () => ["All", ...new Set(projects.map((project) => project.category))],
    []
  );

  const visibleProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  const updateForm = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  async function submitContact(event) {
    event.preventDefault();
    setSubmitting(true);
    setFormStatus({ type: "", message: "" });

    try {
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to send your message."
        );
      }

      setForm({
        name: "",
        email: "",
        message: "",
      });

      setFormStatus({
        type: "success",
        message: "Thanks! Your message was saved successfully.",
      });
    } catch (error) {
      setFormStatus({
        type: "error",
        message: error.message.includes("Failed to fetch")
          ? "Cannot reach the API. Make sure the Express server is running and MongoDB is connected."
          : error.message,
      });
    } finally {
      setSubmitting(false);
    }
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="app" id="home">
      <header className="navbar">
        <a className="logo" href="#home" aria-label="Jahanavi home">
          J<span>.</span>
        </a>

        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <nav
          className={`nav-links ${menuOpen ? "nav-open" : ""}`}
          aria-label="Main navigation"
        >
          {[
            ["About", "#about"],
            ["Skills", "#skills"],
            ["Projects", "#projects"],
            ["Journey", "#journey"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a key={href} href={href} onClick={closeMenu}>
              {label}
            </a>
          ))}

          <a className="nav-contact" href={`${API_BASE}/api/cv/pdf`}>
            Download CV <ArrowDownToLine size={14} />
          </a>
        </nav>
      </header>

      <main>
        <section className="hero section-container">
          <div className="hero-content reveal">
            <p className="eyebrow">
              <span className="status-dot" /> CSE STUDENT · AI & ML · JAIPUR
            </p>

            <h1>
              Turning ideas into{" "}
              <span className="gradient-text">digital experiences.</span>
            </h1>

            <div className="hero-role">
              Hi, I'm <strong>Doddapuneni Jahanavi</strong>
            </div>

            <p className="typed-line">
              <span>{typedRole}</span>
              <span className="type-cursor">|</span>
            </p>

            <p className="intro">
              A second-year Computer Science Engineering student specializing
              in AI & ML. I enjoy programming, solving problems, and building
              useful technology while learning new tools and collaborating
              with others.
            </p>

            <div className="hero-buttons">
              <a className="button button-primary" href="#projects">
                Explore My Work <ArrowUpRight size={16} />
              </a>

              <a
                className="button button-secondary"
                href={`${API_BASE}/api/cv/pdf`}
              >
                <ArrowDownToLine size={16} /> Download CV
              </a>
            </div>

            <div className="stats">
              <div>
                <h3>04</h3>
                <p>Featured Projects</p>
              </div>
              <div>
                <h3>03</h3>
                <p>Certificates</p>
              </div>
              <div>
                <h3>02</h3>
                <p>Hackathon Activities</p>
              </div>
            </div>
          </div>

          <div className="hero-visual reveal">
            <div className="glow glow-one" />
            <div className="glow glow-two" />

            <div className="profile-frame">
              <img
                src="profile.jpeg"
                alt="Doddapuneni Jahanavi"
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                onLoad={() => {
                  console.log("Profile photo loaded successfully.");
                }}
                onError={(event) => {
                  console.error(
                    "Could not load /profile.jpg",
                    event
                  );
                }}
              />

              <div className="profile-caption">
                <span className="status-dot" />
                Open to internship opportunities
              </div>
            </div>

            <div className="floating-tag tag-top">
              <Sparkles size={15} /> Curious Mind
            </div>

            <div className="floating-tag tag-bottom">
              <Code2 size={15} /> Always Learning
            </div>
          </div>

          <a className="scroll-cue" href="#about">
            <ArrowDown size={15} /> Scroll to explore
          </a>
        </section>

        <section
          className="about section-container section-block reveal"
          id="about"
        >
          <div className="section-aside">
            <p className="section-label">01 / ABOUT ME</p>
            <span className="aside-line" />
          </div>

          <div className="section-main">
            <h2>
              Curious mind.
              <span className="gradient-text"> Creative builder.</span>
            </h2>

            <p className="section-description">
              I'm pursuing a B.Tech in Computer Science Engineering (AI & ML)
              at JK Lakshmipat University, Jaipur. I enjoy exploring
              programming, databases, web development, and machine learning
              through practical projects. I'm looking for opportunities to
              learn from real-world work, contribute to a team, and keep
              growing as a developer.
            </p>

            <div className="info-grid">
              <div className="info-card">
                <MapPin size={18} />
                <div>
                  <small>LOCATION</small>
                  <strong>Jaipur, Rajasthan, India</strong>
                </div>
              </div>

              <div className="info-card">
                <GraduationCap size={18} />
                <div>
                  <small>CURRENT STATUS</small>
                  <strong>2nd-year B.Tech student</strong>
                </div>
              </div>

              <div className="info-card">
                <BriefcaseBusiness size={18} />
                <div>
                  <small>INTERESTED IN</small>
                  <strong>Internships & collaboration</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="section-container section-block reveal"
          id="skills"
        >
          <div className="section-aside">
            <p className="section-label">02 / MY TOOLKIT</p>
            <span className="aside-line" />
          </div>

          <div className="section-main">
            <h2>Skills & technologies.</h2>

            <p className="section-description">
              Grouped by area. The levels are approximate self-assessment
              labels; update them to match your confidence and experience.
            </p>

            <div className="skill-groups">
              {skillGroups.map((group) => (
                <div className="skill-group" key={group.title}>
                  <div className="skill-group-heading">
                    <div>
                      <h3>{group.title}</h3>
                      <p>{group.subtitle}</p>
                    </div>
                    <span>
                      {String(group.skills.length).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="skill-list">
                    {group.skills.map((skill) => (
                      <div
                        className="skill-row"
                        key={skill.name}
                        title={`${skill.name}: ${skill.level}`}
                      >
                        <div className="skill-meta">
                          <span>{skill.name}</span>
                          <small>{skill.level}</small>
                        </div>

                        <div
                          className="skill-track"
                          role="img"
                          aria-label={`${skill.name}, ${skill.level}`}
                        >
                          <span
                            style={{
                              "--skill-width": `${skill.score}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="soft-skills">
              <span>Problem-solving</span>
              <span>Analytical thinking</span>
              <span>Communication</span>
              <span>Team collaboration</span>
              <span>Continuous learning</span>
            </div>
          </div>
        </section>

        <section
          className="section-container section-block reveal"
          id="projects"
        >
          <div className="section-aside">
            <p className="section-label">03 / SELECTED WORK</p>
            <span className="aside-line" />
          </div>

          <div className="section-main">
            <h2>Projects I've worked on.</h2>

            <p className="section-description">
              A selection of work across programming, databases, web
              development, and AI.
            </p>

            <div className="filter-row" aria-label="Filter projects">
              {filters.map((item) => (
                <button
                  className={
                    filter === item
                      ? "filter-chip active"
                      : "filter-chip"
                  }
                  key={item}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="projects-grid">
              {visibleProjects.map((project) => (
                <article className="project-card" key={project.id}>
                  <div className="project-top">
                    <span>{String(project.id).padStart(2, "0")}</span>
                    <span className="project-icon">{project.icon}</span>
                  </div>

                  <p className="project-period">
                    <CalendarDays size={12} /> {project.period}
                  </p>

                  <h3>{project.name}</h3>
                  <p className="project-description">
                    {project.description}
                  </p>

                  <div className="project-tech">
                    {project.stack.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>

                  <div className="project-links">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      title={project.note}
                    >
                      <Github size={15} /> GitHub profile{" "}
                      <ExternalLink size={12} />
                    </a>

                    {project.demo ? (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ExternalLink size={14} /> Live demo
                      </a>
                    ) : (
                      <span className="demo-pending">
                        Live demo not added
                      </span>
                    )}
                  </div>

                  <p className="project-note">{project.note}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section-container section-block reveal"
          id="journey"
        >
          <div className="section-aside">
            <p className="section-label">04 / MY JOURNEY</p>
            <span className="aside-line" />
          </div>

          <div className="section-main">
            <h2>Education & experience.</h2>

            <div className="timeline">
              {education.map((item) => {
                const Icon = item.icon;

                return (
                  <article className="timeline-item" key={item.title}>
                    <span className="timeline-dot" />
                    <div className="timeline-date">{item.date}</div>

                    <div className="timeline-card">
                      <Icon size={20} />
                      <h3>{item.title}</h3>
                      <p className="timeline-place">{item.place}</p>
                      <p>{item.detail}</p>
                    </div>
                  </article>
                );
              })}

              <article className="timeline-item">
                <span className="timeline-dot current" />
                <div className="timeline-date">Ongoing</div>

                <div className="timeline-card">
                  <BriefcaseBusiness size={20} />
                  <span className="current-pill">In progress</span>
                  <h3>Web Development Intern</h3>
                  <p className="timeline-place">Ventrix Technologys</p>
                  <p>
                    Currently gaining experience in web development.
                    Specific responsibilities and deliverables can be added
                    when confirmed.
                  </p>
                </div>
              </article>
            </div>

            <p className="timeline-footnote">
              Completed internship details can be added when you share the
              company, role, and work summary.
            </p>
          </div>
        </section>

        <section
          className="section-container section-block reveal"
          id="certificates"
        >
          <div className="section-aside">
            <p className="section-label">05 / MILESTONES</p>
            <span className="aside-line" />
          </div>

          <div className="section-main">
            <h2>Certificates & achievements.</h2>

            <div className="certificates-grid">
              {certificates.map((certificate) => (
                <article
                  className="certificate-card"
                  key={certificate.name}
                >
                  <Award size={21} />
                  <small>{certificate.date}</small>
                  <h3>{certificate.name}</h3>
                  <p>{certificate.issuer}</p>

                  {certificate.url ? (
                    <a
                      href={certificate.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View certificate <ArrowUpRight size={13} />
                    </a>
                  ) : (
                    <span className="verification-note">
                      Certificate link not added
                    </span>
                  )}
                </article>
              ))}
            </div>

            <h3 className="subsection-title">Hackathon participation</h3>

            <div className="activities-grid">
              {activities.map((activity) => (
                <article className="activity-card" key={activity.name}>
                  <Sparkles size={19} />
                  <div>
                    <h4>{activity.name}</h4>
                    <p>{activity.date}</p>
                  </div>
                  <CheckCircle2
                    className="activity-check"
                    size={16}
                  />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section-container section-block reveal"
          id="resume"
        >
          <div className="section-aside">
            <p className="section-label">06 / MY CV</p>
            <span className="aside-line" />
          </div>

          <div className="section-main resume-panel">
            <div>
              <h2>A little more detail?</h2>
              <p className="section-description">
                Download my resume to review my education, skills, and
                projects.
              </p>
            </div>

            <div className="resume-actions">
              <a
                className="button button-primary"
                href={`${API_BASE}/api/cv/pdf`}
              >
                <ArrowDownToLine size={16} /> Download PDF CV
              </a>

              <a
                className="button button-secondary"
                href={`${API_BASE}/api/cv/docx`}
              >
                <ArrowDownToLine size={16} /> Download Word CV
              </a>
            </div>

            <p className="small-note">
              The PDF and Word files must be placed in the Express server's
              files folder.
            </p>
          </div>
        </section>

        <section
          className="section-container section-block contact-block reveal"
          id="contact"
        >
          <div className="section-aside">
            <p className="section-label">07 / GET IN TOUCH</p>
            <span className="aside-line" />
          </div>

          <div className="section-main contact-layout">
            <div className="contact-copy">
              <h2>
                Let's build something{" "}
                <span className="gradient-text">meaningful.</span>
              </h2>

              <p className="section-description">
                Have an opportunity, idea, or project in mind? Send me a
                message.
              </p>

              <div className="contact-details">
                <a href="mailto:jahnavichowdary180@gmail.com">
                  <Mail size={17} /> jahnavichowdary180@gmail.com
                </a>

                <a
                  href="https://www.linkedin.com/in/jahnavi-chowdary-21708034a"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin size={17} /> LinkedIn <ArrowUpRight size={13} />
                </a>

                <a
                  href="https://github.com/jahnavichowdary15"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={17} /> GitHub <ArrowUpRight size={13} />
                </a>
              </div>
            </div>

            <form className="contact-form" onSubmit={submitContact}>
              <label>
                Name
                <input
                  name="name"
                  value={form.name}
                  onChange={updateForm}
                  required
                  minLength={2}
                  maxLength={100}
                  placeholder="Your name"
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={updateForm}
                  required
                  maxLength={254}
                  placeholder="you@example.com"
                />
              </label>

              <label>
                Message
                <textarea
                  name="message"
                  value={form.message}
                  onChange={updateForm}
                  required
                  minLength={10}
                  maxLength={5000}
                  rows={5}
                  placeholder="Tell me a little about your message..."
                />
              </label>

              <button
                className="button button-primary submit-button"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Sending..." : "Send Message"}{" "}
                <Send size={15} />
              </button>

              {formStatus.message && (
                <p
                  className={`form-status ${formStatus.type}`}
                  role="status"
                >
                  {formStatus.message}
                </p>
              )}

              <p className="form-privacy">
                Your message is sent to the portfolio API and stored in its
                database.
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="logo footer-logo" href="#home">
          J<span>.</span>
        </a>
        <p>Designed & built by Doddapuneni Jahanavi.</p>
        <a href="#home">Back to top ↑</a>
      </footer>
    </div>
  );
}

export default App;