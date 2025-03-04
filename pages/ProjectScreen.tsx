import { Stack, Image, Link, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

const ProjectScreen: React.FC = ()=> {
  const initialBackground = "https://via.placeholder.com/450x300"
  const [background, setBackground] = useState(initialBackground)
  const MotionLink = motion(Link)
  const MotionStack = motion(Stack)
  const MotionFlex = motion(Flex)

  const projects = [
    {
      name: "gecomm",
      image: "https://via.placeholder.com/100x75",
    },
    {
      name: "valobrain",
      image: "https://via.placeholder.com/100x75",
    },
    {
      name: "el torito",
      image: "https://via.placeholder.com/100x75",
    },
  ]

  return(
    <Stack h={300} w={450} backgroundImage={background} justifyContent="end" alignItems="center">
      <Stack direction="row" spacing={10} mb={10} zIndex={50}>
        {projects.map(project=><MotionFlex key={project.name} whileHover={{ scale: 1.1 }}><Link border="2px solid black" /* onMouseEnter={()=>setBackground(project.image)} onMouseLeave={()=>setBackground(initialBackground)} */>
          <Image src="https://via.placeholder.com/100x75" alt={project.name} />
        </Link></MotionFlex>)}
        
      </Stack>
    </Stack>
  )
}
export default ProjectScreen