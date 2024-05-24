import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from "@mui/material/Link";


const faq = [{
  title: "Как мне связаться со службой поддержки, если у меня есть вопрос или проблема?",
  description: "Вы можете связаться с нашей службой поддержки клиентов по электронной почте.",
  link: "help@poputka.by"
}].map((f, i) => {
  return {
    id: i,
    title: f.title,
    description: f.description,
    link: f.link
  }
})

export default function FAQ() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Container
      id="faq"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        color="text.primary"
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        Часто задаваемые вопросы
      </Typography>
      <Box sx={{ width: '100%' }}>
        {faq.map((f) => (
            <Accordion key={f.id}
              expanded={expanded === 'panel' + f.id}
              onChange={handleChange('panel' + f.id)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography component="h3" variant="subtitle2">
                  {f.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ maxWidth: { sm: '100%', md: '70%' } }}
                >
                  {f.description} <Link>{f.link}</Link>
                </Typography>
              </AccordionDetails>
            </Accordion>
        ))}
      </Box>
    </Container>
  );
}
