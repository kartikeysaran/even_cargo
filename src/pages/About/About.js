import React, { useState, useEffect } from 'react';
import './About.css'
import { FaArrowRight } from "react-icons/fa";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import labiba from '../../assets/team/labiba.jpg'
import priyanka from '../../assets/team/priyanka.jpg'
import yogesh from '../../assets/team/yogesh.png'
import shivani from '../../assets/team/shivani.jpg'
import srishti from '../../assets/team/srishti.jpg'
import mubeena from '../../assets/team/mubeena.jpg'
import prerna from '../../assets/team/prerna.jpg'
import shailja from '../../assets/team/shailja.jpg'
import diksha from '../../assets/team/diksha.jpg'
import somya from '../../assets/team/somya.jpg'
import rijul from '../../assets/team/rijul.jpg'

import satyajit from '../../assets/mentors/satyajit.png'
import karen from '../../assets/mentors/karen.png'
import sudarshan from '../../assets/mentors/sudarshan.png'
import Important1 from '../../assets/important-1.jpeg';
import Important2 from '../../assets/important-2.png';
import Important3 from '../../assets/important-3.png' ;
import { FaArrowCircleRight, FaArrowCircleLeft} from "react-icons/fa";

import { getRemoteConfig, fetchAndActivate, getValue } from 'firebase/remote-config';
import { app } from '../../firebase/config'; // Adjust path to your firebase config

