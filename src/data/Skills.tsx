import {
  amber,
  blue,
  blueGrey,
  brown,
  cyan,
  deepOrange,
  deepPurple,
  green,
  grey,
  indigo,
  lightBlue,
  lightGreen,
  lime,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow
} from '@mui/material/colors';
import kebabcase from 'lodash.kebabcase';

const getColorCode = (colorObj: any, index: number) => {
  const key: string = Object
  .keys(colorObj)
  .reverse()
  .find((key, i) => i === index) as string;
  return colorObj[key];
}

export const skills = [
  ...[
    [ "JavaScript", 10 ],
    [ "HTML", 10 ],
    [ "CSS", 10 ],
    [ "Node.js", 10 ],
    [ "TypeScript", 10 ],
    [ "PHP", 10 ],
  ].map(([ label, value ], index: number) => ({
    groupName: "Coding Languages",
    label,
    value,
    color: getColorCode(amber, index)
  })),
  ...[
    [ "Bash", 10 ],
    [ "sh", 10 ],
  ].map(([ label, value ], index: number) => ({
    groupName: "Shell Languages",
    label,
    value,
    color: getColorCode(blue, index)
  })),
  ...[
    [ "Japanese", 30 ],
    [ "English", 10 ],
    [ "Estonian", 1 ],
  ].map(([ label, value ], index: number) => ({
    groupName: "Human Languages",
    label,
    value,
    color: getColorCode(pink, index)
  })),
  ...[
    [ "Windows", 30 ],
    [ "Ubuntu", 10 ],
    [ "MacOS", 1 ],
  ].map(([ label, value ], index: number) => ({
    groupName: "Oparationg systems",
    label,
    value,
    color: getColorCode(orange, index)
  })),
  ...[
    [ "AWS", 30 ],
    [ "Azure", 10 ],
    [ "GCP", 1 ],
  ].map(([ label, value ], index: number) => ({
    groupName: "Cloud platforms",
    label,
    value,
    color: getColorCode(cyan, index)
  })),
  ...[
    [ "React.js", 5 ],
    [ "Vue.js", 5 ],
    [ "Express", 4 ],
    [ "CakePHP", 3 ],
    [ "Zend Framework", 2 ],
    [ "AngularJS", 1 ],
    [ "FuelPHP", 1 ],
  ].map(([ label, value ], index: number) => ({
    groupName: "Frameworks",
    label,
    value,
    color: getColorCode(deepOrange, index)
  })),
  ...[
    [ "MUI", 30 ],
    [ "Vuetify", 10 ],
    [ "Bootstrap", 1 ],
  ].map(([ label, value ], index: number) => ({
    groupName: "UI libraries",
    label,
    value,
    color: getColorCode(deepPurple, index)
  })),
  ...[
    [ "jQuery", 5 ],
    [ "Vuex", 3 ],
  ].map(([ label, value ], index: number) => ({
    groupName: "Libraries",
    label,
    value,
    color: getColorCode(green, index)
  })),
  ...[
    [ "MySQL", 30 ],
    [ "PostgreSQL", 30 ],
    [ "SQLServer", 30 ],
    [ "Memcached", 30 ],
    [ "Redis", 30 ],
  ].map(([ label, value ], index: number) => ({
    groupName: "Databases",
    label,
    value,
    color: getColorCode(lime, index)
  })),
  ...[
    [ "Git", 8 ],
    [ "npm", 5 ],
    [ "yarn", 5 ],
    [ "Docker", 5 ],
    [ "Subversion", 1 ],
  ].map(([ label, value ], index: number) => ({
    groupName: "Tools",
    label,
    value,
    color: getColorCode(indigo, index)
  })),
  ...[
    [ "Vim", 5 ],
    [ "Aptana Studio", 2 ],
    [ "Eclipse", 1 ],
    [ "Atom", 1 ],
    [ "VSCode", 0 ],
    [ "IntelliJ IDEA", 0 ],
  ].map(([ label, value ], index: number) => ({
    groupName: "Editors",
    label,
    value,
    color: getColorCode(lightBlue, index)
  })),
  ...[
    [ "Apache", 10 ],
    [ "Postfix", 10 ],
    [ "BIND9", 10 ],
    [ "Nginx", 1 ],
  ].map(([ label, value ], index: number) => ({
    groupName: "Middlewares",
    label,
    value,
    color: getColorCode(lightGreen, index)
  })),
].map(skill => {
  return {
    groupId: kebabcase(skill.groupName),
    ...skill
  }
})

export const groupedSkills = Object.fromEntries(
  skills.map(skill => {
    return skill.groupName
  })
  .filter((groupName, index, self) => {
    return self.indexOf(groupName) === index;
  })
  .map(groupName => {
    return [
      groupName,
      skills.filter(item => item.groupName === groupName)
    ]
  })
)
export const groupList = skills.map(skill => {
  return skill.groupName
})
.filter((groupName, index, self) => {
  return self.indexOf(groupName) === index;
})
.map(groupName => {
  return [
    groupName,
    kebabcase(groupName)
  ]
});
