import React from 'react';
import './CaseFileInfo.css';


interface DetectiveProfile {
  fullName: string;
  alias: string;
  mugshot: string;
  caseSummary: string;
  knownCapabilities: string[];
  weaponsOfChoice: string[];
  training: string;
  lastMission: string;
  contactEmail: string;
  psychologicalProfile: string[];
}


const profile: DetectiveProfile = {
    fullName: 'Liza Halykina',
    alias: 'The Pixel Whisperer',
    mugshot: '/assets/TaskPicture.png',
    caseSummary: 'A skilled software engineer with a background in multimedia design and front-end development.',
    knownCapabilities: ['JavaScript, TypeScript, React', 'HTML, CSS', 'UX/UI', 'Python', 'AWS Services', 'API Integration', 'Backend Development'],
    weaponsOfChoice: ['Git', 'Figma', 'Adobe Creative Suite', 'VS Code', 'React DevTools', 'AWS Console', 'Postman'],
    psychologicalProfile: ['Quick Learner', 'Creative Problem Solver', 'Proactive & Committed', 'Calm Under Pressure', 'Self-Directed'],
    training: ` University of Reading — Art & Film
                Learned to dissect visuals and decode narratives.

                Solo Ops — Frontend Development
                Self-taught HTML, CSS, and JavaScript.

                Online Studies — React, TypeScript, Python & more
                Completed multiple courses in modern web technologies.`,
    lastMission: `Role: Frontend Systems Operative
        Status: Mission Completed
        Objective: Design and deploy precision-engineered frontend interfaces for internal tools and data-intensive dashboards
        Key Actions: Served as liaison between Engineering, Chemistry, and Marketing units to maintain mission alignment. Converted multiple Python applications into secure APIs, built corresponding frontends, and integrated them into a centralised, company-wide dashboard system; acquired Python and AWS proficiency under live mission conditions.
        Outcome: Mission completed with full system stabilisation, unified tooling infrastructure, and uninterrupted operational continuity.`,
    contactEmail: process.env.REACT_APP_CONTACT_EMAIL || '',
};


interface CaseFileInfoProps {
  page?: 1 | 2;
}

const CaseFileInfo: React.FC<CaseFileInfoProps> = ({ page = 1 }) => {
  const formatTrainingContent = (training: string) => {
    const experiences = training.split(/\n\s*\n/).filter(exp => exp.trim());
    
    return experiences.map((experience, index) => {
      const lines = experience.split('\n').map(line => line.trim()).filter(line => line);
      const firstLine = lines[0];
      const restOfContent = lines.slice(1).join('\n');
      
      return (
        <div key={index} className="training-entry">
          <div className="training-title">{firstLine}</div>
          {restOfContent && (
            <div className="training-description">{restOfContent}</div>
          )}
        </div>
      );
    });
  };

  const formatMissionContent = (mission: string) => {
    const lines = mission.split('\n').map(line => line.trim()).filter(line => line);
    const formatted: JSX.Element[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Title line (contains "—")
      if (line.includes('—')) {
        formatted.push(
          <div key={i} style={{ marginBottom: '10px', fontWeight: 'bold', fontSize: '13px' }}>
            {line}
          </div>
        );
      }
      else if (line === 'Objective:' || line === 'Key Actions:' || line === 'Outcome:') {
        formatted.push(
          <div key={i} style={{ marginTop: '10px', marginBottom: '5px', fontWeight: 'bold' }}>
            {line}
          </div>
        );
      }
      else if (line.includes(':') && !line.startsWith('•')) {
        const [label, value] = line.split(':').map(s => s.trim());
        if (value) {
          formatted.push(
            <div key={i} style={{ marginBottom: '5px' }}>
              <strong>{label}:</strong> {value}
            </div>
          );
        }
      }
      // Bullet points
      else if (line.startsWith('•')) {
        formatted.push(
          <div key={i} style={{ marginBottom: '5px', paddingLeft: '1rem' }}>
            {line}
          </div>
        );
      }
      // Regular text
      else if (line) {
        formatted.push(
          <div key={i} style={{ marginBottom: '5px' }}>
            {line}
          </div>
        );
      }
    }
    
    return formatted;
  };

   return (
    <div className="case-file">
      {page === 1 ? (
        <>
          <div className="case-main">
              <div className="case-heading">
                  <h2>{profile.fullName}</h2>
                  <h4>Alias: {profile.alias}</h4>
              </div>

              <div className='case-summary-and-pic'>
                  <img src={profile.mugshot} alt={`${profile.fullName} Mugshot`} className="mugshot" />
              <div className="case-summary">
                  <h4>Case Summary</h4>
                  <p>{profile.caseSummary}</p>
              </div>
              </div>
          </div>
          
          <div className="profile-info">
              <div className="known-capabilities">
                  <h4>Known Capabilities</h4>
                  <ul>
                      {profile.knownCapabilities.map((skill, index) => (
                          <li key={index}>{skill}</li>
                      ))}
                  </ul>
              </div>
              <div className="weapons-of-choice">
                  <h4>Weapons <br /> of Choice</h4>
                  <ul>
                      {profile.weaponsOfChoice.map((weapon, index) => (
                          <li key={index}>{weapon}</li>
                      ))}
                  </ul>
              </div>
              <div className="psychological-profile">
                  <h4>Psychological Profile</h4>
                  <ul>
                      {profile.psychologicalProfile.map((trait, index) => (
                          <li key={index}>{trait}</li>
                      ))}
                  </ul>
              </div>
          </div>

          <div className="contact-channels">
            <h4>Contact Channels</h4>
            <p>
              <a 
                href={`mailto:${profile.contactEmail}?subject=Portfolio Game Enquiry`}
                style={{ 
                  color: 'inherit', 
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
              >
                Click here to contact by email
              </a>
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="last-mission">
            <h4>Last Mission - Zero Petroleum</h4>
            <div className="last-mission-content">
              {formatMissionContent(profile.lastMission)}
            </div>
          </div>

          <div className="training">
            <h4>Agent Training</h4>
            <div className="training-content">
              {formatTrainingContent(profile.training)}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CaseFileInfo;