const About = () => {
  // Fallback data - current hardcoded data
  const fallbackTeamData = {
    "Our Team": {
      members: [
        {
          id: "1",
          name: 'Priyanka Yadav',
          img: priyanka,
          role: 'Operations Lead',
          description: 'With over seven years of experience, Priyanka leads operations at Even Cargo, overseeing efficient logistics and ensuring smooth processes across the organization. In her free time, she enjoys spending quality time with her two daughters, embracing family moments outside of her professional life.',
          about: 'With over seven years of experience, Priyanka leads operations at Even Cargo, overseeing efficient logistics and ensuring smooth processes across the organization...'
        },
        {
          id: "2",
          name: 'Prerna Kaushik',
          img: prerna,
          role: 'HR Manager',
          description: 'A Management Post Graduate with over two years of expertise in HR operations, Prerna brings her adeptness in enhancing employee experiences, streamlining HR processes, and overseeing payroll administration to Even Cargo. Passionate about learning from the defense forces, she also enjoys exploring new destinations, indulging in music, and discovering new cultures through travel.',
          about: 'A Management Post Graduate with over two years of expertise in HR operations, Prerna brings her adeptness in enhancing employee experiences, streamlining HR...'
        },
        {
          id: "3",
          name: 'Yogesh Kumar',
          img: yogesh,
          role: 'Founder & Director',
          description: 'Director - Strategy and Operations',
          about: 'Director - Strategy and Operations'
        },
        {
          id: "4",
          name: 'Shailja Joshi',
          img: shailja,
          role: '',
          description: 'Shailja is part of the partnership and communications team at Even Cargo. A Business and Entrepreneurship graduate from TU Dublin, she brings over four years of experience working in partnership development and marketing roles. Passionate about travel, she enjoys exploring India\'s rich diversity and has a keen interest in regional folktales and mythology, blending her love for storytelling with her professional journey.',
          about: 'Shailja is part of the partnership and communications team at Even Cargo. A Business and Entrepreneurship graduate from TU Dublin, she brings over four year...'
        },
        {
          id: "5",
          name: 'Diksha Bhardwaj',
          img: diksha,
          role: '',
          description: 'A graduate of the Tata Institute of Social Sciences (TISS), Diksha brings four years of experience in the social impact sector, specializing in community engagement and partnership development. Her experience and expertise contribute to driving meaningful change at Even Cargo. Beyond her professional work, Diksha is deeply passionate about animal welfare, enjoys immersing herself in music, and loves to explore new destinations through travel.',
          about: 'A graduate of the Tata Institute of Social Sciences (TISS), Diksha brings four years of experience in the social impact sector, specializing in community ...'
        },
        {
          id: "6",
          name: 'Somya Jain',
          img: somya,
          role: '',
          description: 'A recent commerce graduate with a strong passion for finance, Somya is eager to apply her financial expertise to further the mission of Even Cargo in promoting gender equity. Her dedication to using her skills for a greater cause reflects her commitment to driving positive change through her work',
          about: 'A recent commerce graduate with a strong passion for finance, Somya is eager to apply her financial expertise to further the mission of Even Cargo...'
        },
        {
          id: "7",
          name: 'Rijul Dharnia',
          img: rijul,
          role: '',
          description: '',
          about: 'Operations Team'
        }
      ]
    },
    // "Our Consultants": {
    //   members: [
    //     {
    //       id: "8",
    //       name: "John Doe",
    //       role: "Business Consultant",
    //       description: "Expert in business strategy and growth planning with 15+ years of experience.",
    //       imageUrl: "https://firebasestorage.googleapis.com/v0/b/your-project.appspot.com/o/team-members%2Fjohn.jpg?alt=media&token=..."
    //     }
    //   ]
    // },
    "Our Advisors": {
      members: [
        {
          id: "9",
          name: 'Sudarshan Rodriguez',
          img: sudarshan,
          role: 'Strategic Advisor',
          about: "Sudarshan Rodriguez has been working with the Tata Institute of Social Sciences in the Director's office handling incubation, innovative and multi-disciplinary projects such as...",
          description: "Sudarshan Rodriguez has been working with the Tata Institute of Social Sciences in the Director's office handling incubation, innovative and multi-disciplinary projects such as the TISS-LAHDC Ladakh Project, the Socio and Ecological Stewardship Programme, TISS Andaman Nicobar Initiative, National Water Mission -TISS Projects since 2010. As part of the TISS Fellowship Programme, where he coaches and mentors young development professionals on leadership development, systems and project management. Sudarshan started his career in 1998 with UNDP-India, New Delhi as a Programme Development Specialist on their Environment & GEF Programme."
        },
        {
          id: "10",
          name: 'Satyajit Majumdar',
          img: satyajit,
          role: 'Academic Advisor',
          about: "Prof. Satyajit Majumdar is the chairperson of the centre for social entrepreneurship, Tata Institue of Social Sciences, Mumbai...",
          description: "Prof. Satyajit Majumdar is the chairperson of the centre for social entrepreneurship, Tata Institue of Social Sciences, Mumbai.He has worked at maintenance and project engineer with Coal India Limited for about 12 years and then joined the Quality Mission Project of Indian Statistical Institute. Later he took up teaching since 1998 to became Professor at the Center for Social Entrepreneurship of Tata Institute of Social Science, Mumbai (India). He also engaged in consulting and research. His research interest area is growth strategy in entrepreneur managed small organisations."
        },
        {
          id: "11",
          name: 'Karen Tay',
          img: karen,
          role: 'Marketing Advisor',
          about: "Karen is currently the Marketing Director of Classic Fine Foods. She was previously managing marketing and business development for...",
          description: "Karen is currently the Marketing Director of Classic Fine Foods. She was previously managing marketing and business development for METRO CASH & CARRY Asia region, of which the Indian market is a part of. Her other experiences include management consulting with BAIN & Company Southeast Asia and P&L responsibilities of the Pacific region for a German confectionery company. She currently resides in her native Singapore but has lived in the US, UK, Germany, China and Hong Kong. Karen is passionate about women and children issues."
        }
      ]
    }
  };

  // State for team data from Firebase
  const [teamData, setTeamData] = useState(fallbackTeamData);
  const [loading, setLoading] = useState(true);

  const our_story_text = [
    "The seed of what Even Cargo is today started with many questions - what is women empowerment when the reality is starkly the opposite? Why are women still unable to access spaces and opportunities that are rightfully theirs? Is there a way to strengthen the possibilities of change by becoming a better ally? The story of Even Cargo is a story of overcoming hurdles at every junction. With the idea of bringing visible change, the team of volunteer individuals set out to different resource-poor communities across the city of Delhi in search of potential women delivery associates. The proposition was simple - get the opportunity to be trained and join a workforce that can assure the dignity of work and a assured income. The problems, however, were much more complicated...",
    "The seed of what Even Cargo is today started with many questions - what is women empowerment when the reality is starkly the opposite? Why are women still unable to access spaces and opportunities that are rightfully theirs? Is there a way to strengthen the possibilities of change by becoming a better ally? The story of Even Cargo is a story of overcoming hurdles at every junction. With the idea of bringing visible change, the team of volunteer individuals set out to different resource-poor communities across the city of Delhi in search of potential women delivery associates. The proposition was simple - get the opportunity to be trained and join a workforce that can assure the dignity of work and a assured income. The problems, however, were much more complicated. Women cannot become delivery partners! They won't be able to sustain in this industry as it is physically demanding. Our many stakeholders, from women and their family members and the logistics industry, had notions rooted in the patriarchal set-up of what women should and should not do. The visibility of women in the logistics space was zero, owing to the idea that this kind of work is not meant for women. These statements only made the team more determined to break that notion. And in 2016, with a small number of delivery associates, the process of change began. We saw changes in the confidence of our delivery associates, but also in the mindset of our logistics partners, who became willing to bring inclusivity to their systems. The last seven years have taught us important lessons of leadership, of solidarity and of the power of allyship. We started with a what if women became delivery associates? and we want to reach a stage where this is not even a question anymore. The smile on the face of our associates is why we do what we do! And we will not stop until we fulfill our vision of gender equity. -Team Even Cargo"
  ];

  const slides = [
    { image: Important2 },
    { image: Important3 },
    { image: Important1 },
  ];

  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const [selectedMember, setSelectedMember] = useState(null);

  const handleImageClick = (member) => {
    setSelectedMember(member);
  };

  const handleClosePopup = () => {
    setSelectedMember(null);
  };

  const journeyData = [
    {
      date: '2016',
      event: 'Company Founded by Yogesh',
      description: 'After several attempts at starting enterprises, focusing on breaking patriarchal notions surrounding roles in work.',
    },
    {
      date: '2016',
      event: 'Formation of the First Team',
      description: 'Young ladies Richa Sahijani and Jainy Sethia began laying the foundation of the company through intensive mobilization and identification processes.',
    },
    {
      date: 'Next 7 Years',
      event: 'Partnerships and Recognition',
      description: 'Media coverage and recognition set the path to partnerships with different stakeholders - from e-commerce and logistics companies to CSRs and investors.',
    },
    {
      date: 'Next 7 Years',
      event: 'Breaking Barriers',
      description: 'Even Cargo broke the barriers of discrimination by training more than 500 women and providing employment to more than 100 women as delivery partners across 7 cities in India.',
    },
  ];

  // Firebase Remote Config setup
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setLoading(true);
        const remoteConfig = getRemoteConfig(app);
        
        // Set cache expiration and other config
        remoteConfig.settings.minimumFetchIntervalMillis = 3600000; // 1 hour
        
        // Set default values (fallback)
        remoteConfig.defaultConfig = {
          about_us: JSON.stringify({ teamSections: fallbackTeamData })
        };
        
        // Fetch and activate
        await fetchAndActivate(remoteConfig);
        
        // Get the about_us config
        const aboutUsConfig = getValue(remoteConfig, 'about_us');
        const configData = JSON.parse(aboutUsConfig.asString());
        
        // Update state with Firebase data
        if (configData.teamSections && Object.keys(configData.teamSections).length > 0) {
          setTeamData(configData.teamSections);
        }
        
      } catch (error) {
        console.error('Error fetching team data from Firebase:', error);
        // Keep fallback data - no need to do anything as teamData is already initialized with fallback
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  const [showMoreAboutMentor, setShowMoreAboutMentor] = useState({});
  const [showMoreAboutTeam, setShowMoreAboutTeam] = useState({});

  const handleToggleAboutMentor = (index) => {
    setShowMoreAboutMentor((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleToggleAboutTeam = (index) => {
    setShowMoreAboutTeam((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const [showReadMore, setShowReadMore] = useState(true);
  const [storyText, setStoryText] = useState(our_story_text[0]);

  const handleReadMore = () => {
    setStoryText(our_story_text[1]);
    setShowReadMore(false);
  };

  // Helper function to render team sections dynamically
  const renderTeamSection = (sectionTitle, members) => {
    if (!members || members.length === 0) return null;

    // Split members into rows of 4
    const createRows = (members, itemsPerRow = 4) => {
      const rows = [];
      for (let i = 0; i < members.length; i += itemsPerRow) {
        rows.push(members.slice(i, i + itemsPerRow));
      }
      return rows;
    };

    const memberRows = createRows(members);

    return (
      <div key={sectionTitle}>
        <div className='spacer'/>
        <h2>{sectionTitle}</h2>
        {memberRows.map((row, rowIndex) => (
          <div key={rowIndex} className="team-container">
            {row.map((member, index) => (
              <div key={member.id || index} className="team-member-card" onClick={() => handleImageClick(member)}>
                <img 
                  src={member.imageUrl || member.img} 
                  alt={member.name} 
                  className="team-member-image" 
                />
                <h4 className="team-member-name">{member.name}</h4>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // if (loading) {
  //   return (
  //     <div className='about-container'>
  //       <h1>Loading...</h1>
  //     </div>
  //   );
  // }

  return (
    <div className='about-container'>
      <h1>Pitfalls of the status quo</h1>
      <div className='home-why-is-it-important-container__container-image'>
          <FaArrowCircleLeft onClick={prevSlide} style={{cursor:'pointer'}}/>
          {slides.map((slide, index) => {
            return (
              <div
                className={index === current ? 'slide active' : 'slide'}
                key={index}
              >
                {index === current && (
                  <img src={slide.image} alt='travelimg' className='home-why-is-it-important-container_image' />
                )}
              </div>
            );
          })}
          <FaArrowCircleRight onClick={nextSlide} style={{cursor:'pointer'}}/>
        </div>
        <div className='spacer'/>
      <div className='about-container-our-story'>
      <svg xmlns="http://www.w3.org/2000/svg" width="1043" height="653" viewBox="0 0 1043 653" fill="none" className='about-container-pink-clouds'>
        <path d="M277.678 523.016C81.2145 386.838 -86.4457 221.232 49.8841 64.8471C186.214 -91.5377 777.269 68.9975 973.733 205.175C1170.2 341.353 897.671 401.606 761.341 557.991C625.011 714.376 474.141 659.194 277.678 523.016Z" fill="#FFF4F2"/>
      </svg>
        <h2>Our Story</h2>
        <h5>{storyText}</h5>
        {showReadMore && <button onClick={handleReadMore}>Read More <FaArrowRight /></button>}
      </div>
      
      <svg xmlns="http://www.w3.org/2000/svg" width="534" height="414" viewBox="0 0 534 414" fill="none" className='about-container-pink-clouds2'>
        <path d="M175.269 37.2435C313.971 -5.45531 463.283 -28.525 524.209 69.0108C585.136 166.547 323.946 362.443 185.244 405.142C46.5415 447.841 82.851 321.173 21.9244 223.637C-39.0022 126.101 36.5669 79.9423 175.269 37.2435Z" fill="#FFF4F2"/>
      </svg>
      
      {/* Render all team sections dynamically */}
      {Object.entries(teamData).map(([sectionTitle, section]) => 
        renderTeamSection(sectionTitle, section.members)
      )}

      {/* Popup for team member details */}
      {selectedMember && (
        <div className='popup-about'>
          <div className='popup-about-inner'>
            <div className='popup-about-header'>
              <img 
                src={selectedMember.imageUrl || selectedMember.img} 
                alt={selectedMember.name} 
                className='popup-about-image' 
              />
              <div className='popup-about-title'>
                <h4>{selectedMember.name}</h4>
                <h6 className='popup-about-role'>{selectedMember.role || selectedMember.position}</h6>
              </div>
            </div>
            <button className='close-btn' onClick={handleClosePopup}>x</button>
            <p>{selectedMember.description || selectedMember.about_more}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;