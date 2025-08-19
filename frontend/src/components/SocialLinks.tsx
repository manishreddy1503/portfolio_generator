import { Box, IconButton, Tooltip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageIcon from '@mui/icons-material/Language';
import LinkIcon from '@mui/icons-material/Link';

type Props = {
  socials?: { github?: string; linkedin?: string; twitter?: string; website?: string; other?: string };
  color?: 'inherit' | 'primary' | 'default';
  size?: 'small' | 'medium' | 'large';
};

export default function SocialLinks({ socials, color = 'inherit', size = 'medium' }: Props) {
  const items = [
    { key: 'github', url: socials?.github, icon: <GitHubIcon fontSize={size} /> },
    { key: 'linkedin', url: socials?.linkedin, icon: <LinkedInIcon fontSize={size} /> },
    { key: 'twitter', url: socials?.twitter, icon: <TwitterIcon fontSize={size} /> },
    { key: 'website', url: socials?.website, icon: <LanguageIcon fontSize={size} /> },
    { key: 'other', url: socials?.other, icon: <LinkIcon fontSize={size} /> },
  ].filter(x => !!x.url);

  if (!items.length) return null;

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {items.map(i => (
        <Tooltip key={i.key} title={i.key}>
          <IconButton color={color as any} size={size} component="a" href={i.url} target="_blank" rel="noreferrer">
            {i.icon}
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
}


