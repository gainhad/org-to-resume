function toAST(text) {
  let orgParsed = [];

  // Form for these: { level: "...", childrenReference: "..."}
  let headingStack = [];
  const arr = text.split("\n");
  arr.forEach(element => {
    // Handle headings
    element = element.trim();
    const top = headingStack[headingStack.length - 1];
    if (element[0] === "*") {
      if (top && top.type) {
        headingStack.pop();
      }
      handleHeading(element, headingStack, orgParsed);
    } else if (element[0] === "|") {
      handleTable(element, headingStack, orgParsed);
    } else if (element[0] === "-") {
      handleList(element, headingStack, orgParsed);
    } else {
      if (top && top.type) {
        headingStack.pop();
      }
      const regex = /\S/; // Exlude empty/blank lines
      if (element.match(regex)) {
        handleText(element, headingStack, orgParsed);
      }
    }
  });
  return orgParsed;
}

function handleHeading(heading, headingStack, orgParsed) {
  let headingLevel = 1;
  while (heading[headingLevel] === "*") {
    ++headingLevel;
  }

  // Remove leading asterisks and whitespace
  heading = heading.replace(/\**\s*/, "");
  const tags = findTags(heading);
  // Remove tags if found and parsed
  if (tags.length) {
    heading = heading.replace(/:([^:]+)/g, "");
    heading = heading.replace(/:/g, "");
  }
  heading = heading.trim();
  let newHeading = {
    type: "Heading",
    level: headingLevel,
    content: heading,
    tags: tags,
    children: []
  };

  // Reset heading stack if we're at a top level heading
  // TODO: Clean this up
  if (headingLevel === 1) {
    // Setting the length of an array automatically clears elements greater than the length
    headingStack.length = 0;
  }
  if (headingStack.length === 0) {
    orgParsed.push(newHeading);
    headingStack.push({
      level: headingLevel,
      childrenReference: newHeading.children
    });
  } else {
    while (newHeading.level <= headingStack[headingStack.length - 1].level) {
      headingStack.pop();
    }
    if (headingStack.length === 0) {
      headingStack.push({
        level: headingLevel,
        childrenReference: newHeading.children
      });
    } else {
      headingStack[headingStack.length - 1].childrenReference.push(newHeading);
      headingStack.push({
        level: headingLevel,
        childrenReference: newHeading.children
      });
    }
  }
  return;
}

function handleText(text, headingStack, orgParsed) {
  let newText = {
    type: "Text",
    content: text,
    tags: []
  };
  headingStack[headingStack.length - 1].childrenReference.push(newText);
}

function handleTable(element, headingStack, orgParsed) {
  let top = headingStack[headingStack.length - 1];
  if (top.type !== "table") {
    top.childrenReference.push({
      type: "Table",
      content: [],
      tags: []
    });
    headingStack.push({
      type: "table",
      reference: top.childrenReference[top.childrenReference.length - 1].content
    });
  }
  top = headingStack[headingStack.length - 1];
  const table = top.reference;
  let newRow = element
    .split("|")
    .filter(e => e)
    .map(e => e.trim());
  // Exlude divider rows
  if (newRow[0].match(/[a-z]/gi)) {
    table.push(newRow);
  }
}

function handleList(item, headingStack, orgParsed) {
  let top = headingStack[headingStack.length - 1];
  if (top.type !== "list") {
    top.childrenReference.push({
      type: "list",
      content: [],
      tags: []
    });
    headingStack.push({
      type: "list",
      // Set content reference equal to the list that was just pushed
      contentReference:
        top.childrenReference[top.childrenReference.length - 1].content
    });
  }
  top = headingStack[headingStack.length - 1];
  // Remove the initial dashes
  item = item.replace(/-+/, "").trim();
  top.contentReference.push(item);
}

function findTags(element) {
  const regex = /:(\S+)/g;
  let tags = element.match(regex);
  // if tags exist, split into individual tags and filter out empties
  return tags ? tags[0].split(":").filter(e => e) : [];
}

