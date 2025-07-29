import * as React from 'react';
import { Button, Typography, Grid, Paper } from '@mui/material';
import MyAppbar from '../App/MyAppbar';

const MyPage = () => {
  const [matchup, setMatchup] = React.useState(null);
  const [voted, setVoted] = React.useState(false);

  const fetchMatchup = async () => {
    const res = await fetch('/api/matchup');
    const data = await res.json();
    setMatchup(data);
    setVoted(false);
  };

  const submitVote = async (winnerId) => {
    await fetch('/api/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matchup_id: matchup.matchup_id, winner_movie_id: winnerId }),
    });
    setVoted(true);
  };

  React.useEffect(() => {
    fetchMatchup();
  }, []);

  React.useEffect(() => {
    console.log("🧪 Matchup:", matchup);
  }, [matchup]);

  return (
    <>
      <MyAppbar />
      <Grid container justifyContent="center" spacing={4} sx={{ padding: 4 }}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">Movie Match Game</Typography>
        </Grid>

        {matchup && !voted && (
          <>
            <Grid item>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6">{matchup.movie1_name}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => submitVote(matchup.movie1_id)}
                >
                  Vote
                </Button>
              </Paper>
            </Grid>
            <Grid item>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6">{matchup.movie2_name}</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => submitVote(matchup.movie2_id)}
                >
                  Vote
                </Button>
              </Paper>
            </Grid>
          </>
        )}

        {voted && (
          <Grid item xs={12} textAlign="center">
            <Typography variant="h6">Vote recorded!</Typography>
            <Button variant="outlined" onClick={fetchMatchup}>
              Next Matchup
            </Button>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default MyPage;
