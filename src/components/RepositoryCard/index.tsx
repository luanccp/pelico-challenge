import { Typography, Avatar, Button } from "@mui/material";
import { Container, Content } from "./styles";

interface Props {
  name: string;
  description: string;
  owner: {
    login: string;
    avatarUrl: string;
  };
  onPress?: () => void;
  isFavorite: boolean;
}

export const RepositoryCard: React.FC<Props> = ({
  name,
  description,
  owner,
  onPress,
  isFavorite,
}) => {
  return (
    <Container square>
      <Content>
        <Typography variant="h6" gutterBottom>
          {name}
        </Typography>

        <Typography variant="body1" gutterBottom>
          {description}
        </Typography>

        <div>
          <Avatar alt={`${owner.login}'s avatar`} src={owner.avatarUrl} />
          <Typography variant="subtitle2" marginLeft={1}>
            {owner.login}
          </Typography>
        </div>
      </Content>
      {!isFavorite && (
        <Button size="small" onClick={onPress}>
          Favorite
        </Button>
      )}
    </Container>
  );
};
