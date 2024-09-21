import React from 'react';
import './CaseFileInfo.css';


interface DetectiveProfile {
  fullName: string;
  alias: string;
  mugshot: string;
  caseSummary: string;
  knownCapabilities: string[];
  weaponsOfChoice: string[];
  training: string[];
  contactChannels: {
    email: string;
    phone: string;
  };
  psychologicalProfile: string[];
}


const profile: DetectiveProfile = {
    fullName: 'Liza Halykina',
    alias: 'The Pixel Whisperer',
    mugshot: '/assets/TaskPicture.png',
    caseSummary: 'A skilled software engineer with a background in multimedia design and front-end development.',
    knownCapabilities: ['JavaScript', 'TypeScript', 'React', 'HTML', 'CSS', 'UX/UI'],
    weaponsOfChoice: ['Git', 'Figma', 'Adobe Creative Suite', 'VS Code'],
    psychologicalProfile: ['Quick Learner', 'Creative Problem Solver', 'Proactive & Committed'],
    training: ['University of Reading: BA in Art & Film', 'Solo Training: Frontend Development'],
    contactChannels: {
        email: 'halykina.liza@gmail.com',
        phone: '+447922532346',
    },
};


const CaseFileInfo: React.FC = () => {
   return (
    <div className="case-file">
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
                <h4>Weapons of Choice</h4>
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

      <div className="training">
        <h4>Training</h4>
        <ul>
          {profile.training.map((course, index) => (
            <li key={index}>{course}</li>
          ))}
        </ul>
      </div>

      <div className="contact-channels">
        <h4>Contact Channels</h4>
        <p>Email: {profile.contactChannels.email}</p>
        <p>Phone: {profile.contactChannels.phone}</p>
      </div>
    </div>
  );
};

export default CaseFileInfo;