const text = `* EDUCATION     :tag-1:tag2:
** University of Michigan :tag:tag6:
- Bachelor of Science in Economics, Minor in Computer Science
- GPA: 3.1
  
** Previous: Hillsdale College

* PROFESSIONAL EXPERIENCE
** Executive Office Staff Member
Office of Governor Rick Snyder
- Managed the review process of all event requests for the Governor to ensure his limited time was spent at  events that best furthered the administration’s agenda
- Participated as a project manager in an interagency state task force to improve worked based learning opportunities in Michigan classrooms
- Coordinated with outside organizations and state agencies to help facilitate the Governor’s event schedule
- Completed projects for the senior staff to assist in implementing the administration’s objectives such as compiling overviews of the status of all statewide initiatives or doing research on relevant organizations

** Executive Office Intern
Office of Governor Rick Snyder
- Communicated with organizations requesting the Governor’s time in order to clearly communicate decisions and connect them with people and resources to further fulfill their request
- Researched and wrote concise memos that clearly communicated relevant information in order to help prepare staff for meetings and events
- Compiled a variety of reports about the Governor’s daily schedule and foreign trips to give him detailed information on how he spends his time
- Grew professionally and learned as much as possible through frequent meetings, coffee hours, and lunches with senior staff in the office, as well as the Governor himself

** Area Director
SpringHill Camps
- Managed a team of 8 counselors to ensure camp standards were consistently met and kids had the best experience possible
- Reviewed performance of counselors biweekly via 1-on-1 meetings and coached them on the spot to build their abilities as counselors, and improve the experience of their campers
- Improved the camp experience through weekly meetings with the rest of the leadership team where we planned ways to better the camp experience for staff, kids, and parents

** Media Department Assistant
Hillsdale College
- Taught myself Adobe Photoshop and the college’s new broadcast software in order to create high-quality graphics for athletic broadcasts and other college events
- Operated broadcast equipment during games to continually display and update graphics in order to create a professional viewing experience

* SKILLS/COURSEWORK
| Skills                          | Relevant Coursework                       |
|---------------------------------+-------------------------------------------|
| C/C++, JavaScript (ES6), React, | EECS 281 - Data Structures and Algorithms |
| Node.js/Express, SQL, Git, Bash | EECS 485 - Web Systems                    |

* VOLUNTEER WORK
** YoungLife, Team Leader
- Supervised and managed a team of college leaders to run a youth program for middle school students
- Coordinated with full-time staff and parent committees to ensure smooth operation of the program`;

function toHTML(json) {
  let html = '<div id="resume">';
  json.forEach(node => {
    html = parseNode(node, html);
  });
  html += "</div>";
  return html;
}

function parseNode(node, html) {
  let tags = "";
  let divClasses = "";
  if (node.tags) {
    divClasses = node.tags
      .filter(tag => tag.includes("div_"))
      .join(" ")
      .replace("div_", "");
    tags = node.tags.filter(tag => !tag.includes("div_")).join(" ");
  }
  if (divClasses) {
    html += `<div class=${divClasses}>`;
  }
  if (node.type === "Heading") {
    const level = node.level;
    html += `<h${level}`;
    if (tags) {
      html += ` class="${tags}"`;
    }
    html += ">";
    html += `${node.content}</h${level}>`;
  } else if (node.type === "Table") {
    html += "<table";
    if (tags) {
      html += `class=${tags}`;
    }
    html += ">";
    node.content.forEach((row, index) => {
      html += "<tr>";
      if (index === 0) {
        row.forEach(elem => {
          html += `<th>${elem}</th>`;
        });
      } else {
        row.forEach(elem => {
          html += `<td>${elem}</td>`;
        });
      }
      html += "</tr>";
    });
    html += "</table>";
  } else if (node.type === "list") {
    html += "<ul";
    if (tags) {
      html += ` class=${tags}`;
    }
    html += ">";
    node.content.forEach(item => {
      html += `<li>${item}</li>`;
    });
    html += "</ul>";
  } else {
    html += `<p>${node.content}</p>`;
  }
  // Recursively walk through each child node
  if (node.children) {
    node.children.forEach(child => {
      html = parseNode(child, html);
    });
  }
  if (divClasses) {
    html += "</div>";
  }
  return html;
}

toHTML(toAST(text));

export { toAST, toHTML };

/* 
#+TITLE: Hadley Gaines
#+AUTHOR: Hadley.Gaines@gmail.com | (616) 889-0168 | 1704 Oxford Dr SE, Grand Rapids, MI
*/
