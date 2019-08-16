export const demoText = [
  `#+TITLE: Demo 1

* John Smith :div_heading:name:
** john.smith@gmail.com :email:
* EDUCATION :div_section:
** University of Alaska
- Bachelor of Science in History, Minor in Computer Science
- GPA: 3.9
  
** Previous: Hawaii Community College
* PROFESSIONAL EXPERIENCE :div_section:
** Sales Manager :div_job:
*** May 2011-May 2018 :date:
ABC SUPERSTORE
- Won “Service Excellence Award” for instrumental role in driving record-high sales increases, propelling store to improve ranking from #12 in territory to #5 by 2016.
- Reduced staff turnover by 15% in 2016, benchmarking a record-setting improvement in staff retention due to the success of employee-development and incentive programs.
- Elevated store’s guest-satisfaction index from 86% to 92% within two years; ensured the swift resolution of customer issues to preserve customer loyalty while complying with company policies. 
- Served on taskforce charged with turning around under-performing stores. Trained CSRs and managers in five struggling stores, and contributed to significant improvements in guest satisfaction and sales 
** Deli Manager :div_job:
*** June 1998-July 2010 :date:
PREMIUM 
- Transformed operation that was posting annual losses to achieve $159K+ in profits within one year. Exceeded sales targets despite increased competition presented by the opening of two new local delis. 
- Introduced training programs that enhanced employee performance and morale. 
- Compiled a variety of reports about the operations of the deli in order to track growth and target weak areas of the business.
- Grew professionally and learned as much as possible through frequent meetings, coffee hours, and lunches with leaders in the deli industry.
** Camp Director :div_job:
*** August 1996-June 1998 :date:
SuperFun Camps
- Managed all counselors to ensure camp standards were consistently met and kids had the best experience possible
- Reviewed performance of counselors via 1-on-1 meetings and coached them on the spot to build their abilities as counselors, and improve the experience of their campers
- Improved the camp experience through frequent meetings with the rest of the leadership team where we planned ways to better the camp experience for staff, kids, and parents
** Media Department Assistant :div_job:
*** November 1995-August 1996 :date:
 Hawai'i Community College
- Taught myself Adobe Photoshop and the college’s new broadcast software in order to create high-quality graphics for athletic broadcasts and other college events
- Operated broadcast equipment during games to continually display and update graphics in order to create a professional viewing experience
* VOLUNTEER WORK :div_section:
** Big Charity
- Supervised the donation center to ensure we processed donations in the most efficient manner.
- Coordinated with full-time staff to facilitate a smooth volunteer process for all volunteers.
  
* SKILLS/COURSEWORK :div_section:
| Skills                          | Relevant Coursework                |
|---------------------------------+------------------------------------|
| Skill 1, Skill 2, Skill3,       | BUS 101 - Introduction to Business |
| Skill 4, Skill 5, Skill 6       | HIS 208 - Lunar History            |`,

  `#+TITLE: Demo 2

* John Smith :div_heading:name:
** john.smith@gmail.com :email:
* EDUCATION :div_section:
** University of Alaska
- Bachelor of Science in History, Minor in Computer Science
- GPA: 3.9
  
** Previous: Hawaii Community College
* PROFESSIONAL EXPERIENCE :div_section:
** Sales Manager :div_job:
*** May 2011-May 2018 :date:
ABC SUPERSTORE
- Won “Service Excellence Award” for instrumental role in driving record-high sales increases, propelling store to improve ranking from #12 in territory to #5 by 2016.
- Reduced staff turnover by 15% in 2016, benchmarking a record-setting improvement in staff retention due to the success of employee-development and incentive programs.
- Elevated store’s guest-satisfaction index from 86% to 92% within two years; ensured the swift resolution of customer issues to preserve customer loyalty while complying with company policies. 
- Served on taskforce charged with turning around under-performing stores. Trained CSRs and managers in five struggling stores, and contributed to significant improvements in guest satisfaction and sales 
** Deli Manager :div_job:
*** June 1998-July 2010 :date:
PREMIUM 
- Transformed operation that was posting annual losses to achieve $159K+ in profits within one year. Exceeded sales targets despite increased competition presented by the opening of two new local delis. 
- Introduced training programs that enhanced employee performance and morale. 
- Compiled a variety of reports about the operations of the deli in order to track growth and target weak areas of the business.
- Grew professionally and learned as much as possible through frequent meetings, coffee hours, and lunches with leaders in the deli industry.
** Camp Director :div_job:
*** August 1996-June 1998 :date:
SuperFun Camps
- Managed all counselors to ensure camp standards were consistently met and kids had the best experience possible
- Reviewed performance of counselors via 1-on-1 meetings and coached them on the spot to build their abilities as counselors, and improve the experience of their campers
- Improved the camp experience through frequent meetings with the rest of the leadership team where we planned ways to better the camp experience for staff, kids, and parents
** Media Department Assistant :div_job:
*** November 1995-August 1996 :date:
 Hawai'i Community College
- Taught myself Adobe Photoshop and the college’s new broadcast software in order to create high-quality graphics for athletic broadcasts and other college events
- Operated broadcast equipment during games to continually display and update graphics in order to create a professional viewing experience
* VOLUNTEER WORK :div_section:
** Big Charity
- Supervised the donation center to ensure we processed donations in the most efficient manner.
- Coordinated with full-time staff to facilitate a smooth volunteer process for all volunteers.
  
* SKILLS/COURSEWORK :div_section:
| Skills                          | Relevant Coursework                |
|---------------------------------+------------------------------------|
| Skill 1, Skill 2, Skill3,       | BUS 101 - Introduction to Business |
| Skill 4, Skill 5, Skill 6       | HIS 208 - Lunar History            |`
];

export const demoCSS = [
  `@import url('https://fonts.googleapis.com/css?family=Merriweather&display=swap');

#resume {
  font-family: 'Merriweather', serif;
  padding: 10px 30px;
}

h1, h2, h3, p, ul {
  margin: unset;
}

h1 {
  font-size: 1.1rem;
}

h2 {
  font-size: 1rem;
}

.section {
  margin-top: .7rem;
  padding-left: 30px;
  font-size: .85rem;
}

.section h1 {
  width: calc(100% + 30px);
  position: relative;
  right: 30px;
  margin-bottom: .2rem;
  border-bottom: 1px solid rgba(0, 0, 0, .3);
}

.section h2 {
  padding: .2rem 0;
}

.name {
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, .3);
  margin: 10px 35% 0 35%;
  font-size: 1.5rem;
}

.email {
  text-align: center;
  margin: 0px;
  padding: 0px;
  font-weight: normal;
  font-size: .9rem;
}

.date {
  font-weight: normal;
  font-style: italic;
  margin: 0;
}

.job {
  display: grid;
  grid-template-columns: 1fr max-content;
}

.job > ul {
  grid-column: span 2;
}

th {
  border-bottom: 1px solid rgba(0, 0, 0, .3);
}

table {
  width: 100%;
  border-spacing: 50px 0px;
}`,
  ``
];
